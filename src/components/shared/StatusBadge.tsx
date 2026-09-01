import { Check, Circle, Clock, SkipForward } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Status } from "@/types"

const CONFIG: Record<Status, { label: string; className: string; icon: React.ElementType }> = {
  not_started: {
    label: "Not Started",
    className: "bg-brand-red/15 text-brand-red border-brand-red/30",
    icon: Circle,
  },
  in_progress: {
    label: "In Progress",
    className: "bg-brand-orange/15 text-brand-orange border-brand-orange/30",
    icon: Clock,
  },
  completed: {
    label: "Completed",
    className: "bg-brand-green/15 text-brand-green border-brand-green/30",
    icon: Check,
  },
  skipped: {
    label: "Skipped",
    className: "bg-brand-purple/15 text-brand-purple border-brand-purple/30",
    icon: SkipForward,
  },
}

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const { label, className: colorClass, icon: Icon } = CONFIG[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        colorClass,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  )
}
