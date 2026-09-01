import { AuthGate } from "@/components/auth/AuthGate"
import { AppShell } from "@/components/layout/AppShell"

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <AppShell>{children}</AppShell>
    </AuthGate>
  )
}
