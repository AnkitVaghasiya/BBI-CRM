#!/usr/bin/env python3
"""Fail CI on obvious secret material accidentally added to a Git working tree.

This is a low-cost, dependency-free first line of defense, NOT a substitute for
history scanning, provider-side secret scanning, or credential rotation.
Only files tracked in Git's index are read; never print matched secret values.
"""
from __future__ import annotations

import os
from pathlib import Path
import re
import subprocess
import sys

SUSPICIOUS_NAMES = {
    "id_rsa", "id_dsa", "id_ecdsa", "id_ed25519",
    "auth.json", "credentials.json", "token.json", "service-account.json",
    "service_account.json", ".npmrc", ".pypirc", ".netrc",
}
SUSPICIOUS_EXTENSIONS = {".p12", ".pfx", ".key", ".pem", ".sqlite", ".sqlite3", ".db", ".kdbx"}
SENSITIVE_CONTENT = (
    ("private-key marker", re.compile(rb"-----BEGIN (?:[A-Z0-9 ]* )?PRIVATE KEY-----")),
    ("AWS access-key pattern", re.compile(rb"\b(?:AKIA|ASIA)[A-Z0-9]{16}\b")),
    ("GitHub token pattern", re.compile(rb"\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b")),
    ("OpenAI key pattern", re.compile(rb"\bsk-(?:proj-)?[A-Za-z0-9_-]{24,}\b")),
    ("Slack token pattern", re.compile(rb"\bxox[baprs]-[A-Za-z0-9-]{20,}\b")),
    ("Google API key pattern", re.compile(rb"\bAIza[A-Za-z0-9_-]{35}\b")),
)


def forbidden_name(path: Path) -> bool:
    name = path.name.lower()
    return (
        name in SUSPICIOUS_NAMES
        or (name.startswith(".env") and name not in {".env.example", ".env.sample", ".env.template"})
        or name.endswith((".sqlite3-journal", ".sqlite-journal"))
        or path.suffix.lower() in SUSPICIOUS_EXTENSIONS
    )


def scan_tracked(root: Path) -> list[tuple[str, str]]:
    """Return (relative path, reason) without retaining or displaying secret values."""
    root = root.resolve()
    listed = subprocess.run(
        ["git", "ls-files", "-z", "--cached"], cwd=root, check=True,
        capture_output=True,
    ).stdout
    findings: list[tuple[str, str]] = []
    for item in filter(None, listed.split(b"\0")):
        relative = os.fsdecode(item)
        target = root / relative
        path = Path(relative)
        if forbidden_name(path):
            findings.append((relative, "sensitive filename/type"))
            continue
        # No symlink traversal; a future guard may separately approve safe links.
        if target.is_symlink():
            findings.append((relative, "tracked symbolic link requires review"))
            continue
        if not target.is_file():
            # e.g. tracked file deleted from worktree before staging; fail closed.
            findings.append((relative, "tracked file missing from worktree"))
            continue
        try:
            if target.stat().st_size > 10_000_000:
                findings.append((relative, "file too large for this scanner; review manually"))
                continue
            data = target.read_bytes()
        except OSError:
            findings.append((relative, "unable to read tracked file"))
            continue
        if b"\x00" in data[:4096]:
            # Binary content needs a dedicated artifact/attachment scanner.
            continue
        for reason, signature in SENSITIVE_CONTENT:
            if signature.search(data):
                findings.append((relative, reason))
    return findings


def main() -> int:
    repo = Path(__file__).resolve().parents[2]
    try:
        findings = scan_tracked(repo)
    except (subprocess.CalledProcessError, OSError) as exc:
        print(f"Repository scan could not run ({type(exc).__name__}).", file=sys.stderr)
        return 2
    if findings:
        print("Repository guard failed. No secret values are printed.", file=sys.stderr)
        for relative, reason in findings:
            print(f"- {relative}: {reason}", file=sys.stderr)
        print("Remove secrets from Git and rotate any exposed credentials.", file=sys.stderr)
        return 1
    print("Repository guard passed: no matches to its limited rules in tracked worktree files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
