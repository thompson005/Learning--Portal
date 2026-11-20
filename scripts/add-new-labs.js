// Appends researched new labs into AI_LABS and CYBER_EXTRA_LABS.
const fs = require("fs")

const repoInstr = (repo, run, port) => [
  `Clone the repo: git clone ${repo}`,
  run,
  port
    ? `The app listens on container port ${port}. Open it in your browser once it is up.`
    : "Open the app in your browser once it is up (see the README for the port).",
  "Meet the objective, then mark the lab complete.",
]
const repoRes = (title, url) => [{ title: `${title} — GitHub repo`, url, type: "tool" }]

const AI = [
  {
    id: "ai-L16", moduleId: "ai-m13", title: "BHIS AI-CTF (Black Hills InfoSec)",
    difficulty: "medium", estimatedHours: 3,
    objective: "Solve 11+ staged LLM attacks — prompt injection, system-prompt leak, input/output filter bypass, defeating an ML prompt-guard, agent tool abuse, RAG document exposure and multimodal flag retrieval.",
    description: "A fully-local vulnerable-LLM CTF on Ollama (Open WebUI + Pipelines + Jupyter). Covers prompt injection, guardrail evasion, agent/tool abuse, RAG and multimodal. Runs on the DGX's GPU via local models (llama3.1:8b / llama3.2-vision). Multi-container (docker-compose); base images are arm64-native — verify the custom build. Do not expose publicly.",
    platform: "Self-host: build from GitHub repo",
    instructions: repoInstr("https://github.com/blackhillsinfosec/AI-CTF", "Run `docker compose up -d` (brings up Open WebUI + Ollama + Pipelines + Jupyter + the ctf-setup). First run pulls the local models.", 4242),
    resources: repoRes("BHIS AI-CTF", "https://github.com/blackhillsinfosec/AI-CTF"),
  },
  {
    id: "ai-L17", moduleId: "ai-m6", title: "DVAIA — Damn Vulnerable AI Application",
    difficulty: "medium", estimatedHours: 3,
    objective: "Exploit a DVWA-style LLM range: direct + indirect prompt injection (doc/image/audio/web), RAG vector poisoning, ReAct agent/tool misuse, prompt-template injection and SSRF via web-fetch — mapped to the OWASP LLM Top 10.",
    description: "The broadest single AI range: injection, RAG, agent, multimodal and classic web bugs (SSRF) in one app. docker-compose (app + Ollama + Qdrant); an --openai-only / --gemini-only flag drops the local model. Ollama/Qdrant are arm64-native. Do not expose publicly.",
    platform: "Self-host: build from GitHub repo",
    instructions: repoInstr("https://github.com/airtasystems/DVAIA-Damn-Vulnerable-AI-Application", "Run `docker compose up -d` (app + Ollama + Qdrant), or use `--openai-only` with an API key to skip the local model.", 5000),
    resources: repoRes("DVAIA", "https://github.com/airtasystems/DVAIA-Damn-Vulnerable-AI-Application"),
  },
  {
    id: "ai-L18", moduleId: "ai-m6", title: "Damn Vulnerable LLM Agent (Reversec)",
    difficulty: "medium", estimatedHours: 2,
    objective: "Use prompt injection against a ReAct (Thought/Action/Observation) LangChain agent to trick its tool calls into leaking other users' data.",
    description: "A focused, high-quality agent/tool-injection lab from Reversec (ex-WithSecure) Labs, listed in the OWASP VWAD. Single container you BUILD locally (Streamlit, port 8501) — builds natively on arm64; works with a local Ollama or an OpenAI key.",
    platform: "Self-host: build from GitHub repo",
    instructions: [
      "Clone the repo: git clone https://github.com/ReversecLabs/damn-vulnerable-llm-agent",
      "Build + run: `docker build -t dvla .` then `docker run --env-file env.list -p 8501:8501 dvla`",
      "Open http://localhost:8501 once it is up.",
      "Meet the objective, then mark the lab complete.",
    ],
    resources: repoRes("Damn Vulnerable LLM Agent", "https://github.com/ReversecLabs/damn-vulnerable-llm-agent"),
  },
  {
    id: "ai-L19", moduleId: "ai-m6", title: "vulnerable-llms (embedding & RAG attacks)",
    difficulty: "medium", estimatedHours: 3,
    objective: "Exploit indirect prompt injection via web-scraping, RAG poisoning, vector/embedding attacks (vector poisoning, embedding inversion), info disclosure and excessive agency — OWASP LLM Top 10 2025.",
    description: "Strongest coverage of embedding / vector-store attacks specifically. Runs FULLY OFFLINE (no API key) — pulls small local models (llama3.2:1b / qwen3:0.6b, needs ≥8GB RAM), so per-user isolation is clean and the GPU accelerates it. docker-compose (frontend + backend + Ollama).",
    platform: "Self-host: build from GitHub repo",
    instructions: repoInstr("https://github.com/AImaginationLab/vulnerable-llms", "Run `docker compose up -d` (frontend + backend + Ollama). First run pulls the small local models.", 3000),
    resources: repoRes("vulnerable-llms", "https://github.com/AImaginationLab/vulnerable-llms"),
  },
  {
    id: "ai-L20", moduleId: "ai-m4", title: "Spy Logic — prompt-injection game (ScottLogic)",
    difficulty: "easy", estimatedHours: 2,
    objective: "Extract a planted secret from a customer-service chatbot by defeating layered defences — a browser-based prompt-injection game.",
    description: "A polished, well-known injection game from ScottLogic. Single app image (prodlite.Dockerfile) runnable with an .env. Needs an OpenAI-style API key (no local model path).",
    platform: "Self-host: build from GitHub repo",
    instructions: repoInstr("https://github.com/ScottLogic/prompt-injection", "Build the prodlite image and run it with your OpenAI API key in an .env file (see README).", 5000),
    resources: repoRes("Spy Logic / prompt-injection", "https://github.com/ScottLogic/prompt-injection"),
    onlineAlternative: { label: "Lakera Gandalf — same injection skills, no setup", url: "https://gandalf.lakera.ai/", note: "No-setup online alternative." },
  },
  {
    id: "ai-L21", moduleId: "ai-m4", title: "ai-prompt-ctf / PwnGPT (agentic levels)",
    difficulty: "medium", estimatedHours: 2,
    objective: "Clear Gandalf-style tiered prompt-injection levels plus agentic scenarios — indirect injection against tool-calling agents across RAG, function-calling and ReAct.",
    description: "Combines classic Gandalf-style levels with modern agentic/RAG injection (LlamaIndex + ChromaDB). Offline-capable via Ollama (default qwen3:0.6b). docker-compose (`make run`).",
    platform: "Self-host: build from GitHub repo",
    instructions: repoInstr("https://github.com/c-goosen/ai-prompt-ctf", "Run `make run` (= docker compose --profile default up --build): brings up Ollama + the ADK API + frontend.", null),
    resources: repoRes("ai-prompt-ctf", "https://github.com/c-goosen/ai-prompt-ctf"),
  },
  {
    id: "ai-L22", moduleId: "ai-m6", title: "ai-redteam-lab (agent + RAG + MCP)",
    difficulty: "medium", estimatedHours: 2,
    objective: "Attack three vulnerable targets — an LLM agent, a RAG app (indirect injection via a poisoned document) and an MCP server. Localhost-only, synthetic secrets.",
    description: "A compact agent + RAG + MCP trio with an explicit safety posture (localhost-only, fake data). Pure Python → builds on arm64. Multiple targets (Docker or plain Python).",
    platform: "Self-host: build from GitHub repo",
    instructions: repoInstr("https://github.com/Hunter-0x07/ai-redteam-lab", "Start the targets with docker compose (or run the Python apps directly per the README).", 8000),
    resources: repoRes("ai-redteam-lab", "https://github.com/Hunter-0x07/ai-redteam-lab"),
  },
  {
    id: "ai-L23", moduleId: "ai-m6", title: "mcploitable — the 'Metasploitable' of MCP",
    difficulty: "hard", estimatedHours: 2,
    objective: "Attack Model Context Protocol servers (tool poisoning, rug-pulls) mapped to the OWASP Top 10 for Agentic Applications.",
    description: "A dedicated MCP / agentic attack surface — complements DVMCP/MCPGoat without duplicating them. Multi-container (one per MCP server). Pure code → builds on arm64.",
    platform: "Self-host: build from GitHub repo",
    instructions: repoInstr("https://github.com/agileAlligator/mcploitable", "Start the MCP server containers with docker compose per the README.", null),
    resources: repoRes("mcploitable", "https://github.com/agileAlligator/mcploitable"),
  },
]

