"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, Bookmark, ExternalLink } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { GlassCard } from "@/components/ui3d/GlassCard"
import { MeshGradient } from "@/components/ui3d/MeshGradient"
import { Reveal } from "@/components/ui3d/Reveal"
import { GLOSSARY, GLOSSARY_CATEGORIES } from "@/lib/data/glossary"
import { getBookmarks, toggleBookmark } from "@/lib/store/bookmarks"
import type { GlossaryTerm } from "@/types"

const CATEGORY_VARIANT: Record<string, "blue" | "purple" | "orange" | "green" | "red" | "teal"> = {
  "Core Concept": "teal",
  "Vulnerability Mgmt": "red",
  "Threat Intel": "purple",
  Hardware: "orange",
  Networking: "blue",
  "Web Security": "green",
  Vulnerability: "red",
  Exploitation: "purple",
  Cryptography: "blue",
  Career: "teal",
  Certification: "orange",
}

// Glass term card — same content and behavior as GlossaryTermCard, on a glass
// `lift` surface. Inlined so the card can be a true glass surface (the shared
// component renders an opaque `bg-card` and is owned elsewhere).
function TermCard({
  term,
  bookmarked,
  onToggleBookmark,
}: {
  term: GlossaryTerm
  bookmarked: boolean
  onToggleBookmark: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const showReadMore = term.definition.length > 80 && !expanded
  const definitionText = showReadMore ? term.definition.slice(0, 80).trimEnd() + "…" : term.definition

  return (
    <GlassCard
      lift
      className={cn(
        "relative h-full space-y-2.5 p-5",
        bookmarked && "ring-1 ring-brand-orange/40"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground">{term.term}</h3>
          <p className="text-xs text-muted-foreground">{term.fullName}</p>
        </div>
        <button onClick={() => onToggleBookmark(term.id)} aria-label="Bookmark term" className="shrink-0">
          <Bookmark className={cn("h-4 w-4", bookmarked ? "fill-brand-orange text-brand-orange" : "text-muted-foreground")} />
        </button>
      </div>

      <Badge variant={CATEGORY_VARIANT[term.category] ?? "blue"} className="font-mono uppercase tracking-wide">
        {term.category}
      </Badge>

      <div className="text-sm">
        {definitionText}{" "}
        {showReadMore && (
          <button onClick={() => setExpanded(true)} className="font-medium text-brand-orange hover:underline">
            Read more
          </button>
        )}
      </div>

      <p className="rounded-md bg-muted px-3 py-2 font-mono text-xs italic text-muted-foreground">
        {term.example}
      </p>

      {term.learnMore && term.learnMore !== "—" && (
        <a
          href={term.learnMore.startsWith("http") ? term.learnMore : `https://${term.learnMore}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-brand-orange hover:underline"
        >
          Learn more <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </GlassCard>
  )
}

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
      <section className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-10">
        <MeshGradient />
        <div className="relative space-y-6">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">Reference</p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Key Terminology</h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
              {GLOSSARY.length} essential terms for beginners in offensive security.
            </p>
          </div>

          <div className="glass rounded-2xl p-4 md:p-5">
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
        </div>
      </section>

      <Reveal as="div" className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((term) => (
          <TermCard
            key={term.id}
            term={term}
            bookmarked={bookmarks.includes(term.id)}
            onToggleBookmark={handleToggleBookmark}
          />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-muted-foreground">No terms match your search.</p>
        )}
      </Reveal>
    </div>
  )
}
