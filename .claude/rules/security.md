# Security Rules

## Secrets

- **Never** hard-code secrets. Ever. This includes tests and examples.
  Use placeholders like `"test-api-key-REPLACE"` if a fixture needs shape.
- Secrets come from env vars, which come from the secret manager in
  production. Access them through `src/config/env.ts` (validated with
  `zod` on boot), never via `process.env.FOO` scattered in app code.
- `.env*` files (except `.env.example`) are blocked from read/write by
  hook. If you need a new var, add it to `.env.example` with a dummy
  value and to `src/config/env.ts`.
- Logs, error messages, and telemetry must never contain secrets. The
  redactor in `src/observability/redact.ts` scrubs known keys — extend
  it when you add a new sensitive field.

## Authentication & authorization

- Auth is centralized. Do not re-implement password hashing, JWT
  signing/verification, session handling, or OAuth flows outside the
  auth module.
- **Every** HTTP route, GraphQL resolver, and RPC handler must declare an
  authorization policy explicitly. There is no "public by default".
- Authorization checks happen at the **edge** (middleware/resolver) AND
  in the data layer (tenant scope + row-level policy). Defense in depth.
- Never downgrade an auth check to make a test pass. Write a test fixture
  with a properly scoped principal instead.
- Never introduce a new role, permission, or scope without updating the
  role matrix in `docs/auth/roles.md` and the policy tests.

## Input handling

- Validate all external input at the boundary with `zod` schemas. The
  schema is the source of truth for the type.
- Parameterize every SQL query — the ORM/query-builder handles this, but
  never concatenate strings into `db.raw(...)`.
- Escape output for the correct context: HTML, attribute, JS, URL, shell.
  Use framework primitives (React auto-escapes text; be careful with
  `dangerouslySetInnerHTML`).
- File uploads: validate MIME by content, cap size at the ingress, scan
  before storage, never serve from the app origin.
- SSRF: all outbound HTTP from user-controlled URLs goes through
  `src/infra/outbound-http.ts` which enforces the allowlist and blocks
  private IP ranges.

## Crypto

- Do not roll your own crypto. Use the project's `src/crypto/` helpers,
  which wrap Node's `crypto` / WebCrypto with safe defaults.
- Random IDs for security use `crypto.randomUUID()` or
  `crypto.randomBytes()`. Never `Math.random()`.
- Password hashing: argon2id via the existing helper. No MD5/SHA-1 for
  anything security-relevant.
- TLS: never disable cert verification, even "temporarily". If a dev
  env needs a custom CA, add it to the CA bundle.

## Dependencies

Before adding any new dependency, Claude must:

1. Confirm the need (can the stdlib or an existing dep do it?).
2. Check the package on npm: last publish date, weekly downloads,
   open issues, maintainer count. Flag anything sketchy.
3. Check the license — project allows MIT, Apache-2.0, BSD, ISC.
   Flag GPL/AGPL/SSPL for human review.
4. Prefer libraries already in `package.json` over adding a new one
   that does the same thing.
5. Never add a dep whose primary purpose is to work around a lint rule
   or a type error.

Adding a dep requires human approval in the plan step. Hooks log every
`npm install`/`pnpm add`/`yarn add` to `.claude/logs/deps.log`.

## Unsafe APIs (blocked or require justification)

- `eval`, `new Function(...)`, `vm.runInThisContext` — blocked by hook.
- `child_process.exec`, `execSync` with interpolated input — blocked.
  Use `execFile(cmd, [argv], ...)`.
- `fs` writes outside the project root — blocked.
- `http`/`https` requests to private IP ranges without going through
  `outbound-http.ts` — blocked.

## Reviewing Claude's own output

Before declaring done on a security-adjacent change, verify:

- [ ] No new secret or credential in the diff.
- [ ] All new routes/resolvers have an explicit auth policy.
- [ ] All new queries are tenant-scoped (see `multi-tenancy.md`).
- [ ] Any new user input has a `zod` schema.
- [ ] Any new outbound URL goes through `outbound-http.ts`.
- [ ] Any new log/metric does not leak PII (see `compliance.md`).
- [ ] Any new dep was approved.
