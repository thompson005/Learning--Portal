import { CheckCircle2, FlaskConical, CalendarDays, TrendingUp } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export function StatsCards({
  topicsCompleted,
  topicsTotal,
  labsCompleted,
  labsTotal,
  currentWeek,
  percentComplete,
}: {
  topicsCompleted: number
  topicsTotal: number
  labsCompleted: number
  labsTotal: number
  currentWeek: number
  percentComplete: number
}) {
  const stats = [
    {
      label: "Topics Completed",
      value: `${topicsCompleted}/${topicsTotal}`,
      icon: CheckCircle2,
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
      border: "border-t-brand-teal",
    },
    {
      label: "Labs Completed",
      value: `${labsCompleted}/${labsTotal}`,
      icon: FlaskConical,
      color: "text-brand-purple",
      bg: "bg-brand-purple/10",
      border: "border-t-brand-purple",
    },
    {
      label: "Current Week",
      value: `Week ${currentWeek}`,
      icon: CalendarDays,
      color: "text-brand-orange",
      bg: "bg-brand-orange/10",
      border: "border-t-brand-orange",
    },
    {
      label: "Overall Progress",
      value: `${percentComplete}%`,
      icon: TrendingUp,
      color: "text-brand-green",
      bg: "bg-brand-green/10",
      border: "border-t-brand-green",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {stats.map((s) => (
        <Card key={s.label} className={`border-t-[3px] ${s.border}`}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className={`rounded-lg p-2 ${s.bg}`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-bold leading-tight">{s.value}</p>
              <p className="truncate text-xs text-muted-foreground">{s.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
