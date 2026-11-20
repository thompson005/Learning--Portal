// Generalized content-deepening workflow for the CYBER + CLOUD tracks.
// One author agent per module (track-aware prompt, web research), then a
// watchdog verify agent per module. Output: {moduleId, topics:[{topicId,
// description, slides:[{title, body, check?, diagram?}]}]}.
const fs = require("fs")

const dump = JSON.parse(fs.readFileSync("scripts/topics-dump.json", "utf8"))
const modsSrc = dump.filter((m) => m.track === "cyber" || m.track === "cloud")

const modules = modsSrc.map((m) => ({
  track: m.track,
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
  name: 'deepen-cyber-cloud',
  description: 'Research + rewrite the Cyber & Cloud tracks into deep, from-basics, interactive lessons (OWASP extra-deep); author then watchdog-verify',
  phases: [
    { title: 'Author', detail: 'one agent per module, web research' },
    { title: 'Verify', detail: 'watchdog checks accuracy + shape' },
  ],
}

const MODULES = ${DATA}

const CHECK = { type: 'object', properties: { question: { type: 'string' }, options: { type: 'array', items: { type: 'string' } }, correctIndex: { type: 'number' }, explanation: { type: 'string' } }, required: ['question', 'options', 'correctIndex'] }
const DIAGRAM = { type: 'object', properties: { type: { type: 'string', enum: ['flow-chain', 'comparison'] }, steps: { type: 'array', items: { type: 'object', properties: { label: { type: 'string' }, detail: { type: 'string' } }, required: ['label'] } }, columns: { type: 'array', items: { type: 'object', properties: { label: { type: 'string' }, points: { type: 'array', items: { type: 'string' } }, highlighted: { type: 'boolean' } }, required: ['label', 'points'] } } }, required: ['type'] }
const SLIDE = { type: 'object', properties: { title: { type: 'string' }, body: { type: 'string' }, check: CHECK, diagram: DIAGRAM }, required: ['title', 'body'] }
const TOPIC = { type: 'object', properties: { topicId: { type: 'string' }, description: { type: 'string' }, slides: { type: 'array', items: SLIDE } }, required: ['topicId', 'slides'] }
const MODULE_SCHEMA = { type: 'object', properties: { moduleId: { type: 'string' }, topics: { type: 'array', items: TOPIC } }, required: ['moduleId', 'topics'] }

function persona(track) {
  if (track === 'cloud')
    return 'You are a world-class CLOUD-security instructor. Research current, correct cloud-security knowledge with web search: AWS/Azure/GCP IAM, misconfigurations, real breaches (Capital One SSRF, etc.), metadata services (IMDSv1/v2), S3/bucket exposure, secrets, serverless, Kubernetes/EKS, CSPM, attack paths, detection (CloudTrail/GuardDuty). Cite real services/tools. NEVER invent CVE IDs, ARNs, or numbers you are unsure of.'
  return 'You are a world-class OFFENSIVE-security / pentest instructor. Research current, correct knowledge with web search: real exploitation, the OWASP Top 10 (2021), real CVEs and techniques, tools (Burp Suite, nmap, Metasploit, ffuf, Hashcat), networking, AD, privesc. For any OWASP / web-vuln module, go EXTRA deep on each category (what it is, how to find it, how to exploit it, how to fix it) with real payloads and examples. NEVER invent CVE IDs, tool flags, or numbers you are unsure of.'
}

function authorPrompt(m) {
  const topics = m.topics.map((t) => 'TOPIC id=' + t.id + ' | ' + t.title + '\\n  now: ' + (t.description || '') + (t.keyPoints.length ? '\\n  points: ' + t.keyPoints.join('; ') : '')).join('\\n\\n')
  return [
    persona(m.track),
    'REWRITE the topics of this module into deep, genuinely interactive, from-ABSOLUTE-basics lessons. The current content is too shallow — go much deeper and clearer so a beginner truly understands.',
    'Module: ' + m.moduleName + ' (track: ' + m.track + ').',
    '',
    'For EACH topic output:',
    '- description: 2-3 sentences, assumes zero prior knowledge, frames WHY it matters.',
    '- slides: 6-10 progressive slides, first principles -> real attack/technique -> defense. Each slide:',
    '  * title: short.',
    '  * body: 3-6 sentences, beginner-first, with a concrete real-world ANALOGY and a WORKED EXAMPLE. Light markdown: **bold** key terms, backtick code for payloads/commands, and ||hidden answer|| for a predict-then-reveal (put a posed question\\'s answer inside ||...||). At least half the slides contain a ||reveal|| or a check.',
    '  * check (most slides): 2-4 option recall question with correctIndex (0-based) + one-line explanation. Vary the correct position.',
    '  * diagram (where it clarifies): EITHER {"type":"flow-chain","steps":[{"label":"..","detail":".."}, ...]} (3-6 step process/attack chain) OR {"type":"comparison","columns":[{"label":"..","points":["..",".."],"highlighted":true?}, ...]} (2-3 columns, e.g. vulnerable-vs-secure, attack-vs-defense). Use ONLY these two diagram shapes, exactly.',
    '',
    'Go DEEP and accurate. Learners should finish genuinely understanding, not just reading definitions.',
    'Return moduleId="' + m.moduleId + '" with one entry per topic below.',
    '',
    'TOPICS:',
    topics,
  ].join('\\n')
}

function verifyPrompt(authored, m) {
  return [
    'You are a strict FACT-CHECKER + editor (watchdog) for a ' + m.track + '-security course. Review this rewritten module. Fix or remove anything inaccurate, hallucinated (fake CVEs/tools/flags/numbers), or misleading. Ensure every check has a valid correctIndex on a genuinely correct option, every diagram is one of the two allowed shapes and well-formed, and ||reveals|| actually hide an answer. Keep the depth + interactivity + the same JSON shape.',
    'Return the corrected module (moduleId + topics).',
    '',
    'MODULE ' + m.moduleId + ':',
    JSON.stringify(authored).slice(0, 120000),
  ].join('\\n')
}

phase('Author')
log('Deepening ' + MODULES.length + ' Cyber/Cloud modules (web research)')
const results = await pipeline(
  MODULES,
  (m) => agent(authorPrompt(m), { label: m.track + ':' + m.moduleId, phase: 'Author', schema: MODULE_SCHEMA }),
  (authored, m) => authored ? agent(verifyPrompt(authored, m), { label: 'verify:' + m.moduleId, phase: 'Verify', schema: MODULE_SCHEMA }) : null,
)
return results.filter(Boolean)
`

fs.writeFileSync("scripts/content-workflow.js", script)
console.log(
  `Wrote scripts/content-workflow.js — ${modules.length} modules (${modsSrc.filter((m) => m.track === "cyber").length} cyber + ${modsSrc.filter((m) => m.track === "cloud").length} cloud), ${modules.reduce((s, m) => s + m.topics.length, 0)} topics`,
)
