# Database Rules

## Migrations

- Every schema change is a migration. No out-of-band DDL.
- Migrations are **additive-first** and **zero-downtime-safe**:
  1. Add new column/table (nullable or with default).
  2. Deploy code that writes to both old and new.
  3. Backfill.
  4. Deploy code that reads from new.
  5. Drop old in a later release.
- Never edit a merged migration. Add a forward migration that fixes it.
- Every migration has a reversible `down` or a written rollback plan in
  the PR description.
- Long-running migrations (index creation on large tables, backfills)
  use `CONCURRENTLY`, `NOT VALID` + `VALIDATE`, or chunked backfills.
  Never lock a hot table.

## Schema conventions

- Primary keys: `id uuid` generated with `gen_random_uuid()` (or
  ULID/TSID if the project standardizes on it). No auto-increment ints
  for externally-visible IDs.
- Every tenant-owned table has `tenant_id uuid NOT NULL` and an RLS
  policy (see `multi-tenancy.md`).
- Timestamps: `created_at`, `updated_at` as `timestamptz NOT NULL`
  defaulted to `now()`. Soft-delete uses `deleted_at timestamptz`.
- Foreign keys always declared, `ON DELETE` explicitly chosen
  (`RESTRICT` by default, `CASCADE` only when the child cannot exist
  without the parent).
- Indexes: every FK has an index; every `WHERE` in a hot query has an
  index; every `ORDER BY ... LIMIT` has a supporting index.

## Query patterns

- Queries go through `ScopedRepository` (see `multi-tenancy.md`). Raw
  SQL outside the repo layer is blocked.
- Parameterize. Never concatenate user input into SQL.
- `SELECT *` is forbidden in production code. List columns explicitly.
- Prefer set-based operations over row-by-row loops.
- Use transactions for any multi-statement write that must be atomic.
  Default isolation `READ COMMITTED`; escalate to `REPEATABLE READ` or
  `SERIALIZABLE` only with reason.

## Performance

- Every new query path has a plan check (`EXPLAIN (ANALYZE, BUFFERS)`)
  for representative data volumes before merge.
- Pagination is cursor-based (`(created_at, id) > (?, ?)`) for any list
  that can exceed ~1000 rows. Offset pagination only for small, admin
  views.
- Avoid N+1: use `IN (...)` batching or joins. Lint rule flags loops
  containing awaited DB calls.

## Backups & restores

- Backup/restore procedures are not edited by Claude. Flag any need
  for backup/restore work to a human.
