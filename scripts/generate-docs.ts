/**
 * Generates human-readable Markdown snapshots of every content data file
 * (curriculum, labs, glossary, weekly plan, quizzes) into docs/.
 * Run with: npm run docs:generate
 */
import fs from "node:fs"
import path from "node:path"

import { CURRICULUM } from "../src/lib/data/curriculum"
import { LABS } from "../src/lib/data/labs"
import { GLOSSARY } from "../src/lib/data/glossary"
import { WEEKLY_PLAN } from "../src/lib/data/weeklyPlan"
import { TOPIC_QUIZZES } from "../src/lib/data/topicQuizzes"
import { MODULE_QUIZZES } from "../src/lib/data/moduleQuizzes"
import { RESOURCE_ADDITIONS } from "../src/lib/data/resourceAdditions"
import type { Resource } from "../src/types"

const DOCS_DIR = path.join(__dirname, "..", "docs")
fs.mkdirSync(DOCS_DIR, { recursive: true })

function resourceLine(r: Resource): string {
  return `- [${r.title}](${r.url}) _(${r.type})_`
}

function allResourcesFor(id: string, base?: Resource[]): Resource[] {
  const seen = new Set<string>()
  const result: Resource[] = []
  for (const r of [...(base ?? []), ...(RESOURCE_ADDITIONS[id] ?? [])]) {
    if (seen.has(r.url)) continue
    seen.add(r.url)
    result.push(r)
  }
  return result
}

// ---------------------------------------------------------------------------
// curriculum.md
// ---------------------------------------------------------------------------
let curriculumMd = `# Technieum Curriculum — ${CURRICULUM.length} Modules\n\n`
curriculumMd += `_Auto-generated from \`src/lib/data/curriculum.ts\`. Do not edit by hand — run \`npm run docs:generate\`._\n\n`
curriculumMd += `Total modules: ${CURRICULUM.length} · Total topics: ${CURRICULUM.reduce((s, m) => s + m.topics.length, 0)}\n\n---\n\n`

for (const mod of CURRICULUM) {
  curriculumMd += `## ${mod.name}\n\n`
  curriculumMd += `**Month ${mod.month}** · Week${mod.weeks.length > 1 ? "s" : ""} ${mod.weeks.join("-")} · ${mod.topics.length} topics\n\n`
  curriculumMd += `${mod.description}\n\n`
  curriculumMd += `**Learning Outcomes:**\n\n`
  for (const o of mod.outcomes) curriculumMd += `- ${o}\n`
  curriculumMd += `\n`

  const modResources = allResourcesFor(mod.id, mod.resources)
  if (modResources.length > 0) {
    curriculumMd += `**Module Resources:**\n\n`
    for (const r of modResources) curriculumMd += `${resourceLine(r)}\n`
    curriculumMd += `\n`
  }

  const modQuiz = MODULE_QUIZZES.find((q) => q.moduleId === mod.id)
  if (modQuiz) {
    curriculumMd += `**Module Quiz (${modQuiz.questions.length} questions):**\n\n`
    modQuiz.questions.forEach((q, i) => {
      curriculumMd += `${i + 1}. ${q.question}\n`
      q.options.forEach((opt, oi) => {
        curriculumMd += `   - ${oi === q.correctIndex ? "**" : ""}${opt}${oi === q.correctIndex ? "** ✓" : ""}\n`
      })
      if (q.explanation) curriculumMd += `   > ${q.explanation}\n`
    })
    curriculumMd += `\n`
  }

  curriculumMd += `### Topics\n\n`
  for (const topic of mod.topics) {
    curriculumMd += `#### ${topic.number}. ${topic.title} \`[${topic.type}]\` — Week ${topic.week}\n\n`
    if (topic.description) curriculumMd += `${topic.description}\n\n`
    if (topic.keyPoints && topic.keyPoints.length > 0) {
      curriculumMd += `**Key Points:**\n\n`
      for (const kp of topic.keyPoints) curriculumMd += `- ${kp}\n`
      curriculumMd += `\n`
    }
    if (topic.terminalCommands && topic.terminalCommands.length > 0) {
      curriculumMd += "```bash\n"
      for (const cmd of topic.terminalCommands) curriculumMd += `${cmd}\n`
      curriculumMd += "```\n\n"
    }
    const topicResources = allResourcesFor(topic.id, topic.resources)
    if (topicResources.length > 0) {
      curriculumMd += `**Resources:**\n\n`
      for (const r of topicResources) curriculumMd += `${resourceLine(r)}\n`
      curriculumMd += `\n`
    }
    const topicQuiz = TOPIC_QUIZZES.find((q) => q.topicId === topic.id)
    if (topicQuiz) {
      curriculumMd += `**Quick Quiz:**\n\n`
      topicQuiz.questions.forEach((q, i) => {
        curriculumMd += `${i + 1}. ${q.question}\n`
        q.options.forEach((opt, oi) => {
          curriculumMd += `   - ${oi === q.correctIndex ? "**" : ""}${opt}${oi === q.correctIndex ? "** ✓" : ""}\n`
        })
        if (q.explanation) curriculumMd += `   > ${q.explanation}\n`
      })
      curriculumMd += `\n`
    }
  }
  curriculumMd += `\n---\n\n`
}
fs.writeFileSync(path.join(DOCS_DIR, "curriculum.md"), curriculumMd, "utf8")

