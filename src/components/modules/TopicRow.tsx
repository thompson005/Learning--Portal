"use client"

import { useEffect, useRef, useState } from "react"
import {
  BookText,
  ChevronDown,
  ExternalLink,
  HelpCircle,
  PlayCircle,
  Star,
  Video,
} from "lucide-react"
import { toast } from "sonner"

import { cn, dedupeResources } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui3d/GlassCard"
import { Reveal } from "@/components/ui3d/Reveal"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { CodeBlock } from "@/components/shared/CodeBlock"
import { LabSlideshow } from "@/components/labs/LabSlideshow"
import { ExerciseBlock } from "@/components/exercises/ExerciseBlock"
import { InteractiveText } from "@/components/learn/InteractiveText"
import { VideoEmbed, isEmbeddableVideo } from "@/components/shared/VideoEmbed"
import { Textarea } from "@/components/ui/textarea"
import { QuizModal } from "@/components/quiz/QuizModal"
import {
  getProgress,
  getTopicQuiz,
  getTopicQuizAttempt,
  recordTopicQuizAttempt,
  updateTopicStatus,
  markTopicCompleted,
  setLastTopic,
  getStreak,
} from "@/lib/store/progress"
import { getXp } from "@/lib/store/gamification"
import { TOPIC_SANDBOXES } from "@/components/sandboxes/registry"
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
  const [mode, setMode] = useState<"read" | "watch">("read")
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
  // A video YouTube refuses to play here is skipped: the next one becomes primary.
  const [failedVideos, setFailedVideos] = useState<string[]>([])
  const markVideoFailed = (url: string) =>
    setFailedVideos((f) => (f.includes(url) ? f : [...f, url]))
  const primaryVideo =
    videoResources.find((r) => !failedVideos.includes(r.url)) ??
    videoResources[0]

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

  // Tell the AI tutor what the learner is reading, so "Ask AI" is context-aware.
  useEffect(() => {
    if (!expanded) return
    const parts = [
      topic.description,
      topic.keyPoints?.join(" "),
      topic.slides?.map((s) => `${s.title}. ${s.body}`).join(" "),
    ].filter(Boolean)
    window.dispatchEvent(
      new CustomEvent("technieum:tutor-context", {
        detail: {
          title: topic.title,
          context: parts.join("\n").slice(0, 4000),
        },
      }),
    )
  }, [expanded, topic])

  // Fires the Duolingo-style lesson-complete celebration overlay.
  function fireLessonComplete(xp: number) {
    window.dispatchEvent(
      new CustomEvent("technieum:lesson-complete", {
        detail: { title: topic.title, xp, streak: getStreak().current },
      }),
    )
  }

  // Portal-driven completion — the learner finished the walkthrough. No manual
  // control; marks completed + auto-skips earlier untouched topics.
  function handleAutoComplete() {
    if (status === "completed") return
    const xpBefore = getXp()
    markTopicCompleted(topic.id)
    setStatus("completed")
    const tp = getProgress().topics[topic.id]
    setDates({ started: tp?.dateStarted, completed: tp?.dateCompleted })
    const gained = getXp() - xpBefore
    if (gained > 0) toast.success(`+${gained} XP earned!`)
    fireLessonComplete(gained)
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
      markTopicCompleted(topic.id)
      setStatus("completed")
      const tp = getProgress().topics[topic.id]
      setDates({ started: tp?.dateStarted, completed: tp?.dateCompleted })
      const gained = getXp() - xpBefore
      if (gained > 0) toast.success(`+${gained} XP earned!`)
      fireLessonComplete(gained + 5)
      return
    }
    const gained = getXp() - xpBefore
    if (gained > 0) toast.success(`+${gained} XP earned!`)
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        "glass overflow-hidden rounded-2xl transition-shadow duration-300",
        expanded ? "elev-2" : "lift",
      )}
    >
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
        className={cn(
          "flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40",
          expanded && "border-b border-border/60",
        )}
      >
        <span
          className={cn(
            "grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-xs font-semibold transition-colors",
            expanded
              ? "bg-brand-orange/12 text-brand-orange"
              : "bg-muted/50 text-muted-foreground",
          )}
        >
          {topic.number}
        </span>
        <span className="min-w-0 flex-1 truncate font-display text-sm font-semibold text-foreground">
          {topic.title}
        </span>
        <Badge
          variant={TYPE_VARIANT[topic.type]}
          className="hidden rounded-md sm:inline-flex"
        >
          {topic.type}
        </Badge>
        <StatusBadge status={status} className="rounded-md" />
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            expanded && "rotate-180 text-brand-orange",
          )}
        />
      </div>

      {expanded && (
        <div className="animate-in fade-in slide-in-from-top-2 space-y-4 px-4 py-5 duration-500 [animation-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none md:px-6 md:py-6">
          {topic.description && (
            <Reveal>
              <GlassCard className="border-l-2 border-l-brand-orange/50 p-4 md:p-5">
                <p className="text-[15px] leading-relaxed text-foreground/90">
                  <InteractiveText text={topic.description} />
                </p>
                {(dates.started || dates.completed) && (
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {dates.started && (
                      <span>
                        Started{" "}
                        <span className="text-foreground/70">
                          {new Date(dates.started).toLocaleDateString()}
                        </span>
                      </span>
                    )}
                    {dates.completed && (
                      <span>
                        Completed{" "}
                        <span className="text-foreground/70">
                          {new Date(dates.completed).toLocaleDateString()}
                        </span>
                      </span>
                    )}
                  </div>
                )}
              </GlassCard>
            </Reveal>
          )}

          {!topic.description && (dates.started || dates.completed) && (
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
          )}

          {/* Prefer video? A Read / Watch switch when a video exists. */}
          {primaryVideo && (
            <div className="inline-flex items-center rounded-full border border-border bg-card p-0.5 text-xs shadow-chip">
              <button
                onClick={() => setMode("read")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-colors",
                  mode === "read"
                    ? "bg-brand-orange/10 text-brand-orange"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <BookText className="h-3.5 w-3.5" /> Read
              </button>
              <button
                onClick={() => setMode("watch")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-colors",
                  mode === "watch"
                    ? "bg-brand-orange/10 text-brand-orange"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <PlayCircle className="h-3.5 w-3.5" /> Watch
              </button>
            </div>
          )}

          {mode === "watch" && primaryVideo ? (
            <Reveal delay={60}>
              <div className="space-y-2">
                <VideoEmbed
                  key={primaryVideo.url}
                  url={primaryVideo.url}
                  title={primaryVideo.title}
                  autoplay
                  onError={() => markVideoFailed(primaryVideo.url)}
                />
                <p className="font-mono text-[11px] text-muted-foreground">
                  Prefer reading? Switch to Read above.
                </p>
              </div>
            </Reveal>
          ) : topic.slides && topic.slides.length > 0 ? (
            <Reveal delay={60}>
              <LabSlideshow
                slides={topic.slides}
                ownerId={topic.id}
                onComplete={handleAutoComplete}
              />
            </Reveal>
          ) : (
            <>
              {topic.keyPoints && topic.keyPoints.length > 0 && (
                <Reveal delay={60}>
                  <GlassCard className="p-4 md:p-5">
                    <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Key Points
                    </p>
                    <ul className="space-y-2.5 text-sm leading-relaxed">
                      {topic.keyPoints.map((kp, i) => (
                        <li key={i} className="flex gap-2.5">
                          <span
                            aria-hidden
                            className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange/70"
                          />
                          <span className="text-foreground/90">
                            <InteractiveText text={kp} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </Reveal>
              )}

              {topic.terminalCommands && topic.terminalCommands.length > 0 && (
                <Reveal delay={90}>
                  <GlassCard className="p-4 md:p-5">
                    <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Terminal Commands
                    </p>
                    <div className="space-y-2">
                      {topic.terminalCommands.map((cmd, i) => (
                        <CodeBlock key={i} command={cmd} />
                      ))}
                    </div>
                  </GlassCard>
                </Reveal>
              )}
            </>
          )}

          {/* No embedded video yet — always give a one-tap way to watch one. */}
          {!primaryVideo && (
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                topic.title + " explained",
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-orange hover:underline"
            >
              <Video className="h-4 w-4" /> Prefer to watch? Find a video on
              YouTube
            </a>
          )}

          {topic.exercises && topic.exercises.length > 0 && (
            <Reveal delay={120}>
              <ExerciseBlock exercises={topic.exercises} ownerId={topic.id} />
            </Reveal>
          )}

          {TOPIC_SANDBOXES[topic.id] &&
            (() => {
              const S = TOPIC_SANDBOXES[topic.id]
              return (
                <Reveal delay={140}>
                  <div>
                    <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-brand-orange">
                      Interactive · {S.label}
                    </p>
                    <S.Component />
                  </div>
                </Reveal>
              )
            })()}

          {videoResources.length > 0 && (
            <Reveal delay={150}>
              <GlassCard className="p-4 md:p-5">
                <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Watch
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {videoResources.map((r) => (
                    <VideoEmbed
                      key={r.url}
                      url={r.url}
                      title={r.title}
                      onError={() => markVideoFailed(r.url)}
                    />
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          )}

          {allResources.length > 0 && (
            <Reveal delay={180}>
              <GlassCard className="p-4 md:p-5">
                <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Resources
                </p>
                <ul className="space-y-1.5 text-sm">
                  {allResources.map((r) => (
                    <li key={r.url} className="flex items-center gap-2">
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
                        className="inline-flex min-w-0 items-center gap-1 text-brand-orange hover:underline"
                      >
                        <span className="truncate">{r.title}</span>
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          )}

          {quiz && (
            <Reveal delay={210}>
              <div className="flex items-center gap-3 rounded-2xl border border-brand-orange/25 bg-brand-orange/[0.05] px-4 py-3 elev-1">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-orange/12">
                  <HelpCircle className="h-5 w-5 text-brand-orange" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-brand-orange">
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
            </Reveal>
          )}

          {(status === "completed" || status === "in_progress") && (
            <Reveal delay={240}>
              <GlassCard className="p-4 md:p-5">
                <p className="mb-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Self-Score
                </p>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => handleScore(n)}
                      className="rounded-md outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-brand-orange/40 motion-reduce:hover:scale-100"
                    >
                      <Star
                        className={cn(
                          "h-6 w-6 transition-colors",
                          selfScore && n <= selfScore
                            ? "fill-brand-orange text-brand-orange"
                            : "text-muted-foreground/50",
                        )}
                      />
                    </button>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          )}

          <Reveal delay={270}>
            <GlassCard className="p-4 md:p-5">
              <p className="mb-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Notes
              </p>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={handleNotesBlur}
                placeholder="Add notes about this topic..."
                className="min-h-[70px] rounded-lg bg-transparent text-sm"
              />
            </GlassCard>
          </Reveal>

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
