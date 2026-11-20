"use client"

import { useRef, useState } from "react"
import { Baby, Lightbulb, Loader2, Sparkles, Target, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Markdown } from "@/components/tutor/Markdown"

// On-demand AI explanation for the current concept. One tap rewrites the slide
// for the learner (simpler / example / why it matters). Streams from /api/tutor;
// degrades gracefully (fallback text) until a model backend is configured.

type Angle = "simpler" | "example" | "why"

const ANGLES: { key: Angle; label: string; icon: typeof Baby; q: string }[] = [
  {
    key: "simpler",
    label: "Simpler",
    icon: Baby,
    q: "Explain this concept in the simplest possible terms, as if I'm completely new to it. Use a short everyday analogy. 3 sentences max.",
  },
  {
    key: "example",
    label: "Example",
    icon: Lightbulb,
    q: "Give me one concrete, real-world example of this concept in action. 3 sentences max.",
  },
  {
    key: "why",
    label: "Why it matters",
    icon: Target,
    q: "Why does this matter in security — what can go wrong, and why should I care? 3 sentences max.",
  },
]

export function ExplainMore({
  title,
  body,
}: {
  title: string
  body: string
}) {
  const [active, setActive] = useState<Angle | null>(null)
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  async function ask(angle: (typeof ANGLES)[number]) {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setActive(angle.key)
    setAnswer("")
    setLoading(true)
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "ask",
          question: angle.q,
          topicTitle: title,
          topicContext: `${title}\n\n${body}`,
        }),
        signal: controller.signal,
      })
      if (!res.body) throw new Error("no stream")
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ""
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setAnswer(acc)
      }
      if (!acc) setAnswer("No response.")
    } catch (e) {
      if ((e as Error).name !== "AbortError")
        setAnswer("Couldn't reach the tutor right now. Try again in a moment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          <Sparkles className="h-3 w-3 text-brand-orange" /> Not clear?
        </span>
        {ANGLES.map((a) => {
          const Icon = a.icon
          return (
            <button
              key={a.key}
              type="button"
              onClick={() => ask(a)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all",
                active === a.key
                  ? "border-brand-orange bg-brand-orange/10 text-brand-orange"
                  : "border-border text-muted-foreground hover:border-brand-orange/40 hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {a.label}
            </button>
          )
        })}
      </div>

      {active && (
        <div className="glass mt-2.5 rounded-xl p-3 text-sm">
          <div className="mb-1 flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-brand-orange">
              {ANGLES.find((a) => a.key === active)?.label}
            </span>
            <button
              onClick={() => {
                abortRef.current?.abort()
                setActive(null)
                setAnswer("")
              }}
              aria-label="Close explanation"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          {loading && !answer ? (
            <span className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
            </span>
          ) : (
            <Markdown content={answer} />
          )}
        </div>
      )}
    </div>
  )
}
