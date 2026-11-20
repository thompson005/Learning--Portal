"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, ShieldCheck } from "lucide-react"

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/layout/Sidebar"

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/plan": "Roadmap",
  "/modules": "Modules",
  "/labs": "Labs Tracker",
  "/progress": "My Progress",
  "/glossary": "Glossary",
  "/manager": "Manager View",
  "/settings": "Settings",
}

function pageTitle(pathname: string): string {
  if (TITLES[pathname]) return TITLES[pathname]
  const base = "/" + pathname.split("/")[1]
  return TITLES[base] ?? "Technieum"
}

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="flex h-14 items-center justify-between glass elev-1 px-4 md:hidden">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-brand-orange" />
        <span className="font-mono text-sm font-bold tracking-wide">TECHNIEUM</span>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            aria-label="Open navigation menu"
            className="rounded-xl glass elev-1 p-2 text-foreground lift"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Navigation menu</SheetTitle>
          <Sidebar onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </header>
  )
}

export function pageTitleFor(pathname: string) {
  return pageTitle(pathname)
}
