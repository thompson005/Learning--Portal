import { execFile } from "node:child_process"
import { promisify } from "node:util"

import { prisma as db } from "@/lib/server/db"
import { findLab } from "@/lib/data/tracks/registry"
import { hasDockerTarget } from "@/lib/labTarget"
import type { Lab } from "@/types"

const execFileAsync = promisify(execFile)

// Multiple learners can each run a lab at once (on a shared host like a DGX
// Spark), so every lab gets its own host port from this pool. The size of the
// pool is the hard ceiling on concurrent labs.
const PORT_MIN = Number(process.env.LABS_PORT_MIN || 18100)
const PORT_MAX = Number(process.env.LABS_PORT_MAX || 18160)
// Global cap on concurrent lab containers — size this to the host's RAM/CPU.
const MAX_CONCURRENT = Number(process.env.LABS_MAX_CONCURRENT || 24)
// Per-container resource limits keep one learner from starving the box.
const MEM_LIMIT = process.env.LABS_MEM || "512m"
const CPU_LIMIT = process.env.LABS_CPUS || "1"
const PIDS_LIMIT = process.env.LABS_PIDS || "256"
// Host IP the lab target ports bind to. Set to the DGX's VPN IP so lab targets
// (deliberately vulnerable) are reachable ONLY over the VPN, never on the
// public/LAN interface. Empty = bind all interfaces (0.0.0.0) — avoid in prod.
const LAB_BIND_IP = process.env.LABS_BIND_IP || ""
// Shared Ollama (docker-compose service "ollama") lives on this network; labs flagged
// `localModel` join it so they can reach http://ollama:11434. Unset = labs stay on the
// default bridge and run in their offline/scripted mode.
const LABS_NETWORK = process.env.LABS_NETWORK || ""
const LABS_MODEL = process.env.LABS_MODEL || "qwen2.5:3b-instruct"

function localModelArgs(lab: { localModel?: boolean }): string[] {
  if (!lab.localModel || !LABS_NETWORK) return []
  const env: Record<string, string> = {
    OLLAMA_HOST: "http://ollama:11434",
    OLLAMA_BASE_URL: "http://ollama:11434",
    OLLAMA_MODEL: LABS_MODEL,
    OLLAMA_DEFAULT_MODEL: LABS_MODEL,
    OPENAI_BASE_URL: "http://ollama:11434/v1",
    OPENAI_API_BASE: "http://ollama:11434/v1",
    OPENAI_API_KEY: "ollama",
    PROMPTFOO_DISABLE_REMOTE_GENERATION: "true",
  }
  return [
    "--network",
    LABS_NETWORK,
    ...Object.entries(env).flatMap(([k, v]) => ["-e", `${k}=${v}`]),
  ]
}

/** Docker CLI's raw daemon-unreachable errors are cryptic — surface something actionable. */
function friendlyDockerError(rawMessage: string): string {
  const daemonDown =
    /cannot connect to the docker daemon/i.test(rawMessage) ||
    /failed to connect to the docker api/i.test(rawMessage) ||
    /dockerdesktoplinuxengine/i.test(rawMessage) ||
    /docker\.sock/i.test(rawMessage)
  if (daemonDown) {
    return "The lab engine (Docker) isn't reachable. On a local machine, start Docker Desktop; on the server, make sure the Docker socket is mounted into the app container."
  }
  return rawMessage
}

/** Container name is per-user + per-lab so two learners running the same lab don't collide. */
function containerNameFor(userId: string, labId: string) {
  const u = userId.replace(/[^a-z0-9]/gi, "").slice(0, 10).toLowerCase()
  return `technieum-lab-${u}-${labId.toLowerCase()}`
}

async function isContainerRunning(containerName: string): Promise<boolean> {
  try {
    const { stdout } = await execFileAsync("docker", [
      "inspect",
      "-f",
      "{{.State.Running}}",
      containerName,
    ])
    return stdout.trim() === "true"
  } catch {
    return false
  }
}

