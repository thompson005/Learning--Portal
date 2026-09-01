import { prisma } from "@/lib/server/db"
import { CURRICULUM } from "@/lib/data/curriculum"

export async function getTraineesWithStatus() {
  const trainees = await prisma.trainee.findMany({
    include: { moduleStatus: true },
    orderBy: { createdAt: "asc" },
  })

  return trainees.map((t) => ({
    id: t.id,
    name: t.name,
    moduleStatus: Object.fromEntries(t.moduleStatus.map((m) => [m.moduleId, m.status])) as Record<
      string,
      0 | 1 | 2
    >,
  }))
}

export async function addTrainee(name: string) {
  return prisma.trainee.create({ data: { name } })
}

export async function removeTrainee(id: string) {
  return prisma.trainee.delete({ where: { id } })
}

export async function updateTraineeModuleStatus(traineeId: string, moduleId: string, status: 0 | 1 | 2) {
  return prisma.traineeModuleStatus.upsert({
    where: { traineeId_moduleId: { traineeId, moduleId } },
    update: { status },
    create: { traineeId, moduleId, status },
  })
}

export function getTraineeCompletionPercent(moduleStatus: Record<string, 0 | 1 | 2>): number {
  const totalTopics = CURRICULUM.reduce((sum, m) => sum + m.topics.length, 0)
  const completedTopics = CURRICULUM.reduce((sum, m) => {
    const status = moduleStatus[m.id] ?? 0
    if (status === 2) return sum + m.topics.length
    if (status === 1) return sum + m.topics.length * 0.5
    return sum
  }, 0)
  return totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100)
}

export function getModuleCohortAvg(
  moduleId: string,
  trainees: { moduleStatus: Record<string, 0 | 1 | 2> }[]
): number {
  if (trainees.length === 0) return 0
  const sum = trainees.reduce((acc, t) => acc + (t.moduleStatus[moduleId] ?? 0), 0)
  return Math.round((sum / (trainees.length * 2)) * 100)
}

export function exportCohortCSV(trainees: { name: string; moduleStatus: Record<string, 0 | 1 | 2> }[]): string {
  const header = ["Module", "Month", "Week", ...trainees.map((t) => t.name), "Cohort Avg %"]
  const rows = CURRICULUM.map((m) => {
    const cells = trainees.map((t) => String(t.moduleStatus[m.id] ?? 0))
    const avg = getModuleCohortAvg(m.id, trainees)
    return [m.name, `Month ${m.month}`, m.weeks.join(","), ...cells, `${avg}%`]
  })
  const summary = [
    "Overall %",
    "",
    "",
    ...trainees.map((t) => `${getTraineeCompletionPercent(t.moduleStatus)}%`),
    "",
  ]
  const csvLines = [header, ...rows, summary].map((r) =>
    r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")
  )
  return csvLines.join("\n")
}
