# BrainBinary AI OS — Implementation Checkpoint

**Verified on:** 6 November 2026  
**Status:** Secure staging pilot; NOT a 100+ client production rollout.  
**Project language:** English only, including interfaces, requirements, code contracts, logs, and documentation.

## Current infrastructure

- **Oracle Always Free:** Two running E2.1.Micro instances in the tenancy's home region. Their 1 GB memory limit is appropriate only for small staging workloads, not assured production capacity.
- **BrightBean Studio:** Django web server and background worker running as separate auto-restarting systemd units. Public HTTPS staging health and login pages return HTTP 200. Public registration is disabled.
- **Security update:** The running staging Python environment uses Django 5.2.17, Pillow 13.0.0, and Cryptography 50.0.0. A pinned-package audit across 63 installed packages reported no known advisories at that time. A separate patched canary passed health and login-route smoke checks.
- **Rollback:** Pre-upgrade service unit files and the original Python environment are preserved. Overrides have not been validated for every provider and publishing workflow.
- **Grafana:** Running on the static Oracle VM with port 3000 bound to localhost. Dashboard and reporting-data correctness still require end-to-end validation.
- **Static sites:** Existing HTTPS review / business websites remain hosted on the static VM; separate Oracle Object Storage previews also exist.

## Recoverability

- **VM-local staging snapshot:** A nightly systemd timer creates consistent SQLite, media, and manifest snapshots. SQLite integrity and application table checks passed.
- **Encrypted offsite copy:** The connected Windows PC has a daily 04:15 **India Standard Time** scheduled task that transfers snapshot data over SSH and uploads AES-256-GCM encrypted database, media, manifest, and deployment configuration to a private OCI Object Storage bucket.
- **Restore testing:** Encrypted objects have been retrieved and decrypted in memory; SHA-256 checks passed. The SQLite database was independently restored into memory, passed integrity checking, and contained the expected migrations. The encrypted configuration archive was checked for required deployment files.
- **Sensitive keys:** API, SSH and backup-encryption keys have restrictive local ACLs. They are not stored in GitHub. Recovery of encrypted cloud backups depends on retaining the private backup-encryption key independently.
- **Schedule limitation:** The Windows offsite backup requires the authorized PC to be powered on with its scheduled-task user logged in. This is not yet an autonomous cloud-native disaster recovery solution.
- **Source:** BBI-CRM Git history was uploaded to private OCI storage and verified. GitHub remains the source-code system of record.

## Verified limitations and release blockers

1. The React BBI-CRM prototype stores records in browser localStorage and simulates roles. It is **not** a secure client portal; do not input real client/employee data.
2. The BrightBean staging instance is not ready for 100+ live social accounts. Database and worker throughput have not been load-tested at target scale.
3. Meta OAuth onboarding, app review status, consent-based account connections, webhooks, and token rotation remain unverified. A previously exposed Meta App Secret must be rotated before live integration.
4. Cross-client server-side authorization, content-version approval enforcement, external publishing APIs, message SLA, and comprehensive security testing have not yet passed acceptance criteria.
5. A zero-vulnerability or zero-risk guarantee is technically impossible. Periodic dependency, application, network and restore testing is required.
6. An independent recovery copy of the offsite encryption key is still required. The current Windows PC is a single dependency for offsite backup automation.
7. Public production domains and client data have not been migrated into the new staging environment.

## Next sequence

1. Use five synthetic or explicitly authorized pilot clients, with no unapproved real-client data.
2. Test tenant isolation, client roles, approvals, revisions, publishing guardrails, account health metrics, webhook validation, and reporting semantics.
3. Rotate the Meta secret and verify business-login configuration plus approved scopes before OAuth connection testing.
4. Design PostgreSQL-backed production persistence, isolated media storage, task queues, and scalable worker capacity.
5. Implement CI security tests, dependency pin/lock audit, deployment rollback, operational alerts, and backup-key recovery.
6. Only then expand client account onboarding toward 100+ managed accounts.

**Go/no-go rule:** A public HTTPS page or green Django system check is not evidence of production readiness. Complete the release gates in `docs/SECURITY_RELEASE_GATES.md` before using live client information.
