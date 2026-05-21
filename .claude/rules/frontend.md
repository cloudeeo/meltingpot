# Frontend Rules (React + TypeScript)

## Component model

- Function components only. Hooks for state and effects.
- One component per file; file name matches the default export
  (`UserCard.tsx` exports `UserCard`).
- Props are an explicit `type` or `interface`, never inline in the
  function signature for non-trivial props.
- No prop-drilling deeper than 2–3 levels — use composition, context,
  or a state library (whichever the project already uses).

## State

- Local UI state: `useState`/`useReducer`.
- Server state: the project's data-fetching lib (TanStack Query, RTK
  Query, Apollo, etc.) — use it consistently. Don't mix.
- Global client state: only for genuinely cross-cutting concerns
  (theme, current user, feature flags). Everything else is local or
  server state.
- Never store derived values in state if they can be computed from
  props/state. Compute in render or memoize.

## Effects

- `useEffect` is for syncing with external systems. Not for deriving
  state, not for "do this after a click" (that's an event handler).
- Every effect declares complete deps. No `// eslint-disable-next-line
  react-hooks/exhaustive-deps` without a written justification.
- Always handle cleanup (abort controllers, listeners, timers).

## Forms

- Use the project's form lib (react-hook-form, Formik, etc.) with a
  schema validator (zod) as the source of truth.
- Client-side validation mirrors server-side, but the server is
  authoritative. Never trust client-side validation alone.

## Accessibility

- Semantic HTML first. `<button>` for actions, `<a>` for navigation.
- All interactive elements are keyboard-reachable and have a visible
  focus state.
- Form inputs have associated `<label>`s. Icon-only buttons have
  `aria-label`.
- Color is not the only indicator of state. Contrast ≥ WCAG AA.
- Images have `alt`. Decorative images have `alt=""`.
- Modals trap focus, restore focus on close, and are dismissible with
  `Esc`.

## Performance

- Lazy-load routes with `React.lazy` + `Suspense`.
- Memoize expensive renders (`React.memo`, `useMemo`, `useCallback`)
  only where a profiler shows a problem. Premature memoization adds
  noise.
- Virtualize long lists (>100 items).
- Debounce/throttle high-frequency handlers.

## Security in the browser

- Never `dangerouslySetInnerHTML` with untrusted input.
- All user-controlled URLs in `href`/`src` are validated (no
  `javascript:`).
- Tokens live in HTTP-only cookies, not `localStorage`, unless the
  project has an explicit reason documented.
- CSP is enforced; no inline scripts or styles introduced without
  updating the CSP.

## Testing UI

- Test behavior, not implementation. React Testing Library idioms:
  query by role/label/text, interact with user events.
- Snapshot tests are discouraged for anything richer than a stable
  presentational component.

## Styling

- Follow the project's styling system (CSS Modules, Tailwind,
  styled-components, vanilla-extract) consistently.
- Design tokens come from `src/design/tokens.ts`. No raw hex colors in
  components.
