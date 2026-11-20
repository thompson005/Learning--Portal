import type { ComponentType } from "react"

import { SqlInjectionLab } from "./SqlInjectionLab"
import { PromptInjectionLab } from "./PromptInjectionLab"
import { HashLab } from "./HashLab"

/** Topics that have an inline interactive sandbox, keyed by topic id. */
export const TOPIC_SANDBOXES: Record<
  string,
  { label: string; Component: ComponentType }
> = {
  "m9-3": { label: "SQL Injection Playground", Component: SqlInjectionLab },
  "ai-m4-1": { label: "Prompt Injection Playground", Component: PromptInjectionLab },
  "m5-5": { label: "Hashing Playground", Component: HashLab },
}
