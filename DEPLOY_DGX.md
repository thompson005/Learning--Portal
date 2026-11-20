# Self-hosting the Technieum portal on a DGX Spark (or any Docker host)

This runs the whole portal — app + Postgres + the in-app lab runner — on one
machine with `docker compose`. It works on the DGX Spark's ARM64 architecture.

## What you get

- The portal at `http://<host>:3000`, with learner accounts and the admin view.
- Learners can launch a lab target in one click. **Each learner runs at most one
  lab at a time**, and the whole box is capped at `LABS_MAX_CONCURRENT` labs with
  per-container memory/CPU/PID limits, so one person can't starve the machine.

## Prerequisites on the DGX

- Docker Engine + the compose plugin (`docker compose version`).
- The user running compose can use Docker (in the `docker` group).
- Open these ports on the host firewall:
  - `3000` — the portal.
  - `18100-18160` (the `LABS_PORT_*` range) — lab targets. Each running lab binds
    one port in this range on the host; learners open `http://<host>:<port>`.

## First-time setup

```bash
# 1. Pull the code
git clone <your-repo-url> technieum && cd technieum

# 2. Configure secrets
cp .env.docker.example .env
#    edit .env — set POSTGRES_PASSWORD, SESSION_SECRET, DEFAULT_ADMIN_PASSWORD,
#    and LLM_BASE_URL (the local model server; powers all AI features). Tune LABS_MAX_CONCURRENT / LABS_MEM / LABS_CPUS.

# 3. Build + start (first build takes a few minutes)
docker compose up -d --build

# 4. Create the database tables
docker compose exec app npx prisma db push

# 5. Seed the admin account (reads DEFAULT_ADMIN_* from the environment)
docker compose exec app npx prisma db seed

```

Then open `http://<host>:3000`. Admin lives at `http://<host>:3000/admin`
(unlisted) with the `DEFAULT_ADMIN_*` credentials you set.

## Updating to a new version

```bash
git pull
docker compose up -d --build
docker compose exec app npx prisma db push   # only if the schema changed
```

## How the labs run (one-lab-per-user)

- The app container mounts the host Docker socket (`/var/run/docker.sock`), so it
  can start each lab as its **own sibling container on the host**.
- Starting a lab the learner doesn't already have **stops their current one first**
  — enforced server-side by `userId` on the `LabRun` row, not just the UI.
- A global cap (`LABS_MAX_CONCURRENT`) and a host-port pool
  (`LABS_PORT_MIN..LABS_PORT_MAX`) bound total concurrency; past the cap, a start
  is refused with "at capacity, try again."
- Each lab container runs with `--memory`, `--cpus`, `--pids-limit`, and
  `--security-opt no-new-privileges`.

## Small local model for AI labs (runs in Docker)

AI labs that can use a model (LLMVault Live Mode, MCPGoat agent harness, promptfoo)
get one from an **`ollama` container in this same compose stack** — nothing runs
outside Docker and no cloud key is needed.

- `ollama` serves on an isolated network (`technieum-labnet`) that holds only Ollama
  and the lab containers flagged `localModel`. It is not published on the host, and
  the db/app are not on that network.
- `ollama-init` pulls `LAB_MODELS` (default `qwen2.5:3b-instruct`) once into the
  `ollamadata` volume, then exits. Watch it: `docker compose logs -f ollama-init`.
- A flagged lab starts with `OLLAMA_HOST=http://ollama:11434`,
  `OPENAI_BASE_URL=http://ollama:11434/v1` and `OLLAMA_MODEL/OLLAMA_DEFAULT_MODEL=$LABS_MODEL`.
- GPU (DGX): `docker compose -f docker-compose.yml -f docker-compose.gpu.yml up -d --build`.
- Add models: put them in `LAB_MODELS` (space-separated) and run `docker compose up -d`.
  Keep them small (<= 3B on CPU, a bit larger on GPU); each lab user shares the one server.
- Caveat: Ollama has no auth, so a lab container can call its API (including `/api/pull`).
  It is reachable only from lab containers, which are already on the VPN-only host.
- The tutor/Teki chat still uses `LLM_BASE_URL` (the vLLM server), separate from this.

## Lab images: pulled, built from source, or emulated

A lab runs in one click when it has a **prebuilt image** or a **Git repo the
portal can `docker build`** (see `dockerImage` / `buildContext` in the lab data).

- **Build-from-source labs** (MCPGoat, LLMVault, DVGA, DSVW) are built once on the
  first start — expect a few minutes — then cached as `technieum-lab-img-<lab>`.
  The app image includes `git` and the buildx plugin for this. Two learners
  starting the same lab at once share one build.
- **amd64-only images** (Mutillidae `citizenstig/nowasp`, bWAPP `raesene/bwapp`)
  have no ARM build. They run under CPU emulation, which needs this **one-time**
  host setup (persists across reboots):

  ```bash
  sudo apt-get install -y qemu-user-static binfmt-support
  ```

  Without it those labs fail with an "image is not built for the server's CPU"
  message. They are slower under emulation; raise `LABS_MEM` if they run out of RAM.
- **Not one-click:** labs that need a database or several services (vuln-bank,
  NodeGoat, crAPI, BrokenCrystals, most AI red-team stacks) or an OpenAI key keep
  step-by-step instructions instead of a Start button.

## Running efficiently on the DGX

- Size `LABS_MAX_CONCURRENT` to RAM: with `LABS_MEM=512m`, 24 labs ≈ 12 GB — well
  within the DGX's 128 GB. Raise the cap if your lab images are small, lower
  `LABS_MEM` for heavier ones.
- Lab images must be **ARM64 / multi-arch** (the DGX is ARM64). Most web targets
  (DVWA, Juice Shop, WebGoat) have arm64 builds; an amd64-only image needs a
  rebuild or (slow) emulation — avoid those for interactive use.
- A reaper isn't built in yet: a learner's lab stops when they start another or
  can be stopped from the UI. For unattended cleanup, add a cron that runs
  `docker ps` + removes `technieum-lab-*` containers older than N hours (see the
  "TTL reaper" item in `docs/LABS_ARCHITECTURE.md`).

## Security notes (vulnerable targets are hostile by design)

- Lab containers are deliberately exploitable. They get resource + privilege
  limits here, but **full network isolation / egress blocking is not yet wired**
  — don't expose the lab port range to the public internet. Keep it on a trusted
  network/VPN, or put a reverse proxy with auth in front (see
  `docs/LABS_ARCHITECTURE.md`, Tier 2).
- Rotate `SESSION_SECRET`, `DEFAULT_ADMIN_PASSWORD`, and `POSTGRES_PASSWORD` from
  the examples before going live.

## Not using Docker labs?

Set `NEXT_PUBLIC_LABS_DOCKER` build arg to empty (in `docker-compose.yml`) and
the in-app "Start Lab" button disappears; learners use each lab's online
alternative instead. The rest of the portal is unaffected.
