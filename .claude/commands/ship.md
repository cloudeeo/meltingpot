---
description: Run the definition-of-done checklist against the current branch and produce a PR-ready summary.
---

The work is ostensibly complete. Verify that against the Definition of
Done in `CLAUDE.md §6` and produce a PR-ready summary.

Steps:

1. Run, in order, and capture results:
   - `npm run lint` (or project equivalent)
   - `npm run typecheck`
   - `npm test`
   - Relevant integration/policy tests if touched areas warrant it
     (use judgment; cite which you ran and why).

2. Inspect the diff (`git diff main...HEAD`) and verify:
   - [ ] No new `TODO`/`FIXME` without an owner + ticket.
   - [ ] No new dependency without prior approval in this session.
   - [ ] No secrets, no PII in logs, no unscoped tenant queries.
   - [ ] Migrations reversible (or rollback plan documented in PR body).
   - [ ] Observability (logs/metrics/traces) updated if behavior changed.
   - [ ] Auth policies declared for any new route/resolver.

3. If any item fails, **stop and report** — do not paper over it. Propose
   the smallest fix and wait for approval unless it's clearly a "small"
   change per `CLAUDE.md §2`.

4. If all pass, produce:
   - A Conventional Commit message suggestion.
   - A PR description using the template in `.claude/rules/git.md`.
   - A short list of things the human reviewer should pay extra
     attention to.

Do not push. Do not open the PR. Output only — a human does the submit.

Context for this ship: $ARGUMENTS
