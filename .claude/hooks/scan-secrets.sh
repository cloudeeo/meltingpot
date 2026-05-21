#!/usr/bin/env bash
# .claude/hooks/scan-secrets.sh
# PreToolUse hook for Write/Edit/MultiEdit. Scans the proposed content for
# common secret patterns. Exit 2 = block.
#
# This is a last-line-of-defense heuristic. Real secrets management is the
# secret manager + env.ts validation. This hook catches "oops, I put an
# API key in a test fixture" before it hits the disk.

set -euo pipefail

INPUT="$(cat)"

# Collect all candidate strings from the tool input:
#   - Write: content
#   - Edit: new_string
#   - MultiEdit: every edits[].new_string
CONTENT="$(printf '%s' "$INPUT" | jq -r '
  [
    .tool_input.content // empty,
    .tool_input.new_string // empty,
    ((.tool_input.edits // []) | .[]? | .new_string // empty)
  ] | map(select(. != null and . != "")) | join("\n")
' 2>/dev/null || true)"

# Also capture the target path so we can allow known-fixture locations.
FIRST_PATH="$(printf '%s' "$INPUT" | jq -r '
  .tool_input.file_path // ((.tool_input.edits // []) | .[0]? | .file_path // "")
' 2>/dev/null || echo "")"

if [ -z "$CONTENT" ]; then
  exit 0
fi

block() {
  echo "BLOCKED by scan-secrets.sh: $1" >&2
  echo "Path: $FIRST_PATH" >&2
  echo "If this is a test placeholder, use a clearly fake value like 'test-api-key-REPLACE' or 'xxxxxxxx'." >&2
  exit 2
}

# Normalize for grep
BUF="$(printf '%s' "$CONTENT")"

# --- Private keys ---
if printf '%s' "$BUF" | grep -Eq -- '-----BEGIN (RSA |EC |OPENSSH |DSA |PGP |ENCRYPTED )?PRIVATE KEY-----'; then
  block "PEM private key material detected."
fi

# --- AWS access key / secret ---
if printf '%s' "$BUF" | grep -Eq '(AKIA|ASIA)[0-9A-Z]{16}'; then
  block "AWS access key ID detected."
fi
if printf '%s' "$BUF" | grep -Eqi 'aws_secret_access_key[[:space:]]*[:=][[:space:]]*["'\'']?[A-Za-z0-9/+=]{40}'; then
  block "AWS secret access key detected."
fi

# --- GitHub tokens ---
if printf '%s' "$BUF" | grep -Eq '(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}'; then
  block "GitHub token detected."
fi

# --- Slack tokens ---
if printf '%s' "$BUF" | grep -Eq 'xox[abpr]-[A-Za-z0-9-]{10,}'; then
  block "Slack token detected."
fi

# --- Google API / OAuth ---
if printf '%s' "$BUF" | grep -Eq 'AIza[0-9A-Za-z_-]{35}'; then
  block "Google API key detected."
fi
if printf '%s' "$BUF" | grep -Eq 'ya29\.[0-9A-Za-z_-]+'; then
  block "Google OAuth access token detected."
fi

# --- Stripe ---
if printf '%s' "$BUF" | grep -Eq '(sk|rk)_(test|live)_[0-9A-Za-z]{16,}'; then
  block "Stripe secret/restricted key detected."
fi

# --- Generic high-entropy bearer / JWT ---
# JWT: three base64url segments separated by dots.
if printf '%s' "$BUF" | grep -Eq 'eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}'; then
  # Allow obvious fixtures
  if ! printf '%s' "$FIRST_PATH" | grep -Eq '(test|tests|__fixtures__|fixtures|\.md$)'; then
    block "JWT-shaped token detected in non-test file."
  fi
fi

# --- Connection strings with embedded credentials ---
if printf '%s' "$BUF" | grep -Eq '(postgres(ql)?|mysql|mongodb(\+srv)?|redis|amqp)://[^:[:space:]]+:[^@[:space:]]+@'; then
  # Allow example placeholders like user:password@host or USER:PASS@host
  if printf '%s' "$BUF" | grep -Eq '(postgres(ql)?|mysql|mongodb(\+srv)?|redis|amqp)://(user|username|USER|USERNAME):(pass|password|PASS|PASSWORD|REPLACE)@'; then
    :
  else
    block "database/queue URL with embedded credentials detected."
  fi
fi

# --- Common variable names with suspiciously real-looking values ---
# Patterns like: API_KEY = "sk_abcd1234..." (>= 20 chars, not obviously fake)
if printf '%s' "$BUF" | grep -Eqi '(api[_-]?key|secret|token|password|passwd|pwd)[[:space:]]*[:=][[:space:]]*["'\''`][A-Za-z0-9_/+=.-]{20,}["'\''`]'; then
  # Exempt if the value contains obvious fake markers
  if printf '%s' "$BUF" | grep -Eqi '(api[_-]?key|secret|token|password|passwd|pwd)[[:space:]]*[:=][[:space:]]*["'\''`][^"'\''`]*(xxx|REPLACE|FAKE|EXAMPLE|DUMMY|placeholder|YOUR_|TODO)[^"'\''`]*["'\''`]'; then
    :
  else
    # Stricter in non-test files
    if ! printf '%s' "$FIRST_PATH" | grep -Eq '(test|tests|__fixtures__|fixtures|\.env\.example$|\.md$)'; then
      block "assignment to secret-like variable with a high-entropy literal."
    fi
  fi
fi

exit 0
