#!/usr/bin/env bash
# One-way sync: copy the DATA of the live portal database (lms.technieum.cloud) into this
# host's database. The schema always comes from this repo's migrations; only rows move.
# Re-runnable: each run REPLACES local data with the live snapshot (after a safety backup).
#
# Setup: create .env.sync (gitignored, chmod 600) containing ONE line:
#   SRC_DATABASE_URL='postgresql://user:pass@host/db?sslmode=require'
# Use the DIRECT (non-pooled) connection string from the live DB provider.
#
# Not copied (they are tied to the live host, so they would be wrong/insecure here):
#   Session, UserSession (login tokens) and LabRun (running-container state).
# Users and admins log in again. Local lab containers are removed.
#
#   scripts/db/sync-from-live.sh [--yes] [--allow-drift]
set -euo pipefail
cd "$(dirname "$0")/../.."

YES=0; DRIFT_OK=0
for a in "$@"; do
  case "$a" in
    --yes) YES=1 ;;
    --allow-drift) DRIFT_OK=1 ;;
    *) echo "unknown arg $a" >&2; exit 2 ;;
  esac
done

ENV_FILE="${SYNC_ENV_FILE:-.env.sync}"
[ -f "$ENV_FILE" ] || { echo "Missing $ENV_FILE (see header of this script)." >&2; exit 1; }
# Parsed as data (never executed as shell), so odd characters in the URL are safe.
SRC_DATABASE_URL=$(sed -n 's/^SRC_DATABASE_URL=//p' "$ENV_FILE" | head -1 | tr -d "'\"" | sed 's/^ *//;s/ *$//')
case "$SRC_DATABASE_URL" in
  postgres://*|postgresql://*) ;;
  *) echo "$ENV_FILE does not contain a valid SRC_DATABASE_URL (must start with postgresql://). Delete the file and re-run." >&2; exit 1 ;;
esac
export SRC_DATABASE_URL   # passed to containers by name, so it never appears on a command line

# The pg client must be at least as new as the live server.
num=$(docker run --rm -e SRC_DATABASE_URL postgres:17 sh -c 'psql "$SRC_DATABASE_URL" -Atc "show server_version_num"')
major=$((num / 10000)); [ "$major" -lt 16 ] && major=16
CLIENT="postgres:$major"
echo "== live server is PostgreSQL $((num / 10000)); using client $CLIENT"

echo "== checking the live schema matches this repo"
if ! docker compose run --rm --no-deps -T -e SRC_DATABASE_URL app sh -c \
  'npx --no-install prisma migrate diff --from-url "$SRC_DATABASE_URL" --to-schema-datamodel prisma/schema.prisma --exit-code'; then
  if [ "$DRIFT_OK" = 1 ]; then
    echo "!! schema drift ignored (--allow-drift)"
  else
    echo "Live schema differs from prisma/schema.prisma (diff above). Use --allow-drift only if you understand it." >&2
    exit 1
  fi
fi

COUNTS_SQL="SELECT table_name||'='||(xpath('/row/c/text()', query_to_xml(format('select count(*) as c from %I.%I', table_schema, table_name), false, true, '')))[1]::text FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE' AND table_name NOT IN ('_prisma_migrations','Session','UserSession','LabRun') ORDER BY 1"

echo "== live row counts"
docker run --rm -e SRC_DATABASE_URL -e Q="$COUNTS_SQL" "$CLIENT" sh -c 'psql "$SRC_DATABASE_URL" -Atc "$Q"' | tee .sync-src.counts

if [ "$YES" != 1 ]; then
  echo
  echo "This REPLACES all data in the local portal database with the live snapshot."
  read -r -p "Type SYNC to continue: " ans
  [ "$ans" = "SYNC" ] || { rm -f .sync-src.counts; echo "Aborted."; exit 1; }
fi

echo "== safety backup of local data"
./scripts/db/backup-now.sh

mkdir -p backups/sync; chmod 700 backups/sync
OUT="backups/sync/live-$(date -u +%Y%m%d-%H%M%SZ).sql.gz"
echo "== dumping live data -> $OUT"
DUMP_CMD='exec pg_dump "$SRC_DATABASE_URL" --data-only --no-owner --no-privileges --exclude-table=_prisma_migrations --exclude-table-data="\"Session\"" --exclude-table-data="\"UserSession\"" --exclude-table-data="\"LabRun\""'
docker run --rm -e SRC_DATABASE_URL "$CLIENT" sh -c "$DUMP_CMD" | grep -v '^SET transaction_timeout' | gzip > "$OUT"
chmod 600 "$OUT"
[ -s "$OUT" ] && [ "$(gunzip -c "$OUT" | wc -c)" -gt 100 ] || { echo "Dump is empty, aborting." >&2; exit 1; }

echo "== stopping app and removing local lab containers"
docker compose stop app
docker ps -aq --filter "name=technieum-lab-" | xargs -r docker rm -f >/dev/null

echo "== loading into the local database (single transaction)"
TRUNCATE_ALL="DO \$\$ DECLARE t text; BEGIN SELECT string_agg(format('%I.%I', schemaname, tablename), ',') INTO t FROM pg_tables WHERE schemaname='public' AND tablename <> '_prisma_migrations'; IF t IS NOT NULL THEN EXECUTE 'TRUNCATE ' || t || ' CASCADE'; END IF; END \$\$;"
{ echo "$TRUNCATE_ALL"; gunzip -c "$OUT"; } \
  | docker compose exec -T db psql -U technieum -d technieum -v ON_ERROR_STOP=1 --single-transaction -q

echo "== verifying row counts"
docker compose exec -T db psql -U technieum -d technieum -Atc "$COUNTS_SQL" > .sync-dst.counts
if diff .sync-src.counts .sync-dst.counts; then
  echo "Row counts match."
else
  echo "ROW COUNT MISMATCH (diff above) - do not trust this sync." >&2
  exit 1
fi
rm -f .sync-src.counts .sync-dst.counts

docker compose run --rm migrate
docker compose up -d app
echo "Sync complete. Users and admins must log in again."