const CYBER = [
  {
    id: "xl-20", moduleId: "m4", title: "OWASP WrongSecrets",
    difficulty: "medium", estimatedHours: 2,
    objective: "Work through 30+ challenges on how secrets leak — hardcoded secrets, env vars, Docker layers, memory, config and base64/encryption mistakes.",
    description: "A rock-solid, ARM64-native, single-container secrets/appsec range — ideal one-click lab for the DGX.",
    platform: "In-house Docker (one-click)",
    dockerImage: "jeroenwillemsen/wrongsecrets:latest-no-vault",
    containerPort: 8080,
    resources: repoRes("OWASP WrongSecrets", "https://github.com/OWASP/wrongsecrets"),
  },
  {
    id: "xl-21", moduleId: "m10", title: "Damn Vulnerable GraphQL Application (DVGA)",
    difficulty: "medium", estimatedHours: 2,
    objective: "Exploit GraphQL-specific attacks — introspection abuse, injection, batching/DoS and broken auth.",
    description: "A focused GraphQL security range (single container). The published image is amd64-only, so on the ARM DGX it runs under emulation (slower but works).",
    platform: "In-house Docker (one-click)",
    dockerImage: "dolevf/dvga:2.2.0",
    containerPort: 5013,
    resources: repoRes("DVGA", "https://github.com/dolevf/Damn-Vulnerable-GraphQL-Application"),
  },
]

