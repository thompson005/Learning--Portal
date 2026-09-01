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
  UserCog,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  ArrowRight,
  LogOut,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth/AuthContext"
import { Logo, LogoMark } from "@/components/shared/Logo"
import { getOverallProgress, getNextTopic } from "@/lib/store/progress"
import { CURRICULUM } from "@/lib/data/curriculum"
import { LABS } from "@/lib/data/labs"

const MAIN_NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/plan", label: "Roadmap", icon: CalendarDays },
  { href: "/modules", label: "Modules", icon: BookOpen, badge: "count-modules" as const },
  { href: "/labs", label: "Labs", icon: FlaskConical, badge: "count-labs" as const },
  { href: "/progress", label: "Progress", icon: LineChart },
]

const REFERENCE_NAV = [{ href: "/glossary", label: "Glossary", icon: Library }]

function formatModuleCode(moduleId: string) {
  const m = moduleId.match(/^m(\d+)/)
  return m ? `M${m[1].padStart(2, "0")}` : moduleId.toUpperCase()
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
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
  }, [])

  const totalTopics = CURRICULUM.reduce((s, m) => s + m.topics.length, 0)
  const totalLabs = LABS.length

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-brand-ink text-white transition-all duration-300",
        collapsed ? "w-[76px]" : "w-64"
      )}
    >
      <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-5">
        {collapsed ? <LogoMark /> : <Logo wordmarkClassName="text-white" />}
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-2 py-4">
        <div>
          {!collapsed && (
            <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/35">Main</p>
          )}
          <ul className="space-y-0.5">
            {MAIN_NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/")
              const Icon = item.icon
              const badge = item.badge === "count-modules" ? totalTopics : item.badge === "count-labs" ? totalLabs : undefined
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-3 rounded-md border-l-2 px-2.5 py-2 text-sm font-medium transition-colors",
                      active
                        ? "border-brand-orange bg-brand-orange/10 text-brand-orange"
                        : "border-transparent text-white/65 hover:bg-white/5 hover:text-white"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span className="flex-1">{item.label}</span>}
                    {!collapsed && !!badge && (
                      <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/55">
                        {badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          {!collapsed && (
            <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/35">Reference</p>
          )}
          <ul className="space-y-0.5">
            {REFERENCE_NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/")
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-3 rounded-md border-l-2 px-2.5 py-2 text-sm font-medium transition-colors",
                      active
                        ? "border-brand-orange bg-brand-orange/10 text-brand-orange"
                        : "border-transparent text-white/65 hover:bg-white/5 hover:text-white"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          {!collapsed && (
            <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/35">System</p>
          )}
          <ul className="space-y-0.5">
            <li>
              <Link
                href="/admin"
                onClick={onNavigate}
                className="flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white"
                title={collapsed ? "Admin" : undefined}
              >
                <UserCog className="h-4 w-4 shrink-0" />
                {!collapsed && <span>Admin</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white",
                  pathname === "/settings" && "bg-brand-orange/10 text-brand-orange"
                )}
                title={collapsed ? "Settings" : undefined}
              >
                <Settings className="h-4 w-4 shrink-0" />
                {!collapsed && <span>Settings</span>}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {!collapsed && operation && (
        <div className="border-t border-white/10 px-3 py-3">
          <div className="rounded-lg border border-white/10 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">Current Operation</p>
            <p className="mt-1.5 font-mono text-sm font-bold text-white">{operation.code}</p>
            <p className="truncate text-xs text-white/60">{operation.title}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-brand-orange" style={{ width: `${percent}%` }} />
              </div>
              <span className="font-mono text-[10px] text-white/50">{percent}%</span>
            </div>
            <Link
              href={`/modules/${operation.moduleId}`}
              onClick={onNavigate}
              className="mt-2 flex items-center gap-1 text-xs font-medium text-brand-orange hover:underline"
            >
              Continue learning <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}

      {user && (
        <div className="border-t border-white/10 px-3 py-2.5">
          <button
            onClick={logout}
            title="Sign out"
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-white/65 transition-colors hover:bg-white/5 hover:text-white",
              collapsed && "justify-center",
            )}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange/20 font-mono text-[11px] font-bold uppercase text-brand-orange">
              {user.name.slice(0, 1)}
            </span>
            {!collapsed && (
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-medium">
                  {user.name}
                </span>
                <span className="block truncate font-mono text-[10px] text-white/40">
                  {user.email}
                </span>
              </span>
            )}
            {!collapsed && <LogOut className="h-3.5 w-3.5 shrink-0 text-white/40" />}
          </button>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-white/10 px-3 py-2.5">
        {!collapsed && (
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/35">
            <span>Technieum OS v2.0.1</span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span>System Online</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="hidden items-center justify-center rounded-md p-1.5 text-white/40 hover:bg-white/5 hover:text-white/80 md:flex"
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  )
}
