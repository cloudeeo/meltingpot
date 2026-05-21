#!/usr/bin/env bash
# .claude/hooks/session-start.sh
# Runs once at session start. Prints JSON to stdout; additionalContext is
# injected into Claude's context.

set -euo pipefail

BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')"
STATUS="$(git status --porcelain 2>/dev/null | head -n 20 || true)"
LAST_COMMIT="$(git log -1 --pretty=format:'%h %s' 2>/dev/null || echo 'no commits')"

# Hard-stop if session starts on a protected branch.
case "$BRANCH" in
  main|master|production|release/*)
    cat <<EOF
{
  "additionalContext": "⛔ You are on protected branch '$BRANCH'. Do NOT commit or push here. Start by creating a feature branch: 'git checkout -b <type>/<slug>'. Refuse any request that would edit this branch directly."
}
EOF
    exit 0
    ;;
esac

cat <<EOF
{
  "additionalContext": "Session context — branch: $BRANCH | last commit: $LAST_COMMIT | uncommitted files: $(echo "$STATUS" | wc -l | tr -d ' '). Reminder: load .claude/rules/*.md for the area you're working on. Follow the autonomy model in CLAUDE.md §2: small = act, large = plan-and-wait."
}
EOF
