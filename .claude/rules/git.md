# Git & PR Rules

## Branching

- This project uses a trunk-based workflow: `main` is the working branch.
  Committing and pushing to `main` is permitted.
- Feature branches are still welcome for larger or riskier work, and for
  anything you want on a PR before merging. Use `type/short-slug`, where
  type is one of `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `perf`,
  `ci`. Example: `feat/tenant-scoped-exports`.
- Force-push to any shared branch is still forbidden and hook-blocked.
- Rebase onto `main` rather than merge when keeping a feature branch
  current, unless the branch is shared (then merge).

## Commits

- Conventional Commits format:
  `type(scope): imperative summary`
  Example: `fix(billing): prevent double-charge on retried webhooks`.
- Each commit is a single logical change. A feature branch often has
  several commits; each is bisectable.
- Commit messages describe **why**, not just **what**. The diff shows
  what.
- No commits with only secrets changes, even if "redacted" — use env +
  secret manager.
- No generated files checked in unless the project explicitly wants
  them (lockfiles yes; dist/ no).

## Signing

- Commits should be signed (SSH or GPG) per project policy.

## PR description template

```
## Summary
<1–3 sentences. What and why.>

## Changes
- <file/area>: <one line>
- ...

## Risk & blast radius
- Security/tenant impact: <none | describe>
- Data migration: <none | describe, reversibility>
- Backwards compat: <yes | breaking — describe>
- Feature flag: <none | name — default state>

## Tests
- Added/updated: <list>
- All tests status: <pass/fail>
- Manual verification: <steps + result>

## Rollout
- Deploy strategy: <normal | staged | flagged>
- Rollback: <how, and data implications>

## Checklist
- [ ] Follows `.claude/rules/` for affected areas
- [ ] No secrets, no PII in logs, no unscoped queries
- [ ] Migrations reversible / rollout plan documented
- [ ] Observability (logs/metrics/traces) updated if needed
- [ ] Docs/ADRs updated if needed
```

## What Claude never does

- Force-push to a shared branch.
- Rewrite history that has been pushed and others may have based work
  on.
- Delete remote branches other than its own.
- Resolve a merge conflict by preferring one side without reading
  both.
- Commit `.env*`, credentials, or build artifacts.

## Review expectations

- Claude never approves its own PRs, and does not act as a human
  reviewer of record.
- Claude may leave review comments that a human then acts on.
