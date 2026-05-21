# Workflow Rules

## Plan format (for "large" changes)

When a change qualifies as "large" per `CLAUDE.md §2`, produce a plan in
this exact format and wait for approval before editing code:

```
## Plan: <short title>

### 1. Goal
<1–3 sentences. What user-visible or system behavior changes?>

### 2. Current behavior & constraints
<Cite the files/functions/tests you read. Flag any ambiguity.>

### 3. Proposed change
<Numbered steps. One step = one logically atomic edit.>
  1. <file>: <what and why>
  2. ...

### 4. Test strategy
- New tests: <list>
- Existing tests that must still pass: <list>
- Manual verification steps: <list>

### 5. Risk assessment
- Security/tenant impact: <none | describe>
- Data migration impact: <none | describe>
- Backwards compatibility: <yes | breaking — describe>
- Observability: <what new logs/metrics/traces, if any>

### 6. Rollback plan
<How to revert safely. Migration reversibility.>

### 7. Out of scope
<Explicitly list adjacent things you will NOT touch.>
```

## Execution loop

For each numbered step in the approved plan:

1. **Read** the affected files end-to-end before editing. Do not rely on
   partial context.
2. **Write or update tests first** when practical (TDD). At minimum, have
   a failing test or a clear acceptance criterion before changing code.
3. **Make the smallest edit** that satisfies the step. Resist drive-by
   cleanups — note them in a `TODO(claude):` and move on.
4. **Run the local verification suite** after each step:
   `npm run lint && npm run typecheck && npm test -- <scope>`.
5. **Stop and report** if any verification fails. Do not "fix forward"
   by patching tests or disabling checks.

## Scope discipline

- If you discover a bug unrelated to the current task, **do not fix it**.
  Write a `TODO(claude):` with a one-line description and keep going.
- If the task turns out to require more than the approved plan, **stop and
  replan**. Do not silently expand scope.
- If a test is flaky, **do not delete or skip it**. Report and replan.

## Reporting back

After completing work, produce a summary with:

- What was changed (files + one-line each).
- Tests added/updated and their status.
- Any `TODO(claude):` you left and why.
- Any hard-rule or guardrail that was relevant and how it was satisfied.
- A suggested commit message and PR description per `.claude/rules/git.md`.
