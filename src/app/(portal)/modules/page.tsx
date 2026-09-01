import { CURRICULUM } from "@/lib/data/curriculum"
import { LABS } from "@/lib/data/labs"
import { ModuleCard } from "@/components/modules/ModuleCard"

export default function ModulesPage() {
  const labCounts = LABS.reduce<Record<string, number>>((acc, lab) => {
    acc[lab.moduleId] = (acc[lab.moduleId] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">Curriculum</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Modules
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          All {CURRICULUM.length} modules of the offensive security curriculum.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CURRICULUM.map((mod) => (
          <ModuleCard key={mod.id} module={mod} labCount={labCounts[mod.id] ?? 0} />
        ))}
      </div>
    </div>
  )
}
