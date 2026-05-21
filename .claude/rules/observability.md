# Observability Rules

If you can't see it in prod, you can't operate it. Every meaningful change
ships with appropriate observability.

## The three signals

- **Logs**: discrete events, structured JSON, tied to a `requestId` and
  `tenantId`. Via `src/observability/logger.ts`.
- **Metrics**: aggregate counters/histograms/gauges. Via
  `src/observability/metrics.ts` (Prometheus/OpenTelemetry).
- **Traces**: distributed spans for request flow. Via
  `src/observability/tracing.ts` (OpenTelemetry). Every inbound request
  and every outbound call is a span.

Errors are reported separately to the error tracker via
`src/observability/errors.ts` (Sentry-compatible). Logging an error and
reporting it are distinct — use `errors.report(err, ctx)` for
alert-worthy failures.

## Structured logging

- Always structured. Never `logger.info("user " + id + " did x")`.
  Use `logger.info({ userId, action: "x" }, "user action")`.
- Every log line at `info`+ must include `requestId` and `tenantId`
  where available (the logger pulls them from AsyncLocalStorage).
- Levels:
  - `debug` — developer-only detail, off in prod.
  - `info` — normal significant events (request start/end, job run).
  - `warn` — recoverable anomaly; should be dashboarded.
  - `error` — unexpected failure; should page if sustained.
- Do **not** log at `error` for expected user errors (validation
  failures, 4xx). Those are `info` or `warn`.

## Metrics

- Name metrics `snake_case`, suffix units (`_seconds`, `_bytes`,
  `_total`).
- Labels are bounded-cardinality. **Never** label by `userId`,
  `tenantId`, `email`, or free-form input — that blows up the TSDB.
  Label by `route`, `method`, `status_class`, `tenant_tier` (not
  tenant_id).
- Every new code path that handles a request or a job adds:
  - a counter of invocations by outcome,
  - a histogram of duration.

## Tracing

- Every outbound HTTP/DB/cache/queue call is inside a span with a
  meaningful name and relevant attributes.
- Trace attributes follow OpenTelemetry semantic conventions.
- Do not put PII in span attributes — same rule as logs.

## Error reporting

- `errors.report(err, { tenantId, requestId, ...safeContext })`.
- Group errors by root cause. Add a `fingerprint` when the default
  grouping is wrong.
- Never swallow an error silently. If you truly want to ignore one,
  document why inline and still bump a counter.

## Alerts & SLOs

- New user-facing endpoints must have an SLO entry in
  `observability/slos.yaml` (availability + p95 latency).
- Alerts are defined in code and reviewed — do not rely on ad-hoc
  dashboard alerts.

## PII safety in telemetry

- The redactor runs on logs by default. Spans and metric labels are
  **not** auto-redacted — the author is responsible. When in doubt,
  use an ID instead of a value.
- Sampling: traces can be sampled, but errors are never sampled away.
