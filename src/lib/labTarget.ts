import type { Lab } from "@/types"

/** A lab can be started in one click when it has a prebuilt image OR a Git
 *  build context, plus the port the app listens on inside the container. */
export function hasDockerTarget(lab: Lab): boolean {
  return Boolean((lab.dockerImage || lab.buildContext) && lab.containerPort)
}

/** Human-readable source of the lab's container (image ref or repo). */
export function dockerTargetSource(lab: Lab): string {
  return lab.dockerImage ?? lab.buildContext ?? ""
}

/** True when the first start has to build from source (slower than a pull). */
export function buildsFromSource(lab: Lab): boolean {
  return !lab.dockerImage && Boolean(lab.buildContext)
}
