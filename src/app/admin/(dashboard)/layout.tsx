import { redirect } from "next/navigation"

import { getCurrentAdmin } from "@/lib/server/auth"

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin()
  if (!admin) redirect("/admin/login")

  return <>{children}</>
}
