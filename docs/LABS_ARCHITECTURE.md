# Labs that do something — architecture & plan (DGX Spark)

Status: proposal / planning. Target host: **one NVIDIA DGX Spark** (single
ARM64 node). Hard constraint: **one user runs at most one live lab at a time**,
and the box as a whole runs only a bounded number of labs concurrently.

This document turns our 59 static lab walkthroughs into graded, interactive
labs — TryHackMe's loop: *deploy a target → attack it → submit a flag*. It is
written against what already exists in this repo and extends it.

---

## 1. What we have today

- **Lab content**: 59 labs in `src/lib/data/labs.ts` — objective, success
  criteria, slides/instructions, hints, assets, and (33 of them) a
  `dockerImage` + `containerPort`.
- **A single-container runner**: `src/lib/server/dockerLabs.ts` +
  `/api/labs/docker/{start,stop,status}` + the `LabRun` Prisma model. It pulls
  an image and runs **one** container at a time on a fixed host port (18080),
  tracked in the DB, with self-healing status.
- **Screenshot "proof"**: `/api/labs/verify-screenshot` OCRs an uploaded image
  and asks DeepSeek whether it shows completion. This is evidence, not grading.
- **Hosted gating**: `NEXT_PUBLIC_LABS_DOCKER` hides the Docker runner on
  serverless hosting; learners fall back to each lab's online alternative.

Gaps vs TryHackMe: (a) nothing is **graded** — status is self-reported;
(b) the Docker runner is **global single-tenant** (one container for the whole
server, not per-user) and only runs where Docker is local.

---

## 2. The three tiers (cheapest first)

| Tier | What it adds | Infra | Covers | Build cost |
|------|--------------|-------|--------|-----------|
| **1. Server-side flag/answer validation** | Each lab task has a question; learner submits an answer/flag; checked server-side against a salted hash. Turns walkthroughs into graded rooms. | **None** (runs in the portal) | **All 59** | Small |
| **2. In-browser web targets** | Ship the vulnerable web app as a per-user ephemeral container behind the portal; learner attacks the live target, finds the real flag, submits it (Tier 1 validates). | DGX Spark + broker | ~1/3 (web/OWASP) | Medium |
| **3. Attackable VMs + browser Kali** | Full boot2root / AD / privesc targets + an in-browser attack box. True THM parity. | Heavy (KVM/cloud + VPN/Guacamole) | the rest | Large |

**Do Tier 1 first.** It makes every lab "work" (graded) with zero infra and is
the foundation the other tiers submit into. Tier 2 is the main DGX Spark build.
Tier 3 is deferred until this is a funded product (see §7).

---

## 3. Tier 1 — server-side flag/answer validation (no DGX)

The cheapest, highest-leverage change. Lives entirely in the Next.js app and
works on Vercel today.

### Data model (Prisma)

```prisma
model LabTask {
  id         String   @id @default(cuid())
  labId      String                 // e.g. "L24"
  order      Int
  prompt     String                 // "What is the admin's password?"
  answerHash String                 // sha256(salt + normalized(answer))
  salt       String
  hint       String?
  points     Int      @default(10)
  @@index([labId])
}

model LabTaskSubmission {
  id        String   @id @default(cuid())
  userId    String
  taskId    String
  correct   Boolean
  attempts  Int      @default(1)
  solvedAt  DateTime?
  @@unique([userId, taskId])
}
```

### API

- `POST /api/labs/tasks/submit { taskId, answer }` → normalize (trim,
  case-fold for text answers; exact for flags), `sha256(salt+answer)`, compare,
  record submission, award points/XP on first correct. Rate-limit per user/task
  (e.g. 1/sec, lockout after N wrong) to stop brute force.
- `GET /api/labs/tasks?labId=` → tasks **without** `answerHash` (never ship the
  hash or salt to the client).

### Anti-share

Static flags get shared. Two defenses, in order of effort:
1. **Normalized free-text answers** for most tasks (not a single copy-paste
   flag) — "name the CVE", "which port", "the hash type".
2. **Per-user flags** for Tier 2 targets: the container is seeded with a
   per-session flag `THM{<hmac(userId,labId)>}`; the portal validates against
   the same HMAC. Sharing a flag fails for everyone else.

### UI

Replace the free-text "Evidence / Flag URL" box in `LabCard` with a task
checklist: each task = prompt + input + submit, green check when solved, lab
marked complete when all required tasks are solved. Keep screenshot verify as
optional secondary evidence.

**This alone delivers "labs that do something" for all 59 labs.**

---

## 4. Tier 2 — in-browser web targets on DGX Spark

The vulnerable web app runs as a **per-user, ephemeral container** on the DGX
Spark; the learner reaches it through the portal, attacks it, extracts the
per-user flag, and submits it to Tier 1.

