"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  BookOpen,
  FlaskConical,
  LayoutDashboard,
  CalendarDays,
  LineChart,
  Library,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  ArrowRight,
  LogOut,
  Route,
  Trophy,
  Medal,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth/AuthContext"
import { Logo, LogoMark } from "@/components/shared/Logo"
import { SearchTrigger } from "@/components/search/CommandPalette"
import { Search } from "lucide-react"
import { getOverallProgress, getNextTopic } from "@/lib/store/progress"
import {
  activeCurriculum,
  activeLabs,
  getActiveTrack,
} from "@/lib/data/tracks/registry"
import { useActiveTrackId } from "@/lib/data/tracks/useTrack"

const MAIN_NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/paths", label: "Paths", icon: Route },
  { href: "/plan", label: "Roadmap", icon: CalendarDays },
  { href: "/modules", label: "Modules", icon: BookOpen, badge: "count-modules" as const },
  { href: "/labs", label: "Labs", icon: FlaskConical, badge: "count-labs" as const },
  { href: "/progress", label: "Progress", icon: LineChart },
  { href: "/achievements", label: "Achievements", icon: Trophy },
  { href: "/leaderboard", label: "Leaderboard", icon: Medal },
]

const REFERENCE_NAV = [{ href: "/glossary", label: "Glossary", icon: Library }]

function formatModuleCode(moduleId: string) {
  const m = moduleId.match(/m(\d+)/)
  return m ? `M${m[1].padStart(2, "0")}` : moduleId.toUpperCase()
}

/** Sharp UI nav keycap — sharp-ui/Navigation.dc.html.
 *
 * The sidebar is the one place that deliberately breaks the square-corner
 * rule: each item is a mechanical keycap with its own component language.
 * The base, cap, press and accent-lit current state all live in `.keycap`
 * (globals.css); this only supplies layout and the collapsed-rail variant. */
