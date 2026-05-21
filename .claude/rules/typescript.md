# TypeScript Rules

## Strictness is non-negotiable

- `strict: true` in `tsconfig.json`. Do not weaken it.
- No `any`. Use `unknown` + narrowing, generics, or a precise type.
  If `any` is truly unavoidable, add `// eslint-disable-next-line ... --
  reason: <why>` on the same line.
- No `as` casts except: (a) casting `unknown` after a runtime validator
  has checked it, or (b) narrowing a discriminated union the compiler
  can't infer. Never cast to silence a real type error.
- No `// @ts-ignore`. If you must suppress, use `// @ts-expect-error --
  reason: <why>` so it fails the build when the error goes away.
- No non-null assertions (`!`) on values that cross a trust boundary
  (HTTP input, DB rows, external APIs).

## Module & project conventions

- ESM only (`"type": "module"` or `.mts`/`.cts` as configured). No `require`.
- Path aliases via `tsconfig` `paths`, not deep relative imports
  (`../../../../`).
- One default export per file is allowed but **named exports are preferred**
  for discoverability and refactor safety.
- Barrel files (`index.ts` re-exports) only at package boundaries, not
  inside feature folders — they wreck tree-shaking and cause cycles.

## Error handling

- Throw `Error` subclasses, never strings or plain objects.
- Use a typed result/Either pattern (`Result<T, E>`) for expected failures
  at module boundaries. Reserve exceptions for truly exceptional paths.
- Every caught error must be (a) rethrown, (b) logged with context via
  `logger.error`, or (c) converted to a domain error. Never `catch {}`.
- Preserve cause chains: `throw new DomainError("...", { cause: err })`.

## Async

- Always `await` promises or explicitly handle them with `.catch()`.
  A floating promise is a bug.
- Use `AbortSignal` for cancelable work (HTTP, long loops, timers).
- No `setTimeout`/`setInterval` in request-scoped code. Use the scheduler
  abstraction in `src/infra/scheduler.ts`.

## Immutability and data shape

- Prefer `readonly` on fields and `ReadonlyArray<T>`/`readonly T[]` on
  parameters. Mutate only inside the module that owns the data.
- Validate all external input (HTTP, queue, third-party) with `zod`
  (or the project's chosen validator). Never trust a TS type on untrusted
  data — TS types are erased at runtime.

## Naming

- `PascalCase` for types, interfaces, classes, React components.
- `camelCase` for functions, variables, methods.
- `SCREAMING_SNAKE_CASE` only for true compile-time constants.
- Boolean variables read as predicates: `isActive`, `hasAccess`,
  `shouldRetry`.
- File names: `kebab-case.ts` for modules, `PascalCase.tsx` for React
  components.

## Forbidden patterns

- `eval`, `Function(...)`, dynamic `require`, `child_process.exec` with
  string interpolation — all blocked by hook. Use `execFile` with an
  argv array.
- `JSON.parse` on untrusted input without a validator around the result.
- Mutating function arguments.
- `console.log` in committed code. Use the `logger` from
  `src/observability/logger.ts`.
