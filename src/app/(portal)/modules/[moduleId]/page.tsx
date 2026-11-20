"use client"

import { Suspense, use, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { notFound, useSearchParams } from "next/navigation"
import {
  Award,
  ExternalLink,
  HelpCircle,
  Target,
  ListChecks,
  Maximize2,
  Minimize2,
  Download,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProgressBar } from "@/components/shared/ProgressBar"
import { GlassCard } from "@/components/ui3d/GlassCard"
import { MeshGradient } from "@/components/ui3d/MeshGradient"
import { TopicRow } from "@/components/modules/TopicRow"
import { VideoEmbed, isEmbeddableVideo } from "@/components/shared/VideoEmbed"
import { useFocusMode } from "@/components/layout/FocusMode"
import { LabCard } from "@/components/labs/LabCard"
import { trackForModuleId, setActiveTrackId, getActiveTrack } from "@/lib/data/tracks/registry"
import { QuizModal } from "@/components/quiz/QuizModal"
import {
  getModuleCompletionPercent,
  getModuleQuiz,
  getModuleQuizAttempt,
  recordModuleQuizAttempt,
  getProgress,
  moduleLockInfo,
  type ModuleLock,
} from "@/lib/store/progress"
import { LockedGate } from "@/components/learn/LockedGate"
import { downloadCertificate } from "@/lib/cert"
import { RESOURCE_ADDITIONS } from "@/lib/data/resourceAdditions"
import { cn, dedupeResources } from "@/lib/utils"
import type { QuizAttempt } from "@/types"

const MONTH_BAR = { 1: "green", 2: "orange", 3: "blue", 4: "purple" } as const

export default function ModuleDetailPage({
  params,
}: {
  params: Promise<{ moduleId: string }>
}) {
  return (
    <Suspense fallback={null}>
      <ModuleDetailContent params={params} />
    </Suspense>
  )
}

function ModuleDetailContent({
  params,
}: {
  params: Promise<{ moduleId: string }>
}) {
  const { moduleId } = use(params)
  const owningTrack = trackForModuleId(moduleId) ?? getActiveTrack()
  const mod = owningTrack.curriculum.find((m) => m.id === moduleId)
  // Opening a module from another track switches the active track to it, so the
  // sidebar, progress and quizzes all line up with what's on screen.
  useEffect(() => {
    if (mod) setActiveTrackId(owningTrack.id)
  }, [mod, owningTrack.id])
  const searchParams = useSearchParams()
  const focusTopic = searchParams.get("topic")
  const { focus, toggle: toggleFocus } = useFocusMode()
  const topicsListRef = useRef<HTMLDivElement>(null)
  const [percent, setPercent] = useState(0)
  const [lock, setLock] = useState<ModuleLock>({ locked: false })
  const [quizOpen, setQuizOpen] = useState(false)
  const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | undefined>(
    undefined,
  )

  // j / k move focus between topic headers; Enter/Space (handled in TopicRow)
  // expands the focused one.
  function handleTopicsKey(e: React.KeyboardEvent) {
    if (e.key !== "j" && e.key !== "k") return
    const headers = Array.from(
      topicsListRef.current?.querySelectorAll<HTMLElement>(
        "[data-topic-header]",
      ) ?? [],
    )
    if (headers.length === 0) return
    const current = headers.indexOf(document.activeElement as HTMLElement)
    const delta = e.key === "j" ? 1 : -1
    const nextIdx =
      current === -1
        ? 0
        : Math.min(Math.max(current + delta, 0), headers.length - 1)
    e.preventDefault()
    headers[nextIdx]?.focus()
  }

  const moduleQuiz = mod ? getModuleQuiz(mod.id) : undefined
  const extraModuleResources = mod ? (RESOURCE_ADDITIONS[mod.id] ?? []) : []
  const moduleResources = mod
    ? dedupeResources(mod.resources, extraModuleResources)
    : []
  const moduleVideos = moduleResources.filter((r) => isEmbeddableVideo(r.url))
  const moduleLinks = moduleResources.filter((r) => !isEmbeddableVideo(r.url))
  const moduleLabs = mod ? owningTrack.labs.filter((l) => l.moduleId === mod.id) : []

  useEffect(() => {
    if (!mod) return
    function refresh() {
      setPercent(getModuleCompletionPercent(mod!.id))
      setQuizAttempt(getModuleQuizAttempt(mod!.id))
      setLock(moduleLockInfo(mod!.id))
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () =>
      window.removeEventListener("technieum:progress-changed", refresh)
  }, [mod])

  if (!mod) notFound()

  function handleModuleQuizComplete(
    score: number,
    total: number,
    answers: number[],
  ) {
    recordModuleQuizAttempt(mod!.id, score, total, answers)
    setQuizAttempt(getModuleQuizAttempt(mod!.id))
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <aside className="shrink-0 lg:w-56">
        <div className="glass rounded-2xl p-3 lg:sticky lg:top-4">
          <p className="mb-2 px-1 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            All Modules
          </p>
          <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {owningTrack.curriculum.map((m) => (
              <Link
                key={m.id}
                href={`/modules/${m.id}`}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-md border-l-2 px-2.5 py-1.5 text-sm lg:whitespace-normal",
                  m.id === mod.id
                    ? "border-brand-orange bg-brand-orange/10 font-medium text-brand-orange"
                    : "border-transparent text-muted-foreground hover:bg-muted",
                )}
              >
                {m.shortName}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <div className="min-w-0 flex-1 space-y-4">
        <section className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-8">
          <MeshGradient />
          <div className="relative">
            <div className="mb-1 flex items-center justify-between gap-2">
              <Badge
                variant={MONTH_BAR[mod.month] as "green" | "orange" | "blue"}
                className="rounded-md"
              >
                {(owningTrack.phases.find((p) => p.month === mod.month)?.name ?? "")}
              </Badge>
              <button
                onClick={toggleFocus}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground shadow-chip transition-colors hover:text-foreground"
                title={focus ? "Exit focus mode" : "Focus mode — hide the sidebar for reading"}
              >
                {focus ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
                {focus ? "Exit focus" : "Focus mode"}
              </button>
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {mod.name}
            </h1>
            <div className="mt-3 max-w-sm">
              <div className="mb-1 flex justify-between font-mono text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{percent}%</span>
              </div>
              <ProgressBar
                value={percent}
                color={MONTH_BAR[mod.month] as "green" | "orange" | "blue"}
              />
            </div>

            {percent === 100 && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() =>
                  downloadCertificate({
                    learnerName: getProgress().name,
                    moduleName: mod.name,
                    phaseName: (owningTrack.phases.find((p) => p.month === mod.month)?.name ?? ""),
                  })
                }
              >
                <Download className="h-4 w-4" /> Download certificate
              </Button>
            )}
          </div>
        </section>

        {lock.locked ? (
          <LockedGate
            moduleName={mod.name}
            requiredId={lock.requiredId}
            requiredName={lock.requiredName}
          />
        ) : (
        <Tabs defaultValue={focusTopic ? "topics" : "overview"}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="topics">
              Topics (<span className="font-mono">{mod.topics.length}</span>)
            </TabsTrigger>
            {moduleLabs.length > 0 && (
              <TabsTrigger value="labs">
                Labs (<span className="font-mono">{moduleLabs.length}</span>)
              </TabsTrigger>
            )}
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <GlassCard className="space-y-4 p-5">
              <p className="text-sm leading-relaxed">{mod.description}</p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <ListChecks className="h-4 w-4 text-brand-orange" />
                  <span>
                    <span className="font-mono">{mod.topics.length}</span>{" "}
                    topics
                  </span>
                </div>
                {mod.prerequisites && mod.prerequisites.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4 text-brand-orange" />
                    <span>{mod.prerequisites.join(", ")}</span>
                  </div>
                )}
              </div>

              <div>
                <p className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Learning Outcomes
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  {mod.outcomes.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </div>
            </GlassCard>

            {moduleQuiz && (
              <GlassCard className="flex items-center gap-3 p-5 ring-1 ring-brand-orange/20">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-orange/15">
                  <Award className="h-5 w-5 text-brand-orange" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-brand-orange">
                    Module Quiz (
                    <span className="font-mono">
                      {moduleQuiz.questions.length}
                    </span>{" "}
                    questions)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {quizAttempt
                      ? `Last score: ${quizAttempt.score}/${quizAttempt.total} (${Math.round((quizAttempt.score / quizAttempt.total) * 100)}%)`
                      : "Test your understanding of the full module."}
                  </p>
                </div>
                <Button
                  variant="teal"
                  className="bg-brand-orange hover:bg-brand-orange/90"
                  onClick={() => setQuizOpen(true)}
                >
                  <HelpCircle className="h-4 w-4" />{" "}
                  {quizAttempt ? "Retake" : "Take Quiz"}
                </Button>
              </GlassCard>
            )}
          </TabsContent>

          <TabsContent value="topics" className="space-y-2">
            <p className="px-1 pb-1 font-mono text-[11px] text-muted-foreground">
              Tip: press <kbd className="rounded border border-border px-1">j</kbd>/
              <kbd className="rounded border border-border px-1">k</kbd> to move,{" "}
              <kbd className="rounded border border-border px-1">Enter</kbd> to open.
            </p>
            <div
              ref={topicsListRef}
              onKeyDown={handleTopicsKey}
              className="space-y-2"
            >
              {mod.topics.map((topic) => (
                <TopicRow
                  key={topic.id}
                  topic={topic}
                  defaultExpanded={topic.id === focusTopic}
                />
              ))}
            </div>
          </TabsContent>

          {moduleLabs.length > 0 && (
            <TabsContent value="labs" className="space-y-3">
              <p className="px-1 text-sm text-muted-foreground">
                Hands-on labs for this module — apply what you learned in the
                topics above.
              </p>
              {moduleLabs.map((lab) => (
                <LabCard key={lab.id} lab={lab} moduleName={mod.shortName} />
              ))}
            </TabsContent>
          )}

          <TabsContent value="resources" className="space-y-4">
            {moduleVideos.length > 0 && (
              <GlassCard className="space-y-3 p-5">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Watch
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {moduleVideos.map((r) => (
                    <VideoEmbed key={r.url} url={r.url} title={r.title} />
                  ))}
                </div>
              </GlassCard>
            )}
            <GlassCard className="p-5">
              {moduleLinks.length > 0 ? (
                <ul className="divide-y divide-border">
                  {moduleLinks.map((r) => (
                    <li
                      key={r.url}
                      className="flex items-center gap-2 py-2.5 text-sm first:pt-0 last:pb-0"
                    >
                      <Badge
                        variant="outline"
                        className="rounded-md font-mono text-[10px] uppercase"
                      >
                        {r.type}
                      </Badge>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-brand-orange hover:underline"
                      >
                        {r.title} <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {moduleVideos.length > 0
                    ? "All curated resources for this module are videos — watch them above."
                    : "No curated resources for this module yet."}
                </p>
              )}
            </GlassCard>
          </TabsContent>
        </Tabs>
        )}
      </div>

      {moduleQuiz && (
        <QuizModal
          open={quizOpen}
          onOpenChange={setQuizOpen}
          title={`Module Quiz: ${mod.name}`}
          questions={moduleQuiz.questions}
          onComplete={handleModuleQuizComplete}
        />
      )}
    </div>
  )
}
