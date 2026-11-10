"use client"

import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Download, Upload, RotateCcw } from "lucide-react"
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ProgressRing } from "@/components/dashboard/ProgressRing"
import { WeeklyActivity } from "@/components/dashboard/WeeklyActivity"
import {
  getOverallProgress,
  getMonthlyBarData,
  getModuleHeatmapData,
  getLabDifficultyBreakdown,
  getTopicTypeBreakdown,
  getWeeklyActivityData,
  exportProgress,
  importProgress,
  resetProgress,
} from "@/lib/store/progress"

const MONTH_HEATMAP_COLOR: Record<1 | 2 | 3 | 4, string> = {
  1: "bg-brand-green",
  2: "bg-brand-orange",
  3: "bg-brand-blue",
  4: "bg-brand-purple",
}

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "hsl(var(--sev-low))",
  medium: "hsl(var(--sev-high))",
  hard: "hsl(var(--sev-critical))",
}
const TYPE_COLORS: Record<string, string> = {
  theory: "hsl(var(--sev-info))",
  lab: "hsl(var(--sev-medium))",
  setup: "hsl(var(--sev-high))",
  exercise: "hsl(var(--sev-low))",
}

export default function ProgressPage() {
  const [overall, setOverall] = useState(() => getOverallProgress())
  const [monthly, setMonthly] = useState(() => getMonthlyBarData())
  const [heatmap, setHeatmap] = useState(() => getModuleHeatmapData())
  const [difficulty, setDifficulty] = useState(() => getLabDifficultyBreakdown())
  const [typeBreakdown, setTypeBreakdown] = useState(() => getTopicTypeBreakdown())
  const [weekly, setWeekly] = useState(() => getWeeklyActivityData())
  const [resetOpen, setResetOpen] = useState(false)
  const [resetConfirmStep, setResetConfirmStep] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function refresh() {
      setOverall(getOverallProgress())
      setMonthly(getMonthlyBarData())
      setHeatmap(getModuleHeatmapData())
      setDifficulty(getLabDifficultyBreakdown())
      setTypeBreakdown(getTopicTypeBreakdown())
      setWeekly(getWeeklyActivityData())
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () => window.removeEventListener("technieum:progress-changed", refresh)
  }, [])

  function handleExport() {
    const json = exportProgress()
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `technieum-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Progress exported")
  }

  function handleImportClick() {
    fileInputRef.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        importProgress(reader.result as string)
        toast.success("Progress imported")
      } catch {
        toast.error("Invalid progress file")
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }

  function handleReset() {
    if (resetConfirmStep === 0) {
      setResetConfirmStep(1)
      return
    }
    resetProgress()
    setResetOpen(false)
    setResetConfirmStep(0)
    toast.success("Progress reset")
  }

  const pieData = difficulty.map((d) => ({ name: d.difficulty, completed: d.completed, remaining: d.remaining }))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Progress Report
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground">My Progress</h1>
          <p className="mt-1 text-sm text-muted-foreground">Full breakdown of your journey through the programme.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleImportClick}>
            <Upload className="h-4 w-4" /> Import
          </Button>
          <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleFileChange} />
          <Button variant="destructive" size="sm" onClick={() => setResetOpen(true)}>
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="flex items-center justify-center lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-3 p-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Overall Completion
            </p>
            <ProgressRing value={overall.percentComplete} size={160} label="Complete" gradient />
            <p className="text-xs text-muted-foreground">
              {overall.topicsCompleted + overall.labsCompleted} of {overall.topicsTotal + overall.labsTotal} items done
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Month-by-Month Completion
            </CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[0, 0, 0, 0]} name="Completed" />
                <Bar dataKey="total" fill="hsl(var(--muted-foreground) / 0.25)" radius={[0, 0, 0, 0]} name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Module Completion Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
            {/* The completion fade belongs to the FILL, not the tile. Applied
                to the whole element it faded the label too, so an untouched
                month rendered white text at 0.25 alpha — 2.3:1, unreadable.
                The fill layer carries the opacity now. */}
            {heatmap.map((m) => (
              <div
                key={m.id}
                className="relative flex aspect-square flex-col items-center justify-center rounded-xl p-2 text-center text-foreground"
                title={`${m.shortName}: ${m.percent}%`}
              >
                <span
                  aria-hidden
                  className={`${MONTH_HEATMAP_COLOR[m.month]} absolute inset-0 rounded-xl`}
                  style={{ opacity: 0.25 + (m.percent / 100) * 0.75 }}
                />
                <span className="relative text-[10px] font-medium leading-tight">{m.shortName}</span>
                <span className="relative font-display text-sm font-bold">{m.percent}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyActivity data={weekly} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Lab Difficulty Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="completed"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={2}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={DIFFICULTY_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Topic Type Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={typeBreakdown} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <XAxis dataKey="type" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
              />
              <Bar dataKey="completed" radius={[0, 0, 0, 0]} name="Completed">
                {typeBreakdown.map((entry) => (
                  <Cell key={entry.type} fill={TYPE_COLORS[entry.type]} />
                ))}
              </Bar>
              <Bar dataKey="total" fill="hsl(var(--muted-foreground) / 0.25)" radius={[0, 0, 0, 0]} name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Dialog open={resetOpen} onOpenChange={(o) => { setResetOpen(o); if (!o) setResetConfirmStep(0) }}>
        <DialogContent className="rounded-xl border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Reset all progress?</DialogTitle>
            <DialogDescription>
              {resetConfirmStep === 0
                ? "This clears every topic and lab status, note, and score. This cannot be undone."
                : "Are you absolutely sure? Click Reset again to permanently erase all progress."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReset}>
              {resetConfirmStep === 0 ? "Continue" : "Reset Everything"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
