#!/usr/bin/env bash
# .claude/hooks/guard-file-write.sh
# PreToolUse hook for Write/Edit/MultiEdit. Blocks writes to sensitive paths.
# Exit 2 = block, stderr fed back to Claude.

set -euo pipefail

INPUT="$(cat)"
PATHS="$(printf '%s' "$INPUT" | jq -r '
  [
    .tool_input.file_path // empty,
    ((.tool_input.edits // []) | .[]? | .file_path // empty)
  ] | map(select(. != null and . != "")) | unique | .[]
' 2>/dev/null || true)"

if [ -z "$PATHS" ]; then
  exit 0
fi

block() {
  echo "BLOCKED by guard-file-write.sh: $1" >&2
  echo "Path: $2" >&2
  exit 2
}

while IFS= read -r P; do
  [ -z "$P" ] && continue

  # Normalize: strip leading ./ for pattern matching convenience
  NORM="${P#./}"

  # --- .env* files (allow only .env.example) ---
  case "$NORM" in
    .env|.env.*|*/.env|*/.env.*)
      if ! printf '%s' "$NORM" | grep -Eq '(^|/)\.env\.example$'; then
        block "writes to .env* files are forbidden. Add vars to .env.example + src/config/env.ts." "$P"
      fi
      ;;
  esac

  # --- SSH/cloud credentials ---
  case "$NORM" in
    *.ssh/*|*id_rsa*|*id_ed25519*|*.aws/credentials|*.kube/config|*.gnupg/*)
      block "writes to credential files are forbidden." "$P"
      ;;
  esac

  # --- .git internals ---
  case "$NORM" in
    .git/*|*/.git/*)
      block "do not edit .git/ internals directly. Use git commands." "$P"
      ;;
  esac

  # --- lockfiles outside of an approved package op ---
  # (we allow edits only indirectly via `npm install`, etc.; direct edits are risky)
  case "$NORM" in
    package-lock.json|*/package-lock.json|pnpm-lock.yaml|*/pnpm-lock.yaml|yarn.lock|*/yarn.lock)
      block "do not hand-edit lockfiles. Use the package manager." "$P"
      ;;
  esac

  # --- Merged migrations are immutable ---
  # We treat db/migrations/* as immutable once they exist. New files are fine.
  if printf '%s' "$NORM" | grep -Eq '^(db/migrations|migrations|src/db/migrations)/'; then
    if [ -f "$P" ] || [ -f "$NORM" ]; then
      block "editing an existing migration is forbidden. Add a new forward migration." "$P"
    fi
  fi

  # --- node_modules, build output ---
  case "$NORM" in
    node_modules/*|*/node_modules/*|dist/*|build/*|.next/*|coverage/*)
      block "do not write into generated/vendored directories." "$P"
      ;;
  esac

  # --- Absolute paths outside project root ---
  case "$P" in
    /*)
      # Anything starting with / that isn't inside the cwd is suspicious.
      CWD="$(pwd)"
      case "$P" in
        "$CWD"/*) : ;;  # ok
        *)
          block "writes outside the project root are forbidden." "$P"
          ;;
      esac
      ;;
  esac

done <<< "$PATHS"

exit 0
