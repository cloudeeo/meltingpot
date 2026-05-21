---
description: Produce an explicit plan for the requested change and wait for approval.
---

You are being asked to plan — not implement — the following change:

$ARGUMENTS

Follow the plan format in `.claude/rules/workflow.md` exactly. Specifically:

1. Read the relevant files before writing the plan. Cite them by path.
2. Load the matching rule modules from `.claude/rules/` (e.g. `security.md`,
   `multi-tenancy.md`, `database.md`) and note which constraints apply.
3. Output the plan using the template in `workflow.md` (Goal, Current
   behavior, Proposed change, Test strategy, Risk assessment, Rollback,
   Out of scope).
4. **Do not edit any code yet.** Stop after the plan and wait for explicit
   human approval.

If the task is small enough to qualify as "small" under `CLAUDE.md §2`,
say so and propose implementing directly — but still produce a one-paragraph
micro-plan and wait for a go-ahead.
