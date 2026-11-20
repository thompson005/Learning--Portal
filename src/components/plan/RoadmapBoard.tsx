"use client"

import { Fragment, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Check, ChevronRight, MapPin, Flag } from "lucide-react"

import { getModuleCompletionPercent } from "@/lib/store/progress"
import { activeCurriculum, activeLabs, getActiveTrack } from "@/lib/data/tracks/registry"
import { useActiveTrackId } from "@/lib/data/tracks/useTrack"
import { Reveal } from "@/components/ui3d/Reveal"
import { cn } from "@/lib/utils"

const PHASE_STYLE: Record<number, { text: string; dot: string; border: string; soft: string }> = {
  1: { text: "text-brand-green", dot: "bg-brand-green", border: "border-brand-green/40", soft: "bg-brand-green/10" },
  2: { text: "text-brand-orange", dot: "bg-brand-orange", border: "border-brand-orange/40", soft: "bg-brand-orange/10" },
  3: { text: "text-brand-blue", dot: "bg-brand-blue", border: "border-brand-blue/40", soft: "bg-brand-blue/10" },
  4: { text: "text-brand-purple", dot: "bg-brand-purple", border: "border-brand-purple/40", soft: "bg-brand-purple/10" },
}

function moduleCode(id: string) {
  const m = id.match(/m(\d+)/)
  return m ? `M${m[1].padStart(2, "0")}` : id.toUpperCase()
}

export function RoadmapBoard() {
  const trackId = useActiveTrackId()
  const [percents, setPercents] = useState<Record<string, number>>({})

  useEffect(() => {
    function refresh() {
      const next: Record<string, number> = {}
      for (const m of activeCurriculum()) next[m.id] = getModuleCompletionPercent(m.id)
      setPercents(next)
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () =>
      window.removeEventListener("technieum:progress-changed", refresh)
  }, [trackId])

  const PHASES = getActiveTrack().phases.map((p) => ({
    month: p.month,
    name: p.name,
    ...(PHASE_STYLE[p.month] ?? PHASE_STYLE[1]),
  }))

  const currentId = useMemo(() => {
    for (const m of activeCurriculum()) if ((percents[m.id] ?? 0) < 100) return m.id
    return null
  }, [percents, trackId])

  return (
    <div className="overflow-x-auto pb-3">
      <div className="flex min-w-max items-stretch gap-2">
        {PHASES.map((phase, pi) => {
          const mods = activeCurriculum().filter((m) => m.month === phase.month)
          const done = mods.filter((m) => (percents[m.id] ?? 0) === 100).length
          return (
            <Fragment key={phase.month}>
              <div className="flex w-[250px] shrink-0 flex-col">
                {/* Phase header */}
                <div className="glass mb-3 rounded-2xl p-3">
                  <div className="flex items-center gap-2">
                    <span className={cn("flex h-6 w-6 items-center justify-center rounded-lg text-white", phase.dot)}>
                      <span className="font-mono text-[11px] font-bold">
                        {phase.month}
                      </span>
                    </span>
                    <span className={cn("font-mono text-[10px] font-semibold uppercase tracking-widest", phase.text)}>
                      Phase {phase.month}
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                      {done}/{mods.length}
                    </span>
                  </div>
                  <p className="mt-1.5 font-display text-sm font-semibold text-foreground">
                    {phase.name}
                  </p>
                </div>

                {/* Module nodes, stacked and spine-connected */}
                <div className="relative flex flex-col gap-2">
                  {mods.map((mod, mi) => {
                    const percent = percents[mod.id] ?? 0
                    const status =
                      percent === 100 ? "done" : percent > 0 ? "active" : "todo"
                    const isCurrent = mod.id === currentId
                    const labs = activeLabs().filter((l) => l.moduleId === mod.id).length
                    return (
                      <Reveal
                        key={mod.id}
                        as="div"
                        delay={Math.min(pi * 90 + mi * 60, 420)}
                      >
                      <Link
                        href={`/modules/${mod.id}`}
                        title={mod.outcomes[0]}
                        className={cn(
                          "glass lift group relative block rounded-2xl p-3",
                          isCurrent && "ring-2 ring-brand-orange/40",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[10px] font-bold",
                              status === "done" && "border-brand-green bg-brand-green text-white",
                              status === "active" && "border-brand-orange bg-brand-orange/10 text-brand-orange",
                              status === "todo" && "border-border bg-card text-muted-foreground",
                            )}
                          >
                            {status === "done" ? (
                              <Check className="h-3.5 w-3.5" />
                            ) : (
                              moduleCode(mod.id)
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-xs font-semibold text-foreground">
                              {mod.shortName}
                            </span>
                            <span className="block truncate font-mono text-[10px] text-muted-foreground">
                              {mod.topics.length}T · {labs}L
                            </span>
                          </span>
                        </div>
                        {isCurrent && (
                          <span className="absolute -top-1.5 -right-1.5 inline-flex items-center gap-0.5 rounded-full bg-brand-orange px-1.5 py-0.5 text-[9px] font-semibold text-white shadow-chip">
                            <MapPin className="h-2.5 w-2.5" /> here
                          </span>
                        )}
                        {/* mini progress */}
                        <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              status === "done" ? "bg-brand-green" : "bg-brand-orange",
                            )}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </Link>
                      </Reveal>
                    )
                  })}
                </div>
              </div>

              {/* Connector between phases */}
              {pi < PHASES.length - 1 && (
                <div className="flex w-8 shrink-0 items-center justify-center pt-16">
                  <ChevronRight className="h-6 w-6 text-muted-foreground/50" />
                </div>
              )}
            </Fragment>
          )
        })}

        {/* Finish */}
        <div className="flex w-8 shrink-0 items-center justify-center pt-16">
          <ChevronRight className="h-6 w-6 text-muted-foreground/50" />
        </div>
        <div className="elev-2 flex w-[160px] shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-ember p-4 text-center text-white">
          <Flag className="h-6 w-6" />
          <p className="mt-2 font-display text-sm font-semibold">
            Apex Operator
          </p>
          <p className="mt-0.5 text-[11px] text-white/80">
            Programme complete
          </p>
        </div>
      </div>
    </div>
  )
}
