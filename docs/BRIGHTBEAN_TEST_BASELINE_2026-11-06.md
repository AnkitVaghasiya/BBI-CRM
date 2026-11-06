# BrightBean API and Permission Test Baseline — 6 November 2026

**Application:** BrainBinary AI OS secure staging pilot (not 100+ client production).
**Upstream BrightBean revision:** `1d11c52007a3f714979ff1b071d153e69a8c274a`.
**Project and test language:** English.

## Verified local tests

The following three upstream suites were run on the authorized Windows development PC, using Django's dedicated `config.settings.test` configuration and test database:

| Test suite | Result |
|---|---|
| `apps/api/tests/test_routers.py` | Passed |
| `apps/api/tests/test_publishability.py` | Passed |
| `apps/members/tests/test_org_permissions.py` | Passed |
| **Combined** | **59 passed; 90 warnings** |

The same test selection was run twice:

1. Original local virtual environment with Django 5.1.15.
2. An **isolated Python dependency overlay**, which imported Django 5.2.17, Pillow 13.0.0 and Cryptography 50.0.0 without modifying the original virtual environment. Again, **59 tests passed**.

Command for the patched local compatibility run (in the authorized PC):

```powershell
python C:\BBI-RND\run_bbi_patched_local_tests.py
```

The patch overlay was created at `C:\BBI-RND\security-audits\brightbean-patched-overlay`; no production credentials or data were inserted into the tests.

## Additional verified checks

- GitHub Actions CI run on the AI gateway branch completed **successfully**, including its Python safety tests, React build, lint, and npm production-dependency audit.
- The BrainBinary AI gateway has **9 passing** no-network unit tests and rejects potentially sensitive source excerpts.
- A public unauthenticated test confirmed **401** for BrightBean `/api/v1/me`, `/api/v1/accounts` and `/api/v1/mcp`.
- GitHub source history (including the CI workflow) was uploaded to private Oracle Object Storage and downloaded with checksum verification.

## What these tests do NOT establish

These upstream tests are not a complete independent agency tenant-isolation or penetration test. They do not prove account connection to Meta/YouTube/GBP, webhook integrity, 3-minute SLA automation, production client approval checks, or actual scale to 100+ social accounts. The app's cloud worker, real user permissions, and production PostgreSQL capacity still need separate end-to-end tests.

**Warnings:** The 90 pytest warnings remain for classification and remediation. Lint results for the React demo had 28 warnings and no errors. Neither count is proof of a security vulnerability by itself.

## Next engineering milestones

1. Implement synthetic **cross-tenant negative API tests** for at least five workspaces and separate client/membership roles.
2. Build an immutable content-revision and client-approval contract with server/worker negative tests.
3. Rotate the previously exposed Meta App Secret; verify agency app approval and account OAuth scopes.
4. Create a verified read-only API-key or OAuth agent connection, avoiding `publish_directly` and `reply_from_inbox` permissions until release gates pass.
5. Measure worker throughput, database capacity, and backup restore times under synthetic 100+ account workloads.

**Release rule:** Do not onboard real client credentials or enable automated publishing on the basis of green tests alone.
