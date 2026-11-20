// Renames module `name` + `shortName` across all three curriculum files.
// Handles both key styles (cyber `name:` / ai+cloud `"name":`). Scoped per
// module by locating its id first, then replacing within that module's window.
const fs = require("fs")

const RENAMES = {
  // Cyber
  m0: ["Inside the Machine", "Inside the Machine"],
  m1: ["The Security Mindset", "Security Mindset"],
  m2: ["How Networks Really Work", "How Networks Work"],
  "m3-linux": ["Command the Linux Terminal", "Linux Terminal"],
  "m3-windows": ["Windows From the Inside", "Windows Internals"],
  m4: ["How Apps Are Built — and Broken", "How Apps Work"],
  m5: ["Secrets, Ciphers & Hashing", "Crypto Foundations"],
  m6: ["Inside the Enterprise Network", "Enterprise Networks"],
  m7: ["The Hacker's Playbook: Recon", "Recon & Lifecycle"],
  m8: ["Burp Suite: Your Web-Hacking Lab", "Burp Suite"],
  m9: ["OWASP Top 10: Web's Deadliest Flaws — Part I", "OWASP Top 10 · I"],
  m10: ["OWASP Top 10: Web's Deadliest Flaws — Part II", "OWASP Top 10 · II"],
  m11: ["Breaking In: Network Exploitation", "Network Exploitation"],
  m12: ["Weaponizing Python", "Python for Hackers"],
  m13: ["Hacking With AI", "Hacking with AI"],
  m14: ["The Defender's Playbook", "Blue Team"],
  m15: ["Your Path Into Security", "Careers & Certs"],
  m16: ["Owning Active Directory", "Active Directory"],
  m17: ["Escalate & Pivot: Windows Post-Exploitation", "Privesc & Pivoting"],
  m18: ["Exploit Dev: Smashing the Stack", "Buffer Overflows"],
  m19: ["Hacking Wi-Fi", "Wireless Security"],
  m20: ["Cloud Security Primer", "Cloud Primer"],
  m21: ["Writing the Pentest Report", "Pro Reporting"],
  // Cloud
  "cloud-m1": ["How the Cloud Actually Works", "Cloud Foundations"],
  "cloud-m2": ["Who Can Do What: Cloud IAM", "Cloud IAM"],
  "cloud-m3": ["Mapping the Cloud: Recon", "Cloud Recon"],
  "cloud-m4": ["Escalating Privileges in the Cloud", "IAM Privesc"],
  "cloud-m5": ["Exposed Buckets & Data Leaks", "Data Exposure"],
  "cloud-m6": ["Hunting Cloud Secrets", "Secrets"],
  "cloud-m7": ["SSRF to Cloud Takeover", "SSRF & Metadata"],
  "cloud-m8": ["Attacking Serverless", "Serverless"],
  "cloud-m9": ["Breaking Containers & Kubernetes", "Containers & K8s"],
  "cloud-m10": ["Catching the Attacker: Cloud Detection", "Logging & Detection"],
  "cloud-m11": ["Cloud Attack Paths", "Attack Paths"],
  "cloud-m12": ["Hardening the Cloud at Scale", "CSPM & Hardening"],
  "cloud-m13": ["Beyond AWS: Azure & GCP", "Azure & GCP"],
  // AI
  "ai-m1": ["AI & LLMs: A Security Primer", "AI/ML Primer"],
  "ai-m2": ["The AI Attack Surface", "Attack Surface"],
  "ai-m3": ["Build Your AI Hacking Lab", "Lab Setup"],
  "ai-m4": ["Prompt Injection: Direct & Indirect", "Prompt Injection"],
  "ai-m5": ["Jailbreaks & Model Manipulation", "Jailbreaks"],
  "ai-m6": ["Insecure LLM Apps: Agents, RAG & Tools", "Insecure LLM Apps"],
  "ai-m7": ["OWASP LLM Top 10 Deep Dive", "OWASP LLM Top 10"],
  "ai-m8": ["Poisoning the Well: Data & Model Poisoning", "Data/Model Poisoning"],
  "ai-m9": ["Stealing Models: Extraction & Inversion", "Model Extraction"],
  "ai-m10": ["AI Supply-Chain Security", "Supply Chain"],
  "ai-m11": ["OWASP ML Top 10 & MITRE ATLAS", "ML Top 10 & ATLAS"],
  "ai-m12": ["Guardrails & LLM Defenses", "Guardrails"],
  "ai-m13": ["Red-Teaming LLM Applications", "LLM Red-Teaming"],
  "ai-m14": ["Securing AI Pipelines & Governance", "Secure AI Pipelines"],
}

function fileFor(id) {
  if (id.startsWith("ai-")) return "src/lib/data/tracks/aiCurriculum.ts"
  if (id.startsWith("cloud-")) return "src/lib/data/tracks/cloudCurriculum.ts"
  return "src/lib/data/curriculum.ts"
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
const q = (s) => JSON.stringify(s) // safe double-quoted TS string

const byFile = {}
for (const id of Object.keys(RENAMES)) (byFile[fileFor(id)] ||= []).push(id)

let changed = 0
const missing = []
for (const [file, ids] of Object.entries(byFile)) {
  let src = fs.readFileSync(file, "utf8")
  for (const id of ids) {
    const [name, shortName] = RENAMES[id]
    const idRe = new RegExp(`("?)id\\1:\\s*"${esc(id)}",`)
    const m = src.match(idRe)
    if (!m) {
      missing.push(id)
      continue
    }
    const start = m.index
    const win = src.slice(start, start + 800)
    // name (word-boundary so it doesn't hit shortName)
    const nameRe = /(^|[\s{,])("?)name\2:\s*"(?:[^"\\]|\\.)*"/
    const shortRe = /("?)shortName\1:\s*"(?:[^"\\]|\\.)*"/
    let nw = win
    let ok = true
    if (nameRe.test(nw)) {
      nw = nw.replace(nameRe, (full, pre, qch) => `${pre}${qch}name${qch}: ${q(name)}`)
    } else ok = false
    if (shortRe.test(nw)) {
      nw = nw.replace(shortRe, (full, qch) => `${qch}shortName${qch}: ${q(shortName)}`)
    } else ok = false
    if (ok) {
      src = src.slice(0, start) + nw + src.slice(start + 800)
      changed++
    } else {
      missing.push(id + "(fields)")
    }
  }
  fs.writeFileSync(file, src)
}

console.log(`Renamed ${changed}/${Object.keys(RENAMES).length} modules.`)
if (missing.length) console.log("MISSING:", missing.join(", "))
