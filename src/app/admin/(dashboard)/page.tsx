"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Download,
  LogOut,
  Plus,
  ShieldCheck,
  Trash2,
  UserCog,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CURRICULUM } from "@/lib/data/curriculum"
import type { ManagerTrainee } from "@/types"
import { LearnersPanel } from "./LearnersPanel"

const STATUS_PILL: Record<0 | 1 | 2, string> = {
  0: "border-brand-red/30 bg-brand-red/10",
  1: "border-brand-orange/30 bg-brand-orange/10",
  2: "border-brand-green/30 bg-brand-green/10",
}

function completionPercent(moduleStatus: Record<string, 0 | 1 | 2>): number {
  const totalTopics = CURRICULUM.reduce((s, m) => s + m.topics.length, 0)
  const completed = CURRICULUM.reduce((s, m) => {
    const st = moduleStatus[m.id] ?? 0
    if (st === 2) return s + m.topics.length
    if (st === 1) return s + m.topics.length * 0.5
    return s
  }, 0)
  return totalTopics === 0 ? 0 : Math.round((completed / totalTopics) * 100)
}

function cohortAvg(moduleId: string, trainees: ManagerTrainee[]): number {
  if (trainees.length === 0) return 0
  const sum = trainees.reduce(
    (acc, t) => acc + (t.moduleStatus[moduleId] ?? 0),
    0,
  )
  return Math.round((sum / (trainees.length * 2)) * 100)
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [trainees, setTrainees] = useState<ManagerTrainee[]>([])
  const [newName, setNewName] = useState("")
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"learners" | "cohort">("learners")

  async function refresh() {
    const res = await fetch("/api/admin/trainees")
    if (res.status === 401) {
      router.push("/admin/login")
      return
    }
    const data = await res.json()
    setTrainees(data.trainees)
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  async function handleAddTrainee() {
    if (!newName.trim() || trainees.length >= 10) return
    await fetch("/api/admin/trainees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    })
    setNewName("")
    refresh()
  }

  async function handleRemoveTrainee(id: string) {
    await fetch(`/api/admin/trainees/${id}`, { method: "DELETE" })
    refresh()
  }

  async function handleStatusChange(
    traineeId: string,
    moduleId: string,
    status: 0 | 1 | 2,
  ) {
    setTrainees((prev) =>
      prev.map((t) =>
        t.id === traineeId
          ? { ...t, moduleStatus: { ...t.moduleStatus, [moduleId]: status } }
          : t,
      ),
    )
    await fetch(`/api/admin/trainees/${traineeId}/module`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId, status }),
    })
  }

  function handleExportCSV() {
    const PHASE_NAME = [
      "",
      "Foundations",
      "Core Offensive Skills",
      "Exploitation + Reporting",
      "Advanced Offensive Security",
    ]
    const header = [
      "Module",
      "Phase",
      ...trainees.map((t) => t.name),
      "Cohort Avg %",
    ]
    const rows = CURRICULUM.map((m) => {
      const cells = trainees.map((t) => String(t.moduleStatus[m.id] ?? 0))
      return [
        m.name,
        PHASE_NAME[m.month] ?? "",
        ...cells,
        `${cohortAvg(m.id, trainees)}%`,
      ]
    })
    const summary = [
      "Overall %",
      "",
      ...trainees.map((t) => `${completionPercent(t.moduleStatus)}%`),
      "",
    ]
    const csv = [header, ...rows, summary]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `technieum-cohort-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Cohort progress exported")
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="min-h-dvh bg-muted/30">
      <header className="flex items-center justify-between border-b border-white/10 bg-brand-ink px-6 py-4 text-white">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-brand-orange" />
          <span className="font-mono text-sm font-bold uppercase tracking-wide">
            Technieum Admin
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:bg-white/5 hover:text-white"
            onClick={() => router.push("/dashboard")}
          >
            Back to Portal
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:bg-white/5 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <div className="inline-flex rounded-lg border border-border bg-card p-1">
          <button
            onClick={() => setView("learners")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              view === "learners"
                ? "bg-brand-orange/10 text-brand-orange"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Registered Learners
          </button>
          <button
            onClick={() => setView("cohort")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              view === "cohort"
                ? "bg-brand-orange/10 text-brand-orange"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Manual Cohort
          </button>
        </div>

        {view === "learners" && <LearnersPanel />}

        {view === "cohort" && (
          <>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-foreground">
              <UserCog className="h-5 w-5 text-brand-orange" /> Cohort Progress
            </h1>
            <p className="text-sm text-muted-foreground">
              Track up to 10 trainees across all {CURRICULUM.length} modules.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>

        <Card>
          <CardContent className="flex flex-wrap items-end gap-2 p-4">
            <div className="flex-1 space-y-1">
              <label className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Add trainee (max 10)
              </label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTrainee()}
                placeholder="Trainee name"
                disabled={trainees.length >= 10}
              />
            </div>
            <Button
              onClick={handleAddTrainee}
              disabled={trainees.length >= 10 || !newName.trim()}
            >
              <Plus className="h-4 w-4" /> Add
            </Button>
          </CardContent>
        </Card>

        {loading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Loading cohort data...
          </p>
        ) : trainees.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Add trainees above to start tracking cohort progress.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[700px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="sticky left-0 z-10 bg-muted/50 p-2 text-left font-mono text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Module
                  </th>
                  {trainees.map((t) => (
                    <th
                      key={t.id}
                      className="min-w-[110px] p-2 text-center font-mono text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span className="truncate">{t.name}</span>
                        <button
                          onClick={() => handleRemoveTrainee(t.id)}
                          aria-label={`Remove ${t.name}`}
                        >
                          <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    </th>
                  ))}
                  <th className="min-w-[90px] p-2 text-center font-mono text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Cohort Avg %
                  </th>
                </tr>
              </thead>
              <tbody>
                {CURRICULUM.map((mod) => (
                  <tr key={mod.id} className="border-b border-border">
                    <td className="sticky left-0 z-10 bg-card p-2 font-medium">
                      {mod.shortName}
                    </td>
                    {trainees.map((t) => {
                      const status = t.moduleStatus[mod.id] ?? 0
                      return (
                        <td key={t.id} className="p-1.5 text-center">
                          <Select
                            value={String(status)}
                            onValueChange={(v) =>
                              handleStatusChange(
                                t.id,
                                mod.id,
                                Number(v) as 0 | 1 | 2,
                              )
                            }
                          >
                            <SelectTrigger
                              className={`h-8 rounded-full border text-xs font-medium ${STATUS_PILL[status]}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">Not Started</SelectItem>
                              <SelectItem value="1">In Progress</SelectItem>
                              <SelectItem value="2">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      )
                    })}
                    <td className="p-2 text-center font-mono font-semibold">
                      {cohortAvg(mod.id, trainees)}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-muted/50 font-bold">
                  <td className="sticky left-0 z-10 bg-muted/50 p-2">
                    Overall %
                  </td>
                  {trainees.map((t) => (
                    <td key={t.id} className="p-2 text-center font-mono">
                      {completionPercent(t.moduleStatus)}%
                    </td>
                  ))}
                  <td className="p-2 text-center font-mono">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  )
}
