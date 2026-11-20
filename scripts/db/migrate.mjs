// Brings the database to the current schema using Prisma Migrate. Runs as the one-shot
// `migrate` compose service before the app starts.
//   - empty DB                        -> migrate deploy (creates everything)
//   - DB made earlier with `db push`  -> verify it matches the schema, baseline the
//                                        history, then migrate deploy
//   - already managed by Migrate      -> migrate deploy (applies anything new)
// It never drops data; any problem exits non-zero so the app does not start on a bad DB.
import { PrismaClient } from "@prisma/client"
import { spawnSync } from "node:child_process"
import { readdirSync, statSync } from "node:fs"

const prisma = (args) => {
  const r = spawnSync("npx", ["--no-install", "prisma", ...args], { stdio: "inherit" })
  return r.status ?? 1
}

const db = new PrismaClient()
const [{ managed, legacy }] = await db.$queryRawUnsafe(
  `SELECT to_regclass('"_prisma_migrations"') IS NOT NULL AS managed,
          to_regclass('"AdminUser"') IS NOT NULL AS legacy`,
)
await db.$disconnect()

if (!managed && legacy) {
  console.log("[migrate] Existing database without migration history (created with `db push`).")
  const drift = prisma([
    "migrate", "diff",
    "--from-url", process.env.DATABASE_URL,
    "--to-schema-datamodel", "prisma/schema.prisma",
    "--exit-code",
  ])
  if (drift !== 0) {
    if (process.env.DB_SYNC_LEGACY === "1") {
      console.log("[migrate] Schema differs; DB_SYNC_LEGACY=1 so running a non-destructive `db push`.")
      if (prisma(["db", "push", "--skip-generate"]) !== 0) process.exit(1)
    } else {
      console.error(
        "[migrate] The existing database does not match prisma/schema.prisma (diff above).\n" +
          "          Back it up (scripts/db/backup-now.sh) then re-run with DB_SYNC_LEGACY=1 to align it.",
      )
      process.exit(1)
    }
  }
  const names = readdirSync("prisma/migrations").filter((n) =>
    statSync(`prisma/migrations/${n}`).isDirectory(),
  )
  for (const name of names.sort()) {
    if (prisma(["migrate", "resolve", "--applied", name]) !== 0) process.exit(1)
  }
  console.log(`[migrate] Baselined ${names.length} migration(s).`)
}

process.exit(prisma(["migrate", "deploy"]))
