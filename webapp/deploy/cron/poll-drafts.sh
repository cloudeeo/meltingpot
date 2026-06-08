#!/bin/sh
# Triggered by crond every 5 minutes from inside the executivefounders-cron
# container. Hits the in-app IMAP-poll endpoint, which connects to
# drafts@executivefounders.com over IMAP and inserts new submissions into
# the PostDraft table.
set -eu

SECRET="${CRON_SECRET:-}"
if [ -z "${SECRET}" ]; then
  echo "[$(date)] poll-drafts: CRON_SECRET not set — skipping."
  exit 0
fi

URL="http://app:3000/api/cron/fetch-drafts?secret=${SECRET}"
RESPONSE=$(wget -q -O- --timeout=60 "${URL}" 2>&1 || echo '{"ok":false,"reason":"wget failed"}')

echo "[$(date)] poll-drafts: ${RESPONSE}"
