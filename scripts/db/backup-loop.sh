#!/bin/sh
# Runs inside the `db-backup` container (postgres image). Takes a verified pg_dump every
# day at BACKUP_HOUR_UTC and rotates: KEEP_DAILY daily, KEEP_WEEKLY weekly (Sundays),
# KEEP_MONTHLY monthly (1st). `backup-loop.sh once` takes one backup and exits.
set -u
umask 027
DIR=/backups
KEEP_DAILY=${BACKUP_KEEP_DAILY:-14}
KEEP_WEEKLY=${BACKUP_KEEP_WEEKLY:-8}
KEEP_MONTHLY=${BACKUP_KEEP_MONTHLY:-12}
HOUR=${BACKUP_HOUR_UTC:-02}
mkdir -p "$DIR/daily" "$DIR/weekly" "$DIR/monthly"

log() { echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) backup: $*"; }
prune() { ls -1t "$1"/*.dump 2>/dev/null | tail -n +"$(($2 + 1))" | xargs -r rm -f --; }

backup() {
  f="$DIR/daily/technieum-$(date -u +%Y%m%d-%H%M%SZ).dump"
  tmp="$f.partial"
  if ! pg_dump --format=custom --compress=6 --no-owner --file="$tmp"; then
    rm -f "$tmp"; log "FAILED: pg_dump error"; return 1
  fi
  # Verify the archive is readable and non-trivial before it counts as a backup.
  if [ ! -s "$tmp" ] || ! pg_restore --list "$tmp" >/dev/null 2>&1; then
    rm -f "$tmp"; log "FAILED: archive did not verify"; return 1
  fi
  mv "$tmp" "$f"
  if [ "$(date -u +%u)" = 7 ]; then cp "$f" "$DIR/weekly/"; fi
  if [ "$(date -u +%d)" = 01 ]; then cp "$f" "$DIR/monthly/"; fi
  prune "$DIR/daily" "$KEEP_DAILY"; prune "$DIR/weekly" "$KEEP_WEEKLY"; prune "$DIR/monthly" "$KEEP_MONTHLY"
  log "ok $(basename "$f") ($(du -h "$f" | cut -f1))"
}

if [ "${1:-}" = "once" ]; then backup; exit $?; fi

# On start, back up straight away unless there is already one from the last 12h.
if [ -z "$(find "$DIR/daily" -name '*.dump' -mmin -720 2>/dev/null | head -1)" ]; then backup || true; fi

while true; do
  now=$(date -u +%s)
  next=$(date -u -d "today $HOUR:00" +%s)
  if [ "$next" -le "$now" ]; then next=$(date -u -d "tomorrow $HOUR:00" +%s); fi
  log "next backup at $(date -u -d "@$next" +%Y-%m-%dT%H:%MZ)"
  sleep "$((next - now))"
  backup || true
done
