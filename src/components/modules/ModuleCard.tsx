"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, BookOpen, FlaskConical } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/shared/ProgressBar"
import { GlassCard } from "@/components/ui3d/GlassCard"
import { getModuleCompletionPercent } from "@/lib/store/progress"
import type { Module } from "@/types"

const MONTH_COLOR = {
  1: { badge: "green", bar: "green", hex: "#22c55e", phase: "Foundations" },
  2: {
    badge: "orange",
    bar: "orange",
    hex: "#f0793a",
    phase: "Core Offensive Skills",
  },
  3: {
    badge: "blue",
    bar: "blue",
    hex: "#94a3b8",
    phase: "Exploitation + Reporting",
  },
  4: {
    badge: "purple",
    bar: "purple",
    hex: "#eab308",
    phase: "Advanced Offensive Security",
  },
} as const

function formatModuleNumber(moduleId: string) {
  const m = moduleId.match(/^m(\d+)/)
  return m ? m[1].padStart(2, "0") : "00"
}

export function ModuleCard({
  module,
  labCount,
}: {
  module: Module
  labCount: number
}) {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    function refresh() {
      setPercent(getModuleCompletionPercent(module.id))
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () =>
      window.removeEventListener("technieum:progress-changed", refresh)
  }, [module.id])

  const colors = MONTH_COLOR[module.month]

  return (
    <GlassCard
      lift
      className="relative flex h-full flex-col gap-3 overflow-hidden p-5 pl-6"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px]"
        style={{ background: colors.hex }}
      />

      <div className="flex items-start justify-between gap-2">
        <span className="font-display text-3xl font-semibold leading-none text-brand-orange">
          {formatModuleNumber(module.id)}
        </span>
        <div className="flex flex-col items-end gap-1.5">
          <Badge variant={colors.badge}>{colors.phase}</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold leading-tight text-foreground">
          {module.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
          {module.description}
        </p>
      </div>

      <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <BookOpen className="h-3.5 w-3.5" /> {module.topics.length} topics
        </span>
        <span className="flex items-center gap-1">
          <FlaskConical className="h-3.5 w-3.5" /> {labCount} labs
        </span>
      </div>

      <div>
        <div className="mb-1 flex justify-between font-mono text-[11px] text-muted-foreground">
          <span>Progress</span>
          <span>{percent}%</span>
        </div>
        <ProgressBar value={percent} color={colors.bar} />
      </div>

      <Button
        asChild
        variant={percent > 0 ? "outline" : "teal"}
        className="mt-auto w-full justify-between"
      >
        <Link href={`/modules/${module.id}`}>
          {percent === 0 ? "Start" : percent === 100 ? "Review" : "Continue"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </GlassCard>
  )
}
