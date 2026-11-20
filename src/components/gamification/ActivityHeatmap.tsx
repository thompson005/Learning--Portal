"use client"

import { useEffect, useMemo, useState } from "react"
import { Flame } from "lucide-react"

import { getProgress, getStreak } from "@/lib/store/progress"

const WEEKS = 13
const DAY_MS = 24 * 60 * 60 * 1000
const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

/** Local "yyyy-mm-dd" key (matches the store format — never toISOString/UTC). */
function dayKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

/** Days since the local Monday (Mon=0 … Sun=6). */
function mondayIndex(d: Date): number {
  return (d.getDay() + 6) % 7
}

interface Snapshot {
  active: Set<string>
  streak: ReturnType<typeof getStreak>
}

function read(): Snapshot {
  return {
    active: new Set(getProgress().activityDates ?? []),
    streak: getStreak(),
  }
}

interface Cell {
  key: string
  date: Date
  isActive: boolean
  isToday: boolean
}

/** GitHub-style study-activity heatmap over the last ~13 weeks, in orange
 *  Sharp-UI. Presentational client component: re-reads the progress store on
 *  mount and on `technieum:progress-changed`. */
export function ActivityHeatmap() {
  // Deterministic empty state on first render to keep SSR/CSR markup in sync.
  const [snap, setSnap] = useState<Snapshot>(() => ({
    active: new Set<string>(),
    streak: { current: 0, longest: 0, active: false },
  }))
  const [today, setToday] = useState<Date | null>(null)

  useEffect(() => {
    const refresh = () => {
      setSnap(read())
      setToday(new Date())
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () => window.removeEventListener("technieum:progress-changed", refresh)
  }, [])

  // Build the week-column grid, oldest week first. The last column ends on the
  // Sunday of this week so "today" always sits in the rightmost column.
  const { weeks, totalActive } = useMemo(() => {
    const anchor = today ?? new Date(0)
    // Start of this week's Monday.
    const thisMonday = new Date(anchor)
    thisMonday.setHours(0, 0, 0, 0)
    thisMonday.setDate(thisMonday.getDate() - mondayIndex(anchor))

    const firstMonday = new Date(thisMonday)
    firstMonday.setDate(firstMonday.getDate() - (WEEKS - 1) * 7)

    const todayKey = today ? dayKey(today) : "\u0000"
    const cols: Cell[][] = []
    let count = 0

    for (let w = 0; w < WEEKS; w++) {
      const col: Cell[] = []
      for (let d = 0; d < 7; d++) {
        const date = new Date(firstMonday.getTime() + (w * 7 + d) * DAY_MS)
        const key = dayKey(date)
        const isActive = snap.active.has(key)
        if (isActive && today && date.getTime() <= today.getTime()) count++
        col.push({ key, date, isActive, isToday: key === todayKey })
      }
      cols.push(col)
    }
    return { weeks: cols, totalActive: count }
  }, [snap.active, today])

  // Month labels above columns: show a label when a column's first day starts a
  // new month versus the previous column.
  const monthHeader = useMemo(() => {
    let prev = -1
    return weeks.map((col) => {
      const m = col[0].date.getMonth()
      if (m !== prev) {
        prev = m
        return MONTH_LABELS[m]
      }
      return ""
    })
  }, [weeks])

  const { streak } = snap
  const hasActivity = snap.active.size > 0

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-tile sm:p-6">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Study Activity
          </span>
          <h3 className="font-display text-lg font-semibold text-foreground">
            Last {WEEKS} weeks
          </h3>
        </div>

        {/* Summary stats */}
        <div className="flex items-center gap-5">
          <Stat
            label="Current"
            value={`${streak.current}d`}
            icon={
              <Flame
                className={`h-4 w-4 ${
                  streak.active ? "animate-glow text-brand-orange" : "text-muted-foreground"
                }`}
                aria-hidden
              />
            }
          />
          <Stat label="Longest" value={`${streak.longest}d`} />
          <Stat label="Active days" value={`${totalActive}`} />
        </div>
      </div>

      {hasActivity ? (
        <div className="overflow-x-auto pb-1">
          <div className="inline-flex gap-2">
            {/* Weekday labels */}
            <div className="flex flex-col gap-[3px] pr-1 pt-[18px]">
              {WEEKDAY_LABELS.map((wd, i) => (
                <div
                  key={wd}
                  className="flex h-3 items-center font-mono text-[9px] leading-none text-muted-foreground"
                >
                  {/* Show every other label to keep it light */}
                  {i % 2 === 0 ? wd : ""}
                </div>
              ))}
            </div>

            {/* Week columns */}
            <div className="flex gap-[3px]">
              {weeks.map((col, w) => (
                <div key={w} className="flex flex-col gap-[3px]">
                  {/* Month label row */}
                  <div className="mb-[2px] h-[14px] font-mono text-[9px] leading-none text-muted-foreground">
                    {monthHeader[w]}
                  </div>
                  {col.map((cell) => (
                    <HeatCell key={cell.key} cell={cell} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Less
            </span>
            <span className="h-3 w-3 rounded-[3px] bg-muted" aria-hidden />
            <span className="h-3 w-3 rounded-[3px] bg-brand-orange/20" aria-hidden />
            <span className="h-3 w-3 rounded-[3px] bg-brand-orange/40" aria-hidden />
            <span className="h-3 w-3 rounded-[3px] bg-brand-orange/70" aria-hidden />
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              More
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-muted/40 py-10 text-center">
          <Flame className="h-5 w-5 text-muted-foreground" aria-hidden />
          <p className="font-mono text-xs text-muted-foreground">
            No study activity yet — complete a topic to start your streak.
          </p>
        </div>
      )}
    </div>
  )
}

function HeatCell({ cell }: { cell: Cell }) {
  const dateLabel = cell.date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  const title = `${dateLabel} — ${cell.isActive ? "studied" : "no activity"}`
  return (
    <div
      role="img"
      aria-label={title}
      title={title}
      className={`h-3 w-3 rounded-[3px] ${cell.isActive ? "bg-brand-orange/70" : "bg-muted"} ${
        cell.isToday ? "ring-2 ring-brand-orange ring-offset-1 ring-offset-card" : ""
      }`}
    />
  )
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-end gap-0.5">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="flex items-center gap-1 font-mono text-sm font-semibold text-foreground">
        {icon}
        {value}
      </span>
    </div>
  )
}
