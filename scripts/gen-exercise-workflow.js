// Generates a Workflow script with the per-module topic data embedded as a
// literal (Workflow scripts have no filesystem access, so data must be inline).
const fs = require("fs")

const dump = JSON.parse(fs.readFileSync("scripts/topics-dump.json", "utf8"))

// Only ask agents to author topics that don't already have exercises.
const modules = dump
  .map((m) => ({
    ...m,
    topics: m.topics.filter((t) => !t.hasExercises),
  }))
  .filter((m) => m.topics.length > 0)

const DATA = JSON.stringify(modules)

const script = `export const meta = {
  name: 'author-exercises',
  description: 'Author interactive drag-order / match / fill-blank exercises for every topic across all 3 tracks',
  phases: [{ title: 'Author', detail: 'one agent per module' }],
}

const MODULES = ${DATA}

const EXERCISE_ITEM = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: ['order', 'match', 'fill-blank'] },
    prompt: { type: 'string' },
    items: { type: 'array', items: { type: 'string' } },
    pairs: {
      type: 'array',
      items: {
        type: 'object',
        properties: { left: { type: 'string' }, right: { type: 'string' } },
        required: ['left', 'right'],
      },
    },
    template: { type: 'string' },
    blanks: { type: 'array', items: { type: 'string' } },
    distractors: { type: 'array', items: { type: 'string' } },
    explanation: { type: 'string' },
  },
  required: ['type', 'prompt', 'explanation'],
}

const SCHEMA = {
  type: 'object',
  properties: {
    moduleId: { type: 'string' },
    topics: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          topicId: { type: 'string' },
          exercises: { type: 'array', items: EXERCISE_ITEM },
        },
        required: ['topicId', 'exercises'],
      },
    },
  },
  required: ['moduleId', 'topics'],
}

function buildPrompt(mod) {
  const topics = mod.topics
    .map((t) => {
      const kp = (t.keyPoints || []).map((k) => '  - ' + k).join('\\n')
      return 'TOPIC id=' + t.id + ' | ' + t.title + '\\n' + (t.description || '') + (kp ? '\\nKey points:\\n' + kp : '')
    })
    .join('\\n\\n')

  return [
    'You are an expert cybersecurity instructor authoring hands-on interactive exercises for a professional training portal.',
    'Module: ' + mod.moduleName + ' (track: ' + mod.track + ').',
    '',
    'For EACH topic below, write EXACTLY 2 interactive exercises grounded strictly in that topic\\'s own content. Vary the types across the two (do not make both the same type unless the content only suits one).',
    '',
    'Exercise types and their required fields:',
    '- "order": reorder steps into the correct sequence. Provide "items" as a string[] IN THE CORRECT ORDER (the UI shuffles them). 3-5 items. Use for processes, kill-chains, attack steps, protocol handshakes, cycles.',
    '- "match": match left items to right items. Provide "pairs" as [{left,right}] ALREADY CORRECTLY ALIGNED (the UI shuffles the right column). 3-5 pairs. Use for term->definition, tool->purpose, port->service, attack->defense, header->meaning.',
    '- "fill-blank": fill blanks in a command or sentence. Provide "template" with each blank marked as exactly three underscores ___ , "blanks" as the correct token for each blank IN ORDER (count MUST equal the number of ___ in template), and "distractors" as 1-3 plausible-but-wrong tokens. Use for commands, flags, syntax, key facts.',
    '',
    'Every exercise MUST have a "prompt" (the instruction shown to the learner) and an "explanation" (shown after a correct solve — 1-2 sentences on why).',
    '',
    'Hard rules:',
    '- Factually correct. Do NOT invent CVE IDs, tool flags, ports, or command syntax you are unsure of.',
    '- "order" items must have ONE unambiguous correct sequence.',
    '- "match" pairs must be unambiguous (no right value that fits two lefts).',
    '- For "fill-blank", the number of ___ markers in template MUST equal blanks.length.',
    '- Keep item/pair/token text short (a few words to one line). Keep prompts concise.',
    '- Ground everything in the provided content; no outside tangents.',
    '',
    'Return moduleId="' + mod.moduleId + '" and a topics array with one entry per topic below (topicId + its 2 exercises).',
    '',
    'TOPICS:',
    topics,
  ].join('\\n')
}

phase('Author')
log('Authoring exercises for ' + MODULES.length + ' modules')

const results = await parallel(
  MODULES.map((mod) => () =>
    agent(buildPrompt(mod), {
      label: 'ex:' + mod.moduleId,
      phase: 'Author',
      schema: SCHEMA,
    }),
  ),
)

return results.filter(Boolean)
`

fs.writeFileSync("scripts/ex-workflow.js", script)
console.log(
  `Wrote scripts/ex-workflow.js — ${modules.length} modules, ${modules.reduce((s, m) => s + m.topics.length, 0)} topics to author`,
)
