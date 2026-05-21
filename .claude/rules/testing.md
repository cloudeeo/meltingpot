# Testing Rules

## Test pyramid

- **Unit** tests are fast (ms), pure, and dominate the suite.
- **Integration** tests cover module seams (DB repo ↔ DB, HTTP handler
  ↔ service) with real dependencies where feasible (testcontainers for
  DB/Redis).
- **End-to-end** tests cover critical user flows only — expensive, kept
  small and stable.
- **Policy / security tests** assert auth, tenant isolation, and RLS.
  They run as a blocking CI job.

## Rules that apply everywhere

- A bug fix must include a regression test that fails without the fix.
- A new feature must include tests for: the happy path, at least one
  error/edge path, and any security/tenant boundary it crosses.
- Tests are deterministic. No reliance on wall-clock time, network
  flakiness, or test ordering. Use injected clocks and fake timers.
- Tests don't share mutable state. Each test sets up its own fixtures
  and cleans up.
- **Never** weaken a test or an assertion to make it pass. If a test
  is wrong, fix it with a comment explaining why; if the code is
  wrong, fix the code.
- **Never** disable or `.skip` a test to unblock merge. Mark with
  `.failing` + an issue reference, or revert.

## Coverage

- Coverage is a signal, not a target. Aim for ≥80% line / ≥70% branch
  on changed code, but a PR with lower coverage on well-tested paths
  is fine if the author justifies it.
- Zero tolerance for uncovered security-critical code: auth, tenant
  scoping, input validation, crypto, billing.

## Multi-tenant testing

- Any test touching tenant-owned data uses `withTwoTenants()` and
  asserts cross-tenant invisibility. See `multi-tenancy.md`.
- Do not use a single "test tenant" for everything — that hides
  tenant-scoping bugs.

## Fixtures & factories

- Use factories (`test/factories/`) to build valid domain objects.
  They produce realistic-but-synthetic data. Never use production data
  in tests.
- Fixtures never contain real secrets. Placeholders like
  `"test-api-key-REPLACE"` are fine.

## Mocks

- Mock at seams, not at random. Prefer testing with the real thing
  (testcontainers) when the seam is a DB or cache.
- Never mock the module under test. Never mock security primitives to
  make a test pass.

## Running tests

- `npm test` runs the unit suite.
- `npm run test:integration` runs integration (needs docker).
- `npm run test:policy` runs policy tests.
- `npm run test:e2e` runs e2e.
- Claude runs the relevant suite after each step of an approved plan
  (see `workflow.md`).
