"use client"

import { cn } from "@/lib/utils"

// Glassmorphic surface. Default is a frosted card; `strong` is more opaque for
// content-heavy panels; `lift` adds a spring hover-raise.
export function GlassCard({
  children,
  className,
  strong = false,
  lift = false,
  as: Tag = "div",
}: {
  children: React.ReactNode
  className?: string
  strong?: boolean
  lift?: boolean
  as?: React.ElementType
}) {
  return (
    <Tag
      className={cn(
        strong ? "glass-strong" : "glass",
        "rounded-2xl",
        lift && "lift",
        className,
      )}
    >
      {children}
    </Tag>
  )
}