// ---------------------------------------------------------------------------
// labs.md
// ---------------------------------------------------------------------------
let labsMd = `# Technieum Labs — 38 Hands-On Labs\n\n`
labsMd += `_Auto-generated from \`src/lib/data/labs.ts\`. Do not edit by hand — run \`npm run docs:generate\`._\n\n---\n\n`

for (const lab of LABS) {
  labsMd += `## ${lab.id}: ${lab.title}\n\n`
  labsMd += `**Week ${lab.week}** · Module \`${lab.moduleId}\` · ${lab.platform} · ${lab.difficulty}\n\n`
  labsMd += `${lab.description}\n\n`
  if (lab.dockerImage) {
    labsMd += `**Docker:** \`docker run -d -p 18080:${lab.containerPort} ${lab.dockerImage}\`\n\n`
  }
  if (lab.completionIndicator) {
    labsMd += `**Completion evidence:** ${lab.completionIndicator}\n\n`
  }
  if (lab.instructions && lab.instructions.length > 0) {
    labsMd += `**Instructions:**\n\n`
    lab.instructions.forEach((step, i) => (labsMd += `${i + 1}. ${step}\n`))
    labsMd += `\n`
  }
  const labResources = allResourcesFor(lab.id, lab.resources)
  if (labResources.length > 0) {
    labsMd += `**Resources:**\n\n`
    for (const r of labResources) labsMd += `${resourceLine(r)}\n`
    labsMd += `\n`
  }
  labsMd += `---\n\n`
}
fs.writeFileSync(path.join(DOCS_DIR, "labs.md"), labsMd, "utf8")

// ---------------------------------------------------------------------------
// glossary.md
// ---------------------------------------------------------------------------
let glossaryMd = `# Technieum Glossary — ${GLOSSARY.length} Terms\n\n`
glossaryMd += `_Auto-generated from \`src/lib/data/glossary.ts\`. Do not edit by hand — run \`npm run docs:generate\`._\n\n---\n\n`

for (const term of GLOSSARY) {
  glossaryMd += `## ${term.term} (${term.fullName})\n\n`
  glossaryMd += `**Category:** ${term.category}\n\n`
  glossaryMd += `${term.definition}\n\n`
  glossaryMd += `> **Example:** ${term.example}\n\n`
  if (term.learnMore && term.learnMore !== "—") glossaryMd += `**Learn more:** ${term.learnMore}\n\n`
  glossaryMd += `---\n\n`
}
fs.writeFileSync(path.join(DOCS_DIR, "glossary.md"), glossaryMd, "utf8")

// ---------------------------------------------------------------------------
// weekly-plan.md
// ---------------------------------------------------------------------------
const planMonths = new Set(WEEKLY_PLAN.map((w) => w.month)).size
let planMd = `# Technieum ${planMonths}-Month Plan — ${WEEKLY_PLAN.length} Weeks\n\n`
planMd += `_Auto-generated from \`src/lib/data/weeklyPlan.ts\`. Do not edit by hand — run \`npm run docs:generate\`._\n\n---\n\n`

for (const week of WEEKLY_PLAN) {
  planMd += `## Week ${week.week} — ${week.theme} (Month ${week.month})\n\n`
  planMd += `**Modules:** ${week.modules.join(", ")}\n\n`
  planMd += `**Key Topics:** ${week.keyTopics}\n\n`
  planMd += `**Labs:** ${week.labs.join(", ")}\n\n`
  planMd += `**Checkpoint:** ${week.checkpoint}\n\n`
  planMd += `**Resources:** ${week.resources.join(" · ")}\n\n`
  planMd += `---\n\n`
}
fs.writeFileSync(path.join(DOCS_DIR, "weekly-plan.md"), planMd, "utf8")

console.log(`Generated docs in ${DOCS_DIR}:`)
console.log(`  curriculum.md (${CURRICULUM.length} modules, ${CURRICULUM.reduce((s, m) => s + m.topics.length, 0)} topics)`)
console.log(`  labs.md (${LABS.length} labs)`)
console.log(`  glossary.md (${GLOSSARY.length} terms)`)
console.log(`  weekly-plan.md (${WEEKLY_PLAN.length} weeks)`)
