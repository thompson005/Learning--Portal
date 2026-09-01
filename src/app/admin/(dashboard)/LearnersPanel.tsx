"use client"

import { Fragment, useEffect, useState } from "react"
import { ChevronDown, ChevronRight, Download, Users } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ModuleStat {
  id: string
  shortName: string
  name: string
  month: number
  completed: number
  total: number
  percent: number
}

interface Learner {
  id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string
  stats: {
    topicsCompleted: number
    topicsTotal: number
    labsCompleted: number
    labsTotal: number
    topicQuizzesPassed: number
    moduleQuizzesPassed: number
    checkpointsCorrect: number
    overallPercent: number
    xp: number
    rank: string
    modules: ModuleStat[]
  }
}

function fmtDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function barColor(percent: number): string {
  if (percent >= 100) return "bg-brand-green"
  if (percent > 0) return "bg-brand-orange"
  return "bg-muted"
}

export function LearnersPanel() {
  const [learners, setLearners] = useState<Learner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/admin/users")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setLearners(data.learners ?? []))
      .catch(() => setError("Could not load learners. Is the database configured?"))
      .finally(() => setLoading(false))
  }, [])

  function handleExportCSV() {
    const header = [
      "Name",
      "Email",
      "Joined",
      "Last active",
      "Rank",
      "XP",
      "Topics completed",
      "Topics total",
      "Labs completed",
      "Labs total",
      "Topic quizzes passed",
      "Module quizzes passed",
      "Overall %",
    ]
    const rows = learners.map((l) => [
      l.name,
      l.email,
      fmtDate(l.createdAt),
      fmtDate(l.updatedAt),
      l.stats.rank,
      String(l.stats.xp),
      String(l.stats.topicsCompleted),
      String(l.stats.topicsTotal),
      String(l.stats.labsCompleted),
      String(l.stats.labsTotal),
      String(l.stats.topicQuizzesPassed),
      String(l.stats.moduleQuizzesPassed),
      `${l.stats.overallPercent}%`,
    ])
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `technieum-learners-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading)
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Loading learners...
      </p>
    )

  if (error)
    return (
      <div className="rounded-xl border border-brand-red/30 bg-brand-red/5 p-6 text-center text-sm text-muted-foreground">
        {error}
      </div>
    )

  if (learners.length === 0)
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        No learners have signed up yet. Registered accounts will appear here
        automatically.
      </div>
    )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-foreground">
            <Users className="h-5 w-5 text-brand-orange" /> Registered Learners
          </h2>
          <p className="text-sm text-muted-foreground">
            {learners.length} account{learners.length === 1 ? "" : "s"} — live
            progress synced from each learner.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExportCSV}>
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-left font-mono text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="p-3">Learner</th>
              <th className="p-3">Rank</th>
              <th className="p-3 text-center">XP</th>
              <th className="p-3 text-center">Topics</th>
              <th className="p-3 text-center">Labs</th>
              <th className="p-3 text-center">Quizzes</th>
              <th className="p-3 text-center">Overall</th>
              <th className="p-3 text-center">Last active</th>
            </tr>
          </thead>
          <tbody>
            {learners.map((l) => {
              const open = expanded === l.id
              return (
                <Fragment key={l.id}>
                  <tr
                    className="cursor-pointer border-b border-border hover:bg-muted/30"
                    onClick={() => setExpanded(open ? null : l.id)}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {open ? (
                          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 font-mono text-[11px] font-bold uppercase text-brand-orange">
                          {l.name.slice(0, 1)}
                        </span>
                        <div className="min-w-0">
                          <div className="truncate font-medium">{l.name}</div>
                          <div className="truncate font-mono text-[11px] text-muted-foreground">
                            {l.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="rounded-full border border-brand-orange/30 bg-brand-orange/10 px-2 py-0.5 text-xs font-medium text-brand-orange">
                        {l.stats.rank}
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono">{l.stats.xp}</td>
                    <td className="p-3 text-center font-mono">
                      {l.stats.topicsCompleted}/{l.stats.topicsTotal}
                    </td>
                    <td className="p-3 text-center font-mono">
                      {l.stats.labsCompleted}/{l.stats.labsTotal}
                    </td>
                    <td className="p-3 text-center font-mono">
                      {l.stats.topicQuizzesPassed + l.stats.moduleQuizzesPassed}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full ${barColor(l.stats.overallPercent)}`}
                            style={{ width: `${l.stats.overallPercent}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs">
                          {l.stats.overallPercent}%
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-center text-xs text-muted-foreground">
                      {fmtDate(l.updatedAt)}
                    </td>
                  </tr>
                  {open && (
                    <tr className="border-b border-border bg-muted/20">
                      <td colSpan={8} className="p-4">
                        <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                          Per-module completion — joined {fmtDate(l.createdAt)}
                        </p>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {l.stats.modules.map((m) => (
                            <div
                              key={m.id}
                              className="rounded-lg border border-border bg-card p-2.5"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="truncate text-xs font-medium">
                                  {m.shortName}
                                </span>
                                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                                  {m.completed}/{m.total}
                                </span>
                              </div>
                              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                                <div
                                  className={`h-full ${barColor(m.percent)}`}
                                  style={{ width: `${m.percent}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
