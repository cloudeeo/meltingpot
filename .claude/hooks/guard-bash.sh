#!/usr/bin/env bash
# .claude/hooks/guard-bash.sh
# PreToolUse hook for the Bash tool.
# Reads the tool-call JSON from stdin. Exit 2 = block (stderr is fed back to Claude).
# Exit 0 = allow.

set -euo pipefail

INPUT="$(cat)"
CMD="$(printf '%s' "$INPUT" | jq -r '.tool_input.command // ""')"

if [ -z "$CMD" ]; then
  exit 0
fi

block() {
  # Write reason to stderr; Claude sees this as the block reason.
  echo "BLOCKED by guard-bash.sh: $1" >&2
  echo "Command: $CMD" >&2
  exit 2
}

# --- Destructive filesystem ---------------------------------------------------
# rm -rf on root, home, or common dangerous targets.
if printf '%s' "$CMD" | grep -Eq '(^|[^a-zA-Z_])rm[[:space:]]+(-[rRfF]+[[:space:]]+)+(/|~|\$HOME|\*|\.\.?/?)( |$)'; then
  block "destructive 'rm -rf' against root/home/parent paths. Narrow the target or ask a human."
fi
# rm on .git itself
if printf '%s' "$CMD" | grep -Eq 'rm[[:space:]]+-[rRfF]+.*\.git(/|$)'; then
  block "attempt to remove .git directory."
fi

# --- Privilege escalation -----------------------------------------------------
if printf '%s' "$CMD" | grep -Eq '(^|[^a-zA-Z_])sudo([[:space:]]|$)'; then
  block "sudo is not allowed."
fi
if printf '%s' "$CMD" | grep -Eq '(^|[^a-zA-Z_])su([[:space:]]|$)'; then
  block "su is not allowed."
fi

# --- Remote-execute-what-you-just-downloaded ----------------------------------
if printf '%s' "$CMD" | grep -Eq '(curl|wget)[^|]*\|[[:space:]]*(ba)?sh'; then
  block "piping network download to a shell is forbidden."
fi

# --- Git: protected branches & history rewrites -------------------------------
if printf '%s' "$CMD" | grep -Eq 'git[[:space:]]+push.*(--force|[[:space:]]-f([[:space:]]|$))'; then
  block "git force-push is forbidden on shared branches. If you truly need this, a human must run it."
fi
# Prevent checkout/switch that would clobber uncommitted work on main
if printf '%s' "$CMD" | grep -Eq 'git[[:space:]]+(checkout|switch)[[:space:]]+(main|master|production)( |$)'; then
  # Allow it but warn — this one we only ask-level in practice; here we just let it pass.
  :
fi
# Dangerous resets / rebases on shared branches are flagged; require explicit intent.
if printf '%s' "$CMD" | grep -Eq 'git[[:space:]]+reset[[:space:]]+--hard[[:space:]]+(origin/)?(main|master|production)'; then
  block "hard reset against shared branch."
fi

# --- Secrets / env files ------------------------------------------------------
if printf '%s' "$CMD" | grep -Eq '(^|[^a-zA-Z0-9_/])\.env(\.[a-zA-Z0-9_-]+)?([[:space:]]|$|:)'; then
  # allow .env.example only
  if ! printf '%s' "$CMD" | grep -Eq '\.env\.example'; then
    block "touching .env* files is forbidden. Use process env + the secret manager."
  fi
fi

# --- Database danger zone -----------------------------------------------------
# DROP TABLE / DATABASE / SCHEMA in any shell arg (psql -c, etc.)
if printf '%s' "$CMD" | grep -Eiq 'drop[[:space:]]+(table|database|schema|role|user)'; then
  block "DROP statement detected. DDL goes through migrations; never run ad hoc."
fi
if printf '%s' "$CMD" | grep -Eiq 'truncate[[:space:]]+table'; then
  block "TRUNCATE detected. Data deletion goes through reviewed migrations/jobs."
fi
if printf '%s' "$CMD" | grep -Eiq 'delete[[:space:]]+from[[:space:]]+[^[:space:]]+[[:space:]]*;?[[:space:]]*$'; then
  block "DELETE without WHERE detected. Add a predicate or ask a human."
fi

# --- Code-evaluation smells ---------------------------------------------------
if printf '%s' "$CMD" | grep -Eq 'node[[:space:]]+-e[[:space:]]+[^[:space:]]*(child_process|eval|Function)'; then
  block "inline node -e invoking child_process/eval/Function — too risky."
fi

# --- Network: private ranges via curl/wget for exfiltration --------------------
# (heuristic; real enforcement is in the outbound-http module)
# no-op here; leave for a dedicated network hook if desired.

# --- Package manager: log installs so they're auditable -----------------------
if printf '%s' "$CMD" | grep -Eq '(npm[[:space:]]+install|pnpm[[:space:]]+add|yarn[[:space:]]+add)'; then
  mkdir -p .claude/logs
  echo "$(date -u +%FT%TZ) $CMD" >> .claude/logs/deps.log
  # Don't block; the 'ask' permission will prompt. We just audit.
fi

exit 0
