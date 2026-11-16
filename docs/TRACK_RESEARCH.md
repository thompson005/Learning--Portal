# AI Security & Cloud Security — research survey

Web survey of free learning resources, topic coverage, gaps vs our draft, and deployable labs. Auto-compiled from a 4-agent research pass.


## AI Security

**Overview.** The best free resources now span the full field: OWASP's LLM Top 10 (2025), ML Top 10, and the new Agentic Security Initiative/MAESTRO; MITRE ATLAS and NIST's AI RMF with its GenAI profile; vendor red-team guidance (Google SAIF, Microsoft PyRIT, NVIDIA garak); interactive labs (PortSwigger Web LLM, Lakera Gandalf, HackTheBox, AI-Goat/Damn Vulnerable LLM); and active research on jailbreaks, poisoning, extraction, and multimodal injection — collectively reaching from first-principles foundations to graduate-level adversarial-ML and live CTF competition. Measured against this, our 15-module AI draft is already exceptionally comprehensive and in several areas (prompt injection, jailbreak automation, poisoning, extraction, supply chain, OWASP alignment) deeper than most public courses, so it should grow in breadth and currency rather than fundamentals. The clearest growth areas are a dedicated multimodal/vision-language unit, an expanded agentic/multi-agent module aligned to the latest OWASP Agentic and MAESTRO work, explicitly named modern injection defenses, and lighter additions on synthetic-media abuse, machine unlearning, and deeper governance. Finally, the field is taught overwhelmingly through hands-on, gamified challenges, so mapping our strong custom labs to the known free platforms and adding in-browser interactive widgets (injection ladders, context-window and exfiltration visualizers, threat-model canvases) would bring the delivery up to the standard of the best resources.

### Topic coverage a strong course has

- **AI/ML & LLM foundations for security** _(basic)_
  - ML lifecycle as attack surface and trust boundaries
  - Neural nets, gradients, overfitting/memorization (roots of extraction & poisoning)
  - Transformer/LLM internals: tokenization, embeddings, attention, context window, sampling
  - No code/data separation in the context window (the prompt boundary)
  - Discriminative vs generative vs foundation models; fine-tuning (LoRA/QLoRA) & RAG
  - Closed-API vs open-weight vs self-hosted and how each shifts the threat model
  - CIA for AI: weight confidentiality, inference integrity, cost/availability
  - Threat actors: malicious users, hostile third-party content, insider/supply chain, model provider

- **AI attack-surface mapping & taxonomy** _(basic)_
  - Six-surface taxonomy: input, model artifact, data/RAG, infra, output, agentic action
  - Cross-walk of OWASP LLM Top 10, OWASP ML Top 10, MITRE ATLAS, NIST AI RMF
  - Inference-time vs train-time vs extraction/privacy axes
  - Classic web bugs reached through AI features (SSRF, IDOR, RCE, secrets leakage)
  - Threat modeling an AI feature and prioritizing by exploitability/impact

- **Prompt injection (direct & indirect)** _(intermediate)_
  - Instruction override, role spoofing, context-termination; system-prompt extraction
  - Indirect/second-order injection via docs, web, email, calendar, image alt-text, code comments
  - Zero-click chains via summarization; invisible-text (white-on-white, Unicode tags)
  - Obfuscation/filter evasion: base64, homoglyphs, translation, token-splitting, payload spreading
  - Exfiltration primitives: markdown/image-link beacons, tool/webhook/email channels
  - Injection-to-action chains, confused deputy, persistence into memory/vector store
  - Automating discovery (garak, promptfoo, PyRIT) and clean reporting with severity

- **Jailbreaks & model manipulation** _(advanced)_
  - Alignment/RLHF refusals as a brittle, learned boundary; jailbreak vs injection vs misuse
  - Manual families: persona/DAN, roleplay/fiction, developer-mode spoof, encoding
  - Multi-turn: Crescendo, Skeleton Key policy-reframing, many-shot jailbreaking, goal-hijacking
  - Optimization-based: GCG universal suffixes (white-box), PAIR/TAP (black-box), AutoDAN
  - Transferability across open/closed models
  - Benchmarking: HarmBench, JailbreakBench, LLM-judge scoring, attack-success-rate tracking
  - When a jailbreak is a security issue vs pure policy bypass

- **Insecure LLM application design (agents, RAG, tools, MCP)** _(intermediate)_
  - ReAct/plan-execute loops; excessive agency, autonomy radius, standing credentials
  - RAG internals: chunking, embeddings, vector DBs; retrieved content trusted by design
  - RAG poisoning, query-time manipulation, cross-tenant leakage, embedding inversion
  - Tool/function-calling: argument injection, schema abuse, confused deputy, tool chaining to SSRF/RCE
  - MCP security: untrusted servers, tool poisoning, rug-pull, cross-server shadowing, OAuth scope
  - Insecure output handling: XSS/markdown, SQLi, SSRF via model output
  - Secure-by-design: least privilege, human-in-the-loop, dual-LLM/quarantine, sandboxing, spend caps

- **Agentic & multi-agent security (emerging)** _(advanced)_
  - OWASP Agentic Security Initiative threat taxonomy (ASI/T1-T15) and Agentic Top 10
  - CSA/OWASP MAESTRO 7-layer threat modeling for multi-agent systems
  - Agent memory poisoning, cascading hallucinations, agent collusion, unsafe delegation escalation
  - Agent identity, authentication and inter-agent trust
  - Browser/computer-use agents and autonomous tool orchestration risk

- **Data & model poisoning (train-time integrity)** _(advanced)_
  - Availability vs integrity/backdoor poisoning; label-flip, clean-label, poison budget
  - Backdoors/trojans: trigger design, BadNets, surviving fine-tuning/distillation
  - Web-scale realism: split-view & frontrunning, expired domains, wiki snapshots (Carlini)
  - RLHF/preference-data and instruction-tuning dataset tampering
  - Hands-on backdoor insertion + detection (activation clustering, spectral signatures, Neural Cleanse)
  - Data provenance, hashing/signing, MLBOM, trusted curation

- **Extraction, inversion & privacy attacks** _(advanced)_
  - Query-based model extraction/stealing and surrogate training
  - Membership inference (shadow models, TPR@low-FPR) rooted in memorization
  - Model inversion & attribute inference; embedding inversion in RAG
  - LLM training-data extraction (divergence/repetition, prefix-continuation) for PII/secrets
  - System-prompt & prompt-template theft as IP loss
  - Privacy defenses: DP-SGD, PATE, federated learning, output coarsening, rate limits, canaries

- **Supply chain & MLOps security** _(advanced)_
  - Malicious model artifacts: pickle __reduce__ RCE (.pt/.bin/.ckpt), Keras Lambda/TF SavedModel
  - safetensors safe serialization; picklescan/ModelScan/Guardian scanning
  - Model hubs: typosquatting, namespace confusion, trojaned popular models, token leaks
  - Dependency/framework CVEs across torch/transformers/langchain; SBOM/MLBOM
  - Serving-stack CVEs: Ray 'ShadowRay' (CVE-2023-48022), NVIDIA Container Toolkit (CVE-2024-0132)
  - Signing, provenance, pinning by commit hash, reproducible pinned environments

- **Classical ML attacks & frameworks (OWASP ML Top 10 + ATLAS)** _(intermediate)_
  - ML01 input manipulation / adversarial examples (evasion) on image & tabular models
  - Adversarial-robustness tooling: ART, CleverHans, Foolbox, TextAttack, Counterfit
  - Transfer-learning attacks and model skewing/output integrity
  - MITRE ATLAS tactics/techniques, case studies, Navigator; mapping incidents to kill chains
  - Adversarial-emulation campaigns against ML systems

- **Multimodal & synthetic-media security** _(intermediate)_
  - Image-embedded & typographic prompt injection vs vision-language models
  - Adversarial perturbations forcing chosen outputs from closed MLLMs
  - Audio/cross-modal injection and document/PDF carriers
  - Defense limits: no single defense neutralizes image injection; defense-in-depth
  - (Adjacent) deepfakes/voice cloning for fraud & disinformation; detection and C2PA/SynthID provenance

