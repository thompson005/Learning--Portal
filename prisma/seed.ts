import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const username = process.env.DEFAULT_ADMIN_USERNAME ?? "admin"
  const password = process.env.DEFAULT_ADMIN_PASSWORD ?? "TechnieumAdmin123!"

  const existing = await prisma.adminUser.findUnique({ where: { username } })
  if (existing) {
    console.log(`Admin user "${username}" already exists — skipping seed.`)
    return
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await prisma.adminUser.create({ data: { username, passwordHash } })
  console.log(`Created default admin user "${username}". Change the password after first login.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
