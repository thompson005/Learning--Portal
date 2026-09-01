"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Award,
  ExternalLink,
  HelpCircle,
  Target,
  ListChecks,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProgressBar } from "@/components/shared/ProgressBar"
import { TopicRow } from "@/components/modules/TopicRow"
import { QuizModal } from "@/components/quiz/QuizModal"
import { CURRICULUM } from "@/lib/data/curriculum"
import {
  getModuleCompletionPercent,
  getModuleQuiz,
  getModuleQuizAttempt,
  recordModuleQuizAttempt,
} from "@/lib/store/progress"
import { RESOURCE_ADDITIONS } from "@/lib/data/resourceAdditions"
import { cn, dedupeResources } from "@/lib/utils"
import type { QuizAttempt } from "@/types"

const MONTH_BAR = { 1: "green", 2: "orange", 3: "blue", 4: "purple" } as const
const PHASE_NAME = {
  1: "Foundations",
  2: "Core Offensive Skills",
  3: "Exploitation + Reporting",
  4: "Advanced Offensive Security",
} as const

export default function ModuleDetailPage({
  params,
}: {
  params: Promise<{ moduleId: string }>
}) {
  const { moduleId } = use(params)
  const mod = CURRICULUM.find((m) => m.id === moduleId)
  const [percent, setPercent] = useState(0)
  const [quizOpen, setQuizOpen] = useState(false)
  const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | undefined>(
    undefined,
  )

  const moduleQuiz = mod ? getModuleQuiz(mod.id) : undefined
  const extraModuleResources = mod ? (RESOURCE_ADDITIONS[mod.id] ?? []) : []

  useEffect(() => {
    if (!mod) return
    function refresh() {
      setPercent(getModuleCompletionPercent(mod!.id))
      setQuizAttempt(getModuleQuizAttempt(mod!.id))
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
        <div className="rounded-xl border border-border bg-card p-3 lg:sticky lg:top-4">
          <p className="mb-2 px-1 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            All Modules
          </p>
          <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {CURRICULUM.map((m) => (
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
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-1 flex items-center gap-2">
            <Badge
              variant={MONTH_BAR[mod.month] as "green" | "orange" | "blue"}
              className="rounded-md"
            >
              {PHASE_NAME[mod.month]}
            </Badge>
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
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="topics">
              Topics (<span className="font-mono">{mod.topics.length}</span>)
            </TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="space-y-4 p-5">
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
                      <Target className="h-4 w-4 text-brand-purple" />
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
              </CardContent>
            </Card>

            {moduleQuiz && (
              <Card className="rounded-xl border-brand-purple/25 bg-brand-purple/[0.03]">
                <CardContent className="flex items-center gap-3 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-purple/15">
                    <Award className="h-5 w-5 text-brand-purple" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-brand-purple">
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
                    className="bg-brand-purple hover:bg-brand-purple/90"
                    onClick={() => setQuizOpen(true)}
                  >
                    <HelpCircle className="h-4 w-4" />{" "}
                    {quizAttempt ? "Retake" : "Take Quiz"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="topics" className="space-y-2">
            {mod.topics.map((topic) => (
              <TopicRow key={topic.id} topic={topic} />
            ))}
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardContent className="p-5">
                {dedupeResources(mod.resources, extraModuleResources).length >
                0 ? (
                  <ul className="divide-y divide-border">
                    {dedupeResources(mod.resources, extraModuleResources).map(
                      (r) => (
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
                      ),
                    )}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No curated resources for this module yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
