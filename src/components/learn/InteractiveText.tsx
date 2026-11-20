"use client"

import { Fragment, useMemo, useState } from "react"

import { cn } from "@/lib/utils"
import { GLOSSARY } from "@/lib/data/glossary"
import type { GlossaryTerm } from "@/types"

// ---------------------------------------------------------------------------
// InteractiveText — turns a plain content string into interactive reading:
//   **bold**  *italic*  `code`  ||click-to-reveal||  [[explicit term]]
// and auto-links any known glossary term to a hover/tap definition tooltip.
// Zero dependencies. Safe on every existing topic body with no re-authoring.
// ---------------------------------------------------------------------------

/** term (lowercased) -> GlossaryTerm. Includes the term itself and its acronym. */
const TERM_INDEX: Map<string, GlossaryTerm> = (() => {
  const map = new Map<string, GlossaryTerm>()
  for (const t of GLOSSARY) {
    const keys = new Set<string>([t.term.toLowerCase()])
    // If the fullName is an expansion, also index the short term only (already have it).
    map.set(t.term.toLowerCase(), t)
    for (const k of keys) if (!map.has(k)) map.set(k, t)
  }
  return map
})()

// Longest terms first so "CIA Triad" wins over "CIA".
const SORTED_TERMS = Array.from(TERM_INDEX.keys()).sort(
  (a, b) => b.length - a.length,
)

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

// One regex matching any known term on a word boundary.
const TERM_RE = SORTED_TERMS.length
  ? new RegExp(`\\b(${SORTED_TERMS.map(escapeRe).join("|")})\\b`, "gi")
  : null

function GlossaryTooltip({
  label,
  term,
}: {
  label: string
  term: GlossaryTerm
}) {
  return (
    <span className="group/term relative inline">
      <button
        type="button"
        tabIndex={0}
        className="cursor-help rounded-sm font-medium text-brand-orange underline decoration-brand-orange/40 decoration-dotted underline-offset-2 outline-none transition-colors hover:text-brand-orange-strong focus-visible:ring-2 focus-visible:ring-brand-orange/40"
        aria-label={`${term.term}: ${term.definition}`}
      >
        {label}
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-50 w-64 -translate-x-1/2 scale-95 rounded-xl border border-border bg-card p-3 text-left opacity-0 shadow-lift transition-all duration-150 group-hover/term:scale-100 group-hover/term:opacity-100 group-focus-within/term:scale-100 group-focus-within/term:opacity-100"
      >
        <span className="block font-mono text-[10px] font-semibold uppercase tracking-widest text-brand-orange">
          {term.term}
          {term.fullName && term.fullName !== term.term ? (
            <span className="ml-1 normal-case tracking-normal text-muted-foreground">
              — {term.fullName}
            </span>
          ) : null}
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-foreground">
          {term.definition}
        </span>
        {term.example && (
          <span className="mt-1.5 block border-t border-border pt-1.5 text-[11px] leading-relaxed text-muted-foreground">
            {term.example}
          </span>
        )}
      </span>
    </span>
  )
}

function Reveal({ children }: { children: React.ReactNode }) {
  const [shown, setShown] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setShown(true)}
      aria-label={shown ? undefined : "Reveal hidden text"}
      className={cn(
        "rounded-md px-1 align-baseline transition-all",
        shown
          ? "bg-brand-orange/[0.07] text-foreground"
          : "select-none bg-foreground/10 text-transparent blur-[3px] hover:bg-foreground/15",
      )}
    >
      {children}
    </button>
  )
}

/** Auto-link glossary terms inside a plain text run. First hit per term id only. */
function linkTerms(text: string, used: Set<string>, keyBase: string) {
  if (!TERM_RE) return text
  TERM_RE.lastIndex = 0
  const out: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = TERM_RE.exec(text)) !== null) {
    const term = TERM_INDEX.get(m[0].toLowerCase())
    if (!term || used.has(term.id)) continue
    used.add(term.id)
    if (m.index > last) out.push(text.slice(last, m.index))
    out.push(
      <GlossaryTooltip key={`${keyBase}-t${i++}`} label={m[0]} term={term} />,
    )
    last = m.index + m[0].length
  }
  if (out.length === 0) return text
  if (last < text.length) out.push(text.slice(last))
  return out
}

// Inline markdown: **bold** *italic* `code`. Returns nodes; recurses for nesting-lite.
function renderInline(
  text: string,
  used: Set<string>,
  keyBase: string,
): React.ReactNode {
  const nodes: React.ReactNode[] = []
  // token regex for bold / code / italic
  const re = /(\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last)
      nodes.push(
        <Fragment key={`${keyBase}-p${i}`}>
          {linkTerms(text.slice(last, m.index), used, `${keyBase}-p${i}`)}
        </Fragment>,
      )
    if (m[2] !== undefined) {
      nodes.push(
        <strong key={`${keyBase}-b${i}`} className="font-semibold text-foreground">
          {linkTerms(m[2], used, `${keyBase}-b${i}`)}
        </strong>,
      )
    } else if (m[3] !== undefined) {
      nodes.push(
        <code
          key={`${keyBase}-c${i}`}
          className="rounded-[4px] bg-muted px-1 py-0.5 font-mono text-[0.85em] text-brand-orange-strong"
        >
          {m[3]}
        </code>,
      )
    } else if (m[4] !== undefined) {
      nodes.push(
        <em key={`${keyBase}-i${i}`} className="italic">
          {linkTerms(m[4], used, `${keyBase}-i${i}`)}
        </em>,
      )
    }
    last = m.index + m[0].length
    i++
  }
  if (last < text.length)
    nodes.push(
      <Fragment key={`${keyBase}-pz`}>
        {linkTerms(text.slice(last), used, `${keyBase}-pz`)}
      </Fragment>,
    )
  return nodes
}

export function InteractiveText({
  text,
  className,
  glossary = true,
}: {
  text: string
  className?: string
  /** Set false to skip glossary auto-linking (e.g. short labels). */
  glossary?: boolean
}) {
  const content = useMemo(() => {
    // Track used term ids so a term is only linked on its first appearance.
    // When glossary is off, pre-fill with every id so nothing auto-links.
    const used = glossary
      ? new Set<string>()
      : new Set<string>(GLOSSARY.map((t) => t.id))
    // Split on ||reveal|| spans first.
    const parts = text.split(/(\|\|[^|]+\|\|)/g)
    return parts.map((part, idx) => {
      const rev = part.match(/^\|\|([^|]+)\|\|$/)
      if (rev) {
        return (
          <Reveal key={`r${idx}`}>
            {renderInline(rev[1], used, `r${idx}`)}
          </Reveal>
        )
      }
      return (
        <Fragment key={`s${idx}`}>{renderInline(part, used, `s${idx}`)}</Fragment>
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, glossary])

  return <span className={className}>{content}</span>
}