async function containerLogsTail(containerName: string): Promise<string> {
  try {
    const { stdout, stderr } = await execFileAsync("docker", [
      "logs",
      "--tail",
      "40",
      containerName,
    ])
    return (stdout + stderr).trim().slice(-1000)
  } catch {
    return "(no logs available — container may have already been removed)"
  }
}

/** The user's currently-running lab, self-healing if the container died. */
export async function getUserActiveLabRun(userId: string) {
  const active = await db.labRun.findFirst({
    where: { userId, status: "running" },
    orderBy: { startedAt: "desc" },
  })
  if (!active) return null
  if (await isContainerRunning(active.containerName)) return active
  await db.labRun.update({
    where: { id: active.id },
    data: { status: "stopped", stoppedAt: new Date() },
  })
  return null
}

/** All genuinely-running labs across all users, reconciled against Docker. */
async function liveRuns() {
  const runs = await db.labRun.findMany({ where: { status: "running" } })
  const alive = []
  for (const r of runs) {
    if (await isContainerRunning(r.containerName)) alive.push(r)
    else
      await db.labRun
        .update({
          where: { id: r.id },
          data: { status: "stopped", stoppedAt: new Date() },
        })
        .catch(() => {})
  }
  return alive
}

function allocPort(alive: { port: number | null }[]): number | null {
  const used = new Set(alive.map((r) => r.port).filter(Boolean))
  for (let p = PORT_MIN; p <= PORT_MAX; p++) if (!used.has(p)) return p
  return null
}

export async function stopUserActiveLabRun(userId: string) {
  const active = await getUserActiveLabRun(userId)
  if (!active) return null
  try {
    await execFileAsync("docker", ["rm", "-f", active.containerName])
  } catch {
    // already gone — mark stopped anyway
  }
  await db.labRun.update({
    where: { id: active.id },
    data: { status: "stopped", stoppedAt: new Date() },
  })
  return active
}

// ---- image preparation ------------------------------------------------------

/** Builds in flight, keyed by image tag, so two learners starting the same
 *  build-from-source lab at once share ONE build instead of racing. */
const inflightBuilds = new Map<string, Promise<void>>()

async function imageExists(tag: string): Promise<boolean> {
  try {
    await execFileAsync("docker", ["image", "inspect", tag])
    return true
  } catch {
    return false
  }
}

function stderrTail(err: unknown, n = 700): string {
  const e = err as { stderr?: string; message?: string }
  return ((e?.stderr || e?.message || "") + "").trim().slice(-n)
}

/** Returns the image to run: pulls a published image, or builds the lab from its
 *  Git repo once (then reuses the cached image on every later start). */
async function ensureImage(lab: Lab): Promise<string> {
  if (lab.dockerImage) {
    const args = ["pull"]
    if (lab.imagePlatform) args.push("--platform", lab.imagePlatform)
    args.push(lab.dockerImage)
    // Best-effort refresh; a cached image still runs if the pull fails.
    await execFileAsync("docker", args, { timeout: 240_000 }).catch(() => {})
    return lab.dockerImage
  }

  const ctx = lab.buildContext as string
  // Build sources come from our own lab data, but never build from anywhere else.
  if (!/^https:\/\/github\.com\//.test(ctx)) {
    throw new Error("This lab's build source is not an allowed repository.")
  }
  const tag = `technieum-lab-img-${lab.id.toLowerCase()}`
  if (await imageExists(tag)) return tag

  let build = inflightBuilds.get(tag)
  if (!build) {
    build = (async () => {
      const args = ["build", "-t", tag]
      if (lab.imagePlatform) args.push("--platform", lab.imagePlatform)
      args.push(ctx)
      await execFileAsync("docker", args, {
        timeout: 20 * 60_000,
        maxBuffer: 32 * 1024 * 1024,
      })
    })().finally(() => inflightBuilds.delete(tag))
    inflightBuilds.set(tag, build)
  }
  try {
    await build
  } catch (err) {
    throw new Error(
      `Building the lab from source failed (${ctx}). ${stderrTail(err)}`,
    )
  }
  return tag
}

