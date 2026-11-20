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
#    and (optionally) DEEPSEEK_API_KEY. Tune LABS_MAX_CONCURRENT / LABS_MEM / LABS_CPUS.

# 3. Build + start (first build takes a few minutes)
docker compose up -d --build

# 4. Create the database tables
docker compose exec app npx prisma db push

# 5. Seed the admin account (reads DEFAULT_ADMIN_* from the environment)
docker compose exec app npx prisma db seed

# 6. Pull the AI-tutor model (one-time; uses the DGX GPU). Small + fast:
docker compose exec ollama ollama pull llama3.2:3b
#    For stronger answers on the DGX, pull a larger model and set OLLAMA_MODEL:
#    docker compose exec ollama ollama pull llama3.1:8b   # then OLLAMA_MODEL=llama3.1:8b in .env
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
