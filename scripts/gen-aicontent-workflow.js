// Generates a Workflow that DEEPENS the AI Security track: one author agent per
// AI module researches the web and rewrites each topic into a from-basics,
// interactive lesson (rich markdown body + reveals + per-slide checks + simple
// diagrams); a watchdog verifies each module for accuracy + well-formedness.
const fs = require("fs")

const dump = JSON.parse(fs.readFileSync("scripts/topics-dump.json", "utf8"))
const ai = dump.filter((m) => m.track === "ai")

const modules = ai.map((m) => ({
  moduleId: m.moduleId,
  moduleName: m.moduleName,
  topics: m.topics.map((t) => ({
    id: t.id,
    title: t.title,
    description: (t.description || "").slice(0, 400),
    keyPoints: (t.keyPoints || []).slice(0, 6),
  })),
}))

const DATA = JSON.stringify(modules)

const script = `export const meta = {
  name: 'deepen-ai-security',
  description: 'Research + rewrite the AI Security track into deep, from-basics, interactive lessons (author then watchdog-verify)',
  phases: [
    { title: 'Author', detail: 'one agent per AI module, with web research' },
    { title: 'Verify', detail: 'watchdog checks accuracy + shape' },
  ],
}

const MODULES = ${DATA}

const CHECK = {
  type: 'object',
  properties: {
    question: { type: 'string' },
    options: { type: 'array', items: { type: 'string' } },
    correctIndex: { type: 'number' },
    explanation: { type: 'string' },
  },
  required: ['question', 'options', 'correctIndex'],
}
const DIAGRAM = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: ['flow-chain', 'comparison'] },
    steps: {
      type: 'array',
      items: {
        type: 'object',
        properties: { label: { type: 'string' }, detail: { type: 'string' } },
        required: ['label'],
      },
    },
    columns: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          label: { type: 'string' },
          points: { type: 'array', items: { type: 'string' } },
          highlighted: { type: 'boolean' },
        },
        required: ['label', 'points'],
      },
    },
  },
  required: ['type'],
}
const SLIDE = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    body: { type: 'string' },
    check: CHECK,
    diagram: DIAGRAM,
  },
  required: ['title', 'body'],
}
const TOPIC = {
  type: 'object',
  properties: {
    topicId: { type: 'string' },
    description: { type: 'string' },
    slides: { type: 'array', items: SLIDE },
  },
  required: ['topicId', 'slides'],
}
const MODULE_SCHEMA = {
  type: 'object',
  properties: {
    moduleId: { type: 'string' },
    topics: { type: 'array', items: TOPIC },
  },
  required: ['moduleId', 'topics'],
}

function authorPrompt(m) {
  const topics = m.topics
    .map((t) => 'TOPIC id=' + t.id + ' | ' + t.title + '\\n  now: ' + (t.description || '') + (t.keyPoints.length ? '\\n  points: ' + t.keyPoints.join('; ') : ''))
    .join('\\n\\n')
  return [
    'You are a world-class AI-security instructor. REWRITE the topics of this module into deep, genuinely interactive, from-ABSOLUTE-basics lessons. The current content is too shallow — go much deeper and clearer.',
    'Module: ' + m.moduleName + '.',
    '',
    'RESEARCH FIRST: use web search to ground everything in current, correct, real AI-security knowledge — OWASP LLM Top 10 (2025), prompt injection + jailbreak techniques, data/model poisoning, supply chain, agent/MCP risks, real incidents, named defenses (e.g. guardrails, PyRIT, garak). Cite real tools/standards. NEVER invent CVE IDs, benchmark numbers, or sources you are unsure of.',
    '',
    'For EACH topic, output:',
    '- description: 2-3 sentences, assumes zero prior knowledge, frames WHY it matters.',
    '- slides: 6-10 progressive slides. Build from first principles to real attacks to defenses. Each slide:',
    '  * title: short.',
    '  * body: 3-6 sentences, beginner-first, with a concrete real-world ANALOGY and a WORKED EXAMPLE. Use light markdown: **bold** for key terms, backtick code for payloads/commands/APIs, and ||hidden answer|| for a predict-then-reveal moment (put the answer to a posed question inside ||...||). Make at least half the slides contain a ||reveal|| or a check.',
    '  * check (most slides): a 2-4 option recall question with correctIndex (0-based) + a one-line explanation. Vary the correct position.',
    '  * diagram (where it clarifies): EITHER {"type":"flow-chain","steps":[{"label":"..","detail":".."}, ...]} for a process/attack chain (3-6 steps), OR {"type":"comparison","columns":[{"label":"..","points":["..",".."],"highlighted":true?}, ...]} for attack-vs-defense / safe-vs-unsafe (2-3 columns). Use ONLY these two diagram shapes, exactly.',
    '',
    'Go DEEP. A learner should finish genuinely understanding the topic, not just reading definitions. Keep it accurate.',
    '',
    'Return moduleId="' + m.moduleId + '" with one entry per topic below.',
    '',
    'TOPICS:',
    topics,
  ].join('\\n')
}

function verifyPrompt(authored, m) {
  return [
    'You are a strict AI-security FACT-CHECKER + editor (watchdog). Review this rewritten module. Fix or remove anything inaccurate, hallucinated (fake CVEs/tools/numbers), or misleading. Ensure every check has a valid correctIndex pointing at a genuinely correct option, every diagram is one of the two allowed shapes and well-formed, and ||reveals|| actually hide an answer. Keep the depth and the interactive elements. Keep the same JSON shape.',
    'Return the corrected module (moduleId + topics).',
    '',
    'MODULE ' + m.moduleId + ':',
    JSON.stringify(authored).slice(0, 120000),
  ].join('\\n')
}

phase('Author')
log('Deepening ' + MODULES.length + ' AI-security modules (with web research)')

const results = await pipeline(
  MODULES,
  (m) => agent(authorPrompt(m), { label: 'ai:' + m.moduleId, phase: 'Author', schema: MODULE_SCHEMA }),
  (authored, m) =>
    authored
      ? agent(verifyPrompt(authored, m), { label: 'verify:' + m.moduleId, phase: 'Verify', schema: MODULE_SCHEMA })
      : null,
)

return results.filter(Boolean)
`

fs.writeFileSync("scripts/aicontent-workflow.js", script)
console.log(
  `Wrote scripts/aicontent-workflow.js — ${modules.length} AI modules, ${modules.reduce((s, m) => s + m.topics.length, 0)} topics`,
)
