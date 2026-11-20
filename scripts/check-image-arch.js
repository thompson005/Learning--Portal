// Reports which CPU architectures each lab image is published for (Docker Hub +
// GHCR registry APIs, read-only). Usage: node scripts/check-image-arch.js
// Needs Node 18+ (global fetch).
const IMAGES = [
  "bkimminich/juice-shop:latest",
  "ghcr.io/digininja/dvwa:latest",
  "webgoat/webgoat:latest",
  "erev0s/vampi:latest",
  "citizenstig/nowasp:latest",
  "appsecco/dsvw:latest",
  "raesene/bwapp:latest",
  "grafana/grafana:8.3.0",
  "jenkins/jenkins:lts",
  "localstack/localstack:latest",
  "jeroenwillemsen/wrongsecrets:latest-no-vault",
  "dolevf/dvga:2.2.0",
  "opena2a/dvaa:0.9.2",
  "ghcr.io/promptfoo/promptfoo:latest",
]

const ACCEPT = [
  "application/vnd.oci.image.index.v1+json",
  "application/vnd.docker.distribution.manifest.list.v2+json",
  "application/vnd.docker.distribution.manifest.v2+json",
  "application/vnd.oci.image.manifest.v1+json",
].join(", ")

function split(ref) {
  const [name, tag = "latest"] = ref.split(/:(?=[^/]+$)/)
  const parts = name.split("/")
  let host = "registry-1.docker.io"
  if (parts[0].includes(".")) host = parts.shift()
  let repo = parts.join("/")
  if (host === "registry-1.docker.io" && !repo.includes("/")) repo = `library/${repo}`
  return { host, repo, tag }
}

async function token(host, repo) {
  const url =
    host === "ghcr.io"
      ? `https://ghcr.io/token?scope=repository:${repo}:pull`
      : `https://auth.docker.io/token?service=registry.docker.io&scope=repository:${repo}:pull`
  const r = await fetch(url)
  return (await r.json()).token
}

async function archs(ref) {
  const { host, repo, tag } = split(ref)
  const t = await token(host, repo)
  const r = await fetch(`https://${host}/v2/${repo}/manifests/${tag}`, {
    headers: { Authorization: `Bearer ${t}`, Accept: ACCEPT },
  })
  if (!r.ok) return `ERROR ${r.status}`
  const m = await r.json()
  if (Array.isArray(m.manifests))
    return [
      ...new Set(
        m.manifests
          .map((x) => x.platform && `${x.platform.os}/${x.platform.architecture}`)
          .filter((p) => p && !p.includes("unknown")),
      ),
    ].join(", ")
  // single-arch manifest: arch lives in the config blob
  const cfg = m.config && m.config.digest
  if (cfg) {
    const c = await fetch(`https://${host}/v2/${repo}/blobs/${cfg}`, {
      headers: { Authorization: `Bearer ${t}` },
      redirect: "follow",
    })
    if (c.ok) {
      const j = await c.json()
      return `${j.os}/${j.architecture} (single-arch)`
    }
  }
  return "unknown"
}

;(async () => {
  for (const ref of IMAGES) {
    let out
    try {
      out = await archs(ref)
    } catch (e) {
      out = "ERROR " + e.message
    }
    const arm = /arm64/.test(out) ? "ARM OK " : "NO ARM "
    console.log(`${arm} ${ref.padEnd(50)} ${out}`)
  }
})()
