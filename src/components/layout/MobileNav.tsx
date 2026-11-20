"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { BookOpen, FlaskConical, LayoutDashboard, LineChart, MoreHorizontal, Library, Settings, Route, Trophy, X } from "lucide-react"

import { cn } from "@/lib/utils"

const TABS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/modules", label: "Modules", icon: BookOpen },
  { href: "/labs", label: "Labs", icon: FlaskConical },
  { href: "/progress", label: "Progress", icon: LineChart },
]

const MORE_LINKS = [
  { href: "/paths", label: "Paths", icon: Route },
  { href: "/achievements", label: "Achievements", icon: Trophy },
  { href: "/glossary", label: "Glossary", icon: Library },
  // Admin is a staff-only endpoint (/admin), deliberately not surfaced in nav.
  { href: "/settings", label: "Settings", icon: Settings },
]

export function MobileNav() {
  const pathname = usePathname()
  const [moreOpen, setMoreOpen] = useState(false)
  const isMoreActive = MORE_LINKS.some((l) => pathname.startsWith(l.href))

  return (
    <>
      {moreOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setMoreOpen(false)}>
          <div
            className="animate-in slide-in-from-bottom-2 absolute bottom-14 left-0 right-0 rounded-t-2xl border-t border-border bg-card p-4 shadow-lg duration-200 ease-out motion-reduce:animate-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                More
              </span>
              <button onClick={() => setMoreOpen(false)} aria-label="Close" className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="space-y-1">
              {MORE_LINKS.map((item) => {
                const Icon = item.icon
                const active = pathname.startsWith(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        active ? "bg-brand-orange/10 text-brand-orange" : "text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-30 flex h-14 items-center justify-around border-t border-border bg-brand-ink md:hidden">
        {TABS.map((item) => {
          const active = pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-1.5 text-[10px] font-medium transition-colors",
                active ? "text-brand-orange" : "text-brand-cream/60"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
        <button
          onClick={() => setMoreOpen(true)}
          className={cn(
            "flex flex-1 flex-col items-center gap-0.5 py-1.5 text-[10px] font-medium transition-colors",
            isMoreActive ? "text-brand-orange" : "text-brand-cream/60"
          )}
        >
          <MoreHorizontal className="h-5 w-5" />
          More
        </button>
      </nav>
    </>
  )
}
