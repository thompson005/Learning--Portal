"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { MobileNav } from "@/components/layout/MobileNav"
import { OnboardingModal } from "@/components/onboarding/OnboardingModal"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh w-full overflow-hidden">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-dot-grid pb-16 md:pb-0">
          <div className="mx-auto w-full max-w-7xl animate-fade-in p-4 md:p-8">{children}</div>
        </main>
        <MobileNav />
      </div>

      <OnboardingModal />
    </div>
  )
}