function explainExit(logs: string, lab: Lab): string {
  if (/exec format error/i.test(logs) || /no matching manifest/i.test(logs)) {
    const hint = lab.imagePlatform
      ? "It needs the one-time amd64 emulation setup on the host (see DEPLOY_DGX.md)."
      : "An admin needs to switch it to an ARM-compatible image."
    return `This lab's image is not built for the server's CPU (ARM64). ${hint}\n\nLast logs:\n${logs}`
  }
  return `Container exited immediately after starting. Last logs:\n${logs}`
}

export async function startLab(userId: string, labId: string) {
  const lab = findLab(labId)
  if (!lab) throw new Error("Unknown lab id.")
  if (!hasDockerTarget(lab)) {
    throw new Error("This lab has no runnable Docker environment configured.")
  }

  // One running lab per user: reuse if it's already this lab, otherwise stop it.
  const mine = await getUserActiveLabRun(userId)
  if (mine && mine.labId === labId) {
    return {
      port: mine.port,
      containerName: mine.containerName,
      alreadyRunning: true,
    }
  }
  if (mine) await stopUserActiveLabRun(userId)

  // Global capacity + port allocation.
  const alive = await liveRuns()
  if (alive.length >= MAX_CONCURRENT) {
    throw new Error(
      `The lab server is at capacity (${MAX_CONCURRENT} labs running). Please try again in a few minutes.`,
    )
  }
  const port = allocPort(alive)
  if (port == null) {
    throw new Error("No free lab port is available right now. Try again shortly.")
  }

  const containerName = containerNameFor(userId, labId)
  await execFileAsync("docker", ["rm", "-f", containerName]).catch(() => {})

  const run = await db.labRun.create({
    data: { userId, labId, containerName, port, status: "running" },
  })

  try {
    const image = await ensureImage(lab)

    const { stdout } = await execFileAsync(
      "docker",
      [
        "run",
        "-d",
        "--name",
        containerName,
        ...(lab.imagePlatform ? ["--platform", lab.imagePlatform] : []),
        ...localModelArgs(lab),
        "--memory",
        MEM_LIMIT,
        "--cpus",
        CPU_LIMIT,
        "--pids-limit",
        PIDS_LIMIT,
        "--security-opt",
        "no-new-privileges",
        "-p",
        LAB_BIND_IP
          ? `${LAB_BIND_IP}:${port}:${lab.containerPort}`
          : `${port}:${lab.containerPort}`,
        image,
      ],
      { timeout: 60_000 },
    )
    const containerId = stdout.trim()

    await new Promise((resolve) => setTimeout(resolve, 2500))
    if (!(await isContainerRunning(containerName))) {
      const logs = await containerLogsTail(containerName)
      await execFileAsync("docker", ["rm", "-f", containerName]).catch(() => {})
      const message = explainExit(logs, lab)
      await db.labRun.update({
        where: { id: run.id },
        data: { status: "failed", errorMessage: message.slice(0, 500) },
      })
      throw new Error(message)
    }

    await db.labRun.update({ where: { id: run.id }, data: { containerId } })
    return { port, containerName, containerId, alreadyRunning: false }
  } catch (err) {
    const rawMessage = err instanceof Error ? err.message : "docker run failed"
    const message = friendlyDockerError(rawMessage)
    await db.labRun.update({
      where: { id: run.id },
      data: { status: "failed", errorMessage: rawMessage.slice(0, 500) },
    })
    throw new Error(message)
  }
}

export async function stopLab(userId: string, labId: string) {
  const active = await getUserActiveLabRun(userId)
  if (!active || active.labId !== labId) return null
  return stopUserActiveLabRun(userId)
}
