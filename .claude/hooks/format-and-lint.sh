#!/usr/bin/env bash
# .claude/hooks/format-and-lint.sh
# PostToolUse hook for Write/Edit/MultiEdit.
# - Auto-formats touched files with prettier (if available).
# - Runs eslint on touched .ts/.tsx files and feeds problems back to Claude.
# - Runs tsc --noEmit on the project (cheap if incremental is on).
#
# Exit 0 with JSON { "decision": "block", "reason": "..." } to force Claude to fix.
# Exit 0 with no output = all good.
# Never exit 2 here — we want Claude to see the feedback, not have the tool call itself blocked
# (the edit already happened).

set -uo pipefail  # no -e: we want to capture failures, not crash the hook

INPUT="$(cat)"

PATHS="$(printf '%s' "$INPUT" | jq -r '
  [
    .tool_input.file_path // empty,
    (.tool_input.edits // []) | .[]?.file_path // empty
  ] | map(select(. != null and . != "")) | unique | .[]
' 2>/dev/null || true)"

if [ -z "$PATHS" ]; then
  exit 0
fi

# Collect only files that actually exist now (post-edit)
EXISTING=()
while IFS= read -r P; do
  [ -z "$P" ] && continue
  [ -f "$P" ] && EXISTING+=("$P")
done <<< "$PATHS"

if [ "${#EXISTING[@]}" -eq 0 ]; then
  exit 0
fi

PROBLEMS=""

# --- Prettier (best-effort; don't block on formatter absence) ---
if command -v npx >/dev/null 2>&1 && [ -f "package.json" ]; then
  # Only format files prettier recognizes
  FMT_TARGETS=()
  for f in "${EXISTING[@]}"; do
    case "$f" in
      *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs|*.json|*.md|*.yml|*.yaml|*.css|*.scss|*.html)
        FMT_TARGETS+=("$f")
        ;;
    esac
  done
  if [ "${#FMT_TARGETS[@]}" -gt 0 ]; then
    npx --no-install prettier --write "${FMT_TARGETS[@]}" >/dev/null 2>&1 || true
  fi
fi

# --- ESLint on touched TS/JS ---
LINT_TARGETS=()
for f in "${EXISTING[@]}"; do
  case "$f" in
    *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs) LINT_TARGETS+=("$f") ;;
  esac
done

if [ "${#LINT_TARGETS[@]}" -gt 0 ] && command -v npx >/dev/null 2>&1; then
  LINT_OUT="$(npx --no-install eslint --format=compact "${LINT_TARGETS[@]}" 2>&1)"
  LINT_CODE=$?
  if [ "$LINT_CODE" -ne 0 ] && [ -n "$LINT_OUT" ]; then
    # Trim to the most relevant lines
    LINT_TAIL="$(printf '%s' "$LINT_OUT" | tail -n 40)"
    PROBLEMS="${PROBLEMS}ESLint reported problems in touched files:
${LINT_TAIL}

"
  fi
fi

# --- Typecheck (project-wide, fast if incremental) ---
# Only if a tsconfig exists and tsc is available.
if [ -f "tsconfig.json" ] && command -v npx >/dev/null 2>&1; then
  TS_OUT="$(npx --no-install tsc --noEmit --pretty false 2>&1)"
  TS_CODE=$?
  if [ "$TS_CODE" -ne 0 ] && [ -n "$TS_OUT" ]; then
    # Filter to errors touching the files we edited (reduces noise)
    FILTER_PAT=""
    for f in "${EXISTING[@]}"; do
      ESC="$(printf '%s' "$f" | sed 's/[.[\*^$/]/\\&/g')"
      if [ -z "$FILTER_PAT" ]; then
        FILTER_PAT="$ESC"
      else
        FILTER_PAT="${FILTER_PAT}|${ESC}"
      fi
    done
    TS_FILTERED="$(printf '%s' "$TS_OUT" | grep -E "${FILTER_PAT}" || true)"
    if [ -n "$TS_FILTERED" ]; then
      TS_TAIL="$(printf '%s' "$TS_FILTERED" | head -n 40)"
      PROBLEMS="${PROBLEMS}TypeScript errors in touched files:
${TS_TAIL}

"
    fi
  fi
fi

# --- Report back ---
if [ -n "$PROBLEMS" ]; then
  # JSON output with decision=block asks Claude to address the issues before proceeding.
  jq -n --arg reason "$PROBLEMS" '{"decision":"block","reason":$reason}'
  exit 0
fi

exit 0
