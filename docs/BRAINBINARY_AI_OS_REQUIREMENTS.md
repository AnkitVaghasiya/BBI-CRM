# BrainBinary AI OS — Product Requirements Baseline

**Status:** Engineering source of truth (not a claim of completed functionality)  
**Language:** English in the UI, code, database names, API contracts, tests, logs, and documentation.  
**Scale target:** 100+ current social accounts, scalable architecture for 200+ clients and 25+ staff.

## Product boundaries

- **BrightBean Studio (Django)** is the authenticated operations backend and agency workspace platform.
- **BBI-CRM (React/Vite)** is currently a browser-based UI prototype with sample records. It is NOT a production database or authorization system. Never connect genuine client data until server-side authorization and tenant isolation have been implemented.
- **Grafana OSS** is for sanitized, read-only operational reporting. It must not have access to OAuth secrets or client private files.
- **Oracle Cloud** is the primary free-first infrastructure where technically feasible. **GitHub** stores code/version history; private Oracle Object Storage holds encrypted/restorable data backups.

## Required modules and acceptance criteria

| ID | Module | Minimum verifiable acceptance criteria |
|---|---|---|
| R01 | Client CRM | Search, filter, onboard, assign owner/teams/services, and audit changes for 200+ clients; isolate each tenant's data. |
| R02 | Account connections | Consent-based OAuth for Facebook Pages, Instagram professional accounts, YouTube, and Google Business Profile using approved scopes; token refresh, expiry, and revocation handling. |
| R03 | Asset intake | Record each raw photo/video delivery with client, timestamp, asset type, file link, quantity, editor, and deadline; show work waiting to be edited. |
| R04 | Production tracker | Track Raw Received → Assigned → Editing → Internal QC → Client Review → Revision → Approved → Scheduled → Published; track versions, editor, time spent, and overdue items. |
| R05 | Mandatory client approval | Require a logged, current approval for the specific content version before posting. Edits invalidate prior approvals. Every publish attempt checks authorization again server-side. |
| R06 | Posting scheduler | Handle multi-platform publishing via official APIs, time zones, idempotency keys, reconciliation, failures, quotas, and 2–6 daily scheduled items where applicable. |
| R07 | Team management | Roles for Management, Video Editor, Scheduler, Meta Ads Manager, Account Manager, Designer, Writer, Shooter, Team Lead and client; per-client membership, permissions and workload dashboards. |
| R08 | Communications SLA | Monitor authorized client messages, identify unanswered questions, and alert the responsible team if a client message has not been addressed within 3 minutes during the configured service window. No unauthorized WhatsApp scraping. |
| R09 | Client check-in calls | Plan one call per client every 3 days; respect working days, Sunday exclusions, holidays and call ownership; log result and follow-up. |
| R10 | Weekly account health | Show weekly account-level reach, impressions, engagement, follower/subscriber trends, prior-period changes, and DOWN/NO DATA/ACCESS ISSUE states with transparent thresholds and last sync timestamp. |
| R11 | Meta Ads | Store campaigns, budgets, leads, CPL, conversion outcomes, staff ownership and action items; verify data origin and permission. |
| R12 | Reporting | Client-level, employee-level and department-level dashboards; 12-month history target, CSV export, weekly reports and management scorecards. |
| R13 | Shoot planning | Client schedule, script assignment, location, crews, equipment, raw footage intake and follow-up. |
| R14 | Client portal | Per-client secure login to submit data, review/approve content, request revisions, check status and contact assigned teams. |
| R15 | AI operations agents | Draft captions, identify overdue work, recommend growth actions and summarize analytics with human approval for external messages, publishing and irreversible changes. |
| R16 | Development agents | Propose code changes on isolated branches with tests, review, secret scanning, dependency checks and rollback; never push unreviewed changes to production. |
| R17 | Backup and restore | GitHub code backups and encrypted Oracle snapshots of DB/media/config; automated retention, checksum verification, restore drills and independent recovery copy. |
| R18 | Audit and governance | Immutable actor/timestamp/activity logs for sign-ins, approvals, publishing, data export, role changes and credential operations. |

## Operating defaults

- Workday: 09:00–18:00 local time; lunch window 13:00–14:00; configurable business calendar and holiday exceptions.
- Every publish requires client approval. An approval is version-specific and non-transferable.
- Account reports run weekly; daily snapshots preserve history for weekly comparisons.
- Begin with a **five-client pilot**; release to 100+ accounts only after API verification, data isolation testing, capacity testing and backup restoration.
- Access credentials are NEVER copied into repositories, screenshots, chat logs, demo datasets, or frontend JavaScript bundles.
- Use official provider APIs and their actual approvals. No promise that a selected Meta permission equals approved Advanced Access.
- Free-only infrastructure must not silently upgrade to a paid plan; quotas, storage and request usage need monitoring.

## Workflow and data invariants

1. `workspace_id` / `client_id` is enforced by the backend on every data query and mutation.
2. Approval is scoped to `deliverable_id + revision_id + content_hash + approver_id`; only approved matching revisions may publish.
3. A publish attempt has a stable idempotency key and an auditable result; no blind retries after uncertain provider acceptance.
4. No client alert uses a scraped personal WhatsApp number unless official API permission and lawful consent exist.
5. Every metric includes a source, collection time, reporting date, unit, and stale-data status.
6. Deleting or reassigning a client requires an authorized audit event and a recoverable backup.
7. Restore tests include database consistency, media presence and least-privilege permission checks.

## Phased delivery

**Phase 0: security baseline.** Inventory running infrastructure, isolate local credentials, fix network access, verify backups and classify browser-only demo components.

**Phase 1: authenticated operations pilot.** Deploy BrightBean staging over HTTPS; verify Django migrations, user login, client/workspace RBAC, content workflow and five test clients.

**Phase 2: integrations.** Rotate previously exposed Meta secret; configure approved Meta Login for Business scopes, live HTTPS callbacks and token storage. Test one agency account before five authorized client accounts.

**Phase 3: production tracking and reporting.** Connect PostgreSQL, implement raw-data/production/approval workflows, sanitized Grafana data views and weekly reports.

**Phase 4: automation and rollout.** Validate message SLA, scheduled check-ins, official publishing, AI agents, 100+ account load, disaster recovery and rollback.

## Current implementation caution

BBI-CRM's existing sample dataset, browser `localStorage`, and simulated role switcher are **demo behaviors only**. They provide no real authentication or tenant isolation. Production functionality and completion must be verified against the acceptance criteria above, not inferred from screenshots or public HTTP 200 checks.
