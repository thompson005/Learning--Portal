import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
        <Icon className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <p className="font-display text-base font-semibold text-foreground">
          {title}
        </p>
        <p className="mx-auto max-w-xs text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {actionLabel && actionHref && (
        <Button asChild size="sm" className="mt-1">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  )
}
