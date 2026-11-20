import { AI_LABS } from "../src/lib/data/tracks/aiLabs"
import { hasDockerTarget } from "../src/lib/labTarget"
for (const l of AI_LABS) {
  const t = `${l.description} ${(l.instructions ?? []).join(" ")}`
  const flags = [
    /ollama/i.test(t) && "ollama",
    /openai|api key|gemini|anthropic/i.test(t) && "cloud-key",
    /\bgpu\b|vllm/i.test(t) && "gpu",
  ].filter(Boolean).join(",")
  console.log([l.id, hasDockerTarget(l) ? "DOCKER" : "guide", l.localModel ? "LOCALMODEL" : "-", flags || "-", l.platform, "|", l.title].join("\t"))
}
