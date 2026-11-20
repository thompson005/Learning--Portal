"use client"

import { activeCurriculum, activeLabs, getActiveTrack } from "@/lib/data/tracks/registry"
import { useActiveTrackId } from "@/lib/data/tracks/useTrack"
import { ModuleCard } from "@/components/modules/ModuleCard"
import { MeshGradient } from "@/components/ui3d/MeshGradient"
import { TiltCard } from "@/components/ui3d/TiltCard"
import { Reveal } from "@/components/ui3d/Reveal"

export default function ModulesPage() {
  useActiveTrackId() // re-render on track switch
  const curriculum = activeCurriculum()
  const track = getActiveTrack()

  const labCounts = activeLabs().reduce<Record<string, number>>((acc, lab) => {
    acc[lab.moduleId] = (acc[lab.moduleId] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <section className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-10">
        <MeshGradient />
        <div className="relative">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {track.name}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Modules
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            All {curriculum.length} modules of the {track.name} track.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {curriculum.map((mod, i) => (
          <Reveal
            key={mod.id}
            delay={Math.min(i * 50, 400)}
            className="h-full"
          >
            <TiltCard className="h-full">
              <ModuleCard module={mod} labCount={labCounts[mod.id] ?? 0} />
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
