# BrainBinary Studio — Agent Integration and MCP Connection Runbook

**Status:** Public HTTPS staging is live; unauthenticated endpoint access is denied (verified). No agent credentials or production publishing privileges have been granted.
**Language:** All BrainBinary product/agent/project materials must be in English.

## Verified staging endpoints

| Interface | URL | Unauthenticated smoke-test status |
|---|---|---|
| Studio login | `https://studio.130.210.32.49.sslip.io/accounts/login/` | HTTPS 200 |
| API caller | `https://studio.130.210.32.49.sslip.io/api/v1/me` | HTTPS 401 |
| Social accounts | `https://studio.130.210.32.49.sslip.io/api/v1/accounts` | HTTPS 401 |
| MCP JSON-RPC (HTTP POST) | `https://studio.130.210.32.49.sslip.io/api/v1/mcp` | HTTPS 401 |

Source: Upstream BrightBean Studio README's **API & MCP for Agents** section. Verify actual permissions and provider approvals before using this instance for real client information. The presence of an endpoint alone does not mean all supported tools, role scopes, or integrations have been end-to-end tested.

## AI client connection strategy

**Claude Desktop:** The upstream README documents **Settings → Connectors → Add custom connector**, using the MCP URL above. The flow relies on BrightBean OAuth Dynamic Client Registration, interactive browser login, workspace consent and the user's actual permissions. Because the studio uses closed signup, an existing authorized account must complete this login. Credentials must not be copied into ChatGPT, shell histories, or Git.

**Codex / Cursor / other MCP clients:** Prefer interactive OAuth when supported. If an app requires a static API key, first create a **dedicated workspace-scoped, read-only key (with expiry if supported)** in BrightBean **Organization → API Keys**, after verifying the permission model. Never give `create_posts`, `publish_directly`, `upload_media`, `reply_from_inbox` or other write privileges to development agents. Do not embed static Bearer tokens in source-controlled `mcp.json` or frontend code. A native OS secret store or the vendor's approved keychain is required.

**OpenCode:** The free provider currently reports rate limiting. The gateway deliberately pauses free calls rather than bypassing quotas. Do not wire a production MCP connection to this unverified provider until successful and scoped authentication has been tested.

**Ollama local:** `qwen2.5-coder:1.5b` runs only at `127.0.0.1:11434` on the authorized office PC. The small model is restricted to **synthetic task classification**, because an earlier long-form answer invented infrastructure components. It does not receive a BrightBean credential.

**Google Antigravity / Cursor IDE:** Their project instructions use `AGENTS.md` and `.cursor/rules/brainbinary-ai-os.mdc`, respectively. Model availability and their client-specific authorization still depend on the user being signed in and on the platform's current free/plan limits.

## BrightBean permission and quota boundaries (upstream specifications, not guarantees)

Write permissions may include `create_posts`, `publish_directly`, `upload_media`, `use_inbox` and `reply_from_inbox`. Read-only analytics use `view_analytics`. Upstream documents per-key rate limits and MCP tool scopes. The safe agent gateway does not activate those privileges.

Publishing remains blocked until **server-enforced, revision-bound client approval** and cross-tenant negative tests pass. Meta OAuth app review and rotation of the previously exposed secret are still pending.

## Repeatable unauthenticated access smoke test

From the authorized Windows PC:

```powershell
python tools/ai_ops/check_mcp_auth_public.py
```

Expected result: all three API/MCP unauthenticated routes respond 401/403. Unexpected successful access is a release-blocking security issue. This is a low-risk, read-only test; it does not validate authenticated tenant isolation or active social connections.

## Development release conditions

1. The agent source runs in a separate branch and never receives secrets or real client data.
2. Write permissions are disabled by default, model calls are explicit and capped, and paid fallback is prohibited.
3. All changes are independently tested and reviewed before merging.
4. Every deployment has a verified backup, rollback and public HTTPS smoke test.
5. Pilot with five authorized clients; do not claim 100+ accounts live without evidence.
