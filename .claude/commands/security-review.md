---
description: Review the current branch's diff against the project's security and compliance rules.
---

Perform a security and compliance review of the current branch's changes.

Steps:

1. Run `git diff --stat main...HEAD` and `git diff main...HEAD` to see the
   full diff. (Use `master` if that's the trunk.)
2. Load the following rule files and treat them as the review checklist:
   - `.claude/rules/security.md`
   - `.claude/rules/multi-tenancy.md`
   - `.claude/rules/compliance.md`
   - `.claude/rules/api.md` (if any API surface changed)
   - `.claude/rules/database.md` (if any migration or query changed)
3. For each changed file, evaluate it against the relevant rules. Produce
   a report grouped by severity:

   **BLOCKERS** — must be fixed before merge.
   **CONCERNS** — likely issues that need discussion.
   **NITS** — minor style/hygiene.

4. For each finding, cite:
   - The file and line range.
   - The specific rule it violates (file + section).
   - A concrete suggested fix.

5. Additionally answer these explicit questions:
   - Are any new secrets or credentials present in the diff?
   - Does every new route/resolver/handler declare an auth policy?
   - Does every new query go through `ScopedRepository`?
   - Are new user inputs validated with `zod`?
   - Are any new logs or metrics leaking PII/PHI/secrets?
   - Are new dependencies justified? (license, maintenance, need)
   - If a migration is present, is it reversible and zero-downtime-safe?

Do **not** edit code as part of this review. Output the report only.
Focus: $ARGUMENTS
