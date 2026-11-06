# BrightBean Studio — Mandatory Approval API Edit Guard (Review Artifact)

**Date:** 2026-11-06  
**Status:** Locally implemented and tested; not deployed, not merged into BrightBean upstream.  
**Language:** English only.

## Scope

This patch protects the existing `PATCH /api/v1/posts/{post_id}` endpoint of BrightBean Studio when a workspace requires internal or internal-and-client approval. It rejects content-changing edits against an already reviewed/scheduled platform post, returning HTTP 409 instead of silently changing a revision that may already have been approved.

Covered publish-affecting fields: caption, title, first comment, media attachment list, and scheduled time. Draft editing and internal-note updates remain available. Optional/no-approval workspaces keep their existing behavior.

**This is not a complete content approval system:** Immutable revision hashes, client identity validation, approval revocation on every mutation path, publisher worker rechecks, and multi-tenant isolation are still required before real-client publishing.

## Source and tested state

- Upstream source: `brightbeanxyz/brightbean-studio`, local baseline `1d11c52`.
- Isolated Windows worktree: `C:\BBI-RND\ai-worktrees\brightbean-approval-edit-guard`.
- Local branch: `security/bbi-client-approval-edit-guard-20261106`.
- Guard commit: `8a665f0d5f68c2a49675f6a9ab742f4cc3b3d652`.
- Changed code: `apps/api/routers/posts.py`; synthetic tests: `apps/api/tests/test_brainbinary_approval_edit_guard.py`.
- Verification: **73 passed**, 51 non-fatal warnings, across the new guard, API review fixes (rounds 1 and 2), and approval workflows.
- `git diff --check` clean; exported patch passed `git apply --check` against original upstream main checkout.

## Recoverability

- Patch in this repository: `patches/brightbean-studio/2026-11-06-mandatory-approval-api-edit-guard.patch`.
- Verified local Git bundle: `C:\BBI-RND\security-audits\bbi-approval-guard-20261106.bundle`.
- Bundle SHA-256: `84077784b18d248e112f23bb4c7fa7e05fb0bdee52c784a3db4880d45a6da457`.
- Patch SHA-256: `5fc72cca036cc6ce47e1dcaa3dde9e76c4a78bd88073c903cac522fe40065961`. The GitHub text payload may normalize the final newline; compare exact local patch bytes before asserting cross-platform hash equality.

The local bundle has complete Git history and was verified using `git bundle verify`. The patch is also committed in this BBI-CRM review branch, but that alone does not imply the original BrightBean upstream project has accepted it.

## Applying in a separate BrightBean worktree

```powershell
git -C C:\Path\To\Clean\brightbean-studio apply --check C:\Path\To\Patch.patch
git -C C:\Path\To\Clean\brightbean-studio apply C:\Path\To\Patch.patch
# Run the tests in an isolated test database, not against production data.
python -m pytest apps/api/tests/test_brainbinary_approval_edit_guard.py apps/api/tests/test_review_fixes.py apps/api/tests/test_review_fixes_round2.py apps/approvals/test_workflow.py -q --tb=short
```

Do not auto-apply this patch to running BrightBean services. Review upstream drift, database compatibility and full publish-side approval invariants first. Merge/release only with signed authorization and staging smoke + rollback evidence.

## Known blockers for BrainBinary production

1. Revisions require immutable content/media hash and client-specific sign-off; previous approvals must be invalidated by changes anywhere, not just the patched Agent API route.
2. The publisher worker (including scheduled/retry/async paths) must verify an active approval for the current revision immediately before each external provider call.
3. Default workspace `approval_workflow_mode` is currently `none`; a BrainBinary tenant must be explicitly configured to require both internal and client approval, enforced against unapproved downgrade.
4. Real Meta/YouTube/GBP tokens require official consent/scopes, provider review, segregated storage and incident-ready rotation.
5. End-to-end tenant isolation, 100+ account load testing, independent backups and restored disaster recovery must pass before deployment.
