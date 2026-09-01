import { CheckCircle2, FlaskConical, BookOpen } from "lucide-react"

import type { RecentActivityItem } from "@/lib/store/progress"

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function RecentActivity({ items }: { items: RecentActivityItem[] }) {
  if (items.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        No completed items yet — mark a topic or lab complete to see it here.
      </p>
    )
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={`${item.kind}-${item.id}`} className="flex items-center gap-3">
          <div className="rounded-full bg-brand-green/10 p-1.5">
            <CheckCircle2 className="h-4 w-4 text-brand-green" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{item.title}</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              {item.kind === "lab" ? <FlaskConical className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
              {item.moduleId.toUpperCase()}
            </p>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(item.date)}</span>
        </li>
      ))}
    </ul>
  )
}
