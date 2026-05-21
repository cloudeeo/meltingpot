# API Rules

## Contracts

- The API contract is the source of truth. REST uses OpenAPI in
  `docs/api/openapi.yaml`; GraphQL uses the SDL in `src/graphql/schema/`.
- Code generates types from the contract, not the other way around.
- Breaking changes require a new version (`/v2`) or a clearly labeled
  GraphQL deprecation with a minimum deprecation window (see
  `docs/api/versioning.md`).

## Authentication & authorization

- Every endpoint declares its auth requirement. No endpoint is public
  by default. See `security.md`.
- Authorization failures return `403` with a stable error code. Auth
  failures return `401`. Never leak whether a resource exists to an
  unauthorized caller (prefer `404` over `403` when existence itself
  is sensitive).

## Input & output

- Requests are validated with `zod` at the boundary. Invalid input
  returns `400` with a structured error listing the failing fields.
- Responses have stable shapes. Never leak internal fields
  (`password_hash`, internal IDs, stack traces).
- Error responses use a single envelope:
  ```json
  { "error": { "code": "string", "message": "human", "details": {...} } }
  ```
- Timestamps are RFC 3339 in UTC. Money is an integer in the smallest
  currency unit plus a currency code. Never float-dollar amounts.

## Idempotency & retries

- Unsafe methods that can be retried (POST that creates a resource,
  webhook handlers) accept an `Idempotency-Key` header and dedupe for
  at least 24h.
- Webhook handlers are idempotent and tolerate replay.

## Rate limiting

- Every public endpoint has a rate limit. Default: per-tenant + per-IP.
  Authenticated endpoints also rate-limit per-principal.
- Rate limit responses: `429` with `Retry-After`.

## Versioning & deprecation

- Add; don't change. Prefer adding a field over repurposing one.
- Deprecation requires: deprecation header or SDL directive, changelog
  entry, timeline, and a migration note.

## Pagination, filtering, sorting

- Lists are paginated by default. Cursor-based. Cap `limit` server-side.
- Filter/sort parameters are allowlisted — no arbitrary SQL-column
  exposure.

## GraphQL-specific

- Query depth and cost are bounded. Persisted queries for production
  clients.
- Resolvers are thin — they call services and repos. No business logic
  in resolvers.
- Use DataLoader to batch. N+1 in a resolver is a bug.

## Webhooks we emit

- Signed with HMAC over the raw body + timestamp.
- Include a delivery id and idempotency guidance for consumers.
- Retried with exponential backoff and a dead-letter after N failures.