### 4.1 DGX Spark as the host — what it is

- Single desktop node: GB10 Grace-Blackwell, **~20-core Arm (ARM64)**, **128 GB
  unified memory**, NVMe, 200 GbE, Blackwell GPU, DGX OS (Ubuntu-based).
  *(Verify exact specs for the unit before sizing.)*
- Implications:
  - **ARM64, not x86.** Lab images must be `linux/arm64` or multi-arch. Many
    public vuln images (DVWA, Juice Shop, WebGoat) have arm64 builds; amd64-only
    ones must be rebuilt for arm64 or run under qemu emulation (slow — avoid for
    interactive labs).
  - **One box, finite RAM.** 128 GB is plenty for *containers* (web apps are
    100–400 MB each) but small for *VMs*. This is why Tier 2 is containers, not
    VMs. Budget, say, 96 GB to labs → ~100+ lightweight web targets *could* run,
    but we cap concurrency far lower for safety and because one-lab-per-user
    already bounds it.
  - **GPU bonus**: host a local LLM on the DGX for screenshot verification and
    in-portal help, retiring the DeepSeek spend (ties into the existing LLM
    spend-gate concern).

### 4.2 Components

```
                       Internet
                          │  (HTTPS, user auth cookie)
                          ▼
            ┌─────────────────────────────┐
            │  Portal (Next.js)           │   control plane
            │  - auth, progress, Tier 1   │   (Vercel OR on DGX)
            │  - "Deploy / Terminate" UI  │
            └──────────────┬──────────────┘
                           │  signed broker API (mTLS / token)
                           ▼
        ╔══════════════════════════════════════════════╗
        ║  DGX Spark (DGX OS, ARM64)                    ║
        ║                                               ║
        ║  ┌──────────────┐   ┌──────────────────────┐ ║
        ║  │ Lab Broker   │──▶│ Container runtime     │ ║
        ║  │ (Node svc)   │   │ (Docker/Podman)       │ ║
        ║  │ - scheduler  │   │  per-session net ns   │ ║
        ║  │ - one/user   │   │  cap-drop, read-only, │ ║
        ║  │ - global cap │   │  mem/cpu/pids limits  │ ║
        ║  │ - TTL reaper │   └──────────┬───────────┘ ║
        ║  └──────┬───────┘              │             ║
        ║         │                      ▼             ║
        ║  ┌──────▼─────────┐   ┌────────────────────┐ ║
        ║  │ Reverse proxy  │◀──│ lab containers     │ ║
        ║  │ (Traefik/Caddy)│   │ lab-<token>        │ ║
        ║  │ per-session    │   │ (isolated network, │ ║
        ║  │ subdomain+auth │   │  no egress)        │ ║
        ║  └────────────────┘   └────────────────────┘ ║
        ╚══════════════════════════════════════════════╝
```

- **Lab Broker** (new service on DGX): the only thing allowed to touch the
  container runtime. Exposes an authenticated API to the portal:
  `deploy(userId, labId) → {url, expiresAt}`, `terminate(userId)`,
  `status(userId)`. It **is** the generalization of today's `dockerLabs.ts` —
  same idea (DB-tracked single run) but **keyed by userId** and with a global
  cap + queue.
- **Reverse proxy** (Traefik or Caddy): routes
  `https://lab-<token>.labs.technieum.cloud` → the right container, enforcing a
  per-session auth token so only that learner reaches their target.
- **Container runtime**: Docker or Podman (Podman rootless preferred for
  isolation).

### 4.3 One-lab-per-user + global cap (the scheduling rule)

Enforced in the broker, backed by the DB (extend `LabRun`):

```prisma
model LabRun {
  id            String   @id @default(cuid())
  userId        String                 // NEW: per-user, not global
  labId         String
  containerName String
  token         String                 // per-session access token
  flag          String                 // per-user flag seeded into container
  status        String                 // queued | running | stopped | failed | expired
  startedAt     DateTime @default(now())
  expiresAt     DateTime               // TTL (e.g. now + 60 min)
  stoppedAt     DateTime?
  @@index([userId])
  @@index([status])
}
```

Rules the broker enforces on `deploy(userId, labId)`:
1. **One per user**: if the user already has a `running` lab, terminate it
   first (or refuse and tell them). A user never has two live labs.
2. **Global cap**: if the number of `running` labs ≥ `MAX_CONCURRENT`
   (configured from RAM budget, e.g. 20), put the request in a **queue** and
   return a position; promote when a slot frees.
3. **TTL reaper**: a cron in the broker terminates any run past `expiresAt`, and
   on user logout. "Extend time" re-stamps `expiresAt`.
