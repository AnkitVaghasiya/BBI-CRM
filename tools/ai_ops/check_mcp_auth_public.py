#!/usr/bin/env python3
"""Read-only, unauthenticated HTTPS checks for BrainBinary BrightBean staging.

No browser cookies, client data, credentials, API keys, or response bodies are
loaded into this script. This verifies only public boundary behavior; it is
not a substitute for authenticated tenant-isolation and approval tests.
"""
from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

DEFAULT_BASE = "https://studio.130.210.32.49.sslip.io"

# API/MCP calls must remain private. The POST is a synthetic JSON-RPC ping,
# and should be denied by authentication before reaching an application tool.
PROTECTED = (
    ("GET", "/api/v1/me", None),
    ("GET", "/api/v1/accounts", None),
    ("POST", "/api/v1/mcp", json.dumps(
        {"jsonrpc": "2.0", "id": "auth-smoke", "method": "ping"}
    ).encode("utf-8")),
)
PUBLIC = (
    ("GET", "/health/", ("strict-transport-security", "content-security-policy")),
    ("GET", "/accounts/login/", ("strict-transport-security", "content-security-policy")),
)


def validate_base(value: str) -> str:
    """Accept an explicit HTTPS origin only; never permit credentials in URL."""
    parsed = urllib.parse.urlsplit(value)
    if (
        parsed.scheme != "https"
        or not parsed.hostname
        or parsed.username is not None
        or parsed.password is not None
        or parsed.path not in ("", "/")
        or parsed.query
        or parsed.fragment
    ):
        raise ValueError("Staging URL must be a credential-free HTTPS origin.")
    return value.rstrip("/")


class NoRedirect(urllib.request.HTTPRedirectHandler):
    """A login redirect must not conceal an unauthenticated API boundary."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def fetch_public_status(base: str, method: str, path: str, body: bytes | None):
    req = urllib.request.Request(
        base + path,
        method=method,
        data=body,
        headers={
            "User-Agent": "BrainBinary-Unauthenticated-Security-Smoke/2.0",
            "Accept": "application/json,text/html",
            "Content-Type": "application/json",
        },
    )
    opener = urllib.request.build_opener(NoRedirect)
    try:
        with opener.open(req, timeout=15) as response:
            return response.status, dict(response.headers.items())
    except urllib.error.HTTPError as err:
        # Never read or print error bodies, which might contain diagnostics.
        return err.code, dict(err.headers.items())


def verify(fetch):
    """Return (safe status messages, violations) from a callable test transport."""
    messages = []
    errors = []
    for method, path, required_headers in PUBLIC:
        try:
            status, headers = fetch(method, path, None)
            header_names = {key.lower() for key in headers}
            ok = status == 200 and all(h in header_names for h in required_headers)
            messages.append(f"PUBLIC {method} {path} HTTP {status} SECURE_HEADERS {ok}")
            if not ok:
                errors.append(f"Public boundary failed for {path}")
        except Exception:
            messages.append(f"PUBLIC {method} {path} REQUEST_ERROR")
            errors.append(f"Public boundary request failed for {path}")
    for method, path, body in PROTECTED:
        try:
            status, _ = fetch(method, path, body)
            ok = status in (401, 403)
            messages.append(f"UNAUTH {method} {path} HTTP {status} AUTH_REQUIRED {ok}")
            if not ok:
                errors.append(f"Unauthenticated access boundary failed for {path}")
        except Exception:
            messages.append(f"UNAUTH {method} {path} REQUEST_ERROR")
            errors.append(f"Unauthenticated request failed for {path}")
    return messages, errors


def main() -> int:
    try:
        base = validate_base(os.environ.get("BBI_STAGING_BASE_URL", DEFAULT_BASE))
    except ValueError:
        print("INVALID_STAGING_ORIGIN", file=sys.stderr)
        return 2
    messages, errors = verify(lambda method, path, body: fetch_public_status(base, method, path, body))
    for message in messages:
        print(message)
    if errors:
        print(f"STAGING_SECURITY_SMOKE_FAILED {len(errors)} checks", file=sys.stderr)
        return 1
    print("STAGING_PUBLIC_BOUNDARIES_VERIFIED")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
