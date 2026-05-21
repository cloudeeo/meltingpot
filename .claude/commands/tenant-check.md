---
description: Audit the current diff (or a specified path) for tenant-isolation correctness.
---

Audit tenant-isolation correctness for: $ARGUMENTS
(If no argument is given, audit the full diff between `main` and `HEAD`.)

Load `.claude/rules/multi-tenancy.md` and apply it rigorously. For each
changed file, answer:

1. **Data access** — Every query that reads or writes tenant-owned data
   goes through `ScopedRepository`? Any raw SQL outside `src/data/repos/`?
2. **TenantContext propagation** — Does every entry point (HTTP handler,
   resolver, job, scheduled task, event subscriber) establish or receive
   a `TenantContext`? Any reliance on module-level or global state?
3. **Joins** — Every join between tenant-owned tables includes a
   `tenant_id` equality?
4. **Caching** — Every cache key uses `tenantKey(tenantId, ...)`?
5. **Background jobs & events** — Every enqueue/publish carries
   `tenantId`? Every consumer reconstructs `TenantContext` from the
   envelope?
6. **Migrations** — New tenant-owned tables have `tenant_id NOT NULL`,
   indexed, and an RLS policy? Foreign keys include `tenant_id`?
7. **Tests** — Any new code that touches tenant data has a two-tenant
   test asserting cross-tenant invisibility?

For each finding, cite the file and line range and propose a concrete
fix. Group as BLOCKERS / CONCERNS / NITS (same severity model as
`/security-review`).

Do not edit code. Output the audit only.
