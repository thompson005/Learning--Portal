"use client"

// Zero-dependency markdown renderer. Builds React nodes directly — never uses
// dangerouslySetInnerHTML — so raw model output can't inject markup. Supports
// fenced code blocks, inline code, bold, italic, headings, ordered/unordered
// lists, links, paragraphs and line breaks. It tolerates malformed / partial
// markdown (mid-stream tokens) without throwing: unmatched markers render as
// literal text, an unclosed fence renders as a code block of what's arrived.

import { useState, type ReactNode } from "react"
import { Check, Copy } from "lucide-react"

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    try {
      navigator.clipboard?.writeText(code).then(
        () => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        },
        () => {},
      )
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <div className="my-2 overflow-hidden rounded-2xl border border-border bg-muted">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {lang || "code"}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-brand-orange"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-xs leading-relaxed">
        <code className="font-mono text-foreground">{code}</code>
      </pre>
    </div>
  )
}

function safeHref(href: string): string | null {
  const u = href.trim()
  if (/^(https?:|mailto:)/i.test(u)) return u
  if (u.startsWith("/") || u.startsWith("#")) return u
  return null
}

// Earliest-match tokenizer for inline spans. Inline code is matched first so
// markdown inside it stays literal; bold (**) before italic (*) so the greedy
// double-star wins.
const INLINE =
  /(`[^`]+`)|(\*\*[^*]+?\*\*)|(\*[^*]+?\*)|(\[[^\]]+\]\([^)]+\))/

function renderInline(text: string, kp: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let rest = text
  let i = 0
  while (rest.length > 0) {
    const m = INLINE.exec(rest)
    if (!m) {
      nodes.push(rest)
      break
    }
    const idx = m.index
    if (idx > 0) nodes.push(rest.slice(0, idx))
    const tok = m[0]
    const key = `${kp}-${i++}`
    if (tok.startsWith("`")) {
      nodes.push(
        <code
          key={key}
          className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground"
        >
          {tok.slice(1, -1)}
        </code>,
      )
    } else if (tok.startsWith("**")) {
      nodes.push(
        <strong key={key} className="font-semibold">
          {tok.slice(2, -2)}
        </strong>,
      )
    } else if (tok.startsWith("*")) {
      nodes.push(<em key={key}>{tok.slice(1, -1)}</em>)
    } else {
      const lm = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok)
      const href = lm ? safeHref(lm[2]) : null
      if (lm && href) {
        nodes.push(
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-orange underline underline-offset-2 hover:text-brand-orange-strong"
          >
            {lm[1]}
          </a>,
        )
      } else {
        nodes.push(tok)
      }
    }
    rest = rest.slice(idx + tok.length)
  }
  return nodes
}

const HEADING_CLASS: Record<number, string> = {
  1: "text-base font-bold text-foreground mt-1",
  2: "text-sm font-bold text-foreground mt-1",
  3: "text-sm font-semibold text-foreground",
  4: "text-sm font-semibold text-muted-foreground",
  5: "text-xs font-semibold text-muted-foreground",
  6: "text-xs font-semibold text-muted-foreground",
}

const isSpecial = (l: string) =>
  /^```/.test(l) ||
  /^(#{1,6})\s+/.test(l) ||
  /^\s*[-*+]\s+/.test(l) ||
  /^\s*\d+\.\s+/.test(l)

function parse(src: string): ReactNode[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n")
  const out: ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    const fence = /^```(\w+)?\s*$/.exec(line)
    if (fence) {
      const buf: string[] = []
      i++
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        buf.push(lines[i])
        i++
      }
      i++ // skip closing fence (if present)
      out.push(<CodeBlock key={key++} code={buf.join("\n")} lang={fence[1]} />)
      continue
    }

    // Heading
    const h = /^(#{1,6})\s+(.*)$/.exec(line)
    if (h) {
      const level = h[1].length
      const Tag = `h${Math.min(level, 6)}` as "h1"
      out.push(
        <Tag key={key++} className={HEADING_CLASS[level]}>
          {renderInline(h[2], `h${key}`)}
        </Tag>,
      )
      i++
      continue
    }

    // Blank line
    if (line.trim() === "") {
      i++
      continue
    }

    // Unordered list
    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*+]\s+/, ""))
        i++
      }
      const k = key++
      out.push(
        <ul key={k} className="list-disc space-y-1 pl-5">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `ul${k}-${idx}`)}</li>
          ))}
        </ul>,
      )
      continue
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""))
        i++
      }
      const k = key++
      out.push(
        <ol key={k} className="list-decimal space-y-1 pl-5">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `ol${k}-${idx}`)}</li>
          ))}
        </ol>,
      )
      continue
    }

    // Paragraph — gather consecutive plain lines, keep soft line breaks
    const para: string[] = []
    while (i < lines.length && lines[i].trim() !== "" && !isSpecial(lines[i])) {
      para.push(lines[i])
      i++
    }
    const k = key++
    out.push(
      <p key={k} className="leading-relaxed">
        {para.map((pl, idx) => (
          <span key={idx}>
            {idx > 0 && <br />}
            {renderInline(pl, `p${k}-${idx}`)}
          </span>
        ))}
      </p>,
    )
  }

  return out
}

export function Markdown({ content }: { content: string }) {
  return (
    <div className="space-y-2 text-sm text-foreground [overflow-wrap:anywhere]">
      {parse(content)}
    </div>
  )
}
