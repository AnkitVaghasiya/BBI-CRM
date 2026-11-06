# BrainBinary AI OS — Multi-model Development Gateway

The `agent_gateway.py` script runs **bounded read-only AI reviews** on an isolated Git worktree. It does not alter the running Oracle deployment. It is intended for English-language planning, security reviews, test design and architecture, not as a replacement for real access controls.

## Installed-capability routing

| Backend | Access mode | Allowed workload | Status / limit |
|---|---|---|---|
| Codex CLI | Existing ChatGPT sign-in; no OpenAI API key | Read-only code and architecture reviews | Max 3 gateway runs/day |
| OpenCode V2 | Only explicit `opencode/glm-5.3-flash-free` | Sanitized, tool-denied reviews | Max 4 gateway runs/day; free model returned a rate-limit error and is under cooldown |
| Ollama local | Only `qwen2.5-coder:1.5b`, localhost | Only synthetic, low-stakes ticket classification (not factual architecture or security reviews) | Max 15 gateway runs/day; CPU-only performance varies |
| Cursor | Desktop editor | Manual review and supervised code changes | Project MDC rules enabled |
| Google Antigravity | Desktop editor | Manual agent projects and supervised changes | Root `AGENTS.md` rules enabled |
| Claude desktop | Desktop app; no verified Claude Code CLI access | Manual work only until entitlement and API mode are verified | No paid API fallback |
| Microsoft Copilot | Windows app | Manual work only; not a verified headless CLI | No direct billing or token access |

**No automatic paid fallback.** Local run limits are safeguards, not vendor quota guarantees. Free offers, model catalogs, and subscription access can change. No provider credentials are copied or shared.

## Commands (on your authorized Windows PC)

Run from any PowerShell window using the full path:

```powershell
$gateway = "C:\BBI-RND\ai-worktrees\BBI-CRM-codex-review\tools\ai_ops\agent_gateway.py"

python $gateway status
python $gateway review --backend codex --task requirements-gap
# Dry run above sends no model request; the next explicit command executes.
python $gateway review --backend codex --task requirements-gap --execute

# Only after verifying the provider and read-only policy:
python $gateway review --backend opencode-free --task test-plan --execute
python $gateway review --backend ollama-local --task triage --execute
```

The gateway sends capped excerpts only from explicit public/demo files. For hosted models, do not use confidential production client data, browser cookies, employees' personal information, OAuth credentials or copied database content.

A model-output test showed the small local model can invent infrastructure details, so the gateway rejects non-triage tasks for Ollama. The OpenCode provider returned a free-tier rate-limit error; cooldown prevents repeated calls and paid fallback.

The OpenCode restrictions live outside GitHub in `C:\BBI-RND\AI-DEV-HUB\opencode-readonly.json`; they deny all tools, external directory access, shell execution, editing and web fetching. The Codex adapter uses the `read-only` sandbox and ChatGPT authentication. Ollama is restricted to the loopback interface.

## Safe delivery workflow

1. Read the English requirements and security release gates.
2. Use a dedicated feature worktree and a curated, non-sensitive source excerpt.
3. Delegate design review or test plans to an eligible model.
4. Human/independent review, implement code, run unit and integration tests.
5. Validate tenant access, revision-bound client approval, provider rate limits and backup restores.
6. Commit to a review branch; mirror Git history to private Oracle Object Storage.
7. Deploy to staging with smoke checks and rollback, never directly to 100+ client production.

Backend usage failures or exceeded timeouts **stop** the task; no automatic switch to paid models is permitted. Never claim zero security risk or that 100+ accounts are live without independent production verification.
