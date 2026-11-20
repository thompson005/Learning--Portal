import type { Lab } from "@/types"

// Real open-source AI-security labs. Run-mode of each was verified against the
// repo's own Dockerfile/README (see scripts/apply-lab-fixes.ts).
export const AI_LABS: Lab[] = [
  {
    "id": "ai-L01",
    "number": 1,
    "week": 1,
    "moduleId": "ai-m4",
    "title": "OWASP PromptMe",
    "description": "Work through 10 CTF-style challenges mapped to the OWASP LLM Top 10 (prompt injection, prompt leaking, insecure output handling, etc.) against an intentionally vulnerable chatbot app. Needs a local LLM via Ollama (no paid API key). Official OWASP repo ships no Dockerfile/compose for the app; the fork khaledibnalwalid/PromptMe-Lite adds docker-compose (frontend+API+db). Internal app port not documented - build from repo. No Dockerfile: a launcher on :5000 starts 10 challenge apps (:5001-5010) and needs Ollama with several models; the dependencies (torch, transformers) make it large.",
    "platform": "Self-host (multi-service)",
    "difficulty": "easy",
    "estimatedHours": 2,
    "objective": "Work through 10 CTF-style challenges mapped to the OWASP LLM Top 10 (prompt injection, prompt leaking, insecure output handling, etc.) against an intentionally vulnerable chatbot app.",
    "instructions": [
      "Clone the repo: git clone https://github.com/OWASP/www-project-promptme",
      "Clone repo, run a local model via Ollama (ollama/ollama image, port 11434), then start the PromptMe Python app per its README.",
      "Open the app in your browser once it is up (see the README for the port).",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "OWASP PromptMe — GitHub repo",
        "url": "https://github.com/OWASP/www-project-promptme",
        "type": "tool"
      }
    ],
    "onlineAlternative": {
      "label": "Lakera Gandalf (gandalf.lakera.ai) for the same prompt-injection skills.",
      "url": "https://gandalf.lakera.ai/",
      "note": "No-setup online alternative."
    }
  },
  {
    "id": "ai-L02",
    "number": 2,
    "week": 1,
    "moduleId": "ai-m3",
    "title": "AI-Goat (dhammon)",
    "description": "Local, fully offline vulnerable-LLM CTF: attack chatbots per challenge (prompt injection, data leakage, insecure output handling) with an optional CTFd scoreboard. No API key: runs Vicuna (LLaMA-derived, ~8GB) locally via llama-cpp-python, pulled from HuggingFace. Ports 9001/9002 (chatbots) and 8000 (CTFd) confirmed from README. Install pulls a prebuilt 'ai-base' image and optional 'ai-ctfd' from the author's Docker Hub - no version tags published, so keep buildFromRepo. Needs Docker+compose, ~8GB disk, >=16GB RAM. Runs a ~8 GB local Vicuna model in-process; its only prebuilt image is amd64-only, so it is not suited to the ARM DGX.",
    "platform": "Self-host (multi-service)",
    "difficulty": "medium",
    "estimatedHours": 2,
    "objective": "Local, fully offline vulnerable-LLM CTF: attack chatbots per challenge (prompt injection, data leakage, insecure output handling) with an optional CTFd scoreboard.",
    "instructions": [
      "Clone the repo: git clone https://github.com/dhammon/ai-goat",
      "git clone; pip3 install -r requirements.txt; ./ai-goat.py --install; ./ai-goat.py --run 1 (challenge 1 chatbot on 9001, challenge 2 on 9002; optional CTFd on 8000).",
      "The app listens on container port 9001. Open it in your browser once it is up.",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "AI-Goat (dhammon) — GitHub repo",
        "url": "https://github.com/dhammon/ai-goat",
        "type": "tool"
      }
    ]
  },
  {
    "id": "ai-L03",
    "number": 3,
    "week": 1,
    "moduleId": "ai-m6",
    "title": "Damn Vulnerable LLM Agent (WithSecure / Reversec)",
    "description": "Exploit a LangChain ReAct agent chatbot via Thought/Action/Observation injection to pivot across users and leak data - classic agent prompt-injection lab. Streamlit default port 8501 confirmed. Requires an OpenAI API key (env.list) for the Docker path; works best with GPT-4-class models. Non-Docker runs also support HuggingFace or local Ollama. Apache-2.0. Builds natively so arm64 is fine. No prebuilt image published - build from repo. Repo now mirrored under ReversecLabs (WithSecure rebrand). Single container you build yourself (Streamlit, port 8501), but it needs a working LLM: an OpenAI key or a local Ollama.",
    "platform": "Self-host (needs your own OpenAI API key)",
    "difficulty": "medium",
    "estimatedHours": 2,
    "objective": "Exploit a LangChain ReAct agent chatbot via Thought/Action/Observation injection to pivot across users and leak data - classic agent prompt-injection lab.",
    "instructions": [
      "Clone the repo: git clone https://github.com/WithSecureLabs/damn-vulnerable-llm-agent",
      "docker build -t dvla . ; docker run --env-file env.list -p 8501:8501 dvla (Streamlit UI on 8501).",
      "The app listens on container port 8501. Open it in your browser once it is up.",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "Damn Vulnerable LLM Agent (WithSecure / Reversec) — GitHub repo",
        "url": "https://github.com/WithSecureLabs/damn-vulnerable-llm-agent",
        "type": "tool"
      }
    ]
  },
  {
    "id": "ai-L04",
    "number": 4,
    "week": 1,
    "moduleId": "ai-m6",
    "title": "Damn Vulnerable MCP Server (DVMCP)",
    "description": "10 challenges against intentionally vulnerable Model Context Protocol servers: tool poisoning, prompt injection via tools, excessive agency, auth bypass - drive it from any MCP client. No prebuilt image - build from repo. No LLM key needed to run the server (you attack it with an MCP client/agent of your choice). MIT. Challenges listen on 9001-9015. 'Not stable on Windows' - use Docker/Linux (fine on the ARM host). Builds natively so arm64 OK. See also Kyze-Labs DVMCP v2 (docker-compose with an inspector UI on 5173). One container, but it needs 16 published ports (dashboard 8081 + challenges 9001-9015), which the single-port runner can't provide.",
    "platform": "Self-host (multi-service)",
    "difficulty": "medium",
    "estimatedHours": 2,
    "objective": "10 challenges against intentionally vulnerable Model Context Protocol servers: tool poisoning, prompt injection via tools, excessive agency, auth bypass - drive it from any MCP client.",
    "instructions": [
      "Clone the repo: git clone https://github.com/harishsg993010/damn-vulnerable-MCP-server",
      "docker build -t dvmcp . ; docker run -p 9001-9015:9001-9015 dvmcp (each challenge is a Streamable HTTP MCP server, e.g. http://localhost:9001/mcp).",
      "The app listens on container port 9001. Open it in your browser once it is up.",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "Damn Vulnerable MCP Server (DVMCP) — GitHub repo",
        "url": "https://github.com/harishsg993010/damn-vulnerable-MCP-server",
        "type": "tool"
      }
    ]
  },
  {
    "id": "ai-L05",
    "number": 5,
    "week": 1,
    "moduleId": "ai-m6",
    "title": "MCPGoat",
    "description": "26 challenges / 78 flags against a vulnerable MCP server, plus a harness that shows a real LLM agent being exploited - hands-on MCP pentesting with escalating difficulty. No prebuilt image - build from repo. Node 18+ base, builds natively (arm64 OK). Port 7332. Bind to 127.0.0.1 only - never expose. The agent-exploitation harness may need an LLM API key/model to drive the agent; core challenges run without. Independent project (not WebGoat). Runs fully offline: the control panel and MCP endpoint (/mcp) are served from one container.",
    "platform": "In-house Docker (one-click)",
    "difficulty": "hard",
    "estimatedHours": 2,
    "objective": "26 challenges / 78 flags against a vulnerable MCP server, plus a harness that shows a real LLM agent being exploited - hands-on MCP pentesting with escalating difficulty.",
    "instructions": [
      "Clone the repo: git clone https://github.com/SabyasachiDhal/MCPGoat",
      "docker compose up --build -> http://127.0.0.1:7332 (or docker build -t mcpgoat . && docker run --rm -p 127.0.0.1:7332:7332 mcpgoat). Set -e MCPGOAT_LEVEL=difficult to raise difficulty.",
      "The app listens on container port 7332. Open it in your browser once it is up.",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "MCPGoat — GitHub repo",
        "url": "https://github.com/SabyasachiDhal/MCPGoat",
        "type": "tool"
      }
    ],
    "buildContext": "https://github.com/SabyasachiDhal/MCPGoat.git#main",
    "containerPort": 7332
  },
  {
    "id": "ai-L06",
    "number": 6,
    "week": 1,
    "moduleId": "ai-m3",
    "title": "Broken LLM Integration App",
    "description": "Attack a realistic LLM-integrated web app: Prompt Injection, Prompt Leaking (with blacklist and Prompt-Hardener defense tiers), P2SQL Injection, and LLM4Shell (RCE via LangChain). No prebuilt image - build from repo via docker-compose. Requires an OpenAI API key. Stack: React + FastAPI + LangChain + MySQL. Great for the P2SQL / SQL-injection-via-LLM module. Internal ports set by compose (frontend/backend) - not pinned in README. Builds natively so arm64 OK. 6 services (MySQL, phpMyAdmin, FastAPI backend, React frontend, dummy site, nginx) and a data-import step.",
    "platform": "Self-host (multi-service)",
    "difficulty": "medium",
    "estimatedHours": 2,
    "objective": "Attack a realistic LLM-integrated web app: Prompt Injection, Prompt Leaking (with blacklist and Prompt-Hardener defense tiers), P2SQL Injection, and LLM4Shell (RCE via LangChain).",
    "instructions": [
      "Clone the repo: git clone https://github.com/13o-bbr-bbq/Broken_LLM_Integration_App",
      "docker compose up (React frontend + FastAPI backend + MySQL). Set OpenAI key in backend .env (LLM_PROVIDER=openai).",
      "Open the app in your browser once it is up (see the README for the port).",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "Broken LLM Integration App — GitHub repo",
        "url": "https://github.com/13o-bbr-bbq/Broken_LLM_Integration_App",
        "type": "tool"
      }
    ]
  },
  {
    "id": "ai-L07",
    "number": 7,
    "week": 1,
    "moduleId": "ai-m3",
    "title": "LLMVault",
    "description": "25 offline labs across all 10 OWASP LLM Top 10 (2025) categories in three tiers (Core/Advanced/Expert), plus 3 Live-Mode scenarios against a real local model. No prebuilt image - build from repo. No API key ever for Play Mode (scripted assistants). Live Mode optionally uses Ollama (OLLAMA_HOST) or any OpenAI-compatible endpoint. Flask + gunicorn, port 5000, builds natively (arm64 OK). Bind 127.0.0.1:5000. Good low-friction starter lab. Play Mode (25 labs) runs offline with scripted assistants — no API key needed.",
    "platform": "In-house Docker (one-click)",
    "difficulty": "easy",
    "estimatedHours": 2,
    "objective": "25 offline labs across all 10 OWASP LLM Top 10 (2025) categories in three tiers (Core/Advanced/Expert), plus 3 Live-Mode scenarios against a real local model.",
    "instructions": [
      "Clone the repo: git clone https://github.com/CyberSunil/LLMVault",
      "docker compose up --build -> http://127.0.0.1:5000 (or docker build -t llmvault . && docker run -p 5000:5000 llmvault).",
      "The app listens on container port 5000. Open it in your browser once it is up.",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "LLMVault — GitHub repo",
        "url": "https://github.com/CyberSunil/LLMVault",
        "type": "tool"
      }
    ],
    "buildContext": "https://github.com/CyberSunil/LLMVault.git#main",
    "containerPort": 5000
  },
  {
    "id": "ai-L08",
    "number": 8,
    "week": 1,
    "moduleId": "ai-m3",
    "title": "Damn Vulnerable AI Platform (DVAP)",
    "description": "Broad self-hosted AI-security range: agent security, data/identity issues, and domain scenarios (banking, healthcare) for red/blue teaming, CTF and benchmarking - 100% local. No prebuilt image - build from repo via docker-compose. Author states no cloud, no paid APIs, no data leaves the host - ideal for the air-gapped DGX Spark. Multi-service compose (frontend + Postgres); internal ports not pinned in README. 7 services (Postgres, Redis, Qdrant, Ollama, API, web, nginx); the upstream README lists x86-64 as the supported CPU and ARM as untested.",
    "platform": "Self-host (multi-service)",
    "difficulty": "hard",
    "estimatedHours": 2,
    "objective": "Broad self-hosted AI-security range: agent security, data/identity issues, and domain scenarios (banking, healthcare) for red/blue teaming, CTF and benchmarking - 100% local.",
    "instructions": [
      "Clone the repo: git clone https://github.com/sonuoffsec/DVAP",
      "git clone; cp .env.example .env; docker compose up -d (builds a dvap-web frontend image; brings up Postgres + backend).",
      "Open the app in your browser once it is up (see the README for the port).",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "Damn Vulnerable AI Platform (DVAP) — GitHub repo",
        "url": "https://github.com/sonuoffsec/DVAP",
        "type": "tool"
      }
    ]
  },
  {
    "id": "ai-L09",
    "number": 9,
    "week": 1,
    "moduleId": "ai-m13",
    "title": "Microsoft AI Red Teaming Playground Labs",
    "description": "12 guided AI red-teaming challenges (direct/indirect prompt injection, jailbreaks, guardrail bypass, Crescendo multi-turn) from Microsoft's Black Hat USA 2024 course, on a Chat-Copilot-based app. No prebuilt image - build from repo via docker-compose. Port 5000 confirmed from README. Needs Azure OpenAI (endpoint+key, plus text-embedding-ada-002 and a chat deploy like gpt-4o) OR a plain OpenAI API key (docker-compose-openai.yaml). MIT. 12 labs. arm64 unconfirmed (Chat Copilot is .NET + Node) - test a native build. This is the 'Microsoft AI red-teaming lab' the request asked for. 13 services and an OpenAI/Azure key; its chat-copilot image hardcodes x86_64 libraries, so it will not build on ARM.",
    "platform": "Self-host (multi-service)",
    "difficulty": "medium",
    "estimatedHours": 2,
    "objective": "12 guided AI red-teaming challenges (direct/indirect prompt injection, jailbreaks, guardrail bypass, Crescendo multi-turn) from Microsoft's Black Hat USA 2024 course, on a Chat-Copilot-based app.",
    "instructions": [
      "Clone the repo: git clone https://github.com/microsoft/AI-Red-Teaming-Playground-Labs",
      "docker-compose up (Azure OpenAI) or docker compose -f docker-compose-openai.yaml up (OpenAI). Access http://localhost:5000/login?auth=[KEY] (use 127.0.0.1 on macOS).",
      "The app listens on container port 5000. Open it in your browser once it is up.",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "Microsoft AI Red Teaming Playground Labs — GitHub repo",
        "url": "https://github.com/microsoft/AI-Red-Teaming-Playground-Labs",
        "type": "tool"
      }
    ],
    "onlineAlternative": {
      "label": "Microsoft Learn 'AI Red Teaming 101' limited series references the same challeng",
      "url": "https://gandalf.lakera.ai/",
      "note": "No-setup online alternative."
    }
  },
  {
    "id": "ai-L10",
    "number": 10,
    "week": 1,
    "moduleId": "ai-m13",
    "title": "NVIDIA garak (LLM vulnerability scanner)",
    "description": "Lab = point the scanner at a target model/app and run automated probes (jailbreaks, prompt injection, toxicity, data leakage, encoding attacks) to generate a vulnerability report. No official Docker image on Docker Hub/NGC (confirmed) - install via pip (pure Python,65GB community image). Attacker TOOL, not a container to open - needs a target endpoint; API key only if the target requires one. From a container reach a host model via host.docker.internal. Pin the version (probe set drifts between releases). garak is a command-line scanner (pip install garak) — there is no web target to start.",
    "platform": "Self-host (CLI tool)",
    "difficulty": "medium",
    "estimatedHours": 2,
    "objective": "Lab = point the scanner at a target model/app and run automated probes (jailbreaks, prompt injection, toxicity, data leakage, encoding attacks) to generate a vulnerability report.",
    "instructions": [
      "Clone the repo: git clone https://github.com/NVIDIA/garak",
      "pip install garak ; garak --model_type openai --model_name gpt-4 --probes promptinject (or target a local Ollama/REST endpoint). Can also build a small Docker image around the pip install.",
      "Open the app in your browser once it is up (see the README for the port).",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "NVIDIA garak (LLM vulnerability scanner) — GitHub repo",
        "url": "https://github.com/NVIDIA/garak",
        "type": "tool"
      }
    ]
  },
  {
    "id": "ai-L11",
    "number": 11,
    "week": 1,
    "moduleId": "ai-m13",
    "title": "Microsoft PyRIT (Python Risk Identification Toolkit)",
    "description": "Lab = run PyRIT's automated attack orchestrators (single- and multi-turn, converters, scorers) against a target model/app to find jailbreaks and responsible-AI risks. No published container (confirmed) - pip install (pure Python, Attacker TOOL, not a container to open. Model/platform-agnostic; needs a target endpoint and its key. Pairs well as the attacker against the other vulnerable apps in this list. Microsoft's flagship AI red-teaming toolkit. PyRIT's official container needs a pre-built base image and ~/.pyrit credentials; there is no published image, so run it from source.",
    "platform": "Self-host (CLI tool)",
    "difficulty": "hard",
    "estimatedHours": 2,
    "objective": "Lab = run PyRIT's automated attack orchestrators (single- and multi-turn, converters, scorers) against a target model/app to find jailbreaks and responsible-AI risks.",
    "instructions": [
      "Clone the repo: git clone https://github.com/Azure/PyRIT",
      "pip install pyrit ; use pyrit_scan (CLI) or pyrit_shell, or drive it as a Python framework in a notebook against your target.",
      "Open the app in your browser once it is up (see the README for the port).",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "Microsoft PyRIT (Python Risk Identification Toolkit) — GitHub repo",
        "url": "https://github.com/Azure/PyRIT",
        "type": "tool"
      }
    ]
  },
  {
    "id": "ai-L12",
    "number": 12,
    "week": 1,
    "moduleId": "ai-m13",
    "title": "promptfoo (red-team / eval)",
    "description": "Lab = scaffold a red-team project and scan a target LLM/app for prompt injection, jailbreaks, PII leakage, data poisoning with OWASP/NIST presets; review findings in a self-hosted web UI. VERIFIED: official image ghcr.io/promptfoo/promptfoo:latest exists on GHCR; port 3000 confirmed from self-hosting docs. arm64 confirmed - CI publishes multi-arch (buildcache-linux-arm64 tag present; 'implement multi-arch Docker image build and push' in release notes). Run 'docker manifest inspect ghcr.io/promptfoo/promptfoo:latest' on the DGX to double-check the arm64 entry before mass pulls. Without your own model key, generation/grading use Promptfoo's hosted inference - set PROMPTFOO_DISABLE_REMOTE_GENERATION=true and use local providers for air-gapped use. Node-based. The web UI starts by default; evals that call a model need your own provider key.",
    "platform": "In-house Docker (one-click)",
    "difficulty": "easy",
    "estimatedHours": 2,
    "objective": "Lab = scaffold a red-team project and scan a target LLM/app for prompt injection, jailbreaks, PII leakage, data poisoning with OWASP/NIST presets; review findings in a self-hosted web UI.",
    "dockerImage": "ghcr.io/promptfoo/promptfoo:latest",
    "containerPort": 3000,
    "resources": [
      {
        "title": "promptfoo (red-team / eval) — GitHub repo",
        "url": "https://github.com/promptfoo/promptfoo",
        "type": "tool"
      }
    ],
    "onlineAlternative": {
      "label": "Promptfoo Enterprise (hosted) for team dashboards.",
      "url": "https://gandalf.lakera.ai/",
      "note": "No-setup online alternative."
    }
  },
  {
    "id": "ai-L13",
    "number": 13,
    "week": 1,
    "moduleId": "ai-m6",
    "title": "Damn Vulnerable AI Agent (DVAA, opena2a)",
    "description": "Exploit a deliberately vulnerable autonomous AI agent - tool abuse, excessive agency, memory/identity attacks - across 19+ agents and a dashboard, for agentic-AI security practice. VERIFIED on Docker Hub: opena2a/dvaa, latest == 0.9.2, manifest has BOTH linux/amd64 and linux/arm64 (~65MB each) - arm64 confirmed, pullable as-is. Dashboard port 9000; agents 7001-7021. NO LLM key needed for the default Compose setup (simulated LLM backend, zero external deps); an OpenAI/Anthropic key is optional only for live kill-chain narration. Bind to 127.0.0.1. Complements DVMCP/MCPGoat for the agent-security module. Only the dashboard (port 9000) is published through the portal; the individual agents (ports 7001-7021) are not reachable from the single-port runner.",
    "platform": "In-house Docker (one-click)",
    "difficulty": "medium",
    "estimatedHours": 2,
    "objective": "Exploit a deliberately vulnerable autonomous AI agent - tool abuse, excessive agency, memory/identity attacks - across 19+ agents and a dashboard, for agentic-AI security practice.",
    "dockerImage": "opena2a/dvaa:0.9.2",
    "containerPort": 9000,
    "resources": [
      {
        "title": "Damn Vulnerable AI Agent (DVAA, opena2a) — GitHub repo",
        "url": "https://github.com/opena2a-org/damn-vulnerable-ai-agent",
        "type": "tool"
      }
    ]
  },
  {
    "id": "ai-L14",
    "number": 14,
    "week": 1,
    "moduleId": "ai-m4",
    "title": "WithSecure LLM Vulnerable Recruitment App",
    "description": "Indirect prompt injection lab: a CV-screening LLM app where poisoned resume content manipulates the model's hiring decision. No prebuilt image - run from repo (plain Python app; confirm whether README ships a Dockerfile, else wrap it). Requires an OpenAI API key. Small, focused indirect-prompt-injection demo - good quick module. Builds natively (arm64 OK). Single container (Flask, port 5000) but the AI features call OpenAI (gpt-4-0125-preview), so it needs your own key.",
    "platform": "Self-host (needs your own OpenAI API key)",
    "difficulty": "easy",
    "estimatedHours": 2,
    "objective": "Indirect prompt injection lab: a CV-screening LLM app where poisoned resume content manipulates the model's hiring decision.",
    "instructions": [
      "Clone the repo: git clone https://github.com/WithSecureLabs/llm-vulnerable-recruitment-app",
      "Clone and run per README (Python app); set an OpenAI API key.",
      "Open the app in your browser once it is up (see the README for the port).",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "WithSecure LLM Vulnerable Recruitment App — GitHub repo",
        "url": "https://github.com/WithSecureLabs/llm-vulnerable-recruitment-app",
        "type": "tool"
      }
    ]
  },
  {
    "id": "ai-L15",
    "number": 15,
    "week": 1,
    "moduleId": "ai-m4",
    "title": "Lakera Gandalf (online prompt-injection game)",
    "description": "7 escalating levels + bonus (Gandalf the White): trick an LLM guardian into revealing a secret password through prompt injection and social engineering. NOT self-hostable - hosted by Lakera, no official Docker image (the linked GitHub is Microsoft's related 'gandalf_vs_gandalf' automation, not the game). Cannot run on the DGX docker runner. Listed as the canonical 'Gandalf-style' onboarding exercise; use LLMVault/PromptMe for the in-house offline equivalent. Nothing to self-host — play it on Lakera's site.",
    "platform": "Online (no setup)",
    "difficulty": "easy",
    "estimatedHours": 2,
    "objective": "7 escalating levels + bonus (Gandalf the White): trick an LLM guardian into revealing a secret password through prompt injection and social engineering.",
    "instructions": [
      "Clone the repo: git clone https://github.com/microsoft/gandalf_vs_gandalf",
      "Play online at https://gandalf.lakera.ai (no install). For self-hosted practice, substitute LLMVault or PromptMe which cover the same skill offline.",
      "Open the app in your browser once it is up (see the README for the port).",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "Lakera Gandalf (online prompt-injection game) — GitHub repo",
        "url": "https://github.com/microsoft/gandalf_vs_gandalf",
        "type": "tool"
      }
    ],
    "onlineAlternative": {
      "label": "Play Lakera Gandalf",
      "url": "https://gandalf.lakera.ai/",
      "note": "Hosted by Lakera — no setup."
    }
  },
  {
    "id": "ai-L16",
    "number": 16,
    "week": 1,
    "moduleId": "ai-m13",
    "title": "BHIS AI-CTF (Black Hills InfoSec)",
    "description": "A fully-local vulnerable-LLM CTF on Ollama (Open WebUI + Pipelines + Jupyter). Covers prompt injection, guardrail evasion, agent/tool abuse, RAG and multimodal. Runs on the DGX's GPU via local models (llama3.1:8b / llama3.2-vision). Multi-container (docker-compose); base images are arm64-native — verify the custom build. 5 services (Open WebUI, Ollama, Pipelines, Jupyter, setup) with a bundled Ollama; the Jupyter base image is not ARM-ready.",
    "platform": "Self-host (multi-service)",
    "difficulty": "medium",
    "estimatedHours": 3,
    "objective": "Solve 11+ staged LLM attacks — prompt injection, system-prompt leak, input/output filter bypass, defeating an ML prompt-guard, agent tool abuse, RAG document exposure and multimodal flag retrieval.",
    "instructions": [
      "Clone the repo: git clone https://github.com/blackhillsinfosec/AI-CTF",
      "Run `docker compose up -d` (brings up Open WebUI + Ollama + Pipelines + Jupyter + the ctf-setup). First run pulls the local models.",
      "The app listens on container port 4242. Open it in your browser once it is up.",
      "Meet the objective, then mark the lab complete."
    ],
    "resources": [
      {
        "title": "BHIS AI-CTF — GitHub repo",
        "url": "https://github.com/blackhillsinfosec/AI-CTF",
        "type": "tool"
      }
    ]
  },
  {
    "id": "ai-L17",
    "number": 17,
    "week": 1,
    "moduleId": "ai-m6",
    "title": "DVAIA — Damn Vulnerable AI Application",
    "description": "The broadest single AI range: injection, RAG, agent, multimodal and classic web bugs (SSRF) in one app. docker-compose (app + Ollama + Qdrant); an --openai-only / --gemini-only flag drops the local model. Ollama/Qdrant are arm64-native. App image builds alone, but the full lab needs Qdrant plus an LLM (Ollama, OpenAI or Gemini).",
    "platform": "Self-host (multi-service)",
    "difficulty": "medium",
    "estimatedHours": 3,
    "objective": "Exploit a DVWA-style LLM range: direct + indirect prompt injection (doc/image/audio/web), RAG vector poisoning, ReAct agent/tool misuse, prompt-template injection and SSRF via web-fetch — mapped to the OWASP LLM Top 10.",
    "instructions": [
      "Clone the repo: git clone https://github.com/airtasystems/DVAIA-Damn-Vulnerable-AI-Application",
      "Run `docker compose up -d` (app + Ollama + Qdrant), or use `--openai-only` with an API key to skip the local model.",
      "The app listens on container port 5000. Open it in your browser once it is up.",
      "Meet the objective, then mark the lab complete."
    ],
    "resources": [
      {
        "title": "DVAIA — GitHub repo",
        "url": "https://github.com/airtasystems/DVAIA-Damn-Vulnerable-AI-Application",
        "type": "tool"
      }
    ]
  },
  {
    "id": "ai-L19",
    "number": 18,
    "week": 1,
    "moduleId": "ai-m6",
    "title": "vulnerable-llms (embedding & RAG attacks)",
    "description": "Strongest coverage of embedding / vector-store attacks specifically. Runs FULLY OFFLINE (no API key) — pulls small local models (llama3.2:1b / qwen3:0.6b, needs ≥8GB RAM), so per-user isolation is clean and the GPU accelerates it. docker-compose (frontend + backend + Ollama). Needs a separate Ollama server (compose runs one); it speaks Ollama's native API, so it cannot use the OpenAI-compatible local model server.",
    "platform": "Self-host (multi-service)",
    "difficulty": "medium",
    "estimatedHours": 3,
    "objective": "Exploit indirect prompt injection via web-scraping, RAG poisoning, vector/embedding attacks (vector poisoning, embedding inversion), info disclosure and excessive agency — OWASP LLM Top 10 2025.",
    "instructions": [
      "Clone the repo: git clone https://github.com/AImaginationLab/vulnerable-llms",
      "Run `docker compose up -d` (frontend + backend + Ollama). First run pulls the small local models.",
      "The app listens on container port 3000. Open it in your browser once it is up.",
      "Meet the objective, then mark the lab complete."
    ],
    "resources": [
      {
        "title": "vulnerable-llms — GitHub repo",
        "url": "https://github.com/AImaginationLab/vulnerable-llms",
        "type": "tool"
      }
    ]
  },
  {
    "id": "ai-L20",
    "number": 19,
    "week": 1,
    "moduleId": "ai-m4",
    "title": "Spy Logic — prompt-injection game (ScottLogic)",
    "description": "A polished, well-known injection game from ScottLogic. Single app image (prodlite.Dockerfile) runnable with an .env. Needs an OpenAI-style API key (no local model path). OpenAI-only; the server will not start without a valid OpenAI key. Build with prodlite.Dockerfile on the dev branch.",
    "platform": "Self-host (needs your own OpenAI API key)",
    "difficulty": "easy",
    "estimatedHours": 2,
    "objective": "Extract a planted secret from a customer-service chatbot by defeating layered defences — a browser-based prompt-injection game.",
    "instructions": [
      "Clone the repo: git clone https://github.com/ScottLogic/prompt-injection",
      "Build the prodlite image and run it with your OpenAI API key in an .env file (see README).",
      "The app listens on container port 5000. Open it in your browser once it is up.",
      "Meet the objective, then mark the lab complete."
    ],
    "resources": [
      {
        "title": "Spy Logic / prompt-injection — GitHub repo",
        "url": "https://github.com/ScottLogic/prompt-injection",
        "type": "tool"
      }
    ],
    "onlineAlternative": {
      "label": "Lakera Gandalf — same injection skills, no setup",
      "url": "https://gandalf.lakera.ai/",
      "note": "No-setup online alternative."
    }
  },
  {
    "id": "ai-L21",
    "number": 20,
    "week": 1,
    "moduleId": "ai-m4",
    "title": "ai-prompt-ctf / PwnGPT (agentic levels)",
    "description": "Combines classic Gandalf-style levels with modern agentic/RAG injection (LlamaIndex + ChromaDB). Offline-capable via Ollama (default qwen3:0.6b). docker-compose (`make run`). Two images (ADK agent API + Next.js UI) plus Ollama, Postgres and Traefik; downloads ~1.6 GB of guard models on first start.",
    "platform": "Self-host (multi-service)",
    "difficulty": "medium",
    "estimatedHours": 2,
    "objective": "Clear Gandalf-style tiered prompt-injection levels plus agentic scenarios — indirect injection against tool-calling agents across RAG, function-calling and ReAct.",
    "instructions": [
      "Clone the repo: git clone https://github.com/c-goosen/ai-prompt-ctf",
      "Run `make run` (= docker compose --profile default up --build): brings up Ollama + the ADK API + frontend.",
      "Open the app in your browser once it is up (see the README for the port).",
      "Meet the objective, then mark the lab complete."
    ],
    "resources": [
      {
        "title": "ai-prompt-ctf — GitHub repo",
        "url": "https://github.com/c-goosen/ai-prompt-ctf",
        "type": "tool"
      }
    ]
  },
  {
    "id": "ai-L23",
    "number": 21,
    "week": 1,
    "moduleId": "ai-m6",
    "title": "mcploitable — the 'Metasploitable' of MCP",
    "description": "A dedicated MCP / agentic attack surface — complements DVMCP/MCPGoat without duplicating them. Multi-container (one per MCP server). Pure code → builds on arm64. 7 stdio MCP servers — they talk over stdin/stdout and listen on no port, so they can't be exposed through a browser-style lab runner.",
    "platform": "Self-host (stdio MCP servers)",
    "difficulty": "hard",
    "estimatedHours": 2,
    "objective": "Attack Model Context Protocol servers (tool poisoning, rug-pulls) mapped to the OWASP Top 10 for Agentic Applications.",
    "instructions": [
      "Clone the repo: git clone https://github.com/agileAlligator/mcploitable",
      "Run a server from the repo with: docker compose run --rm -T <service>  (services: mail-assistant, analytics-bi, account-recovery, plugin-hub, memo-assistant, ops-orchestrator, calc).",
      "Connect your own MCP client or agent to it over stdio and attack it per the lab objective.",
      "Meet the objective, then mark the lab complete."
    ],
    "resources": [
      {
        "title": "mcploitable — GitHub repo",
        "url": "https://github.com/agileAlligator/mcploitable",
        "type": "tool"
      }
    ]
  }
]
