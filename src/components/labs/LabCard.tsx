"use client"

import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import {
  CheckCircle2,
  ChevronDown,
  Container,
  Download,
  ExternalLink,
  Globe,
  Loader2,
  Play,
  ShieldCheck,
  ShieldQuestion,
  Square,
  Star,
  Target,
  Upload,
  Zap,
} from "lucide-react"

import { cn, dedupeResources } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getProgress, updateLabStatus } from "@/lib/store/progress"
import { getXp, XP_PER_LAB } from "@/lib/store/gamification"
import { RESOURCE_ADDITIONS } from "@/lib/data/resourceAdditions"
import { LabSlideshow } from "@/components/labs/LabSlideshow"
import { HintList } from "@/components/labs/HintList"
import type { Lab, Status } from "@/types"

const DIFFICULTY_VARIANT = {
  easy: "green",
  medium: "orange",
  hard: "red",
} as const
const DIFFICULTY_COLOR = {
  easy: "#22c55e",
  medium: "#f0793a",
  hard: "#ef4444",
} as const

// The local Docker lab runner only exists in a local/self-hosted deployment
// with Docker on the host. On a serverless host (e.g. Vercel) there is no
// Docker, so the "Start Lab" control is gated behind this build-time flag and
// learners use the online alternative instead. Set NEXT_PUBLIC_LABS_DOCKER=1
// locally to enable it.
const DOCKER_ENABLED = process.env.NEXT_PUBLIC_LABS_DOCKER === "1"

interface VerifyResult {
  verified: boolean
  confidence: "high" | "medium" | "low"
  reason: string
  extractedText: string
  method: "ai" | "heuristic"
}

function EvidenceVerify({ lab }: { lab: Lab }) {
  const [file, setFile] = useState<File | null>(null)
  const [checking, setChecking] = useState(false)
  const [result, setResult] = useState<VerifyResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleVerify() {
    if (!file) return
    setChecking(true)
    setResult(null)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("labTitle", lab.title)
      formData.append("labPlatform", lab.platform)
      if (lab.completionIndicator)
        formData.append("completionIndicator", lab.completionIndicator)
      const res = await fetch("/api/labs/verify-screenshot", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error()
      const data: VerifyResult = await res.json()
      setResult(data)

      const prefix = data.method === "ai" ? "AI-VERIFIED" : "HEURISTIC-CHECK"
      const xpBefore = getXp()
      updateLabStatus(lab.id, {
        flagOrEvidence: `[${prefix}: ${data.verified ? "PASS" : "NOT CONFIRMED"}] ${data.reason}`,
        ...(data.verified ? { status: "completed" } : {}),
      })
      const gained = getXp() - xpBefore
      if (data.verified) {
        toast.success(
          `Screenshot confirmed as completion evidence — marked Completed${gained > 0 ? ` (+${gained} XP)` : ""}`,
        )
      } else {
        toast.warning(
          "Could not confirm completion evidence in this screenshot",
        )
      }
    } catch {
      toast.error("Verification failed — check the file and try again")
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="space-y-2 rounded-lg border border-brand-orange/25 bg-brand-orange/[0.04] p-3">
      <p className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-brand-orange">
        <ShieldCheck className="h-3.5 w-3.5" /> Completion Screenshot
        Verification
      </p>
      <p className="text-xs text-muted-foreground">
        Upload a screenshot proving you completed this lab (a solved-lab banner,
        a captured flag, or exploit output). Text is extracted via OCR, then
        checked with AI for genuine completion evidence.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null)
            setResult(null)
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-3.5 w-3.5" />{" "}
          {file ? file.name.slice(0, 22) : "Choose screenshot"}
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={handleVerify}
          disabled={!file || checking}
          className="bg-brand-orange text-white hover:bg-brand-orange/90"
        >
          {checking ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <ShieldQuestion className="h-3.5 w-3.5" />
          )}
          {checking ? "Checking..." : "Verify"}
        </Button>
      </div>
      {result && (
        <div
          className={cn(
            "rounded-md border px-3 py-2 text-xs",
            result.verified
              ? "border-brand-green/30 bg-brand-green/10 text-brand-green"
              : "border-brand-red/30 bg-brand-red/10 text-brand-red",
          )}
        >
          <p className="font-semibold">
            {result.verified ? "Verified" : "Not confirmed"} ·{" "}
            {result.confidence} confidence ·{" "}
            {result.method === "ai" ? "DeepSeek check" : "heuristic check"}
          </p>
          <p className="mt-0.5">{result.reason}</p>
        </div>
      )}
    </div>
  )
}