4. **Idempotent**: deploying the same lab the user already has returns the
   existing session.

> Today's `getActiveLabRun()` is the degenerate case of this with
> `MAX_CONCURRENT = 1` and no `userId`. The broker is that code, generalized.

### 4.4 Security (vulnerable targets — treat as hostile)

Each lab container is deliberately exploitable. Containment:
- **Network isolation**: a dedicated Docker network per session; **no egress**
  to the internet or the host (egress firewall / `--network` with an
  egress-deny policy). The learner reaches it only through the authed proxy.
- **No host access**: no bind mounts, `--read-only` rootfs where possible,
  `--cap-drop ALL` (add back only what the app needs), `--security-opt
  no-new-privileges`, seccomp/AppArmor profile, `--pids-limit`.
- **Resource caps**: `--memory`, `--cpus`, `--pids-limit` per container so one
  learner can't starve the box.
- **Ephemeral**: destroyed on terminate/expire/logout; never reused across
  users; per-user flag so a captured flag is worthless to others.
- **Broker is the only privileged actor**; the portal never runs Docker
  directly and never exposes the daemon.

### 4.5 Which labs are Tier 2

Web/app targets with arm64 images: OWASP Top 10 modules, Burp Suite, App
Basics, Web fundamentals — roughly the ~20 labs whose `dockerImage` is a web
app. CLI-only labs (Linux/Windows enum) can use an in-browser terminal
(`ttyd`/Gotty) to a locked-down shell container instead of a browser target.

---

## 5. Tier 3 — attackable VMs + browser attack box (defer)

Full boot2root / Active Directory / privesc labs need real VMs and an attacker
machine. On a single DGX Spark this is **memory-bound** (each VM wants
2–8 GB) and heavy to isolate:
- **KVM** on DGX OS can host a handful of ARM64 VMs, but most vuln VM images are
  amd64 → full-system emulation, which is slow.
- An **in-browser Kali** (Apache Guacamole / KasmVNC, or `ttyd` to a Kali
  container) gives the attack box without a client VPN.
- Real THM parity (on-demand cloud VMs + WireGuard/OpenVPN per user) is a
  separate cost + security surface.

**Recommendation:** defer Tier 3. Until then, VM-class labs stay on Tier 1
(flag validation) + their existing online alternatives. Revisit if/when labs
become a paid product with a budget for cloud VM capacity.

---

## 6. Where the portal runs

Two options:
- **A — Portal on Vercel, broker on DGX** (recommended first): keep the current
  Vercel deploy; the broker is a small service on the DGX exposed over an
  authenticated channel (mTLS or signed service token, ideally over a WireGuard
  link so the broker isn't public). Portal → broker only; broker → runtime.
- **B — Portal also on DGX**: move the whole app onto the DGX behind the same
  proxy. Simpler trust boundary, but the DGX becomes a single point of failure
  and must handle public web traffic. Choose this only if you want everything
  self-hosted.

Either way the **lab data plane** (the vulnerable containers) lives only on the
DGX and is never exposed except through the authed per-session proxy.

---

## 7. Rollout plan

1. **Tier 1 — flag/answer grading** *(do now, no infra)*
   - Add `LabTask` + `LabTaskSubmission`, the submit API with rate-limiting,
     author tasks for the highest-value labs first, swap `LabCard`'s evidence
     box for a task checklist. → every lab becomes graded.
2. **DGX bring-up**
   - DGX OS, Podman/Docker, Traefik/Caddy, WireGuard link to the portal, the
     Lab Broker service, firewall/egress policy. Validate the isolation model
     with one throwaway vulnerable container.
3. **Broker + per-user scheduling**
   - Generalize `dockerLabs.ts` into the broker: `userId`-keyed runs,
     one-per-user, global cap + queue, TTL reaper, per-session proxy + token,
     per-user flags wired to Tier 1 validation.
4. **Tier 2 content**
   - Build/verify arm64 images for the web labs; add `deploy`/`terminate` UI to
     `LabCard` (behind a `labs.technieum.cloud` broker URL, replacing the local
     `localhost:18080` path); seed per-user flags.
5. **GPU side-quest** *(optional)*
   - Host a local LLM on the DGX for screenshot verification + hints; retire the
     DeepSeek spend.
6. **Tier 3** — only if funded.

---

## 8. Open questions to confirm

- Exact DGX Spark spec of the target unit (cores/RAM/GPU) → sets
  `MAX_CONCURRENT`.
- Is the DGX publicly reachable, or only via VPN? (sets option A vs B in §6).
- Target concurrent-user count (how many learners at once) → queue sizing.
- Which labs are must-have interactive first (prioritize Tier 2 content).
