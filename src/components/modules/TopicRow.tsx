"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, ExternalLink, HelpCircle, Star } from "lucide-react"
import { toast } from "sonner"

import { cn, dedupeResources } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { CodeBlock } from "@/components/shared/CodeBlock"
import { LabSlideshow } from "@/components/labs/LabSlideshow"
import { VideoEmbed, isEmbeddableVideo } from "@/components/shared/VideoEmbed"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { QuizModal } from "@/components/quiz/QuizModal"
import {
  getProgress,
  getTopicQuiz,
  getTopicQuizAttempt,
  recordTopicQuizAttempt,
  updateTopicStatus,
  setLastTopic,
} from "@/lib/store/progress"
import { getXp } from "@/lib/store/gamification"
import { RESOURCE_ADDITIONS } from "@/lib/data/resourceAdditions"
import type { QuizAttempt, Status, Topic } from "@/types"

const TYPE_VARIANT: Record<
  Topic["type"],
  "blue" | "purple" | "orange" | "green"
> = {
  theory: "blue",
  lab: "purple",
  setup: "orange",
  exercise: "green",
}

export function TopicRow({
  topic,
  defaultExpanded = false,
}: {
  topic: Topic
  defaultExpanded?: boolean
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const rootRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>("not_started")
  const [selfScore, setSelfScore] = useState<number | undefined>(undefined)
  const [notes, setNotes] = useState("")
  const [dates, setDates] = useState<{ started?: string; completed?: string }>(
    {},
  )
  const [quizOpen, setQuizOpen] = useState(false)
  const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | undefined>(
    undefined,
  )

  const quiz = getTopicQuiz(topic.id)
  const allResources = dedupeResources(
    topic.resources,
    RESOURCE_ADDITIONS[topic.id],
  )
  // Videos that can play inline get an embedded player; everything else (plus
  // non-embeddable videos) stays a link.
  const videoResources = allResources.filter((r) => isEmbeddableVideo(r.url))
  const linkResources = allResources.filter((r) => !isEmbeddableVideo(r.url))

  useEffect(() => {
    const tp = getProgress().topics[topic.id]
    setStatus(tp?.status ?? "not_started")
    setSelfScore(tp?.selfScore)
    setNotes(tp?.notes ?? "")
    setDates({ started: tp?.dateStarted, completed: tp?.dateCompleted })
    setQuizAttempt(getTopicQuizAttempt(topic.id))
  }, [topic.id])

  // Resume: when this row is the deep-linked topic, open it, scroll to it, and
  // record it as the last-opened topic.
  useEffect(() => {
    if (!defaultExpanded) return
    setLastTopic(topic.id)
    if (getProgress().topics[topic.id]?.status === "not_started") {
      updateTopicStatus(topic.id, { status: "in_progress" })
      setStatus("in_progress")
    }
    const t = setTimeout(() => {
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 150)
    return () => clearTimeout(t)
  }, [defaultExpanded, topic.id])

  function handleStatusChange(next: Status) {
    const xpBefore = getXp()
    setStatus(next)
    updateTopicStatus(topic.id, { status: next })
    const tp = getProgress().topics[topic.id]
    setDates({ started: tp?.dateStarted, completed: tp?.dateCompleted })
    const gained = getXp() - xpBefore
    if (gained > 0) toast.success(`+${gained} XP earned!`)
  }

  function handleExpand() {
    const next = !expanded
    setExpanded(next)
    if (next) setLastTopic(topic.id)
    if (next && status === "not_started") {
      updateTopicStatus(topic.id, { status: "in_progress" })
      setStatus("in_progress")
      const tp = getProgress().topics[topic.id]
      setDates({ started: tp?.dateStarted, completed: tp?.dateCompleted })
    }
  }

  function handleScore(score: number) {
    setSelfScore(score)
    updateTopicStatus(topic.id, { selfScore: score })
  }

  function handleNotesBlur() {
    updateTopicStatus(topic.id, { notes })
  }

  function handleQuizComplete(score: number, total: number, answers: number[]) {
    const xpBefore = getXp()
    recordTopicQuizAttempt(topic.id, score, total, answers)
    setQuizAttempt(getTopicQuizAttempt(topic.id))
    if (
      score / total >= 2 / 3 &&
      status !== "completed" &&
      status !== "skipped"
    ) {
      updateTopicStatus(topic.id, { status: "completed" })
      setStatus("completed")
      const tp = getProgress().topics[topic.id]
      setDates({ started: tp?.dateStarted, completed: tp?.dateCompleted })
    }
    const gained = getXp() - xpBefore
    if (gained > 0) toast.success(`+${gained} XP earned!`)
  }

  return (
    <div ref={rootRef} className="rounded-xl border border-border bg-card">
      <div
        role="button"
        tabIndex={0}
        data-topic-header
        onClick={handleExpand}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleExpand()
          }
        }}
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40"
      >
        <span className="w-7 shrink-0 font-mono text-xs text-muted-foreground">
          {topic.number}
        </span>
        <span className="min-w-0 flex-1 truncate font-display text-sm font-medium text-foreground">
          {topic.title}
        </span>
        <Badge
          variant={TYPE_VARIANT[topic.type]}
          className="hidden rounded-md sm:inline-flex"
        >
          {topic.type}
        </Badge>
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
        <div className="animate-in fade-in slide-in-from-top-2 space-y-4 border-t border-border px-4 py-4 duration-500 [animation-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none">
          {topic.description && (
            <p className="text-sm text-muted-foreground">{topic.description}</p>
          )}

          <div className="flex flex-wrap gap-4 font-mono text-xs text-muted-foreground">
            {dates.started && (
              <span>
                Started: {new Date(dates.started).toLocaleDateString()}
              </span>
            )}
            {dates.completed && (
              <span>
                Completed: {new Date(dates.completed).toLocaleDateString()}
              </span>
            )}
          </div>

          {topic.slides && topic.slides.length > 0 ? (
            <LabSlideshow slides={topic.slides} ownerId={topic.id} />
          ) : (
            <>
              {topic.keyPoints && topic.keyPoints.length > 0 && (
                <div>
                  <p className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Key Points
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {topic.keyPoints.map((kp, i) => (
                      <li key={i}>{kp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {topic.terminalCommands && topic.terminalCommands.length > 0 && (
                <div>
                  <p className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Terminal Commands
                  </p>
                  <div className="space-y-2">
                    {topic.terminalCommands.map((cmd, i) => (
                      <CodeBlock key={i} command={cmd} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {videoResources.length > 0 && (
            <div>
              <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Watch
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {videoResources.map((r) => (
                  <VideoEmbed key={r.url} url={r.url} title={r.title} />
                ))}
              </div>
            </div>
          )}

          {linkResources.length > 0 && (
            <div>
              <p className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Resources
              </p>
              <ul className="space-y-1 text-sm">
                {linkResources.map((r) => (
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
                ))}
              </ul>
            </div>
          )}

          {quiz && (
            <div className="flex items-center gap-3 rounded-xl border border-brand-orange/25 bg-brand-orange/[0.04] px-3 py-2.5">
              <HelpCircle className="h-4 w-4 shrink-0 text-brand-orange" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-brand-orange">
                  Quick Quiz (
                  <span className="font-mono">{quiz.questions.length}</span>{" "}
                  questions)
                </p>
                {quizAttempt && (
                  <p className="font-mono text-xs text-muted-foreground">
                    Last score: {quizAttempt.score}/{quizAttempt.total}
                  </p>
                )}
              </div>
              <Button
                size="sm"
                variant="teal"
                className="bg-brand-orange hover:bg-brand-orange/90"
                onClick={() => setQuizOpen(true)}
              >
                {quizAttempt ? "Retake" : "Take Quiz"}
              </Button>
            </div>
          )}

          {(status === "completed" || status === "in_progress") && (
            <div>
              <p className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Self-Score
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => handleScore(n)}>
                    <Star
                      className={cn(
                        "h-5 w-5",
                        selfScore && n <= selfScore
                          ? "fill-brand-orange text-brand-orange"
                          : "text-muted-foreground",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Notes
            </p>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleNotesBlur}
              placeholder="Add notes about this topic..."
              className="min-h-[70px] rounded-lg text-sm"
            />
          </div>

          <StatusBadge status={status} className="rounded-md" />
        </div>
      )}

      {quiz && (
        <QuizModal
          open={quizOpen}
          onOpenChange={setQuizOpen}
          title={`Quiz: ${topic.title}`}
          questions={quiz.questions}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  )
}