- **Defenses, guardrails & detection** _(intermediate)_
  - Guardrail landscape: LLM Guard, Rebuff, Guardrails AI, NeMo Guardrails, Lakera Guard
  - Input-side: injection classifiers, allowlists, canaries; output-side: filtering, encoding, grounding
  - Architectural: dual-LLM/privileged-vs-quarantined, isolation, least-privilege tools
  - Newer research defenses: instruction hierarchy, spotlighting, structured queries, CaMeL
  - Attacking/bypassing guardrails; runtime monitoring, logging prompts/tokens/tool calls, anomaly detection

- **Red-teaming, assessment & operations** _(advanced)_
  - Scoping & rules of engagement; authorized testing, safe-harbor, AI bug-bounty scopes
  - Automated tooling: garak, PyRIT, promptfoo; multi-turn orchestration
  - Evaluation/scoring, ASR tracking, LLM-judge with human spot-checks, avoiding judge gaming
  - Continuous/CI-CD red-teaming and regression gating
  - OWASP-aligned scorecards, ATLAS-mapped reporting, responsible disclosure

- **Governance, compliance & secure deployment** _(intermediate)_
  - Secure LLM reference architecture; secrets/identity, scoped short-lived credentials, per-action authz
  - Cost/rate/abuse controls and denial-of-wallet (LLM10)
  - Observability and AI-specific incident response
  - NIST AI RMF (Govern/Map/Measure/Manage) + GenAI profile; ISO/IEC 42001; EU AI Act obligations
  - Capstone: full secure-AI assessment & governance mapping

