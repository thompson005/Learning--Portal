import Image from "next/image"

import { cn } from "@/lib/utils"

/** Official Technieum mark — the ember-gradient "T". */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/technieum-mark.png"
      alt="Technieum"
      width={564}
      height={379}
      priority
      className={cn("h-8 w-auto", className)}
    />
  )
}

export function Logo({
  className,
  wordmarkClassName,
}: {
  className?: string
  wordmarkClassName?: string
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "font-mono text-base font-bold uppercase tracking-wider",
          wordmarkClassName,
        )}
      >
        Technieum
      </span>
    </div>
  )
}
