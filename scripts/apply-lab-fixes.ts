// Applies the verified lab-runnability findings to aiLabs.ts + cyberExtraLabs.ts.
// Source of truth: each repo's real Dockerfile/README, read by the verification
// agents. Usage: npx tsx scripts/apply-lab-fixes.ts
import { writeFileSync } from "node:fs"

import { AI_LABS } from "../src/lib/data/tracks/aiLabs"
import { CYBER_EXTRA_LABS } from "../src/lib/data/tracks/cyberExtraLabs"
import type { Lab } from "../src/types"

const DOCKER = "In-house Docker (one-click)"
const MULTI = "Self-host (multi-service)"
const NEEDS_KEY = "Self-host (needs your own OpenAI API key)"
const ONLINE = "Online (no setup)"

type Patch = Partial<Lab> & { note?: string }

// Stale/guessy sentences left over from the first research pass.
function clean(desc: string): string {
  return desc
    .replace(/\s*ARM64: (?:unverified|not supported)[^.]*\./gi, "")
    .replace(/\s*arm64 (?:unverified|fine)[^.]*\./gi, "")
    .replace(/\s*Do not expose publicly\./gi, "")
    .trim()
}

const AI_PATCH: Record<string, Patch> = {
  // ---- runs in one click (verified single container, no LLM key needed) ----
  "ai-L05": {
    platform: DOCKER,
    buildContext: "https://github.com/SabyasachiDhal/MCPGoat.git#main",
    containerPort: 7332,
    note: "Runs fully offline: the control panel and MCP endpoint (/mcp) are served from one container.",
  },
  "ai-L07": {
    platform: DOCKER,
    buildContext: "https://github.com/CyberSunil/LLMVault.git#main",
    containerPort: 5000,
    note: "Play Mode (25 labs) runs offline with scripted assistants — no API key needed.",
  },
  "ai-L12": {
    platform: DOCKER,
    note: "The web UI starts by default; evals that call a model need your own provider key.",
  },
  "ai-L13": {
    platform: DOCKER,
    note: "Only the dashboard (port 9000) is published through the portal; the individual agents (ports 7001-7021) are not reachable from the single-port runner.",
  },

  // ---- needs the learner's own OpenAI key (portal can't supply one) ----
  "ai-L03": { platform: NEEDS_KEY, note: "Single container you build yourself (Streamlit, port 8501), but it needs a working LLM: an OpenAI key or a local Ollama." },
  "ai-L14": { platform: NEEDS_KEY, note: "Single container (Flask, port 5000) but the AI features call OpenAI (gpt-4-0125-preview), so it needs your own key." },
  "ai-L20": { platform: NEEDS_KEY, note: "OpenAI-only; the server will not start without a valid OpenAI key. Build with prodlite.Dockerfile on the dev branch." },

  // ---- multi-service stacks (DB / Ollama / vector store): not one-click ----
  "ai-L01": { platform: MULTI, note: "No Dockerfile: a launcher on :5000 starts 10 challenge apps (:5001-5010) and needs Ollama with several models; the dependencies (torch, transformers) make it large." },
  "ai-L02": { platform: MULTI, note: "Runs a ~8 GB local Vicuna model in-process; its only prebuilt image is amd64-only, so it is not suited to the ARM DGX." },
  "ai-L04": { platform: MULTI, note: "One container, but it needs 16 published ports (dashboard 8081 + challenges 9001-9015), which the single-port runner can't provide." },
  "ai-L06": { platform: MULTI, note: "6 services (MySQL, phpMyAdmin, FastAPI backend, React frontend, dummy site, nginx) and a data-import step." },
  "ai-L08": { platform: MULTI, note: "7 services (Postgres, Redis, Qdrant, Ollama, API, web, nginx); the upstream README lists x86-64 as the supported CPU and ARM as untested." },
  "ai-L09": { platform: MULTI, note: "13 services and an OpenAI/Azure key; its chat-copilot image hardcodes x86_64 libraries, so it will not build on ARM." },
  "ai-L16": { platform: MULTI, note: "5 services (Open WebUI, Ollama, Pipelines, Jupyter, setup) with a bundled Ollama; the Jupyter base image is not ARM-ready." },
  "ai-L17": { platform: MULTI, note: "App image builds alone, but the full lab needs Qdrant plus an LLM (Ollama, OpenAI or Gemini)." },
  "ai-L19": { platform: MULTI, note: "Needs a separate Ollama server (compose runs one); it speaks Ollama's native API, so it cannot use the OpenAI-compatible local model server." },
  "ai-L21": { platform: MULTI, note: "Two images (ADK agent API + Next.js UI) plus Ollama, Postgres and Traefik; downloads ~1.6 GB of guard models on first start." },
  "ai-L10": { platform: "Self-host (CLI tool)", note: "garak is a command-line scanner (pip install garak) — there is no web target to start." },
  "ai-L11": { platform: "Self-host (CLI tool)", note: "PyRIT's official container needs a pre-built base image and ~/.pyrit credentials; there is no published image, so run it from source." },
  "ai-L23": {
    platform: "Self-host (stdio MCP servers)",
    note: "7 stdio MCP servers — they talk over stdin/stdout and listen on no port, so they can't be exposed through a browser-style lab runner.",
    instructions: [
      "Clone the repo: git clone https://github.com/agileAlligator/mcploitable",
      "Run a server from the repo with: docker compose run --rm -T <service>  (services: mail-assistant, analytics-bi, account-recovery, plugin-hub, memo-assistant, ops-orchestrator, calc).",
      "Connect your own MCP client or agent to it over stdio and attack it per the lab objective.",
      "Meet the objective, then mark the lab complete.",
    ],
  },

  // ---- hosted game ----
  "ai-L15": {
    platform: ONLINE,
    note: "Nothing to self-host — play it on Lakera's site.",
    onlineAlternative: {
      label: "Play Lakera Gandalf",
      url: "https://gandalf.lakera.ai/",
      note: "Hosted by Lakera — no setup.",
    },
  },
}

