"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { MobileNav } from "@/components/layout/MobileNav"
import { CommandPalette } from "@/components/search/CommandPalette"
import { LevelUpWatcher } from "@/components/gamification/LevelUpWatcher"
import { PresenceTracker } from "@/components/layout/PresenceTracker"
import { TutorPanel } from "@/components/tutor/TutorPanel"
import { Companion } from "@/components/tutor/Companion"
import { LessonComplete } from "@/components/learn/LessonComplete"
import { FocusModeProvider, useFocusMode } from "@/components/layout/FocusMode"
import { cn } from "@/lib/utils"

function Shell({ children }: { children: React.ReactNode }) {
  const { focus } = useFocusMode()
  return (
    <div className="app-canvas flex h-dvh w-full overflow-hidden">
      <div className={cn("hidden md:flex", focus && "md:hidden")}>
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-dot-grid pb-16 md:pb-0">
          <div
            className={cn(
              "mx-auto w-full animate-fade-in p-4 md:p-8",
              focus ? "max-w-3xl" : "max-w-7xl",
            )}
          >
            {children}
          </div>
        </main>
        <MobileNav />
      </div>

      <CommandPalette />
      <LevelUpWatcher />
      <PresenceTracker />
      <TutorPanel />
      <Companion />
      <LessonComplete />
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <FocusModeProvider>
      <Shell>{children}</Shell>
    </FocusModeProvider>
  )
}