interface ActiveLabRun {
  labId: string
  port: number | null
}

function LabEnvironment({ lab }: { lab: Lab }) {
  const [active, setActive] = useState<ActiveLabRun | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function refreshStatus() {
    try {
      const res = await fetch("/api/labs/docker/status")
      const data = await res.json()
      setActive(data.active ?? null)
    } catch {
      // status endpoint unreachable — leave last known state
    }
  }

  useEffect(() => {
    refreshStatus()
    window.addEventListener("technieum:lab-docker-changed", refreshStatus)
    return () =>
      window.removeEventListener("technieum:lab-docker-changed", refreshStatus)
  }, [])

  const isThisRunning = active?.labId === lab.id
  const isOtherRunning = active !== null && !isThisRunning

  async function handleStart() {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/labs/docker/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ labId: lab.id }),
      })
      const data = await res.json()
      if (!data.ok)
        throw new Error(data.error || "Failed to start lab environment.")
      toast.success(`${lab.title} environment is starting on port ${data.port}`)
      await refreshStatus()
      window.dispatchEvent(new Event("technieum:lab-docker-changed"))
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to start lab environment."
      setError(message)
      toast.error(message)
    } finally {
      setBusy(false)
    }
  }

  async function handleStop() {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/labs/docker/stop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ labId: lab.id }),
      })
      const data = await res.json()
      if (!data.ok)
        throw new Error(data.error || "Failed to stop lab environment.")
      await refreshStatus()
      window.dispatchEvent(new Event("technieum:lab-docker-changed"))
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to stop lab environment."
      setError(message)
      toast.error(message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-2 rounded-lg border border-brand-blue/25 bg-brand-blue/[0.04] p-3">
      <p className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-brand-blue">
        <Container className="h-3.5 w-3.5" /> Lab Environment (Docker)
      </p>
      <p className="text-xs text-muted-foreground">
        Spins up{" "}
        <code className="rounded bg-muted px-1 py-0.5">{lab.dockerImage}</code>{" "}
        as your own lab target. You can run one lab at a time — starting this
        one stops any other lab you have open.
      </p>
      {isOtherRunning && (
        <p className="text-xs font-medium text-brand-orange">
          You already have another lab running. Starting this one will stop it
          first.
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {isThisRunning ? (
          <>
            <a
              href={
                active?.port
                  ? `${typeof window !== "undefined" ? window.location.protocol : "http:"}//${typeof window !== "undefined" ? window.location.hostname : "localhost"}:${active.port}`
                  : "#"
              }
              target="_blank"
              rel="noreferrer"
            >
              <Button type="button" size="sm">
                <ExternalLink className="h-3.5 w-3.5" /> Open target (:
                {active?.port})
              </Button>
            </a>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleStop}
              disabled={busy}
            >
              {busy ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Square className="h-3.5 w-3.5" />
              )}{" "}
              Stop Lab
            </Button>
          </>
        ) : (
          <Button type="button" size="sm" onClick={handleStart} disabled={busy}>
            {busy ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}{" "}
            Start Lab
          </Button>
        )}
      </div>
      {busy && !isThisRunning && (
        <p className="text-xs text-muted-foreground">
          First launch pulls the image and can take a few minutes — later
          launches are instant.
        </p>
      )}
      {error && <p className="text-xs text-brand-red">{error}</p>}
    </div>
  )
}

