"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import {
  BookOpen,
  FlaskConical,
  LayoutDashboard,
  CalendarDays,
  LineChart,
  Library,
  Settings,
  Search,
} from "lucide-react"

import { CURRICULUM } from "@/lib/data/curriculum"
import { LABS } from "@/lib/data/labs"

type Item = {
  id: string
  label: string
  hint: string
  href: string
  group: "Pages" | "Modules" | "Topics" | "Labs"
}

const PAGES: { label: string; href: string; icon: typeof Search }[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Roadmap", href: "/plan", icon: CalendarDays },
  { label: "Modules", href: "/modules", icon: BookOpen },
  { label: "Labs", href: "/labs", icon: FlaskConical },
  { label: "Progress", href: "/progress", icon: LineChart },
  { label: "Glossary", href: "/glossary", icon: Library },
  { label: "Settings", href: "/settings", icon: Settings },
]

const GROUP_ICON = {
  Pages: Search,
  Modules: BookOpen,
  Topics: BookOpen,
  Labs: FlaskConical,
} as const

export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // Global ⌘K / Ctrl+K, plus a custom event any button can dispatch.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    function onOpen() {
      setOpen(true)
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("technieum:open-search", onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("technieum:open-search", onOpen)
    }
  }, [])

  const items = useMemo<Item[]>(() => {
    const out: Item[] = []
    for (const p of PAGES) {
      out.push({ id: `page:${p.href}`, label: p.label, hint: "Page", href: p.href, group: "Pages" })
    }
    for (const m of CURRICULUM) {
      out.push({
        id: `mod:${m.id}`,
        label: m.name,
        hint: m.shortName,
        href: `/modules/${m.id}`,
        group: "Modules",
      })
      for (const t of m.topics) {
        out.push({
          id: `topic:${t.id}`,
          label: t.title,
          hint: `${m.shortName} · Topic ${t.number}`,
          href: `/modules/${m.id}?topic=${t.id}`,
          group: "Topics",
        })
      }
    }
    for (const l of LABS) {
      out.push({
        id: `lab:${l.id}`,
        label: l.title,
        hint: `Lab ${l.number} · ${l.difficulty}`,
        href: `/labs?lab=${l.id}`,
        group: "Labs",
      })
    }
    return out
  }, [])

  const grouped = useMemo(() => {
    const g: Record<Item["group"], Item[]> = { Pages: [], Modules: [], Topics: [], Labs: [] }
    for (const it of items) g[it.group].push(it)
    return g
  }, [items])

  function go(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Search the portal"
      className="fixed left-1/2 top-[12vh] z-50 w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-popover shadow-lift"
      // cmdk renders its own overlay via Radix Dialog
    >
      <div className="flex items-center gap-2 border-b border-border px-4">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <Command.Input
          placeholder="Search topics, labs, modules, pages…"
          className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
          ESC
        </kbd>
      </div>

      <Command.List className="max-h-[55vh] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-8 text-center text-sm text-muted-foreground">
          Nothing matches that.
        </Command.Empty>

        {(Object.keys(grouped) as Item["group"][]).map((group) => {
          const rows = grouped[group]
          if (rows.length === 0) return null
          const Icon = GROUP_ICON[group]
          return (
            <Command.Group
              key={group}
              heading={group}
              className="px-1 pb-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted-foreground"
            >
              {rows.map((it) => (
                <Command.Item
                  key={it.id}
                  value={`${it.label} ${it.hint}`}
                  onSelect={() => go(it.href)}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground data-[selected=true]:bg-brand-orange/10 data-[selected=true]:text-brand-orange"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1 truncate">{it.label}</span>
                  <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                    {it.hint}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>
          )
        })}
      </Command.List>
    </Command.Dialog>
  )
}

/** A button that opens the palette, for places a keyboard shortcut isn't obvious. */
export function SearchTrigger({ className }: { className?: string }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("technieum:open-search"))}
      className={className}
      aria-label="Search"
    >
      <Search className="h-4 w-4 shrink-0" />
      <span className="flex-1 text-left">Search</span>
      <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
        ⌘K
      </kbd>
    </button>
  )
}
