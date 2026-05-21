#!/usr/bin/env bash
# .claude/hooks/inject-rules.sh
# Runs on every user prompt. Reminds Claude of the hard-rule surface so it
# can't drift over long sessions.

set -euo pipefail

cat <<'EOF'
{
  "additionalContext": "Hard-rule reminders (do not violate): (1) no secrets committed, (2) no .env* read/write, (3) no push to main/master/production/release, (4) no destructive ops without explicit in-turn instruction, (5) no disabling security/tenant/auth checks, (6) no PII/PHI/secrets in logs, (7) every tenant-data query goes through ScopedRepository, (8) no new dependency without approval, (9) no editing merged migrations, (10) no silenced errors. If the request conflicts with any of these, surface the conflict before proceeding."
}
EOF
