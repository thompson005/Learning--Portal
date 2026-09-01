import { execFile } from "node:child_process"
import { promisify } from "node:util"

import { prisma as db } from "@/lib/server/db"
import { LABS } from "@/lib/data/labs"

const execFileAsync = promisify(execFile)

/** Only one lab container runs at a time, so a fixed host port is safe — no scanning needed. */
const HOST_PORT = 18080

/** Docker CLI's raw daemon-unreachable errors are cryptic (npipe paths, unix sockets) — surface something a trainee can act on instead. */
function friendlyDockerError(rawMessage: string): string {
  const daemonDown =
    /cannot connect to the docker daemon/i.test(rawMessage) ||
    /failed to connect to the docker api/i.test(rawMessage) ||
    /dockerdesktoplinuxengine/i.test(rawMessage) ||
    /docker\.sock/i.test(rawMessage)
  if (daemonDown) {
    return "Docker Desktop doesn't appear to be running. Start Docker Desktop, wait for it to finish loading, then try again."
  }
  return rawMessage
}

function containerNameFor(labId: string) {
  return `technieum-lab-${labId.toLowerCase()}`
}

/** Reads the DB's notion of the active run, but self-heals if the container died without us noticing. */
export async function getActiveLabRun() {
  const active = await db.labRun.findFirst({
    where: { status: "running" },
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

export async function stopActiveLabRun() {
  const active = await getActiveLabRun()
  if (!active) return null
  try {
    await execFileAsync("docker", ["rm", "-f", active.containerName])
  } catch {
    // container may already be gone (e.g. Docker restarted) — proceed to mark it stopped anyway
  }
  await db.labRun.update({
    where: { id: active.id },
    data: { status: "stopped", stoppedAt: new Date() },
  })
  return active
}

/** True once the container's own health/state settles — used right after `docker run -d` to catch immediate crashes. */
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

export async function startLab(labId: string) {
  const lab = LABS.find((l) => l.id === labId)
  if (!lab) throw new Error("Unknown lab id.")
  if (!lab.dockerImage || !lab.containerPort) {
    throw new Error("This lab has no runnable Docker environment configured.")
  }

  const active = await getActiveLabRun()
  if (active && active.labId === labId) {
    return {
      port: active.port ?? HOST_PORT,
      containerName: active.containerName,
      alreadyRunning: true,
    }
  }
  if (active) {
    await stopActiveLabRun()
  }

  const containerName = containerNameFor(labId)
  await execFileAsync("docker", ["rm", "-f", containerName]).catch(() => {})

  const run = await db.labRun.create({
    data: { labId, containerName, port: HOST_PORT, status: "running" },
  })

  try {
    // Best-effort refresh — if this fails (offline, registry hiccup) but the image is
    // already cached locally, `docker run` below still succeeds without a network call.
    await execFileAsync("docker", ["pull", lab.dockerImage], {
      timeout: 240_000,
    }).catch(() => {})

    const { stdout } = await execFileAsync(
      "docker",
      [
        "run",
        "-d",
        "--name",
        containerName,
        "-p",
        `${HOST_PORT}:${lab.containerPort}`,
        lab.dockerImage,
      ],
      { timeout: 30_000 },
    )
    const containerId = stdout.trim()

    // give the container a moment to crash-loop before declaring victory
    await new Promise((resolve) => setTimeout(resolve, 2000))
    if (!(await isContainerRunning(containerName))) {
      const logs = await containerLogsTail(containerName)
      await execFileAsync("docker", ["rm", "-f", containerName]).catch(() => {})
      const message = `Container exited immediately after starting. Last logs:\n${logs}`
      await db.labRun.update({
        where: { id: run.id },
        data: { status: "failed", errorMessage: message.slice(0, 500) },
      })
      throw new Error(message)
    }

    await db.labRun.update({ where: { id: run.id }, data: { containerId } })
    return {
      port: HOST_PORT,
      containerName,
      containerId,
      alreadyRunning: false,
    }
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

export async function stopLab(labId: string) {
  const active = await getActiveLabRun()
  if (!active || active.labId !== labId) return null
  return stopActiveLabRun()
}