### Gaps vs our draft (add/strengthen)
- Dedicated multimodal / vision-language security treatment. Our draft only sprinkles 'image/audio prompt injection' as single key points (ai-m1-4, ai-m4-3). Public 2025-2026 work (image-embedded & typographic injection, adversarial perturbations against closed MLLMs, cross-modal carriers) warrants its own topic or short module.
- Emerging agentic-AI threat frameworks. Module ai-m6 covers agents/MCP well but predates the OWASP Agentic Security Initiative taxonomy (ASI/T1-T15), the Agentic Top 10, and CSA/OWASP MAESTRO 7-layer multi-agent threat modeling. Multi-agent-specific failures — memory poisoning, agent collusion, cascading hallucinations, unsafe delegation escalation, inter-agent trust/identity — are absent.
- Named cutting-edge injection defenses. Our guardrails module (ai-m12) covers input/output/architectural/dual-LLM generically but does not name the current research defenses learners will meet: OpenAI instruction hierarchy, Microsoft spotlighting, structured queries, and Google CaMeL. Adding these keeps the defense content current.
- Synthetic-media / deepfake abuse and content provenance. No coverage of generative misuse (voice/image/video cloning for fraud and disinformation), detection, or provenance/watermarking standards (C2PA, SynthID). Many broad 'AI security' syllabi include at least an awareness unit; optional but a visible gap.
- Machine unlearning / model editing. 'Right to be forgotten', unlearning verification, and model-editing (knowledge insertion/removal) as both a privacy control and an attack surface are not present anywhere.
- Explicit mapping of labs to free public platforms. Our labs are strong custom Docker exercises but never point learners at the established free targets (PortSwigger Web LLM labs, Gandalf/Agent Breaker, AI-Goat, Damn Vulnerable LLM, HackTheBox AI Prompt Injection Essentials, DEF CON AI Village GRT). Referencing these raises credibility and gives self-serve practice.
- Depth on governance/compliance. Governance is one topic (ai-m15) at high level; strong public material (NIST GenAI profile's 12 risk categories, ISO/IEC 42001 controls, EU AI Act risk tiers & obligations, AI incident-reporting duties) could be expanded for learners targeting enterprise/GRC roles.
- A notable-AI-incidents / case-study thread. Beyond ATLAS case studies, there is no walkthrough of real published incidents (e.g., ShadowRay exploitation in the wild, Slack/Copilot indirect-injection disclosures, Hugging Face malicious-model finds) to anchor theory in reality.

### Interactive teaching ideas
- In-browser 'Gandalf-style' prompt-injection ladder: progressive levels where each stage adds a stronger defense (keyword filter -> classifier -> dual-LLM), with a live pass/fail and a leaderboard. Directly teaches ai-m4 and ai-m12 by making the learner feel defenses strengthen.
- Context-window / tokenization visualizer: paste a system prompt + user turn + 'retrieved document', and the widget shows BPE tokens, role concatenation, and exactly where injected instructions land in one untrusted buffer — makes the abstract 'prompt boundary' concept concrete.
- Indirect-injection sandbox: the learner edits a mock web page or PDF, then watches a simulated victim assistant summarize it and get hijacked (safe, fully client-side). Mirrors the PortSwigger 'delete carlos' lab without a live model.
- Interactive OWASP LLM Top 10 map: click any risk tile to reveal a worked example payload, a realistic mitigation, the matching ATLAS technique, and a jump-link to the relevant lab — turns ai-m7 into an explorable reference.
- Markdown-image exfiltration demo with a mock beacon server: fire a payload and watch 'stolen' data arrive at an attacker URL, then toggle a CSP/allowlist and watch the beacon break. Teaches ai-m4-4 defenses by cause-and-effect.
- Live attack-success-rate dashboard: run a small payload corpus against a sandboxed local model (or recorded responses) and watch ASR update per technique and per model version — operationalizes the benchmarking in ai-m5-5.
- Pickle-RCE visualizer: inspect a malicious model artifact's __reduce__, step through what executes on load (safely simulated 'popping calc'), then re-save as safetensors and see the payload neutralized — makes ai-m10 supply-chain risk vivid.
- Drag-and-drop threat-modeling canvas: place trust boundaries and tool permissions on an AI-app diagram; the widget flags excessive agency, untrusted RAG, and missing human-in-the-loop in real time — a reusable interactive for ai-m2 and ai-m6.
- MITRE ATLAS Navigator-style matrix embedded in the portal, auto-highlighting which tactics/techniques each completed module covers, so learners see their coverage grow.
- Before/after guardrail diff viewer: one toggle switches a guardrail on/off and shows the same payload blocked vs allowed, with the detector's reasoning — reinforces ai-m12.
- Guided in-browser notebook (Pyodide/WebContainers) 'build-a-RAG-then-poison-it': learners construct a tiny vector store, insert a poisoned doc, watch retrieval get hijacked, then add retrieval-time controls — no local setup needed.
- Gamification layer across the track: CTF-style flags per lab, badges, streaks, and a scoreboard, matching how HackTheBox/DEF CON AI Village teach the field.

### Key sources
- [OWASP Top 10 for LLM Applications 2025 (GenAI Security Project)](https://genai.owasp.org/llm-top-10/) — Canonical LLM risk taxonomy; 2025 adds LLM07 System Prompt Leakage and LLM08 Vector/Embedding Weaknesses. Our course maps to this well.
- [OWASP Machine Learning Security Top 10](https://owasp.org/www-project-machine-learning-security-top-10/) — Classical-ML companion list (evasion, poisoning, inversion, membership inference, model theft, supply chain) — basis of our ATLAS/ML module.
- [OWASP Agentic Security Initiative + Multi-Agentic System Threat Modeling Guide (MAESTRO)](https://genai.owasp.org/initiatives/#agenticinitiative) — Newest agentic work: ASI threat taxonomy (T1-T15), MAESTRO 7-layer modeling, memory poisoning, agent collusion, cascading hallucinations. Our agent module predates this depth.
- [MITRE ATLAS](https://atlas.mitre.org/) — ATT&CK-style adversarial-ML knowledge base; 16 tactics (Nov 2025 v5.1 added Command & Control), techniques with AML.TXXXX IDs, case studies, Navigator, Arsenal/Counterfit tooling.
- [NIST AI RMF 1.0 (AI 100-1) + Generative AI Profile (AI 600-1)](https://www.nist.gov/itl/ai-risk-management-framework) — Govern/Map/Measure/Manage functions; GenAI profile defines 12 GenAI-specific risk categories. Governance anchor for the defense phase.
- [PortSwigger Web Security Academy — Web LLM Attacks](https://portswigger.net/web-security/llm-attacks) — Free interactive labs: prompt injection, indirect injection (delete 'carlos'), insecure output handling/XSS, excessive agency, AI-agent exfiltration. Gold standard for interactive style.
- [Lakera Gandalf / Gandalf: Agent Breaker](https://gandalf.lakera.ai/) — Free gamified prompt-injection ladder with increasing defenses; the model for an in-browser challenge progression. Agent Breaker adds agent-exploitation PvP.
- [Google AI red team guidance / Secure AI Framework (SAIF)](https://saif.google/) — Vendor framework for securing AI pipelines end-to-end; risk map and controls. Good source for secure-by-design checklists.
- [Microsoft — PyRIT + AI Red Teaming guidance / Crescendo & Skeleton Key research](https://github.com/Azure/PyRIT) — Open automated red-team orchestration; origin of Crescendo multi-turn and Skeleton Key attacks we already teach.
- [NVIDIA garak — LLM vulnerability scanner](https://github.com/NVIDIA/garak) — Probe/detector-based LLM scanner covering injection, jailbreak, leakage, toxicity. Core offensive tool in our lab module.
- [promptfoo — red-team & eval harness](https://www.promptfoo.dev/docs/red-team/) — OWASP/jailbreak/injection plugins, CI-friendly scoring. Backs our OWASP-aligned assessment and CI red-team labs.
- [HackTheBox — AI Prompt Injection Essentials + AI Red Teaming CTF (ai_gon3_rogu3)](https://www.hackthebox.com/blog/ai-red-teaming-ctf) — Free intro module + competitive LLM jailbreak/injection CTF. Confirms CTF-style delivery is the field norm.
- [DEF CON AI Village — Generative Red Team (GRT)](https://aivillage.org/) — Largest public GenAI red-teaming exercises (GRT at DEF CON 31/33); community methodology and harm-category framing.
- [awesome-llm-security (corca-ai) + Awesome-LLMSecOps](https://github.com/corca-ai/awesome-llm-security) — Curated tools/papers/targets hub; points to Gandalf, AI-Goat, Damn Vulnerable LLM, embedding/agent/MCP security resources.
- [Vulnerable practice targets: AI-Goat, Damn Vulnerable LLM Project, DVLA, TrustAI CTFs](https://github.com/dhammon/ai-goat) — Deliberately vulnerable LLM apps/CTFs for safe, resettable practice — direct references for our custom Docker lab targets.
- [Hugging Face security (safetensors, malware scanning, Picklescan/ModelScan)](https://huggingface.co/docs/hub/en/security) — Model-hub threat model: pickle RCE, typosquatting, scanning, safetensors as safe serialization. Supports our supply-chain module.
- [Carlini et al. — 'Poisoning Web-Scale Training Datasets' / LLM training-data extraction](https://arxiv.org/abs/2302.10149) — Foundational research on realistic web-scale poisoning and memorized-data extraction used in our poisoning and privacy modules.
- [Cloud Security Alliance / arXiv — image & multimodal prompt injection (2025-2026)](https://arxiv.org/abs/2503.11519) — Typographic/image-embedded and adversarial-perturbation injection vs vision-language models; no defense fully neutralizes it. Area our course only touches.

### Deployable labs
_The strongest free online platforms to anchor an AI-security course are Lakera Gandalf (+ Agent Breaker), PortSwigger's free Web LLM Attacks labs (the best structured graded curriculum), Wiz Prompt Airlines, HackMerlin, Tensor Trust and Dreadnode Crucible, backed by the OWASP LLM/ML Top 10 and MITRE ATLAS as the taxonomy. For self-hosting on the ARM64 DGX Spark, the best Docker-based, one-container-per-user options are DVAP (15 labs, bundled Ollama, 8/10 LLM Top 10), AIGoat, OWASP PwnzzAI and PromptMe, LLMVault, FinBot CTF, and the MCP/agent labs (DVMCP, MCPGoat, Damn Vulnerable MCP Server) - all pure-Python web/MCP apps that are architecture-independent, and the DGX's GPU + large unified memory make it excellent for running the local Ollama models these labs need. Key ARM64/self-host caveats: DVAP lists ARM64 as 'supported but untested' and some Docker Hub images may not publish arm64 tags (build locally or confirm the base image), the Damn Vulnerable LLM Agent realistically needs an external GPT-4 API key rather than a local model, and Orca's AI Goat is AWS-Terraform (cloud account, not self-hostable) so use it only for a cloud-ML module. Prefer local-Ollama-configurable labs so everything stays on the box, keep every vulnerable app bound to localhost/isolated network, and give each learner their own container on a distinct port for the one-lab-per-user model._

Free platforms:
- [Lakera Gandalf](https://gandalf.lakera.ai/) — Online, no signup. 7-level prompt-injection game to extract a secret password (LLM01). Beginner. Classic warm-up; browser-only, nothing to self-host.
- [Lakera Gandalf: Agent Breaker](https://gandalf.lakera.ai/agent-breaker) — Online. Advanced agent/tool-abuse scenarios (LLM01/LLM06) on realistic AI agents. Good for an agentic-security module.
- [PortSwigger Web Security Academy - Web LLM Attacks](https://portswigger.net/web-security/llm-attacks) — Online, 100% free, graded labs with live LLM backends: prompt injection, mapping LLM API attack surface, excessive agency, insecure output handling, indirect injection. Best structured free curriculum; pairs with free Burp Community.
- [Wiz Prompt Airlines](https://promptairlines.com/) — Online CTF. Manipulate an airline AI chatbot to score a free flight; prompt injection + business logic (LLM01/LLM02). Intermediate, polished.
- [HackMerlin](https://hackmerlin.io/) — Online. Fantasy-themed escalating password-extraction prompt-injection puzzle. Beginner-friendly, like Gandalf.
- [GPT Prompt Attack](https://gpa.43z.one/) — Online. Golf-style challenge: make the model leak a key in the fewest characters. Quick 30-60 min filler.
- [Tensor Trust](https://tensortrust.ai/) — Online. Attack AND defend prompt-injection game (build a prompt defense, break others'). Teaches defense side too.
- [Dreadnode Crucible](https://platform.dreadnode.io/crucible) — Online, free account. Broad ML/LLM red-team tasks: prompt injection, data extraction, model inversion, evasion, fingerprinting. Advanced capstone material.
- [HackTheAgent](https://hacktheagent.com/) — Online. Agent-security focus: tool abuse, privilege escalation in AI agents (LLM06/LLM08). Intermediate.
- [Gray Swan Arena / RedTeam Arena](https://app.grayswan.ai/arena) — Online jailbreak/red-team arenas against frontier models, sometimes with prizes. Ongoing community challenges; good for advanced learners.
- [TryHackMe - Attacking LLMs path (free intro rooms)](https://tryhackme.com/module/attackingllm) — Online, browser VMs. Free rooms include 'Input Manipulation & Prompt Injection' and 'AI Security Threats'; deeper rooms (LLM Pentesting, Prompt Security) are premium. Guided, beginner path.
- [MITRE ATLAS](https://atlas.mitre.org/) — Online knowledge base (not a lab): adversarial ML tactics/techniques + case studies. Use as the threat-model backbone/reference for lab design.
- [OWASP Top 10 for LLM Apps & ML Security Top 10](https://genai.owasp.org/) — Online reference. The category taxonomy (LLM01-LLM10, ML01-ML10) every lab below maps to; use for module structure and learning objectives.

Specific labs:

| Lab | What | Platform | Difficulty | Deploy |
|---|---|---|---|---|
| DVAP - Damn Vulnerable AI Platform | 15 containerized labs: direct/indirect prompt injection, memory & RAG poisoning, tool-output injection, MCP abuse, multi-agent and autonomous-agent attacks, data exfil, agent-identity abuse, across banking/healthcare/SaaS domains. Covers 8/10 of the OWASP LLM Top 10 (LLM01-03, 05-09). | Docker Compose + bundled Ollama (fully local, no paid API) | Beginner to Advanced | git clone, cp .env.example .env, `docker compose up -d`, open :8080. Needs 16GB+ RAM/20GB disk; ARM64 'supported but untested' by the author but DGX Spark's GPU runs Ollama natively, so most likely to work - validate first. |
| AIGoat (AI Security Consortium) | Deliberately vulnerable e-commerce app with an AI chatbot 'Cracky'; ~17 attack labs each mapped to an OWASP LLM Top 10 category. Learner exploits prompt injection, info disclosure, excessive agency, etc. | Docker / docker-compose, local | Beginner to Intermediate | `docker compose up`; Python/Flask + web UI is architecture-independent so ARM64-friendly. Keep bound to localhost. |
| OWASP PwnzzAI | Official OWASP vulnerable app (pizza-shop theme) covering the OWASP LLM Top 10 and AI Exchange threat categories. Learner works through injection/leakage/agency challenges. | Docker Compose (ships an 'external Ollama' compose file to point at your own model host) | Beginner to Intermediate | `docker compose up`; use the external-Ollama compose to target the DGX's local model server. Flask app = ARM64-clean. |
| OWASP PromptMe | Apache-2.0 vulnerable app with 10 hands-on challenges mirroring the OWASP LLM Top 10 (injection, sensitive-info disclosure, insecure output handling, excessive agency, etc.). | Docker, local | Intermediate | `docker compose up`; Python web app, ARM64-friendly. One lab per user works by giving each learner their own container/port. |
| LLMVault | Offline CTF-style range for the 2025 OWASP LLM Top 10 (reported ~25 tiered exercises), e.g. LLM01 prompt injection and LLM02 sensitive-information disclosure. | Docker + Python, local; compose can bind to localhost only | Beginner to Intermediate | `docker compose up` with localhost bind; Python stack is ARM64-portable - test the base image arch. |
| Broken LLM Integration App | Focused app teaching LLM integration flaws: prompt injection, prompt/system-prompt leaking, P2SQL injection (prompt-to-SQL), and LLM4Shell (output-to-code execution). Strong for 'insecure output handling / excessive agency'. | Docker, local-only by design | Beginner to Intermediate | `docker compose up`, keep off the internet. Python app, ARM64-OK; point it at local Ollama if it supports configurable backends. |
| Damn Vulnerable MCP Server (DVMCP, Kyze-Labs v2) | Intentionally vulnerable Model Context Protocol server ('DVWA for MCP/agent security'): all-in-one server exposing ~28 tools, MCP Inspector, exfil listener, and a web challenge dashboard. Teaches tool poisoning, command injection, data exfil via MCP. | Docker Compose, local | Intermediate to Advanced | `docker-compose run` (MCP services use stdio/JSON-RPC, not plain HTTP) + connect an MCP client. Python, ARM64-friendly. Timely agent/MCP module. |
| Damn Vulnerable MCP Server (harishsg993010, original) | Educational vulnerable MCP implementation: 10 progressive challenges - malicious code execution via tools, unauthorized system access, multi-vuln chaining. | Docker (build image, map ports 9001-9010); Linux recommended | Beginner to Intermediate | `docker build` then run with 9001-9010 port map; author notes unstable on Windows, Docker/Linux preferred - fits ARM64 Linux host. |
| MCPGoat | Vulnerable MCP server for pentest practice: 26 challenges / 78 CTF flags plus a victim-agent harness where a real LLM-driven MCP client is manipulated into calling unrequested tools and leaking secrets. | Docker, local | Intermediate to Advanced | `docker run --rm -p 127.0.0.1:7332:7332 mcpgoat`; one container per learner on a unique port. Verify image publishes an arm64 tag or build locally. |
| Damn Vulnerable LLM Agent (Reversec/WithSecure) | LangChain ReAct agent chatbot with 2 flags: inject a fake Thought/Action/Observation to impersonate another user, then chain a UNION-based SQL injection through a tool. Best lab for Thought/Action/Observation injection. | Docker/Streamlit, local app BUT calls an external LLM | Intermediate | `docker` or `streamlit run`; reliably needs GPT-4/GPT-4-Turbo for the ReAct loop, so budget an OpenAI key - small local models often break the loop. App itself is ARM64-fine; the dependency is the model, not the arch. |
| OWASP FinBot CTF | Simulated AI-powered financial chatbot CTF spanning the full OWASP LLM Top 10 in a finance context. | Docker (self-host) with an official live demo available | Intermediate | `docker compose up` from the repo; live demo at owasp-finbot-ctf-demo.onrender.com if you don't want to host. Containerized web app, ARM64-friendly. |
| Auto Parts CTF (MyLLMAuto, Arcanum) | Vulnerable auto-parts store AI assistant; prompt injection + business-logic abuse (LLM01/LLM02). From the authors of the MyLLM* series. | Docker, local | Intermediate | `docker compose up`; web app, ARM64-portable. |
| ai-prompt-ctf (PwnGPT) | Open-source 'build-a-Gandalf' prompt-injection CTF with multiple levels of system-prompt hardening to bypass. Good customizable in-house CTF base. | Docker, local; configurable model backend | Beginner to Intermediate | `docker compose up`; can be pointed at local Ollama instead of OpenAI, making it fully self-contained on the DGX. ARM64-friendly Python. |
| AI Goat (Orca Security) | Intentionally vulnerable AWS environment built on the OWASP ML Security Top 10 - a toy store with ML features; missions include bypassing a content-filtering model to post a forbidden comment. Only lab here that targets cloud ML infra (SageMaker-style). | Cloud account - AWS via Terraform (NOT Docker/self-host) | Intermediate | `terraform apply` into an isolated AWS account; run `terraform destroy` after. Does not run on the DGX - use only if you want a cloud-ML module and accept AWS free-tier/cost + exposure risk. |
| Malicious model-file / pickle-deserialization lab (build-your-own) | Learner crafts a harmless 'malicious' PyTorch/pickle checkpoint that runs code on load, then detects/blocks it with picklescan, fickling, and ModelScan; explores the CVE-2025-10155 extension-spoof scanner bypass and why safetensors is safer. Covers ML supply-chain / model-theft-adjacent risks (LLM05, ML06). | Self-build Python scripts (no image needed), local | Intermediate | Run scanners in a venv with `python -I`; pure Python so natively ARM64. Base it on the 8ksec/Snyk writeups; keep payloads harmless. |
| garak - LLM vulnerability scanner (as an exercise) | NVIDIA's open-source LLM red-team scanner; learners run automated probes (jailbreaks, prompt injection, toxicity, data leakage) against the DGX's local Ollama models and read the report - teaches automated AI red-teaming, not just manual. | Python tool / Docker, local; targets local model endpoints | Intermediate | `pip install garak` then `garak --model_type ollama --model_name <model>`; ARM64-clean and ideal paired with the DGX's local models. |

## Cloud Security

**Overview.** Our draft cloud track is already strong and, in several areas, deeper than most free public offerings: 13 modules and 83 topics spanning fundamentals, IAM internals, recon, privilege escalation, storage, secrets, SSRF-to-metadata, serverless, containers/Kubernetes, detection/IR, attack-path graphing, CSPM/compliance and multi-cloud — with every attack paired to a defense, which most free CTFs and walkthroughs omit. The best free resources (flaws.cloud, CloudGoat, IAM Vulnerable, HackTricks Cloud, hackingthe.cloud, Kubernetes Goat, Wiz/TryHackMe CTFs, SANS outlines) collectively go from absolute basics to advanced multi-stage kill chains, and the public ecosystem's real edge over us is breadth of hands-on gamified labs plus three fast-moving areas we under-cover: CI/CD-and-IaC pipeline security as a first-class domain, cloud ransomware/destructive and resource-hijacking attacks (Codefinger SSE-C, KMS abuse, LLMjacking), and deeper Entra ID identity attack paths. The clearest places to grow are: add a dedicated CI/CD + IaC security module (TerraGoat/CI-CD Goat style with Checkov gating), add a ransomware/data-destruction + denial-of-wallet module, promote Azure/Entra and managed-data-services from primer depth to real labs, and make the learning far more interactive via an in-browser policy-evaluation simulator, clickable attack-path graphs, and LocalStack-backed terminal labs so beginners practise with no account, cost or legal risk. Doing so would match the public field's basic-to-advanced range while keeping our distinctive attack-and-defend-together structure.

### Topic coverage a strong course has

- **Cloud Fundamentals & Shared Responsibility** _(basic)_
  - What the cloud is: API-driven, multi-tenant, control plane vs data plane
  - IaaS/PaaS/SaaS/FaaS and how responsibility shifts left
  - Shared Responsibility Model per service model
  - Cross-provider Rosetta Stone (AWS/Azure/GCP compute, storage, identity, networking)
  - Accounts/subscriptions/projects, regions, AZs, blast radius, org hierarchy
  - NIST SP 800-145 essential characteristics
  - Cloud threat landscape: Capital One, CSA Pandemic Eleven, misconfig-over-CVE

- **Identity & Access Management (IAM)** _(intermediate)_
  - Principals: users vs roles, STS temporary credentials, federation (SAML/OIDC/SSO)
  - IAM policy anatomy: Effect/Action/Resource/Condition/Principal, wildcards, NotAction
  - Five policy types and evaluation logic (explicit deny, SCP, boundary, session, identity/resource)
  - AssumeRole flow, trust vs permission policy, role chaining, ExternalId/confused-deputy
  - Least privilege with Access Analyzer, last-accessed, policy generation
  - Azure Entra ID + RBAC split; GCP hierarchy-inherited IAM + service accounts

- **Cloud Reconnaissance & Enumeration** _(intermediate)_
  - External footprinting: CT logs, DNS CNAMEs, bucket permutation, ASN/IP attribution, public code leaks
  - Credential discovery: git history, CI logs, AMIs/snapshots, dotfiles, AKIA/ASIA prefixes
  - Authenticated enumeration from one key; enumerate-iam, permission brute-forcing
  - Tooling: Pacu, ScoutSuite, Prowler, CloudMapper, Cartography, PMapper, CloudFox
  - Building identity/trust graphs (Neo4j) and reading escalation edges
  - Azure/GCP recon: AzureHound, ROADrecon, GCPBucketBrute, SA impersonation edges

- **IAM Attacks & Privilege Escalation** _(advanced)_
  - The 21-31 privesc primitives (Rhino / IAM Vulnerable catalogue)
  - PassRole + service-assumed roles (Lambda/EC2/Glue/CloudFormation/SageMaker sinks)
  - Trust-policy abuse, wildcard/root trust, missing ExternalId, GitHub OIDC sub-claim wildcards
  - Resource-policy escalation (KMS, Lambda, Secrets Manager, SNS/SQS, ECR) without AssumeRole
  - Identity persistence and its CloudTrail footprint
  - Automated discovery: Pacu iam__privesc_scan, PMapper, Cloudsplaining

- **Storage & Data Exposure** _(intermediate)_
  - Full S3 access-control stack: ACLs, bucket policy, IAM, Block Public Access, Object Ownership, Access Points
  - Finding exposed storage: s3scanner, cloud_enum, GCPBucketBrute; list/read/write distinction
  - Pre-signed URL abuse and over-long expiries
  - Snapshots/AMIs/backups over-shared; mounting a shared snapshot cross-account
  - Encryption at rest: SSE-S3/KMS/SSE-C, key policy as the real control, deny-unencrypted
  - Exfiltration paths + Macie, GuardDuty S3, CloudTrail data events

- **Secrets Management** _(intermediate)_
  - Where secrets live: Secrets Manager, SSM Parameter Store, env vars, user-data, Terraform state, image layers
  - Leakage vectors + scanners: trufflehog, gitleaks, detect-secrets, image-layer scanning
  - Managed stores: resource policies, KMS-backed encryption, rotation, staging labels
  - Keyless workload identity: instance profiles, ECS task roles, IRSA, OIDC federation (GitHub Actions->AWS)
  - KMS envelope encryption and cross-account decrypt gatekeeping
  - Rotation, mass-GetSecretValue detection, GitHub push protection

- **Cloud Networking & SSRF-to-Metadata** _(advanced)_
  - VPC model: subnets, route tables, gateways, SG vs NACL, peering/TGW, VPC endpoints/PrivateLink
  - Instance Metadata Service: 169.254.169.254, IMDSv1 vs IMDSv2 token + hop-limit
  - SSRF-to-metadata credential theft end-to-end (Capital One pattern)
  - Exposure analysis: 0.0.0.0/0 rules, public endpoints, VPC Reachability Analyzer
  - Network-based lateral movement, DNS rebinding, bastion pivoting
  - Hardening: enforce IMDSv2, micro-segmentation, egress filtering, GuardDuty exfil detection

- **Serverless & Event-Driven Security** _(intermediate)_
  - Serverless attack surface: code, event sources, execution role, dependencies; OWASP Serverless Top 10
  - Event injection (command/code/NoSQL/SQL/deserialization via event payloads)
  - Execution-role abuse, reading function credentials, UpdateFunctionCode persistence
  - API Gateway/authorizers: weak authorizers, authorizer caching replay, CORS, throttling
  - Dependency/supply-chain in bundles and layers; SBOM, scanning
  - Hardening: per-function least-privilege roles, schema validation, code signing, concurrency limits

- **Container & Kubernetes Security** _(advanced)_
  - Container isolation: namespaces, cgroups, capabilities, shared kernel; runc CVEs (2019-5736)
  - Image/supply chain: Trivy/Grype scanning, distroless, Cosign/Sigstore signing, admission policy
  - Container breakout: privileged, hostPID/hostNetwork, docker.sock mount, writable host mounts, release_agent
  - K8s architecture/threat model: API server, etcd, kubelet 10250, SA tokens; ATT&CK for K8s
  - RBAC & service-account abuse: dangerous verbs, pods/exec, impersonate; kubiscan, Peirates
  - Pod Security Admission, NetworkPolicy (Calico/Cilium), OPA/Gatekeeper/Kyverno, etcd encryption
  - Cloud-linked compromise: pod->node IMDS->account; IRSA / GKE Workload Identity / AKS workload identity

- **Logging, Monitoring & Detection** _(intermediate)_
  - CloudTrail: management vs data vs insight events, org trails, log file validation, anti-forensics
  - GuardDuty finding types (InstanceCredentialExfiltration), Detective, Macie, Security Hub
  - VPC Flow Logs + Route53 resolver query logging for exfil/C2
  - Log pipeline: CloudTrail->S3->Athena, EventBridge alerting, SIEM shipping, SOAR auto-response
  - Writing detections for taught TTPs (privesc events, cred exfil, mass GetObject), Sigma + ATT&CK mapping
  - Cloud incident response workflow: contain/preserve/scope/eradicate

- **Attack Paths & Post-Exploitation** _(advanced)_
  - Cloud kill chain mapped to ATT&CK for IaaS
  - Cross-account movement via trust and resource policies; management-account impact
  - Cross-service pivoting: EC2->metadata->data, SSM Run Command/Session Manager, passed roles
  - Persistence at scale: backdoor roles, IdP/SSO tampering, EventBridge triggers, IaC poisoning, GuardDuty suppression
  - Data collection & exfiltration channels and their detection signatures
  - Attack-path graphing and choke-point identification (PMapper/Cartography)
  - Red-team engagement: scoping, ROE, OPSEC, reporting, purple-teaming

- **CSPM, Compliance & Hardening at Scale** _(intermediate)_
  - CSPM tooling: Prowler, ScoutSuite, Security Hub, Config rules, Cloud Custodian; CNAPP context (Wiz/Prisma)
  - CIS Benchmarks (AWS/Azure/GCP Foundations) and Config conformance packs
  - Compliance frameworks: NIST CSF/800-53, PCI-DSS, SOC 2, ISO 27001, HIPAA; control-to-framework mapping
  - Preventative guardrails: SCPs, OPA/Conftest, Checkov pre-deploy
  - Secure landing zones: Control Tower, account-per-workload, baseline auto-enablement, golden paths
  - Prioritisation by exploitability and blast radius, not finding count

- **Multi-Cloud: Azure & GCP** _(intermediate)_
  - Azure identity: Entra ID (users, SPs, managed identities, app registrations), Azure RBAC scoping, Conditional Access
  - Azure attack paths: managed-identity IMDS theft, SP secret/cert abuse, Owner/UAA escalation, SAS token exposure
  - GCP identity: hierarchy-inherited IAM, service accounts, primitive vs predefined roles
  - GCP attack paths: SA impersonation (actAs/getAccessToken/signJwt), GCE metadata token, setIamPolicy, GCS allUsers
  - Cross-cloud federation risk: workload identity federation, single-IdP cascade
  - Unified multi-cloud posture and consistent ATT&CK mapping

- **IaC & Pipeline Security (expansion area)** _(advanced)_
  - IaC misconfiguration scanning: Checkov, tfsec, KICS, Trivy; plan-file vs HCL scanning; SARIF PR gating
  - Terraform state-file security (plaintext secrets, remote state access control)
  - CI/CD attack surface: OWASP Top 10 CI/CD risks, poisoned pipeline execution, dependency confusion
  - GitHub Actions security: SHA-pinning, OIDC token scope, the tj-actions/changed-files 2025 compromise
  - Deploy-role least privilege as cross-account pivot mitigation
  - Hands-on with TerraGoat, CI/CD Goat, GitHub Actions Goat

- **Cloud Ransomware, Resource Abuse & Data Destruction (emerging)** _(advanced)_
  - S3 ransomware via SSE-C (Codefinger, Jan 2025) and KMS external-key re-encryption
  - Backup/immutable-copy discovery and deletion; KMS 7-day deletion window as a detection chance
  - Denial-of-wallet, cryptojacking/resource hijacking, LLMjacking of Bedrock/managed-AI endpoints
  - DSPM for sensitive-data discovery and classification pre-attack
  - Preventative controls: restrict SSE-C, limit KMS keys, versioning + Object Lock, SCP-block risky KMS APIs

- **Managed Data Services & Edge/App Protection (expansion area)** _(intermediate)_
  - Database services security: RDS/Aurora, DynamoDB, Redshift, data-lake/Athena/Glue access and exfil
  - Snapshot/export exposure for managed databases
  - Edge/perimeter: CloudFront, AWS WAF, Shield, API Gateway throttling and API abuse
  - AWS Inspector / vulnerability management for cloud VMs and images
  - GenAI-in-cloud surface (Bedrock/Vertex/Azure OpenAI) as an AI+cloud cross-track bridge

### Gaps vs our draft (add/strengthen)
- Dedicated CI/CD pipeline security module. Our draft treats CI/CD only as an OIDC-federation example and a cross-account pivot. Public resources make it a first-class domain: OWASP Top 10 CI/CD Security Risks, poisoned pipeline execution, dependency confusion, GitHub Actions OIDC/token abuse, SHA-pinning, and the real tj-actions/changed-files 2025 compromise. Labs exist (CI/CD Goat, GitHub Actions Goat, CI/CDon't).
- Infrastructure-as-Code (IaC) security as hands-on practice. We mention Checkov/Conftest once inside the CSPM module, but there is no module on scanning Terraform/CloudFormation (Checkov, tfsec, KICS, Trivy), plan-file vs HCL scanning, SARIF PR gating, drift detection, or Terraform state-file secret exposure. TerraGoat/CDKGoat are the standard free labs.
- Cloud ransomware and destructive attacks. Entirely absent. This is the single most current high-impact topic in 2025 public research: S3 SSE-C ransomware (Codefinger), KMS external-key re-encryption, backup/immutable-copy wiping, and the KMS 7-day deletion window. Defenses (Object Lock/versioning, restrict SSE-C, SCP-block KMS) are concrete and teachable.
- Resource-hijacking / denial-of-wallet / cryptojacking / LLMjacking. We only name crypto-mining as a GuardDuty finding. Public material treats attacker-driven cost abuse and compute/model hijacking (including LLMjacking of Bedrock/Vertex/Azure OpenAI) as a distinct objective with its own detection and controls.
- Deeper Entra ID / Azure identity attacks. Our Azure module covers managed-identity IMDS theft and RBAC escalation, but public Entra labs go further: illicit-consent/OAuth app phishing, Conditional Access bypass, device-code phishing, Primary Refresh Token (PRT) abuse, and app-registration/service-principal attack graphs (EntraGoat, BadZure, XMGoat, ROADtools, AzureHound). Worth promoting from 'primer' to real depth.
- Managed database and analytics data-services security. RDS/DynamoDB are mentioned only in passing as pivot targets. No coverage of Redshift, data-lake/Athena/Glue exposure, database snapshot/export leakage, or RDS public-accessibility — a common real-world data-breach surface.
- Edge and application-layer cloud protection. No CloudFront/WAF/Shield, API Gateway abuse/API security, or AWS Inspector vulnerability management. Public curricula (SANS SEC540, vendor docs) include perimeter and app-protection controls.
- Gamified CTF / capture-the-flag as an explicit learning track. The free ecosystem leans heavily on CTFs (flaws.cloud, Big IAM Challenge, Wiz Cloud Security Championship, CloudFoxable, EKS Cluster Games, Thunder CTF). Our labs are solid but don't reference or embed this gamified, self-scoring style that drives engagement.
- Modern enumeration tooling gap: CloudFox / CloudFoxable. Our recon tooling is Pacu/ScoutSuite/Prowler/Cartography/PMapper. CloudFox (attack-path surfacing from a foothold) is now a standard part of the public toolkit and is missing.
- SaaS / M365 / identity-provider security as a boundary topic. Pwned Labs and others increasingly cover M365, Okta, and hybrid-identity attacks. Our track is strictly IaaS/PaaS; a short bridge on SaaS identity and IdP-as-blast-radius would match where the field is heading.
- A defender-track flaws2.cloud-style IR/forensics emphasis. We have a strong detection module, but public resources (flaws2 defender path, AWS CIRT Workshop, Cloud Hunting Games) pair every attack with a guided investigation/IR exercise using Athena/CloudTrail — a pattern we could make more explicit as paired attack+investigate labs.

### Interactive teaching ideas
- Interactive IAM policy evaluation simulator: learner pastes identity + resource + boundary + SCP policies and a request, and the page animates the official decision flow (explicit deny -> SCP -> boundary -> session -> allow) to a verdict. Turns the hardest topic (policy evaluation) into a playable engine instead of prose.
- Clickable attack-path graph explorer: a PMapper/Cartography-style node graph (principals, roles, resources; edges = can-assume, can-pass-role, can-read-secret) where learners click edges to see the exploit and the one-line policy fix that removes it, and watch path count to 'crown jewels' drop.
- Animated SSRF-to-metadata walkthrough: a side-by-side app+cloud diagram where the learner crafts the SSRF URL, watches 169.254.169.254 return role credentials, then toggles IMDSv2 hop-limit and sees the same request fail. The Capital One chain made tangible.
- Shared Responsibility Model interactive slider: drag across IaaS->PaaS->SaaS->FaaS and watch each control (patching, IAM, data, network) flip between provider and customer ownership, with the 'fatal assumption' highlighted.
- Browser-embedded LocalStack terminal labs: a sandboxed in-page terminal backed by LocalStack so beginners run real aws CLI enumeration (S3/IAM/Lambda) with zero AWS account, cost, or legal risk — removes the biggest onboarding barrier.
- 'Spot the misconfiguration' rapid-fire challenges: show a real S3 bucket policy, security-group rule, or Terraform snippet; learner clicks the dangerous line (Principal '*', 0.0.0.0/0, iam:*) and gets instant feedback, scored like a quiz.
- Embedded CTF scoreboard linking out to free challenges (flaws.cloud, The Big IAM Challenge, CloudFoxable, EKS Cluster Games) with progress tracking, so the portal orchestrates the best free external labs rather than rebuilding them.
- Cross-provider Rosetta Stone interactive table: hover any AWS service to reveal its Azure/GCP equivalent and the shared security concept, reinforcing that skills transfer across clouds.
- CloudTrail log-analysis playground: a sample event stream the learner queries with pre-built Athena-style filters to detect a privesc or exfil they performed earlier in the attack module — teaches detection by having them hunt their own attack.
- Attacker-edge -> defender-control flip cards: every offensive technique card has a 'defend' side showing the exact SCP/condition/IMDSv2/BPA control that cuts it, reinforcing the course's paired attack+defense philosophy.
- Blast-radius / cost-of-compromise calculator: learner sets account segmentation and role scopes, and the widget computes how many resources a single leaked key reaches and (for denial-of-wallet) the potential spend — making least-privilege and segmentation viscerally concrete.
- Guided remediation diff viewer: present a broken IAM/Terraform config and let the learner edit it in-browser, with live re-scan (Checkov-style) showing findings clear as they fix — mirrors the real shift-left workflow.

### Key sources
- [Awesome-CloudSec-Labs (iknowjason)](https://github.com/iknowjason/Awesome-CloudSec-Labs) — The single best index of FREE cloud-native vulnerable labs/CTFs across AWS, Azure, GCP, Kubernetes, container, CI/CD and multi-cloud; the backbone of this survey.
- [flaws.cloud / flaws2.cloud (Summit Route / Scott Piper)](http://flaws.cloud) — Classic free browser AWS CTF; levels teach public S3 enumeration and SSRF-to-metadata credential theft. flaws2 adds attacker AND defender tracks (ECR, Docker, Athena IR).
- [CloudGoat (Rhino Security Labs)](https://github.com/RhinoSecurityLabs/cloudgoat) — Vulnerable-by-design AWS scenarios: cloud_breach_s3 (Capital One SSRF), iam_privesc_by_rollback, lambda_privesc, ec2_ssrf, rce_web_app, ecs_efs_attack, detection_evasion, cicd, vulnerable_cognito.
- [IAM Vulnerable (BishopFox)](https://github.com/BishopFox/iam-vulnerable) — Terraform lab that stands up 31 documented IAM privilege-escalation paths to practise against; the canonical privesc catalogue.
- [Hacking the Cloud (hackingthe.cloud)](https://hackingthe.cloud) — Open encyclopedia of offensive AWS/Azure/GCP TTPs: enumeration, privesc, post-ex, avoiding detection, persistence — well organised by technique.
- [HackTricks Cloud](https://cloud.hacktricks.wiki) — Deep per-service enumeration + privesc + post-exploitation cheatsheets for AWS/Azure/GCP/K8s; the most exhaustive free reference for hands-on cloud pentest.
- [Kubernetes Goat (Madhu Akula)](https://madhuakula.com/kubernetes-goat) — Interactive vulnerable K8s cluster: sensitive keys in code, DIND exploitation, SSRF, container escape, RBAC, Helm/Tiller, hidden-in-layers secrets. Runs on GKE/EKS/AKS/k3s.
- [The Big IAM Challenge / Wiz CTFs](https://bigiamchallenge.com) — Free gamified Wiz CTFs (Big IAM Challenge, K8s LAN Party, EKS Cluster Games, Prompt Airlines, monthly Cloud Security Championship) — excellent bite-size interactive IAM/K8s puzzles.
- [CloudFoxable + CloudFox (BishopFox)](https://github.com/BishopFox/cloudfoxable) — Build-your-own AWS CTF plus the modern CloudFox enumeration tool that surfaces exploitable attack paths from a foothold; newer than Pacu/ScoutSuite.
- [TerraGoat / CDKGoat (Bridgecrew/Prisma)](https://github.com/bridgecrewio/terragoat) — Vulnerable-by-design IaC across AWS/Azure/GCP for learning Terraform/CloudFormation misconfiguration and Checkov/tfsec/KICS/Trivy scanning.
- [CI/CD Goat & GitHub Actions Goat](https://github.com/cider-security-research/cicd-goat) — CTFs for pipeline attacks mapped to OWASP Top 10 CI/CD Security Risks (poisoned pipeline execution, dependency confusion, OIDC/token abuse); context for the tj-actions/changed-files 2025 supply-chain compromise.
- [AWSGoat / AzureGoat / GCPGoat (INE Labs)](https://github.com/ine-labs/AWSGoat) — Vulnerable multi-tier cloud apps with attack AND defense manuals — strong for teaching remediation alongside exploitation.
- [TryHackMe cloud paths](https://tryhackme.com/path/outline/attackinganddefendingaws) — Structured free/freemium paths: 'Defending AWS' (foundations, IAM, networking, storage) and 'Attacking & Defending AWS' (EC2 compromise, Lambda authorizer abuse, IAM enum, privilege reduction); Azure Security Challenges module.
- [SANS Cloud curriculum (SEC488/SEC540/SEC541)](https://www.sans.org/cyber-security-courses/cloud-security-essentials/) — Professional benchmark for scope: SEC488 essentials (multi-CSP), SEC540 DevSecOps/pipeline automation + K8s compliance, SEC541 cloud threat detection (management-plane + network logging). Paid, but outlines set the bar.
- [Cloud ransomware research (Panther, Varonis, SentinelOne, Rhino)](https://panther.com/blog/detecting-and-hunting-for-cloud-ransomware-part-1-aws-s3) — Codefinger S3 SSE-C ransomware (Jan 2025), KMS external-key re-encryption, backup/immutable-copy wiping — a current high-impact topic absent from most curricula.
- [EntraGoat / BadZure / XMGoat / ROADtools / AzureHound](https://github.com/Semperis/EntraGoat) — Entra ID (Azure AD) attack-path labs and tooling: Global Admin escalation, service-principal/app-registration abuse, consent phishing, Conditional Access bypass — deeper than generic 'Azure RBAC'.
- [awesome-cloud-security (4ndersonLin) & Pwned Labs](https://github.com/4ndersonLin/awesome-cloud-security) — Broad curated index (standards, tools, courses) plus Pwned Labs' free hosted cyber ranges spanning AWS, Azure, GCP, M365, hybrid and AI environments with multi-stage scenarios.
- [AWS Well-Architected Security Pillar + CIS Benchmarks + MITRE ATT&CK Cloud](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html) — Authoritative defensive baselines the course already leans on; CIS Foundations Benchmarks (AWS/Azure/GCP/K8s/EKS) and ATT&CK Cloud matrix give the canonical control + TTP taxonomies.

### Deployable labs
_For a self-hosted ARM64 (DGX Spark) Docker box with one lab per user, the cleanest wins are the few labs that ship native ARM64 container images: OWASP WrongSecrets (confirmed amd64+arm64 on Docker Hub) and Kubernetes Goat (arm64 images contributed upstream, runs on local KIND/K3s), plus kube-hunter (multi-arch) as a scanning companion. CI/CD Goat and Kube Security Lab are fully local-Docker but are predominantly amd64, so they need qemu/binfmt emulation or per-image arch checks before per-user deployment. The large AWS/Azure/GCP goat family (CloudGoat, AWSGoat, AzureGoat, GCPGoat, IAM Vulnerable, SadCloud, TerraGoat, CloudFoxable) is cloud-account/Terraform-based rather than something we host - our box only runs the Terraform/Pacu/CloudFox clients, and each learner needs their own cloud account and must tear resources down to avoid cost; TerraGoat is the exception since it can be scanned statically with Checkov on ARM64 with no cloud. For zero-infrastructure breadth, lean on the free online CTFs - flaws.cloud, flaws2.cloud, the Wiz challenges (Big IAM, K8s LAN Party, EKS Cluster Games), and Pwned Labs - which deliver high-quality interactive content with nothing to self-host and no ARM64 concerns._

Free platforms:
- [Awesome-CloudSec-Labs (iknowjason)](https://github.com/iknowjason/Awesome-CloudSec-Labs) — The master index. ~46 curated free cloud/K8s security labs grouped as online CTFs, self-hosted CTFs, guided workshops, Kubernetes, and vulnerable-by-design. Start here and branch out; most entries link directly to deployable repos.
- [flaws.cloud](http://flaws.cloud/) — Online-only, free, no login. Scott Piper's classic 6-level AWS S3/IAM misconfig CTF. Zero self-host effort; learner needs only a browser (and a free AWS account for later levels). Ideal day-1 intro lab.
- [flaws2.cloud](http://flaws2.cloud/) — Online-only, free. Sequel to flaws.cloud with attacker + defender tracks; covers ECR, Docker, Lambda, Cognito, EC2 snapshots. No infra to run on our box.
- [Wiz Cloud Security Challenges](https://www.wiz.io/blog) — Online-only, free, browser-based: The Big IAM Challenge (AWS IAM), Cloud Hunting Games, K8s LAN Party (Kubernetes), EKS Cluster Games, and the monthly Ultimate Cloud Security Championship. Excellent interactive gamified content, nothing to self-host.
- [Pwned Labs](https://pwnedlabs.io/) — Hosted AWS/Azure/GCP labs; free tier (login required) plus paid. Real cloud attack paths in a browser sandbox. Good for learners without their own cloud account; no self-host.
- [CloudFoxable](https://cloudfoxable.bishopfox.com/) — Bishop Fox self-hosted AWS CTF deployed via Terraform into your own AWS account; designed to be solved with the CloudFox tool. Cloud-account based, not Docker.
- [TryHackMe (cloud rooms)](https://tryhackme.com/) — Browser-based with some free cloud/AWS/container rooms (e.g. Cloud fundamentals, AWS basics). Mix of free/premium. No self-host; good guided on-ramp.
- [Kubernetes Goat](https://madhuakula.com/kubernetes-goat/) — Flagship deliberately-vulnerable K8s environment. Runs on KIND/K3s locally (Docker) or on a managed cluster. ARM64 images were contributed upstream (ran on Raspberry Pi clusters) - best self-host K8s option for our box.
- [OWASP WrongSecrets](https://github.com/OWASP/wrongsecrets) — Self-hostable Docker/K8s secrets-management lab with official multi-arch (amd64 + arm64) images on Docker Hub. One of the few labs confirmed ARM64-ready out of the box.

Specific labs:

| Lab | What | Platform | Difficulty | Deploy |
|---|---|---|---|---|
| flaws.cloud | Enumerate public S3 buckets, pivot through leaked IAM keys, and escalate across 6 levels of real AWS misconfigurations. | online | beginner | No deploy - hosted by author; learner uses a browser + optional free AWS account. Zero load on our box. |
| flaws2.cloud (attacker + defender) | Exploit a container/Lambda-backed app: ECR image pull, SSRF to metadata, Cognito, EC2 snapshot exposure; then switch to the defender track. | online | intermediate | No deploy - author-hosted online; browser only. |
| Wiz Big IAM Challenge | Solve 6 AWS IAM policy puzzles (wildcards, confused-deputy, condition bypasses) to read protected resources. | online | beginner | No deploy - browser-based, free, author-hosted. |
| Wiz K8s LAN Party / EKS Cluster Games | Kubernetes attack scenarios from inside a pod: service enumeration, RBAC abuse, IRSA/node-identity escalation on EKS. | online | intermediate | No deploy - browser-based, free, registration only. |
| CloudGoat | Learner attacks named AWS scenarios (iam_privesc_by_rollback, ec2_ssrf, rce_web_app, lambda_privesc, cicd) built by Rhino Security Labs. | cloud free-tier (own AWS account) | intermediate | pip install + python cloudgoat.py create <scenario>; runs Terraform against the learner's own AWS account. Host arch irrelevant (ARM64 CLI runner fine) but it bills real AWS resources - destroy after use; not a Docker-only lab. |
| AWSGoat | Full vulnerable serverless + EC2 AWS app (OWASP Top 10, IAM privesc, SSRF) deployed as realistic infrastructure. | cloud free-tier (own AWS account) | intermediate | Terraform apply into learner's AWS account (or GitHub Actions). Not Docker-self-hostable on our box; needs AWS credentials and incurs cost. |
| AzureGoat | Vulnerable Azure web app with storage, functions, automation-account and Entra privesc paths. | cloud free-tier (own Azure account) | intermediate | Terraform apply into a learner Azure subscription. Cloud-account based, not Docker/ARM self-host. |
| GCPGoat | Vulnerable GCP environment covering IAM misconfig, GCS exposure, Cloud Functions and compute privesc. | cloud free-tier (own GCP account) | intermediate | Terraform apply into learner GCP project. Cloud-account based, not Docker self-host. |
| IAM Vulnerable | Spin up 30+ intentionally weak IAM roles/policies and practice the known AWS IAM privilege-escalation paths (Rhino's 21 methods). | cloud free-tier (own AWS account) | intermediate | terraform apply into learner AWS account, then exploit with Pacu/aws CLI. Host ARM64 is fine (just runs Terraform); real AWS resources, tear down after. |
| SadCloud | Stand up a large set of insecure AWS services (open S3, public RDS, weak SGs, no logging) to practice posture auditing/misconfig detection. | cloud free-tier (own AWS account) | beginner | terraform apply into learner AWS account; scan with ScoutSuite/Prowler. Cloud-account based, not Docker. |
| TerraGoat | Vulnerable-by-design Terraform repo (AWS/Azure/GCP) for learning IaC misconfiguration scanning and policy-as-code. | cloud free-tier or static scan | beginner | Clone and scan with Checkov/tfsec locally (no cloud needed for static analysis - runs fine on ARM64), or terraform apply for live resources. Partly self-host-friendly. |
| OWASP WrongSecrets | 50+ challenges finding hard-coded/leaked secrets across Docker, Kubernetes, Vault and cloud configs. | Docker image (ARM64-ready) | beginner | docker run -p 8080:8080 jeroenwillemsen/wrongsecrets:latest-no-vault - official arm64 image exists, so it runs natively on the DGX Spark; one container per user. |
| Kubernetes Goat | Deliberately vulnerable K8s cluster: container escape, SSRF to metadata, RBAC abuse, secrets-in-env, hostPath mounts, Helm/Tiller, kubelet attacks. | Docker image / local KIND or K3s | intermediate | bash setup-kubernetes-goat.sh on a local KIND/K3s cluster (Docker). ARM64 images were contributed upstream (ran on Pi clusters) - feasible on our box; verify current arm64 tags per workload. Best self-host K8s lab. |
| Kube Security Lab | Builds ~14 intentionally vulnerable Kubernetes clusters locally to attack then destroy; covers RBAC, network policy, admission control gaps. | Docker + KIND + Ansible (local) | advanced | make/ansible spins up KIND clusters in Docker on one host. Self-host-friendly; confirm KIND node images have arm64 variants before deploying on ARM64. |
| CI/CD Goat | Attack a vulnerable CI/CD pipeline (Gitea + Jenkins + others) through 10 flags: poisoned pipeline execution, credential theft, PPE/SCM abuse. | Docker Compose (local) | intermediate | docker compose up on one host - fully local, no cloud account. ARM64 caveat: upstream images are primarily amd64, so run under emulation (qemu/binfmt) or verify arch before per-user deploy. |
| kube-hunter (target + scanner) | Run kube-hunter against a cluster to discover K8s attack surface; pair with a vulnerable cluster to practice offensive recon and remediation. | Docker image | beginner | docker run -it --rm aquasec/kube-hunter (multi-arch image incl. arm64) pointed at the lab cluster. Lightweight; good companion to Kubernetes Goat. |
| Pacu + CloudGoat (exploitation toolkit) | Use the Pacu AWS exploitation framework as the learner's attack tooling to run enumeration/privesc modules against CloudGoat or IAM Vulnerable targets. | Docker image (tooling) | intermediate | docker run rhinosecuritylabs/pacu (Python, runs on ARM64) from the box; targets a learner AWS account hosting CloudGoat/IAM Vulnerable. Tool self-hosts; targets are cloud-account based. |
| CloudFoxable | Self-hosted AWS CTF of chained IAM/resource misconfigs designed to be solved with the CloudFox enumeration tool. | cloud-account (Terraform) | intermediate | terraform apply into learner AWS account, then enumerate with CloudFox. Cloud-account based; our box only runs the Terraform/CloudFox client (ARM64 fine). |
