# Multi-Tenancy Rules

A tenant-isolation bug is a data breach. Treat every rule here as a hard rule.

## Tenant context

- Every request carries a `TenantContext` established by the auth
  middleware. It contains `tenantId`, `principalId`, `roles`, `scopes`.
- `TenantContext` is propagated via AsyncLocalStorage in the request
  lifecycle and explicitly passed to background jobs. Never read it from
  a module-level variable or a global.
- Background jobs, scheduled tasks, and internal RPCs must **construct**
  a `TenantContext` explicitly at entry — there is no ambient tenant
  outside a request.

## Data access

- **All** reads and writes of tenant-owned data go through the
  `ScopedRepository` layer in `src/data/repos/`. This layer:
  - Injects `WHERE tenant_id = $1` on every query.
  - Refuses queries without a `TenantContext`.
  - Logs any query that returns rows whose `tenant_id` does not match
    the context (belt-and-suspenders invariant check).
- Raw SQL (`db.raw`, `db.query`) is allowed **only** in `src/data/repos/`
  and **only** when it includes a tenant predicate. It is blocked
  elsewhere by hook.
- Cross-tenant operations (admin tooling, analytics rollups) live in
  `src/admin/` and require the `admin:cross-tenant` scope. They are
  audit-logged with a reason code.

## Database layer

- Every tenant-owned table has a `tenant_id` column, `NOT NULL`, indexed,
  and included in every composite index where it improves selectivity.
- PostgreSQL Row-Level Security is enabled on tenant-owned tables as a
  defense-in-depth layer. The app role sets
  `SET LOCAL app.tenant_id = $1` at the start of each transaction; RLS
  policies enforce the match. Migrations must add an RLS policy for any
  new tenant-owned table.
- Foreign keys between tenant-owned tables must include `tenant_id` in
  the composite key/constraint so cross-tenant references are impossible.

## Caching

- Every cache key must include `tenantId` as a segment. There is a
  `tenantKey(tenantId, ...parts)` helper — use it. Raw string keys are
  blocked by lint rule.
- Cache invalidation must be tenant-scoped. Never `FLUSHALL`.

## Background jobs & events

- Job payloads must carry `tenantId`. The job runner refuses payloads
  without it.
- Event envelopes must include `tenantId`. Subscribers reconstruct the
  `TenantContext` from the envelope before doing anything.

## Tests

- Every test that exercises tenant-owned data must use at least **two**
  tenants and assert that tenant A cannot see/affect tenant B. The
  `withTwoTenants()` test helper exists for this.
- Policy tests live in `test/policy/` and run in CI as a separate job
  that blocks merge.

## Red flags — stop and ask

- A query or function that takes no `tenantId` but reads tenant data.
- A join between tenant-owned tables without a `tenant_id` equality.
- A "temporary" admin endpoint that bypasses scoping.
- A migration that drops or weakens an RLS policy.
- A cache key or queue name without `tenantId`.
