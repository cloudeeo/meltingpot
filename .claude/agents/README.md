# Subagents

Fourteen specialized agents, split into three bands.

## Reviewers (read-only, high-signal audits)

These agents have no write access. They produce graded reports
(BLOCKERS / CONCERNS / NITS) with file citations and suggested fixes.
Run them in parallel after a change is implemented, or invoke directly
via slash commands.

| Agent | Trigger |
|---|---|
| `architect` | Any "large" change per `CLAUDE.md §2`. Produces a plan; doesn't code. |
| `security-reviewer` | Auth, input handling, crypto, deps, outbound HTTP, file uploads, public API. |
| `tenant-isolation-auditor` | Queries, repos, caches, jobs, events — anything touching tenant data. |
| `compliance-reviewer` | PII/PHI, logs, telemetry, exports, deletion, consent (SOC2/GDPR/HIPAA). |
| `code-reviewer` | General craftsmanship. Complements the security/tenant/compliance trio. |
| `performance-analyst` | N+1, index coverage, fan-out, caching, bundle size, list rendering. |
| `accessibility-reviewer` | Any UI change — keyboard, ARIA, contrast, semantic HTML, WCAG AA. |

## Builders (scoped write access)

These implement what the architect planned, in their domain. Each
builder hands off to relevant reviewers when done.

| Agent | Domain |
|---|---|
| `database-engineer` | Migrations, schema, ScopedRepository, queries, indexes. |
| `auth-engineer` | Authn, authz, sessions, OAuth, MFA, roles, policies. |
| `api-engineer` | REST routes, GraphQL schema/resolvers, webhook handlers. |
| `ui-ux-engineer` | React components, pages, forms, state. |
| `observability-engineer` | Structured logs, metrics, traces, error reporting, SLOs. |
| `test-engineer` | Tests — regression, coverage, two-tenant, policy, integration, flake fixes. |

## Meta

| Agent | Purpose |
|---|---|
| `debugger` | Diagnose failing tests / bugs / unexpected behavior. Does not fix — hands off. |

## How the main agent should use them

### A typical large change

1. **Plan** — main agent invokes `architect` → plan produced and reviewed.
2. **Build** — main agent invokes the appropriate builder(s) per the
   plan's "Delegation hint" block. Often sequential (database →
   API → UI), sometimes parallel.
3. **Test** — `test-engineer` rounds out coverage.
4. **Review** — the relevant reviewers run (often in parallel):
   - `security-reviewer` (if any security surface touched)
   - `tenant-isolation-auditor` (if any data-layer touch)
   - `compliance-reviewer` (if PII / logging / retention touched)
   - `performance-analyst` (if hot path touched)
   - `accessibility-reviewer` (if UI touched)
   - `code-reviewer` (always)
5. **Fix & resubmit** — builders address BLOCKERS. Reviewers re-check.
6. **Ship** — main agent runs `/ship` (see `.claude/commands/ship.md`).

### A bug fix

1. **Diagnose** — `debugger` produces a diagnosis + handoff.
2. **Fix** — the handoff-named builder implements, with a regression
   test first.
3. **Review** — at minimum `code-reviewer` + `test-engineer`; others
   if the fix crosses domains.

### A security alert / dependency audit

1. **Review** — `security-reviewer` enumerates findings across a
   specified path or the full repo.
2. For each finding, the appropriate builder implements the fix.
3. Re-review.

## Design principles

**Read-only reviewers, write-capable builders.** The separation makes
it structurally impossible for a reviewer to "fix while reviewing" —
which sounds helpful but ruins the independence of the review.

**Each agent loads its own rules.** Agents cite `.claude/rules/*.md` as
the authoritative ruleset. Prompt length stays bounded; the
authoritative document stays canonical.

**Handoff is explicit.** Every agent's output format includes a
Handoff section. The orchestrator (main Claude) reads this to decide
what runs next. Handoffs prevent silent responsibility gaps.

**Refusal list is first-class.** Every agent's prompt ends with "what I
will refuse to do." Those are the lines that separate a good agent from
a sycophantic one. They matter as much as the capabilities list.

**Tool access is minimum necessary.** Reviewers get `Read, Grep, Glob`
(plus narrow `Bash` for `git`, lint, typecheck). Builders add `Write,
Edit, MultiEdit, Bash`. Nobody gets broad shell access; the bash guard
hook catches the remainder.

**`model: inherit`.** All agents inherit the main conversation's
model. Override on a per-agent basis if you have evidence a cheaper
model is adequate for a narrow task (e.g. `test-engineer` on a small
project might run fine on Sonnet while `architect` needs Opus).

## Customization checklist before real use

- [ ] Update the paths cited in each agent (`src/data/repos/`,
      `src/observability/`, etc.) to match your actual layout.
- [ ] Remove `compliance-reviewer` references to HIPAA if out of
      scope.
- [ ] If the project uses Prisma/Drizzle/TypeORM instead of Knex, adjust
      raw-SQL guidance in `database-engineer`.
- [ ] If the project uses a different test runner (vitest/jest/playwright),
      adjust `npm test` invocations.
- [ ] If the project uses Next.js / Remix, adjust `ui-ux-engineer` for
      framework-specific patterns.
- [ ] If the project doesn't use OpenTelemetry, adjust
      `observability-engineer` metric/trace references.
- [ ] Try `/agents` in a Claude Code session to confirm they load and
      the `description` fields trigger auto-delegation as expected.

## Known limitations

- Auto-delegation hinges on the `description` field being action-oriented.
  If the main agent isn't picking up a specialist when it should, tune
  the description with phrases like "Use proactively when..."
- Reviewer reports can grow long on big diffs. Main agent should
  summarize or filter BLOCKERS-only when passing back to the user.
- Agents share the session's permission mode; a parent `bypassPermissions`
  overrides a child's tighter mode. Keep the main session appropriately
  scoped.
