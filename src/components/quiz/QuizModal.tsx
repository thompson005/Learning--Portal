"use client"

import { useState } from "react"
import { Award, CheckCircle2, RotateCcw, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { QuizQuestion } from "@/types"

export function QuizModal({
  open,
  onOpenChange,
  title,
  questions,
  onComplete,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  questions: QuizQuestion[]
  onComplete: (score: number, total: number, answers: number[]) => void
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null))
  const [submitted, setSubmitted] = useState(false)

  function handleSelect(qIndex: number, optIndex: number) {
    if (submitted) return
    setAnswers((prev) => {
      const next = [...prev]
      next[qIndex] = optIndex
      return next
    })
  }

  function handleSubmit() {
    setSubmitted(true)
    const score = questions.reduce(
      (sum, q, i) => sum + (answers[i] === q.correctIndex ? 1 : 0),
      0
    )
    onComplete(score, questions.length, answers.map((a) => a ?? -1))
  }

  function handleRetake() {
    setAnswers(questions.map(() => null))
    setSubmitted(false)
  }

  function handleClose(next: boolean) {
    if (!next) {
      setAnswers(questions.map(() => null))
      setSubmitted(false)
    }
    onOpenChange(next)
  }

  const score = submitted
    ? questions.reduce((sum, q, i) => sum + (answers[i] === q.correctIndex ? 1 : 0), 0)
    : 0
  const allAnswered = answers.every((a) => a !== null)

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-semibold">{title}</DialogTitle>
          <DialogDescription>
            {submitted
              ? `You scored ${score}/${questions.length}.`
              : `${questions.length} question${questions.length > 1 ? "s" : ""} — select the best answer for each.`}
          </DialogDescription>
        </DialogHeader>

        {submitted && (
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl border px-4 py-3",
              score === questions.length
                ? "border-brand-green/30 bg-brand-green/10 text-brand-green"
                : score >= questions.length / 2
                ? "border-brand-orange/30 bg-brand-orange/10 text-brand-orange"
                : "border-brand-red/30 bg-brand-red/10 text-brand-red"
            )}
          >
            <Award className="h-5 w-5" />
            <span className="text-sm font-semibold">
              <span className="font-mono">
                {score}/{questions.length}
              </span>{" "}
              correct — <span className="font-mono">{Math.round((score / questions.length) * 100)}%</span>
            </span>
          </div>
        )}

        <div className="max-h-[55vh] space-y-6 overflow-y-auto pr-1">
          {questions.map((q, qi) => (
            <div key={qi} className="space-y-2">
              <p className="text-sm font-semibold">
                <span className="font-mono text-muted-foreground">{qi + 1}.</span> {q.question}
              </p>
              <div className="space-y-1.5">
                {q.options.map((opt, oi) => {
                  const isSelected = answers[qi] === oi
                  const isCorrect = oi === q.correctIndex
                  return (
                    <button
                      key={oi}
                      onClick={() => handleSelect(qi, oi)}
                      disabled={submitted}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                        !submitted && isSelected && "border-brand-orange bg-brand-orange/10",
                        !submitted && !isSelected && "border-border hover:bg-muted",
                        submitted && isCorrect && "border-brand-green/40 bg-brand-green/10",
                        submitted && isSelected && !isCorrect && "border-brand-red/40 bg-brand-red/10",
                        submitted && !isSelected && !isCorrect && "border-border opacity-60"
                      )}
                    >
                      {submitted && isCorrect && <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-green" />}
                      {submitted && isSelected && !isCorrect && <XCircle className="h-4 w-4 shrink-0 text-brand-red" />}
                      <span>{opt}</span>
                    </button>
                  )
                })}
              </div>
              {submitted && q.explanation && (
                <p className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">{q.explanation}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          {submitted ? (
            <Button variant="outline" onClick={handleRetake}>
              <RotateCcw className="h-4 w-4" /> Retake
            </Button>
          ) : (
            <Button
              variant="teal"
              className="bg-brand-orange hover:bg-brand-orange/90"
              onClick={handleSubmit}
              disabled={!allAnswered}
            >
              Submit Quiz
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
