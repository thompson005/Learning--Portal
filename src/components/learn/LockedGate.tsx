"use client"

import Link from "next/link"
import { ArrowRight, Lock } from "lucide-react"

import { GlassCard } from "@/components/ui3d/GlassCard"
import { MeshGradient } from "@/components/ui3d/MeshGradient"
import { Button } from "@/components/ui/button"

/** Shown in place of a module's content when it's locked behind an earlier one. */
export function LockedGate({
  moduleName,
  requiredId,
  requiredName,
}: {
  moduleName: string
  requiredId?: string
  requiredName?: string
}) {
  return (
    <GlassCard strong className="relative overflow-hidden p-8 text-center md:p-12">
      <MeshGradient strength={0.6} />
      <div className="relative mx-auto max-w-md">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
          <Lock className="h-8 w-8" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold text-foreground">
          {moduleName} is locked
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {requiredName
            ? `Finish ${requiredName} first — complete every topic in it and this module unlocks automatically.`
            : "Complete the previous module to unlock this one."}
        </p>
        {requiredId && (
          <Button asChild size="lg" className="mt-6">
            <Link href={`/modules/${requiredId}`}>
              Go to {requiredName} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
        <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Modules unlock in order
        </p>
      </div>
    </GlassCard>
  )
}
