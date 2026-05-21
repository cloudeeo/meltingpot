# CI/CD Rules

## Pipeline invariants

- Every PR runs: install, typecheck, lint, unit tests, integration
  tests, policy tests, build, SAST, dependency audit, secret scan.
  A red check blocks merge.
- CI must be deterministic. Flaky tests are bugs — see `testing.md`.
- CI never has write credentials to production. Deploys use a
  separate, short-lived, scoped identity.

## Deploys

- Trunk-based: merge to `main` triggers a build; promotion to
  environments is explicit (not automatic to prod).
- Staged rollout (canary or percentage) for user-facing changes.
- Feature flags gate risky changes. Flags have owners and a removal
  date in `flags.yaml`. Stale flags are cleaned up each quarter.
- Migrations deploy **before** code that requires them; drops happen
  in a later release after old code is gone.

## Rollback

- Every deploy has a documented rollback. For schema changes that
  can't auto-revert, the forward-fix plan is part of the PR.
- Rollback is a single command and is rehearsed.

## Secret management in CI

- Secrets come from the CI platform's secret store. Never printed to
  logs. The log redactor is enabled.
- Never echo env vars in a CI step. Never `set -x` in a script that
  handles secrets.

## Artifacts & provenance

- Build artifacts are signed. SBOM generated per build. Images scanned
  for CVEs before promotion.
- Images are immutable and tagged by commit SHA; `latest` is not used
  for deploys.

## Changes to CI itself

- Any change to `.github/workflows/`, pipeline configs, Dockerfiles,
  infra-as-code, or deployment scripts is a **large** change (see
  `CLAUDE.md §2`) and requires a plan and explicit approval.
- Claude never edits self-hosted runner config or CI secrets.

## Environments

- `dev`, `staging`, `prod`. PII/PHI never flows to `dev`. `staging`
  uses masked copies or synthetic data per `compliance.md`.
- Prod data access for humans is behind break-glass, logged, and
  reviewed. Claude does not invoke break-glass paths.
