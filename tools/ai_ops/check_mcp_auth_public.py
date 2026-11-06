"""Explicit unauthenticated BrightBean staging smoke test. No client or API secrets used."""
import json
import urllib.error
import urllib.request

BASE="https://studio.130.210.32.49.sslip.io"
PATHS=(
    ("GET","/api/v1/me",None),
    ("GET","/api/v1/accounts",None),
    ("POST","/api/v1/mcp",json.dumps({"jsonrpc":"2.0","id":"auth-smoke","method":"ping"}).encode()),
)
def main():
    allowed=(401,403)
    for method,path,body in PATHS:
        req=urllib.request.Request(BASE+path,method=method,data=body,
            headers={"User-Agent":"BrainBinary-MCP-Unauthenticated-Security-Smoke/1.0",
                     "Accept":"application/json","Content-Type":"application/json"})
        try:
            with urllib.request.urlopen(req,timeout=16) as response:
                status=response.status
        except urllib.error.HTTPError as e:
            status=e.code
        print("UNAUTHENTICATED",method,path,"HTTP",status,"AUTH_REQUIRED",status in allowed)
        if status not in allowed:
            raise SystemExit("UNSAFE_OR_UNEXPECTED_AUTH_RESPONSE")
    print("UNAUTHENTICATED_API_ACCESS_DENIED_AS_EXPECTED")
if __name__=="__main__":
    main()
