// Generates a Workflow that researches ONE good YouTube explainer per topic
// (all tracks), via real web search. One agent per module.
const fs = require("fs")

const dump = JSON.parse(fs.readFileSync("scripts/topics-dump.json", "utf8"))
const modules = dump.map((m) => ({
  track: m.track,
  moduleId: m.moduleId,
  moduleName: m.moduleName,
  topics: m.topics.map((t) => ({ id: t.id, title: t.title })),
}))
const DATA = JSON.stringify(modules)

const script = `export const meta = {
  name: 'research-videos',
  description: 'Find one excellent, real YouTube explainer video per topic (all tracks) via web search',
  phases: [{ title: 'Research', detail: 'one agent per module, web search' }],
}

const MODULES = ${DATA}

const SCHEMA = {
  type: 'object',
  properties: {
    moduleId: { type: 'string' },
    videos: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          topicId: { type: 'string' },
          title: { type: 'string' },
          url: { type: 'string' },
        },
        required: ['topicId', 'title', 'url'],
      },
    },
  },
  required: ['moduleId', 'videos'],
}

function prompt(m) {
  const topics = m.topics.map((t) => '- ' + t.id + ' :: ' + t.title).join('\\n')
  return [
    'You are a curriculum researcher sourcing the single best YouTube video to EXPLAIN each topic below to a learner who prefers watching over reading. Track: ' + m.track + ', module: ' + m.moduleName + '.',
    '',
    'For EACH topic, use WEB SEARCH to find ONE excellent, on-point YouTube video that teaches that specific concept clearly. Strongly prefer reputable educational channels that fit the subject, e.g.: Computerphile, Crash Course, 3Blue1Brown, Fireship, freeCodeCamp, Professor Messer, NetworkChuck, Hussein Nasser, PowerCert, PwnFunction, LiveOverflow, John Hammond, IppSec, PortSwigger, OWASP, HackerSploit, Nahamsec, and similar well-known teachers.',
    '',
    'CRITICAL RULES:',
    '- Return the REAL YouTube URL exactly as it appears in your search results: https://www.youtube.com/watch?v=VIDEOID  (or a youtu.be/VIDEOID link).',
    '- NEVER invent, guess, or construct a video ID. Only use a URL you actually saw in search results. If you cannot find a clearly relevant real video for a topic, OMIT that topic from the list.',
    '- Give the video\\'s real title.',
    '- Prefer a focused single-concept video over a long course, unless a specific timestamped lesson fits better.',
    '',
    'Return moduleId="' + m.moduleId + '" and a videos array (one entry per topic you found a good video for).',
    '',
    'TOPICS:',
    topics,
  ].join('\\n')
}

phase('Research')
log('Researching videos for ' + MODULES.length + ' modules')
const results = await parallel(
  MODULES.map((m) => () =>
    agent(prompt(m), { label: 'vid:' + m.moduleId, phase: 'Research', schema: SCHEMA }),
  ),
)
return results.filter(Boolean)
`

fs.writeFileSync("scripts/video-workflow.js", script)
console.log(
  `Wrote scripts/video-workflow.js — ${modules.length} modules, ${modules.reduce((s, m) => s + m.topics.length, 0)} topics`,
)