export function LabCard({ lab, moduleName }: { lab: Lab; moduleName: string }) {
  const [expanded, setExpanded] = useState(false)
  const [status, setStatus] = useState<Status>("not_started")
  const [dateCompleted, setDateCompleted] = useState("")
  const [evidence, setEvidence] = useState("")
  const [timeSpent, setTimeSpent] = useState<string>("")
  const [score, setScore] = useState<number | undefined>(undefined)
  const [notes, setNotes] = useState("")

  useEffect(() => {
    function refresh() {
      const lp = getProgress().labs[lab.id]
      setStatus(lp?.status ?? "not_started")
      setDateCompleted(lp?.dateCompleted ? lp.dateCompleted.slice(0, 10) : "")
      setEvidence(lp?.flagOrEvidence ?? "")
      setTimeSpent(lp?.timeSpentHours != null ? String(lp.timeSpentHours) : "")
      setScore(lp?.score)
      setNotes(lp?.notes ?? "")
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () =>
      window.removeEventListener("technieum:progress-changed", refresh)
  }, [lab.id])

  function handleStatusChange(next: Status) {
    const xpBefore = getXp()
    setStatus(next)
    updateLabStatus(lab.id, { status: next })
    const gained = getXp() - xpBefore
    if (gained > 0) toast.success(`+${gained} XP earned!`)
  }

  function handleExpand() {
    const next = !expanded
    setExpanded(next)
    if (next && status === "not_started") {
      updateLabStatus(lab.id, { status: "in_progress" })
    }
  }

  function handleEvidenceBlur() {
    const xpBefore = getXp()
    const patch: Parameters<typeof updateLabStatus>[1] = {
      flagOrEvidence: evidence,
    }
    if (evidence.trim() && status !== "completed" && status !== "skipped") {
      patch.status = "completed"
    }
    updateLabStatus(lab.id, patch)
    const gained = getXp() - xpBefore
    if (gained > 0) toast.success(`+${gained} XP earned!`)
  }

  return (
    <div
      className="accent-bar lift glass overflow-hidden rounded-2xl pl-1"
      style={
        {
          "--accent-bar-color": DIFFICULTY_COLOR[lab.difficulty],
        } as React.CSSProperties
      }
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleExpand}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleExpand()
          }
        }}
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left"
      >
        <Badge
          variant={DIFFICULTY_VARIANT[lab.difficulty]}
          className="shrink-0 rounded-md font-mono"
        >
          {lab.id}
        </Badge>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{lab.title}</p>
          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-xs text-muted-foreground">
            <span>
              {moduleName} · {lab.platform}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {lab.difficulty}
            </span>
            {lab.dockerImage && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-blue/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-blue">
                <Container className="h-3 w-3" /> Docker
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand-orange">
              <Zap className="h-3 w-3" /> +{XP_PER_LAB} XP
            </span>
          </p>
        </div>
        {status === "completed" && (
          <ShieldCheck className="h-4 w-4 shrink-0 text-brand-green" />
        )}
        <div onClick={(e) => e.stopPropagation()}>
          <Select
            value={status}
            onValueChange={(v) => handleStatusChange(v as Status)}
          >
            <SelectTrigger className="h-8 w-[130px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not_started">Not Started</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="skipped">Skipped</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            expanded && "rotate-180",
          )}
        />
      </div>

      {expanded && (
        <div className="animate-in fade-in slide-in-from-top-2 space-y-4 border-t border-border px-4 py-5 duration-500 [animation-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none">
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              {lab.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {lab.description}
            </p>
          </div>

          {(lab.objective ||
            (lab.successCriteria && lab.successCriteria.length > 0)) && (
            <div className="rounded-lg border border-brand-orange/30 bg-brand-orange/[0.05] p-3.5">
              {lab.objective && (
                <div className="flex items-start gap-2">
                  <Target className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  <div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-brand-orange">
                      Objective
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      {lab.objective}
                    </p>
                  </div>
                </div>
              )}
              {lab.successCriteria && lab.successCriteria.length > 0 && (
                <div
                  className={cn(
                    lab.objective &&
                      "mt-3 border-t border-brand-orange/15 pt-3",
                  )}
                >
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    You&apos;re done when
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {lab.successCriteria.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {lab.assets && lab.assets.length > 0 && (
            <div className="space-y-2 rounded-lg border border-brand-blue/25 bg-brand-blue/[0.04] p-3">
              <p className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-brand-blue">
                <Download className="h-3.5 w-3.5" /> Lab Files
              </p>
              <p className="text-xs text-muted-foreground">
                Everything this lab needs is hosted here — no external download
                required.
              </p>
              <ul className="space-y-1.5">
                {lab.assets.map((a) => (
                  <li key={a.path}>
                    <a
                      href={a.path}
                      download
                      className="flex items-start gap-2 rounded-md border border-border bg-card px-3 py-2 transition-colors hover:border-brand-blue/40"
                    >
                      <Download className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline gap-x-2">
                          <span className="font-mono text-sm font-semibold text-foreground">
                            {a.name}
                          </span>
                          {a.size && (
                            <span className="font-mono text-[11px] text-muted-foreground">
                              {a.size}
                            </span>
                          )}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {a.description}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lab.slides && lab.slides.length > 0 ? (
            <div>
              <p className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Walkthrough
              </p>
              <LabSlideshow slides={lab.slides} ownerId={lab.id} />
            </div>
          ) : (
            lab.instructions &&
            lab.instructions.length > 0 && (
              <div>
                <p className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Step-by-Step Instructions
                </p>
                <ol className="list-inside list-decimal space-y-1.5 text-sm marker:font-semibold marker:text-brand-orange">
                  {lab.instructions.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            )
          )}

          {lab.hints && lab.hints.length > 0 && <HintList hints={lab.hints} />}

          {dedupeResources(lab.resources, RESOURCE_ADDITIONS[lab.id]).length >
            0 && (
            <div>
              <p className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Resources
              </p>
              <ul className="space-y-1 text-sm">
                {dedupeResources(lab.resources, RESOURCE_ADDITIONS[lab.id]).map(
                  (r) => (
                    <li key={r.url}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-brand-orange hover:underline"
                      >
                        {r.title} <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}

          {DOCKER_ENABLED && lab.dockerImage && lab.containerPort && (
            <LabEnvironment lab={lab} />
          )}

          {!DOCKER_ENABLED && lab.dockerImage && !lab.onlineAlternative && (
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <Container className="h-3.5 w-3.5" /> Local Docker lab
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                This lab&apos;s target runs in Docker (
                <code className="rounded bg-muted px-1 py-0.5">
                  {lab.dockerImage}
                </code>
                ). Follow the walkthrough and success criteria above; run the
                target on your own machine, then upload a completion screenshot
                below to mark it done.
              </p>
            </div>
          )}

          {lab.onlineAlternative && (
            <div className="space-y-2 rounded-lg border border-brand-teal/30 bg-brand-teal/[0.05] p-3">
              <p className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-brand-teal">
                <Globe className="h-3.5 w-3.5" /> Online Alternative — No Setup
              </p>
              <p className="text-xs text-muted-foreground">
                {lab.onlineAlternative.note ??
                  "Can't run the Docker target (e.g. on the hosted portal)? Do this lab online instead — no local setup needed."}
              </p>
              <a
                href={lab.onlineAlternative.url}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="border-brand-teal/40 text-brand-teal hover:bg-brand-teal/10 hover:text-brand-teal"
                >
                  <ExternalLink className="h-3.5 w-3.5" />{" "}
                  {lab.onlineAlternative.label}
                </Button>
              </a>
            </div>
          )}

          <EvidenceVerify lab={lab} />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Date Completed
              </Label>
              <Input
                type="date"
                value={dateCompleted}
                onChange={(e) => {
                  setDateCompleted(e.target.value)
                  updateLabStatus(lab.id, {
                    dateCompleted: e.target.value
                      ? new Date(e.target.value).toISOString()
                      : undefined,
                  })
                }}
              />
            </div>
            <div className="space-y-1">
              <Label className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Time Spent (hours)
              </Label>
              <Input
                type="number"
                min={0}
                step={0.5}
                value={timeSpent}
                onChange={(e) => setTimeSpent(e.target.value)}
                onBlur={() =>
                  updateLabStatus(lab.id, {
                    timeSpentHours: timeSpent ? Number(timeSpent) : undefined,
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Evidence / Flag URL
            </Label>
            <Input
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              onBlur={handleEvidenceBlur}
              placeholder="Flag string, screenshot URL, or writeup link"
            />
          </div>

          <div>
            <Label className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Score
            </Label>
            <div className="mt-1 flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setScore(n)
                    updateLabStatus(lab.id, { score: n })
                  }}
                >
                  <Star
                    className={cn(
                      "h-5 w-5",
                      score && n <= score
                        ? "fill-brand-orange text-brand-orange"
                        : "text-muted-foreground",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <Label className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Notes
            </Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => updateLabStatus(lab.id, { notes })}
              placeholder="Learnings, blockers, links to your writeup..."
              className="min-h-[70px] text-sm"
            />
          </div>
        </div>
      )}
    </div>
  )
}
