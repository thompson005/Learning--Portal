#!/usr/bin/env bash
# Take a verified backup right now (also used as the safety snapshot before restore/sync).
set -euo pipefail
cd "$(dirname "$0")/../.."
docker compose exec -T db-backup /scripts/backup-loop.sh once
