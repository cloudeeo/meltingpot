# Performance Rules

Performance is a feature. Budget it, measure it, protect it.

## Budgets (adjust to project reality)

- API endpoints: p95 < 300ms for reads, < 800ms for writes, at
  steady-state production load.
- Page TTI (for the main app shell) < 3s on a mid-tier device /
  4G-equivalent.
- DB queries in the hot path: < 20ms p95; < 50ms absolute for the
  slowest expected plan.

When changing a hot path, state the budget in the plan and verify it.

## The boring wins

- **Avoid N+1.** Batch with `IN (...)` / DataLoader. The lint rule
  flags awaited DB calls inside loops.
- **Paginate.** No unbounded list endpoints. Cursor-based by default.
- **Index the predicate.** Before shipping a new query, check
  `EXPLAIN (ANALYZE, BUFFERS)` on realistic data.
- **Avoid `SELECT *`.** List the columns.
- **Cache at the right layer.** HTTP caching for public assets,
  Redis for computed views, in-process memoization only for truly
  immutable derivations within a request.
- **Stream when the response is big.** Don't buffer a 100MB export
  into memory.

## Async & concurrency

- Use `Promise.all` when the work is independent; `for await` when
  ordered. Don't sequentialize by accident.
- Cap concurrency with a pool (`p-limit` or equivalent) when fanning
  out to external services. Unbounded fan-out breaks dependencies.
- Every outbound call has a timeout. No hanging forever.

## Memory

- Don't hold request-scoped data past the request. No module-level
  caches keyed by tenant without an eviction policy.
- Large streaming operations release references. Watch for closure
  captures pinning buffers.

## Caching discipline

- Every cache entry has: a tenant-scoped key, a TTL, and an
  invalidation path (event-driven or time-based). No "forever" caches
  without a documented reason.
- Stampede protection on hot keys (request coalescing or
  probabilistic early refresh).

## Profiling before optimizing

- Don't micro-optimize without evidence. Run the profiler / flamegraph
  / slow-query log. Add a benchmark if the perf is load-bearing.

## Frontend

- Ship less JS: code-split, lazy-load, tree-shake.
- Lazy-load non-critical images; use modern formats (AVIF/WebP).
- Measure Core Web Vitals in CI on key pages.