function NavKey({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
  badge,
  onNavigate,
}: {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  active: boolean
  collapsed: boolean
  badge?: number
  onNavigate?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "keycap flex w-full items-center gap-[.55rem] font-nav text-[.92rem] font-medium tracking-[-.03em] no-underline",
        collapsed ? "justify-center px-[.35rem] py-[.62rem]" : "px-[.85rem] py-[.7rem]",
        active ? "keycap-active font-semibold" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <span className="inline-flex shrink-0 items-center justify-center opacity-[.85]">
        <Icon className={collapsed ? "h-5 w-5" : "h-[18px] w-[18px]"} />
      </span>
      {!collapsed && <span className="flex-1">{label}</span>}
      {!collapsed && !!badge && (
        <span className="rounded-full bg-brand-orange/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-brand-orange">{badge}</span>
      )}
    </Link>
  )
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const trackId = useActiveTrackId()
  const [collapsed, setCollapsed] = useState(false)
  const [percent, setPercent] = useState(0)
  const [operation, setOperation] = useState<{ code: string; title: string; moduleId: string } | null>(null)

  useEffect(() => {
    function refresh() {
      setPercent(getOverallProgress().percentComplete)
      const next = getNextTopic()
      if (next) {
        setOperation({ code: `${formatModuleCode(next.moduleId)} / T${next.number}`, title: next.title, moduleId: next.moduleId })
      } else {
        setOperation(null)
      }
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () => window.removeEventListener("technieum:progress-changed", refresh)
  }, [trackId])

  const totalTopics = activeCurriculum().reduce((s, m) => s + m.topics.length, 0)
  const totalLabs = activeLabs().length

  return (
    <aside
      className={cn(
        // Refined Light 3D: a frosted glass panel that floats on the canvas,
        // separated by a hairline + layered shadow (glass-strong keeps the
        // text-heavy nav high-contrast). Collapsed rail is 76px per the pack.
        "m-2 flex h-[calc(100%-1rem)] flex-col overflow-hidden rounded-2xl glass-strong text-foreground transition-all duration-300",
        collapsed ? "w-[76px]" : "w-64"
      )}
    >
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-5">
        {collapsed ? <LogoMark /> : <Logo />}
      </div>

      {!collapsed && (
        <Link
          href="/paths"
          onClick={onNavigate}
          className="mx-3 mt-3 flex items-center justify-between rounded-xl glass elev-1 px-3 py-2 transition-colors hover:text-brand-orange"
          title="Switch track"
        >
          <span className="min-w-0">
            <span className="block font-mono text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
              Current track
            </span>
            <span className="block truncate text-sm font-semibold">
              {getActiveTrack().name}
            </span>
          </span>
          <ChevronsRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </Link>
      )}

      <div className="px-3 pt-3">
        {collapsed ? (
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("technieum:open-search"))
            }
            aria-label="Search"
            title="Search (⌘K)"
            className="flex w-full items-center justify-center rounded-xl glass elev-1 py-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="h-4 w-4" />
          </button>
        ) : (
          <SearchTrigger className="flex w-full items-center gap-2 px-3 py-2 text-sm text-muted-foreground shadow-chip transition-colors hover:text-foreground" />
        )}
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        <div>
          {!collapsed && <p className="sharp-section-title px-1 pb-2">Main</p>}
          <ul className="space-y-1.5">
            {MAIN_NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/")
              const badge =
                item.badge === "count-modules" ? totalTopics : item.badge === "count-labs" ? totalLabs : undefined
              return (
                <li key={item.href}>
                  <NavKey
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    active={active}
                    collapsed={collapsed}
                    badge={badge}
                    onNavigate={onNavigate}
                  />
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          {!collapsed && <p className="sharp-section-title px-1 pb-2">Reference</p>}
          <ul className="space-y-1.5">
            {REFERENCE_NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <li key={item.href}>
                  <NavKey
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    active={active}
                    collapsed={collapsed}
                    onNavigate={onNavigate}
                  />
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          {!collapsed && <p className="sharp-section-title px-1 pb-2">System</p>}
          <ul className="space-y-1.5">
            {/* Admin is intentionally not listed — it's a staff-only endpoint
                reachable at /admin, not shown to normal learners. */}
            <li>
              <NavKey
                href="/settings"
                label="Settings"
                icon={Settings}
                active={pathname === "/settings"}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            </li>
          </ul>
        </div>
      </nav>

      {!collapsed && operation && (
        <div className="border-t border-border px-3 py-3">
          <div className="rounded-xl glass elev-1 p-3">
            <p className="sharp-section-title">Current Operation</p>
            <p className="mt-1.5 font-mono text-sm font-bold text-foreground">{operation.code}</p>
            <p className="truncate text-xs text-muted-foreground">{operation.title}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-brand-orange" style={{ width: `${percent}%` }} />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">{percent}%</span>
            </div>
            <Link
              href={`/modules/${operation.moduleId}`}
              onClick={onNavigate}
              className="mt-2 flex items-center gap-1 text-xs font-medium text-brand-orange hover:text-brand-orange-strong"
            >
              Continue learning <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}

      {user && (
        <div className="border-t border-border px-3 py-2.5">
          <button
            onClick={logout}
            title="Sign out"
            className={cn(
              "flex w-full items-center gap-2 px-2 py-1.5 text-left text-muted-foreground transition-colors hover:text-foreground",
              collapsed && "justify-center",
            )}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 font-mono text-[11px] font-bold uppercase text-brand-orange">
              {user.name.slice(0, 1)}
            </span>
            {!collapsed && (
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-medium text-foreground">
                  {user.name}
                </span>
                <span className="block truncate font-mono text-[10px] text-muted-foreground">
                  {user.email}
                </span>
              </span>
            )}
            {!collapsed && <LogOut className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
          </button>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border px-3 py-2.5">
        {/* Outfit/IBM Plex Mono are wider than the faces this replaced, so the
            status line no longer fits on one 10px row. flex-wrap plus
            whitespace-nowrap lets it break BETWEEN the two labels rather than
            mid-word, which is what made it read as clipped. */}
        {!collapsed && (
          <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 font-mono text-[10px] text-muted-foreground">
            <span className="whitespace-nowrap">Technieum OS v2.0.1</span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
              System Online
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden items-center justify-center p-1.5 text-muted-foreground hover:text-foreground md:flex"
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  )
}
