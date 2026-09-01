"use client"

import { useState } from "react"
import { Lightbulb } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function HintList({ hints }: { hints: string[] }) {
  const [revealed, setRevealed] = useState(0)

  return (
    <div className="space-y-2 rounded-lg border border-brand-orange/25 bg-brand-orange/[0.04] p-3">
      <p className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-brand-orange">
        <Lightbulb className="h-3.5 w-3.5" /> Stuck? Hints ({revealed}/
        {hints.length})
      </p>
      <div className="space-y-2">
        {hints.slice(0, Math.max(revealed, 0)).map((hint, i) => (
          <div
            key={i}
            className="animate-in fade-in slide-in-from-top-2 flex gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm duration-500 [animation-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none"
          >
            <span className="shrink-0 font-mono text-xs font-semibold text-brand-orange">
              {i + 1}.
            </span>
            <span className="text-foreground">{hint}</span>
          </div>
        ))}
      </div>
      {revealed < hints.length && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setRevealed((r) => r + 1)}
          className={cn(
            "border-brand-orange/40 text-brand-orange hover:bg-brand-orange/10 hover:text-brand-orange",
          )}
        >
          <Lightbulb className="h-3.5 w-3.5" />
          {revealed === 0 ? "Reveal hint 1" : `Reveal hint ${revealed + 1}`}
        </Button>
      )}
    </div>
  )
}
