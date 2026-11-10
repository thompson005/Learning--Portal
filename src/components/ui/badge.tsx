import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.05em] transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        teal: "border-transparent bg-brand-teal/15 text-brand-teal",
        orange: "border-transparent bg-brand-orange/15 text-brand-orange",
        green: "border-transparent bg-brand-green/15 text-brand-green",
        red: "border-transparent bg-brand-red/15 text-brand-red",
        purple: "border-transparent bg-brand-purple/15 text-brand-purple",
        blue: "border-transparent bg-brand-blue/15 text-brand-blue",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
