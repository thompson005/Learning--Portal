// Generates a Workflow script that (1) authors candidate glossary terms per
// module in parallel, (2) dedupes against existing + each other in-script,
// (3) runs a watchdog verify pass in batches, and returns the clean term set.
const fs = require("fs")

const dump = JSON.parse(fs.readFileSync("scripts/topics-dump.json", "utf8"))

// Existing glossary terms (lowercased) so agents don't re-author them.
const existing = (fs.readFileSync("src/lib/data/glossary.ts", "utf8").match(/term: "([^"]+)"/g) || [])
  .map((s) => s.replace(/term: "([^"]+)"/, "$1"))

const modules = dump.map((m) => ({
  track: m.track,
  moduleId: m.moduleId,
  moduleName: m.moduleName,
  topics: m.topics.map((t) => ({
    title: t.title,
    keyPoints: (t.keyPoints || []).slice(0, 6),
  })),
}))

const DATA = JSON.stringify(modules)
const EXISTING = JSON.stringify(existing)

const script = `export const meta = {
  name: 'expand-glossary',
  description: 'Author + fact-check glossary terms for every module across all 3 tracks (author then watchdog-verify)',
  phases: [
    { title: 'Author', detail: 'one agent per module drafts terms' },
    { title: 'Verify', detail: 'watchdog fact-checks batches' },
  ],
}

const MODULES = ${DATA}
const EXISTING = ${EXISTING}

const TERM = {
  type: 'object',
  properties: {
    term: { type: 'string' },
    fullName: { type: 'string' },
    category: { type: 'string' },
    definition: { type: 'string' },
    example: { type: 'string' },
    learnMore: { type: 'string' },
  },
  required: ['term', 'definition', 'category'],
}
const AUTHOR_SCHEMA = {
  type: 'object',
  properties: {
    moduleId: { type: 'string' },
    terms: { type: 'array', items: TERM },
  },
  required: ['moduleId', 'terms'],
}
const VERIFY_SCHEMA = {
  type: 'object',
  properties: { terms: { type: 'array', items: TERM } },
  required: ['terms'],
}

function authorPrompt(m) {
  const vocab = m.topics
    .map((t) => '- ' + t.title + (t.keyPoints.length ? ' :: ' + t.keyPoints.join('; ') : ''))
    .join('\\n')
  return [
    'You are a senior security/AI/cloud instructor building a glossary for a training portal.',
    'Module: ' + m.moduleName + ' (track: ' + m.track + ').',
    '',
    'From the topics below, extract the KEY JARGON a learner would want a hover-definition for: acronyms, tool names, attack/technique names, protocols, standards, core concepts.',
    'Write 8-14 glossary entries. Each entry:',
    '- term: the exact short form as it appears (e.g. "SSRF", "Prompt Injection", "IAM Role"). Keep it short.',
    '- fullName: the expansion if it is an acronym, else "" (empty string).',
    '- category: a 1-2 word bucket (e.g. "Web", "Network", "Cloud/IAM", "AI/LLM", "Crypto", "Tooling", "Attack", "Defense", "Forensics").',
    '- definition: 1-2 sentences, precise and correct, beginner-clear but not dumbed down.',
    '- example: ONE concrete sentence showing it in context.',
    '- learnMore: a short real canonical pointer (e.g. "owasp.org", "attack.mitre.org", "CWE-918", "NIST SP 800-53", "RFC 1918"). If unsure, use "".',
    '',
    'HARD RULES:',
    '- Only real, correct terms. NEVER invent CVE IDs, tool flags, RFC numbers or standards you are not sure of (use "" for learnMore instead).',
    '- Do NOT include any of these already-defined terms: ' + EXISTING.join(', ') + '.',
    '- Prefer terms that actually appear in this module. No duplicates within your own list.',
    '',
    'TOPICS / VOCAB:',
    vocab,
    '',
    'Return moduleId="' + m.moduleId + '" and your terms.',
  ].join('\\n')
}

function verifyPrompt(batch, i) {
  return [
    'You are a rigorous technical FACT-CHECKER (watchdog) for a security/AI/cloud glossary.',
    'For EACH term below, verify: the term is a real, correctly-named concept; the fullName expansion is correct; the definition is accurate and not misleading; the example is correct; the learnMore pointer is real (blank it if dubious).',
    'Return the cleaned list:',
    '- KEEP terms that are correct. Fix small wording/accuracy issues in place.',
    '- DROP terms that are factually wrong, made-up, redundant, or too vague to be useful.',
    '- Keep each entry the same shape (term, fullName, category, definition, example, learnMore).',
    'Be strict: it is better to drop a shaky entry than to ship a wrong definition to learners.',
    '',
    'BATCH ' + i + ':',
    JSON.stringify(batch, null, 2),
  ].join('\\n')
}

phase('Author')
log('Authoring glossary terms for ' + MODULES.length + ' modules')
const authored = await parallel(
  MODULES.map((m) => () =>
    agent(authorPrompt(m), { label: 'gloss:' + m.moduleId, phase: 'Author', schema: AUTHOR_SCHEMA }),
  ),
)

// Dedupe against existing + across modules (first wins).
const seen = new Set(EXISTING.map((t) => t.toLowerCase()))
const uniq = []
for (const r of authored.filter(Boolean)) {
  for (const t of r.terms || []) {
    const k = (t.term || '').toLowerCase().trim()
    if (!k || seen.has(k)) continue
    seen.add(k)
    uniq.push(t)
  }
}
log('Deduped candidate terms: ' + uniq.length)

phase('Verify')
const B = 18
const batches = []
for (let i = 0; i < uniq.length; i += B) batches.push(uniq.slice(i, i + B))
log('Watchdog verifying ' + batches.length + ' batches')
const verified = await parallel(
  batches.map((b, i) => () =>
    agent(verifyPrompt(b, i), { label: 'verify:' + i, phase: 'Verify', schema: VERIFY_SCHEMA }),
  ),
)

const out = []
for (const v of verified.filter(Boolean)) for (const t of v.terms || []) out.push(t)
return { candidates: uniq.length, verified: out.length, terms: out }
`

fs.writeFileSync("scripts/glossary-workflow.js", script)
console.log(
  `Wrote scripts/glossary-workflow.js — ${modules.length} modules, ${existing.length} existing terms to skip`,
)
