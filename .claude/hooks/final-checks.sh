#!/usr/bin/env bash
# .claude/hooks/final-checks.sh
# Stop hook — runs when Claude tries to end its turn.
# If tests/lint/typecheck fail, block with exit 2 so Claude keeps working.
#
# Infinite-loop guard: if stop_hook_active is true, we've already been
# invoked once this turn — exit 0 to allow stopping.

set -uo pipefail

INPUT="$(cat)"

ACTIVE="$(printf '%s' "$INPUT" | jq -r '.stop_hook_active // false' 2>/dev/null || echo "false")"
if [ "$ACTIVE" = "true" ]; then
  exit 0
fi

# Only run if there are actually uncommitted changes — no point blocking
# stop on a read-only session.
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  exit 0
fi

if git diff --quiet && git diff --cached --quiet; then
  # Nothing changed in the working tree; nothing to verify.
  exit 0
fi

FAIL=""

run_check() {
  local name="$1"; shift
  local out
  out="$("$@" 2>&1)"
  local code=$?
  if [ "$code" -ne 0 ]; then
    FAIL="${FAIL}${name} failed:
$(printf '%s' "$out" | tail -n 30)

"
  fi
}

if [ -f "package.json" ] && command -v npx >/dev/null 2>&1; then
  # Typecheck
  if [ -f "tsconfig.json" ]; then
    run_check "Typecheck (tsc --noEmit)" npx --no-install tsc --noEmit --pretty false
  fi

  # Lint (project script if present, else eslint on src/)
  if jq -e '.scripts.lint' package.json >/dev/null 2>&1; then
    run_check "Lint (npm run lint)" npm run -s lint
  elif command -v npx >/dev/null 2>&1 && [ -d "src" ]; then
    run_check "Lint (eslint src)" npx --no-install eslint --format=compact src
  fi

  # Unit tests — only if a 'test' script exists and there's actually a test dir
  if jq -e '.scripts.test' package.json >/dev/null 2>&1 && { [ -d "test" ] || [ -d "tests" ] || [ -d "__tests__" ] || grep -q '"test":' package.json; }; then
    # Respect project's chosen runner; don't force-watch or force-CI flags.
    run_check "Tests (npm test)" npm test -- --run 2>/dev/null || run_check "Tests (npm test)" npm test
  fi
fi

if [ -n "$FAIL" ]; then
  # Blocking feedback for Claude.
  jq -n --arg reason "$FAIL" '{"decision":"block","reason":("Finish-of-turn checks failed. Fix these before stopping:\n\n" + $reason)}'
  exit 0
fi

exit 0
