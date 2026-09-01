"use client"

import { useState } from "react"
import { Bookmark, ExternalLink } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
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

export function GlossaryTermCard({
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
    <div
      className={cn(
        "relative space-y-2.5 rounded-xl border border-border bg-card p-5",
        bookmarked && "border-brand-orange/50"
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
    </div>
  )
}