// Labs that don't exist / duplicate another lab: removed.
const AI_REMOVE = new Set([
  "ai-L18", // duplicate of ai-L03 (same Reversec/WithSecure DVLA repo)
  "ai-L22", // upstream repo Hunter-0x07/ai-redteam-lab is gone (404)
])

const CYBER_PATCH: Record<string, Patch> = {
  "xl-21": {
    platform: DOCKER,
    dockerImage: undefined,
    buildContext: "https://github.com/dolevf/Damn-Vulnerable-GraphQL-Application.git#master",
    containerPort: 5013,
    note: "Built from source on first start (the published image is amd64-only, the Dockerfile builds natively on ARM).",
  },
  "xl-09": {
    platform: DOCKER,
    dockerImage: "raesene/bwapp",
    containerPort: 80,
    imagePlatform: "linux/amd64",
    note: "The image is amd64-only, so on the ARM DGX it runs under CPU emulation (needs the one-time qemu setup in DEPLOY_DGX.md) and is slower.",
  },
  "xl-01": { platform: MULTI, note: "Needs a PostgreSQL service alongside the app (docker-compose)." },
  "xl-05": { platform: MULTI, note: "Needs a MongoDB service alongside the app (docker-compose)." },
  "xl-06": { platform: MULTI, note: "A multi-service microservice stack (docker-compose, port 8888 + mailhog)." },
  "xl-08": { platform: MULTI, note: "Needs Postgres, Keycloak and more (docker-compose); the published images are amd64-only." },
}

function apply(lab: Lab, p: Patch): Lab {
  const { note, ...fields } = p
  const next: Lab = { ...lab, ...fields } as Lab
  for (const k of Object.keys(fields) as (keyof Lab)[]) {
    if (fields[k] === undefined) delete next[k]
  }
  next.description = [clean(lab.description), note].filter(Boolean).join(" ")
  return next
}

const ai = AI_LABS.filter((l) => !AI_REMOVE.has(l.id)).map((l) =>
  AI_PATCH[l.id] ? apply(l, AI_PATCH[l.id]) : l,
)
ai.forEach((l, i) => (l.number = i + 1))
const cyber = CYBER_EXTRA_LABS.map((l) =>
  CYBER_PATCH[l.id] ? apply(l, CYBER_PATCH[l.id]) : l,
)

writeFileSync(
  "src/lib/data/tracks/aiLabs.ts",
  `import type { Lab } from "@/types"\n\n// Real open-source AI-security labs. Run-mode of each was verified against the\n// repo's own Dockerfile/README (see scripts/apply-lab-fixes.ts).\nexport const AI_LABS: Lab[] = ${JSON.stringify(ai, null, 2)}\n`,
)
writeFileSync(
  "src/lib/data/tracks/cyberExtraLabs.ts",
  `import type { Lab } from "@/types"\n\n// Extra in-house / open-source targets for the offensive-security track\n// (vuln-bank + famous vulnerable apps).\nexport const CYBER_EXTRA_LABS: Lab[] = ${JSON.stringify(cyber, null, 2)}\n`,
)

const oneClick = (l: Lab) => Boolean((l.dockerImage || l.buildContext) && l.containerPort)
console.log(`AI: ${ai.length} labs (${ai.filter(oneClick).length} one-click), removed ${[...AI_REMOVE].join(", ")}`)
console.log(`Cyber extras: ${cyber.length} labs (${cyber.filter(oneClick).length} one-click)`)
