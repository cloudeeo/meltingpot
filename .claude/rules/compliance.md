# Compliance Rules (SOC2 / GDPR / HIPAA)

These rules translate compliance obligations into concrete code-level
behaviors. They are not legal advice — when in doubt, flag for the
security/legal owner listed in `docs/compliance/owners.md`.

## Data classification

Every piece of data in the system belongs to one of these classes:

- **Public** — marketing copy, docs, non-user-specific content.
- **Internal** — aggregated metrics without user identifiers.
- **Confidential** — tenant business data that is not personal.
- **PII** — personal data under GDPR (name, email, IP, device id, etc.).
- **PHI** — protected health info under HIPAA (where applicable).
- **Secret** — credentials, tokens, keys.

New fields must be annotated in the model with a `@dataClass` tag
(checked by the schema linter). Untagged fields fail CI.

## Logging

- **Never** log PII, PHI, or secrets at application log level.
- Use `logger.info({ userId, ... })` with IDs, not PII. Never log
  `email`, `name`, `phone`, `ip` (except in the dedicated access log
  with retention policy), request bodies, or response bodies.
- The `redact()` helper in `src/observability/redact.ts` scrubs known
  sensitive keys. Extend it when you add a sensitive field — do not
  rely on authors to remember.
- Error messages surfaced to users must not echo back untrusted input
  verbatim (can leak internal state).

## Retention & deletion

- Every data store (DB table, object storage bucket, log stream, cache,
  queue, analytics destination) has a retention policy declared in
  `docs/compliance/retention.yaml`. Adding a new store requires adding
  a retention entry.
- GDPR deletion ("right to erasure"): tenant-owned data is deleted via
  the `tenantDeletionPipeline` which fans out to every store. When you
  add a new store holding PII, **you must** register it with the
  pipeline. Tests enforce this.
- Soft-delete (`deleted_at`) is allowed for operational reasons but is
  **not** deletion for GDPR purposes — a hard-delete job sweeps per
  policy.

## Audit logging

- Every security-relevant event (auth success/failure, permission
  change, role grant, data export, admin action, consent change) is
  written to the append-only audit log via `audit.record(...)`.
- Audit records are tenant-scoped, tamper-evident (hash-chained), and
  have their own retention (longer than operational logs).
- Claude must add audit events when introducing a new security-relevant
  action. If unsure whether an action is security-relevant, add the
  event — it is cheap.

## Encryption

- In transit: TLS 1.2+ everywhere. Internal service-to-service also TLS.
- At rest: managed by the platform (KMS-backed). Application-level
  envelope encryption for fields marked `@encrypted` (SSNs, tokens at
  rest, etc.). Never store these in plaintext "for debugging".
- Keys are rotated by the platform; app code never holds long-lived raw
  keys.

## Consent & user rights (GDPR)

- Consent state lives in `user_consents`. Every feature that processes
  PII for a purpose beyond service delivery must check the relevant
  consent before acting.
- DSAR (data subject access requests) are fulfilled by the
  `dsarExporter` which enumerates per-store. Same rule as deletion:
  new PII store ⇒ register it.

## HIPAA-specific (only if in scope)

- PHI is only processed within the HIPAA-segmented environment. Code
  paths that touch PHI live under `src/phi/` and are reviewed as such.
- Access to PHI is logged with who/what/when/why. The `why` is a
  required field.
- No PHI in non-prod environments. Fixtures use synthetic data only.

## Change control (SOC2)

- Production changes go through PR review with at least one human
  approver (Claude does not count as a reviewer).
- Migrations, infra changes, and auth changes require two approvers
  per `CODEOWNERS`.
- Break-glass access is logged and reviewed weekly. Claude does not
  use break-glass paths.
