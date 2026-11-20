"use client"

import { useEffect, useRef, useState } from "react"
import {
  AlertTriangle,
  ArrowRightLeft,
  CheckCircle2,
  Fingerprint,
  Hash,
  Info,
  Lock,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui3d/GlassCard"
import { MeshGradient } from "@/components/ui3d/MeshGradient"
import { Reveal } from "@/components/ui3d/Reveal"

// Interactive hashing & password-storage playground. Everything runs in the
// browser with the real Web Crypto API (crypto.subtle.digest → SHA-256). No
// network, no libraries. Educational: it shows WHY you hash (and salt) rather
// than store plaintext, and why a fast hash like SHA-256 is the wrong tool for
// passwords. We never implement bcrypt/argon2 here — we only explain them.

const PLACEHOLDER = "correct horse battery staple"

// Compute a real SHA-256 digest of `text`, returned as lowercase hex.
// Guards SSR (no window) and environments without SubtleCrypto (e.g. non-HTTPS
// origins), returning null so callers can show a graceful fallback.
async function sha256Hex(text: string): Promise<string | null> {
  if (typeof window === "undefined") return null
  const subtle = window.crypto?.subtle
  if (!subtle) return null
  const bytes = new TextEncoder().encode(text)
  const digest = await subtle.digest("SHA-256", bytes)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

// Count how many hex characters differ between two equal-length strings.
function hexDiffCount(a: string, b: string): number {
  if (!a || !b || a.length !== b.length) return 0
  let n = 0
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) n++
  return n
}

// Highlight the hex chars of `next` that changed relative to `prev`.
function DiffHex({ next, prev }: { next: string; prev: string }) {
  const comparable = prev && prev.length === next.length
  return (
    <span className="break-all font-mono text-xs leading-relaxed sm:text-sm">
      {next.split("").map((ch, i) => {
        const changed = comparable && prev[i] !== ch
        return (
          <span
            key={i}
            className={cn(
              changed && "rounded-sm bg-brand-orange/20 text-brand-orange-strong",
            )}
          >
            {ch}
          </span>
        )
      })}
    </span>
  )
}

const SECTION_LABEL =
  "font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"

export function HashLab() {
  const [input, setInput] = useState(PLACEHOLDER)
  const [salt, setSalt] = useState("")
  const [useSalt, setUseSalt] = useState(false)

  const [hash, setHash] = useState("")
  const [prevHash, setPrevHash] = useState("")
  const [diff, setDiff] = useState(0)
  const [unsupported, setUnsupported] = useState(false)

  // Two-users demo state: both pick the same password on purpose.
  const [demo, setDemo] = useState<{
    noSaltA: string
    noSaltB: string
    saltedA: string
    saltedB: string
  } | null>(null)

  const lastHashRef = useRef("")

  // Recompute the live hash whenever the input, salt, or salt toggle changes.
  useEffect(() => {
    let cancelled = false
    const material = useSalt ? salt + input : input
    sha256Hex(material).then((h) => {
      if (cancelled) return
      if (h === null) {
        setUnsupported(true)
        return
      }
      setPrevHash(lastHashRef.current)
      setDiff(hexDiffCount(lastHashRef.current, h))
      lastHashRef.current = h
      setHash(h)
    })
    return () => {
      cancelled = true
    }
  }, [input, salt, useSalt])

  // Build the "two users, same password" comparison once on mount.
  useEffect(() => {
    let cancelled = false
    const PW = "hunter2" // both users choose the identical password
    Promise.all([
      sha256Hex(PW),
      sha256Hex(PW),
      sha256Hex("a1b2c3:" + PW), // user A's unique random salt
      sha256Hex("z9y8x7:" + PW), // user B's unique random salt
    ]).then(([noSaltA, noSaltB, saltedA, saltedB]) => {
      if (cancelled) return
      if (!noSaltA || !noSaltB || !saltedA || !saltedB) return
      setDemo({ noSaltA, noSaltB, saltedA, saltedB })
    })
    return () => {
      cancelled = true
    }
  }, [])

  const material = useSalt ? salt + input : input

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      {/* Hero */}
      <section className="glass-strong relative overflow-hidden rounded-3xl p-5 sm:p-8">
        <MeshGradient />
        <div className="relative">
          <span className={SECTION_LABEL}>Interactive sandbox</span>
          <h2 className="mt-2 flex items-center gap-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            <Fingerprint className="h-7 w-7 shrink-0 text-brand-orange" />
            Hashing &amp; Password Storage
          </h2>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground sm:text-base">
            Type below and watch a real{" "}
            <span className="font-mono text-foreground">SHA-256</span> digest
            form in your browser (Web Crypto, nothing leaves this page). Then see
            why salting matters and why fast hashes are the wrong tool for
            passwords.
          </p>
        </div>
      </section>

      {unsupported && (
        <GlassCard className="flex items-start gap-3 rounded-2xl border border-brand-red/30 p-4 text-sm">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
          <span>
            Your browser didn&apos;t expose{" "}
            <span className="font-mono">crypto.subtle</span> (this needs a secure
            context, e.g. HTTPS or localhost). The live demos can&apos;t run
            here, but the explanations below still apply.
          </span>
        </GlassCard>
      )}

      {/* Live hash + avalanche */}
      <Reveal>
        <GlassCard className="space-y-4 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5">
              <Hash className="h-4 w-4 text-brand-orange" />
              <span className={SECTION_LABEL}>Live SHA-256</span>
            </span>
            {diff > 0 && (
              <span className="font-mono text-[11px] text-brand-orange-strong">
                {diff}/{hash.length} hex chars changed
              </span>
            )}
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Your text</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={PLACEHOLDER}
              spellCheck={false}
              autoComplete="off"
              className="w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 font-mono text-sm outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
            />
          </label>

          {/* Salt controls */}
          <div className="rounded-xl border border-border/70 bg-background/40 p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-sm font-medium">
                <ShieldCheck
                  className={cn(
                    "h-4 w-4",
                    useSalt ? "text-brand-green" : "text-muted-foreground",
                  )}
                />
                Add a salt
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={useSalt}
                onClick={() => setUseSalt((v) => !v)}
                className={cn(
                  "relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40",
                  useSalt ? "bg-brand-green" : "bg-muted-foreground/30",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] motion-reduce:transition-none",
                    useSalt ? "left-[22px]" : "left-0.5",
                  )}
                />
              </button>
            </div>

            {useSalt && (
              <label className="mt-3 block">
                <span className="mb-1.5 block text-xs text-muted-foreground">
                  Salt (a unique, random value stored alongside each hash)
                </span>
                <input
                  type="text"
                  value={salt}
                  onChange={(e) => setSalt(e.target.value)}
                  placeholder="e.g. 9f3a1c7b"
                  spellCheck={false}
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 font-mono text-sm outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                />
              </label>
            )}

            <p className="mt-2 text-xs text-muted-foreground">
              {useSalt ? (
                <>
                  Hashing{" "}
                  <span className="font-mono text-foreground">salt + text</span>.
                  A salt is public — it&apos;s stored next to the hash — but
                  because it&apos;s different per user it defeats precomputed{" "}
                  <span className="font-medium">rainbow tables</span> and hides
                  the fact that two people chose the same password.
                </>
              ) : (
                <>Hashing the raw text with no salt.</>
              )}
            </p>
          </div>

          {/* Hash output */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className={SECTION_LABEL}>Digest (hex)</span>
              <span className="font-mono text-[10px] text-muted-foreground">
                input:{" "}
                <span className="text-foreground">{material.length || 0}</span>{" "}
                chars → 256 bits
              </span>
            </div>
            <div className="min-h-[3.25rem] rounded-xl border border-border bg-background/60 p-3">
              {hash ? (
                <DiffHex next={hash} prev={prevHash} />
              ) : (
                <span className="font-mono text-xs text-muted-foreground">
                  …
                </span>
              )}
            </div>
            <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orange" />
              <span>
                <span className="font-medium text-foreground">
                  Avalanche effect:
                </span>{" "}
                change a single character and roughly half the output flips.
                Highlighted chars above changed since your last keystroke — the
                output looks unrelated even for a one-letter edit.
              </span>
            </p>
          </div>
        </GlassCard>
      </Reveal>

      {/* Two users, same password */}
      <Reveal delay={60}>
        <GlassCard className="space-y-4 p-5 sm:p-6">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-brand-orange" />
            <span className={SECTION_LABEL}>
              Two users, same password (&quot;hunter2&quot;)
            </span>
          </span>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Without salt — bad */}
            <div className="rounded-xl border border-brand-red/30 bg-brand-red/5 p-4">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-red">
                <XCircle className="h-4 w-4" />
                Without salt
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Identical passwords produce identical hashes — a leaked database
                instantly reveals who shares a password.
              </p>
              <div className="mt-3 space-y-2 font-mono text-[11px]">
                <HashRow label="User A" value={demo?.noSaltA} />
                <HashRow label="User B" value={demo?.noSaltB} />
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-brand-red">
                <ArrowRightLeft className="h-3.5 w-3.5" />
                {demo ? "Exact match — leaks the collision" : "…"}
              </div>
            </div>

            {/* With salt — good */}
            <div className="rounded-xl border border-brand-green/30 bg-brand-green/5 p-4">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                <CheckCircle2 className="h-4 w-4" />
                With a per-user salt
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Each user gets a unique salt, so the same password hashes to
                completely different values.
              </p>
              <div className="mt-3 space-y-2 font-mono text-[11px]">
                <HashRow label="User A" value={demo?.saltedA} tone="good" />
                <HashRow label="User B" value={demo?.saltedB} tone="good" />
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-brand-green">
                <ShieldCheck className="h-3.5 w-3.5" />
                {demo ? "Different — collision hidden" : "…"}
              </div>
            </div>
          </div>
        </GlassCard>
      </Reveal>

      {/* Explanation */}
      <Reveal delay={120}>
        <GlassCard className="space-y-4 p-5 sm:p-6">
          <span className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-brand-orange" />
            <span className={SECTION_LABEL}>What to remember</span>
          </span>
          <ul className="space-y-3 text-sm">
            <Point>
              <b>Hashing is one-way, not encryption.</b> There is no key and no
              &quot;decrypt&quot; — you can only re-hash a guess and compare. You
              verify a login by hashing what the user typed and checking it
              against the stored hash.
            </Point>
            <Point>
              <b>Never store plaintext passwords.</b> If the database leaks,
              plaintext hands attackers every account immediately — and people
              reuse passwords across sites.
            </Point>
            <Point>
              <b>Always salt.</b> A unique random salt per user stops rainbow
              tables (precomputed hash lookups) and hides identical passwords,
              as the demo above shows.
            </Point>
            <Point tone="warn">
              <b>SHA-256 is the wrong tool for passwords.</b> It&apos;s designed
              to be <i>fast</i>, so a GPU can try billions of guesses per second.
              For storing passwords use a <i>slow</i>, memory-hard KDF —{" "}
              <span className="font-mono">bcrypt</span>,{" "}
              <span className="font-mono">scrypt</span>, or{" "}
              <span className="font-mono">argon2</span> — with a work factor you
              tune upward over time. (This sandbox uses SHA-256 only to make the
              mechanics visible; don&apos;t ship it for passwords.)
            </Point>
          </ul>
        </GlassCard>
      </Reveal>
    </div>
  )
}

function HashRow({
  label,
  value,
  tone = "bad",
}: {
  label: string
  value?: string
  tone?: "good" | "bad"
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span
        className={cn(
          "break-all",
          tone === "good" ? "text-brand-green" : "text-brand-red",
        )}
        title={value}
      >
        {value ? value.slice(0, 24) + "…" : "…"}
      </span>
    </div>
  )
}

function Point({
  children,
  tone,
}: {
  children: React.ReactNode
  tone?: "warn"
}) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        className={cn(
          "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
          tone === "warn" ? "bg-brand-orange" : "bg-brand-green",
        )}
      />
      <span className="text-muted-foreground [&_b]:font-semibold [&_b]:text-foreground">
        {children}
      </span>
    </li>
  )
}
