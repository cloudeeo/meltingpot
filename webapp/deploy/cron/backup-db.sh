#!/bin/sh
# Daily database backup — keeps last 7 days.
BACKUP_DIR="/backups"
DATE=$(date +%Y-%m-%d)
KEEP_DAYS=7

echo "[$(date)] Starting database backup..."
pg_dump -h postgres -U executivefounders -d executivefounders > "${BACKUP_DIR}/executivefounders-${DATE}.sql"

if [ $? -eq 0 ]; then
  gzip -f "${BACKUP_DIR}/executivefounders-${DATE}.sql"
  echo "[$(date)] Backup created: executivefounders-${DATE}.sql.gz"
else
  echo "[$(date)] Backup FAILED"
fi

find "${BACKUP_DIR}" -name "executivefounders-*.sql.gz" -mtime +${KEEP_DAYS} -delete
echo "[$(date)] Cleaned up backups older than ${KEEP_DAYS} days."