function normalize(labs, startNum) {
  return labs.map((l, i) => ({
    id: l.id,
    number: startNum + i,
    week: 1,
    moduleId: l.moduleId,
    title: l.title,
    description: l.description,
    platform: l.platform,
    difficulty: l.difficulty,
    estimatedHours: l.estimatedHours,
    objective: l.objective,
    ...(l.dockerImage ? { dockerImage: l.dockerImage, containerPort: l.containerPort } : {}),
    ...(l.instructions ? { instructions: l.instructions } : {}),
    ...(l.resources ? { resources: l.resources } : {}),
    ...(l.onlineAlternative ? { onlineAlternative: l.onlineAlternative } : {}),
  }))
}

function appendToArray(file, exportName, entries) {
  let src = fs.readFileSync(file, "utf8")
  const close = src.lastIndexOf("]")
  const before = src.slice(0, close).replace(/,?\s*$/, ",\n")
  const body = entries.map((e) => JSON.stringify(e, null, 2)).join(",\n")
  src = before + body + "\n]" + src.slice(close + 1)
  fs.writeFileSync(file, src)
  console.log(`Appended ${entries.length} labs to ${exportName} (${file})`)
}

appendToArray("src/lib/data/tracks/aiLabs.ts", "AI_LABS", normalize(AI, 16))
appendToArray("src/lib/data/tracks/cyberExtraLabs.ts", "CYBER_EXTRA_LABS", normalize(CYBER, 120))
