# BrainBinary AI OS — Security and Release Gates

**Policy:** No system can be guaranteed to have zero vulnerabilities or zero security risk. Before exposing real client information, the deployment must pass the following objective controls. All checks, records and user interfaces must remain in English.

## Mandatory checks before production

- [ ] **Private data:** No production client files, employee records, OAuth tokens, DB dumps, passwords, API private keys, or backup encryption keys in GitHub (including Git history and frontend bundles).
- [ ] **Secrets:** All previously exposed secrets rotated; environment-based secret delivery only; permission checks performed; no logs print secret values.
- [ ] **Auth:** Server-enforced session or OAuth authorization, secure cookies, CSRF protection, session expiry, brute-force/rate limits, lockout policy and optional MFA for privileged roles.
- [ ] **Tenant isolation:** Automated cross-client access tests for every API endpoint, export, object, subscription and file download.
- [ ] **Approval:** Unapproved, stale-revision or revoked-approval content cannot publish, including via background tasks.
- [ ] **Web security:** Valid HTTPS, HSTS, least-privilege CORS/CSP, no debug stack traces, no wildcard production hosts, verified reverse-proxy trust.
- [ ] **Infrastructure:** SSH limited by allowlist or managed bastion, databases and Grafana bound to private interfaces, host/OCI firewalls checked, patch automation enabled.
- [ ] **Dependencies:** SCA and lockfile audits performed; no unresolved known critical/high findings without a documented exception and compensating controls.
- [ ] **Monitoring:** Failed login alerts, publish failure alerts, error logs without sensitive data and storage/free-tier quota monitoring.
- [ ] **Backups:** Encryption in transit and at rest, daily DB/media snapshots, immutable or versioned retention where supported, periodic restore exercises and separate recovery copy.
- [ ] **Capacity:** Load test 100+ managed social accounts and realistic content volumes; never equate a 1 GB Oracle Micro staging VM with a production scale guarantee.
- [ ] **Change control:** Git branch, peer review, CI build/tests, staging smoke test, release record and demonstrated rollback.
- [ ] **API compliance:** Permissioned provider OAuth flows, verified webhooks, signature checks, token revocation cleanup and Meta App Review status.

## Existing concerns requiring remediation

1. Windows 10 Pro on the office PC needs supported security update coverage or an upgrade strategy.
2. The local PostgreSQL service listens on port 5432 on all interfaces. Validate Windows Firewall and configure private/loopback binding where dependencies permit.
3. BBI-CRM relies on browser role switching and `localStorage`; NEVER enter genuine client/employee data into the public demo.
4. A Meta developer App Secret was shared in conversation. Rotate it in Meta before any production connection.
5. The ERP repository contains tracked SQLite files. Review whether they contain sensitive records and remove/purge from history if necessary; rotate exposed credentials.
6. Backups of source code alone are not sufficient: database and media restoration must also be tested.
7. Oracle E2.1.Micro VMs provide only a small capacity pilot; do not claim guaranteed 24/7 100+ account load.

## Deployment verification record

For each release, record: commit SHA, build and test IDs, database migration, API health, HTTPS certificate expiry, access checks, restore checkpoint, deployed host, monitoring and rollback reference. A publicly accessible page is not proof that its backend, database, login, API or client isolation works.

**Approval rule:** No real-client rollout until all mandatory gates are checked and a designated authorized person signs off.
