// One-shot migration: copy learner accounts + progress + activity from the OLD
// database (e.g. the Neon DB behind lms.technieum.cloud) into THIS deployment's
// database.
//
// Run it inside the app container on the new host:
//   docker compose exec -e SOURCE_DATABASE_URL="<old-neon-url>" app \
//     node scripts/migrate-from-neon.js
//
// - SOURCE_DATABASE_URL  = the old database (read from).
// - DATABASE_URL         = this deployment's database (written to; already set
//                          in the container).
//
// Idempotent: matches users by email. Re-running updates existing users to the
// source's data (so a user who already started on the NEW box would be
// overwritten with their OLD progress — fine for a fresh migration). Admin
// accounts are NOT migrated; the new deployment keeps its own admin.

const { PrismaClient } = require("@prisma/client")

async function main() {
  const srcUrl = process.env.SOURCE_DATABASE_URL
  if (!srcUrl) {
    console.error("ERROR: set SOURCE_DATABASE_URL to the old database URL.")
    process.exit(1)
  }

  const source = new PrismaClient({ datasources: { db: { url: srcUrl } } })
  const target = new PrismaClient() // uses this container's DATABASE_URL

  try {
    const users = await source.user.findMany({ include: { activity: true } })
    console.log(`Source has ${users.length} learner account(s).`)

    let created = 0
    let updated = 0
    let activityDays = 0

    for (const u of users) {
      const data = {
        name: u.name,
        passwordHash: u.passwordHash, // bcrypt hash — users keep their passwords
        progressJson: u.progressJson,
        lastLoginAt: u.lastLoginAt ?? null,
        lastSeenAt: u.lastSeenAt ?? null,
      }

      const existing = await target.user.findUnique({ where: { email: u.email } })
      const saved = existing
        ? await target.user.update({ where: { email: u.email }, data })
        : await target.user.create({
            data: { email: u.email, createdAt: u.createdAt, ...data },
          })
      existing ? updated++ : created++

      for (const a of u.activity) {
        await target.activityDay.upsert({
          where: { userId_day: { userId: saved.id, day: a.day } },
          update: {
            activeSeconds: a.activeSeconds,
            sessions: a.sessions,
            firstAt: a.firstAt,
            lastAt: a.lastAt,
          },
          create: {
            userId: saved.id,
            day: a.day,
            activeSeconds: a.activeSeconds,
            sessions: a.sessions,
            firstAt: a.firstAt,
            lastAt: a.lastAt,
          },
        })
        activityDays++
      }
    }

    console.log(
      `Done. created=${created}, updated=${updated}, activityDays=${activityDays}.`,
    )
  } catch (err) {
    console.error("Migration failed:", err)
    process.exit(1)
  } finally {
    await source.$disconnect()
    await target.$disconnect()
  }
}

main()
