"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Target,
  BrainCircuit,
  Cloud,
  BookOpen,
  FlaskConical,
  Layers,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react"

import { TRACKS, setActiveTrackId, type Track } from "@/lib/data/tracks/registry"
import { getProgress } from "@/lib/store/progress"
import { cn } from "@/lib/utils"
import { MeshGradient } from "@/components/ui3d/MeshGradient"
import { GlassCard } from "@/components/ui3d/GlassCard"
import { TiltCard } from "@/components/ui3d/TiltCard"
import { Reveal } from "@/components/ui3d/Reveal"

const META: Record<string, { icon: LucideIcon; banner: string; level: string }> = {
  cyber: { icon: Target, banner: "from-orange-500 to-amber-600", level: "Core path" },
  ai: { icon: BrainCircuit, banner: "from-violet-500 to-fuchsia-600", level: "New" },
  cloud: { icon: Cloud, banner: "from-sky-500 to-blue-600", level: "New" },
}

function trackStats(track: Track) {
  const p = getProgress()
  const topics = track.curriculum.flatMap((m) => m.topics)
  const topicsDone = topics.filter((t) => p.topics[t.id]?.status === "completed").length
  const labsDone = track.labs.filter((l) => p.labs[l.id]?.status === "completed").length
  const total = topics.length + track.labs.length
  const done = topicsDone + labsDone
  return {
    modules: track.curriculum.length,
    topics: topics.length,
    labs: track.labs.length,
    percent: total ? Math.round((done / total) * 100) : 0,
    started: done > 0,
  }
}

export default function PathsPage() {
  const router = useRouter()
  const [, force] = useState(0)

  useEffect(() => {
    const h = () => force((n) => n + 1)
    window.addEventListener("technieum:progress-changed", h)
    return () => window.removeEventListener("technieum:progress-changed", h)
  }, [])

  function openPath(id: string) {
    setActiveTrackId(id)
    router.push("/plan")
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-10">
        <MeshGradient />
        <div className="relative max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Choose your track
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Learning Paths
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Each path is a full course with its own roadmap, modules, labs and
            quizzes. Pick one to follow its path start to finish — your progress
            is tracked separately for each.
          </p>
        </div>
      </section>

      {/* Track cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {TRACKS.map((track, i) => {
          const meta = META[track.id] ?? META.cyber
          const Icon = meta.icon
          const s = trackStats(track)
          return (
            <Reveal key={track.id} delay={i * 80}>
              <TiltCard className="h-full">
                <GlassCard lift className="h-full overflow-hidden p-0">
                  <button
                    onClick={() => openPath(track.id)}
                    className="group flex h-full w-full flex-col text-left focus:outline-none"
                  >
                    {/* Gradient banner — the card's accent header */}
                    <div className={cn("relative h-28 bg-gradient-to-br p-5", meta.banner)}>
                      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-20" />
                      <div className="relative flex items-start justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur">
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="rounded-full bg-white/20 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                          {s.percent === 100 ? "Complete" : meta.level}
                        </span>
                      </div>
                      <p className="relative mt-3 font-display text-lg font-semibold text-white">
                        {track.name}
                      </p>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {track.blurb}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Layers className="h-3.5 w-3.5" /> {s.modules} modules
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" /> {s.topics} topics
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <FlaskConical className="h-3.5 w-3.5" /> {s.labs} labs
                        </span>
                      </div>

                      {/* Progress */}
                      <div className="mt-5">
                        <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                          <span>{s.started ? "In progress" : "Not started"}</span>
                          <span>{s.percent}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-brand-orange transition-[width] duration-500"
                            style={{ width: `${s.percent}%` }}
                          />
                        </div>
                      </div>

                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange">
                        {s.percent === 100 ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" /> Review path
                          </>
                        ) : s.started ? (
                          <>
                            Continue path{" "}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </>
                        ) : (
                          <>
                            Explore path{" "}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </>
                        )}
                      </span>
                    </div>
                  </button>
                </GlassCard>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
