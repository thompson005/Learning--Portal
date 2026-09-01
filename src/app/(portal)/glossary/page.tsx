"use client"

import { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { GlossaryTermCard } from "@/components/glossary/GlossaryTermCard"
import { GLOSSARY, GLOSSARY_CATEGORIES } from "@/lib/data/glossary"
import { getBookmarks, toggleBookmark } from "@/lib/store/bookmarks"

export default function GlossaryPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<string | null>(null)
  const [bookmarks, setBookmarks] = useState<string[]>([])

  useEffect(() => {
    setBookmarks(getBookmarks())
  }, [])

  function handleToggleBookmark(id: string) {
    setBookmarks(toggleBookmark(id))
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return GLOSSARY.filter((t) => {
      if (category && t.category !== category) return false
      if (!q) return true
      return (
        t.term.toLowerCase().includes(q) ||
        t.fullName.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
      )
    }).sort((a, b) => {
      const aBookmarked = bookmarks.includes(a.id)
      const bBookmarked = bookmarks.includes(b.id)
      if (aBookmarked && !bBookmarked) return -1
      if (!aBookmarked && bBookmarked) return 1
      return a.term.localeCompare(b.term)
    })
  }, [query, category, bookmarks])

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">Reference</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground">Key Terminology</h1>
        <p className="mt-2 text-sm text-muted-foreground">{GLOSSARY.length} essential terms for beginners in offensive security.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Search &amp; Filter
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms, acronyms, definitions..."
            className="pl-9 focus-visible:ring-brand-orange"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setCategory(null)}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-xs font-medium transition-colors",
              category === null
                ? "border-brand-orange bg-brand-orange/10 text-brand-orange"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            All
          </button>
          {GLOSSARY_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c === category ? null : c)}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-xs font-medium transition-colors",
                category === c
                  ? "border-brand-orange bg-brand-orange/10 text-brand-orange"
                  : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((term) => (
          <GlossaryTermCard
            key={term.id}
            term={term}
            bookmarked={bookmarks.includes(term.id)}
            onToggleBookmark={handleToggleBookmark}
          />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-muted-foreground">No terms match your search.</p>
        )}
      </div>
    </div>
  )
}
