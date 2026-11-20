#!/usr/bin/env bash
# Restore the portal database from a backup file made by the db-backup service.
#   scripts/db/restore.sh backups/daily/technieum-20261121-020000Z.dump
# Takes a safety backup of the CURRENT data first, then replaces it.
set -euo pipefail
cd "$(dirname "$0")/../.."
FILE="${1:?usage: scripts/db/restore.sh <backup.dump>}"
[ -f "$FILE" ] || { echo "No such file: $FILE" >&2; exit 1; }

echo "This REPLACES the current portal database with: $FILE"
read -r -p "Type RESTORE to continue: " ans
[ "$ans" = "RESTORE" ] || { echo "Aborted."; exit 1; }

echo "== safety backup of current data"; ./scripts/db/backup-now.sh
echo "== stopping app";                  docker compose stop app
echo "== restoring"
docker compose exec -T db pg_restore --clean --if-exists --no-owner --single-transaction \
  -U technieum -d technieum < "$FILE"
echo "== re-checking schema";            docker compose run --rm migrate
echo "== starting app";                  docker compose start app
echo "Restore complete."
