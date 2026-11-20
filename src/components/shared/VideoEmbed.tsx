"use client"

import { useState } from "react"
import { AlertTriangle, ExternalLink } from "lucide-react"

/**
 * Turn a YouTube watch/share/playlist/shorts URL into its /embed/ form so the
 * video can play inside the portal. Returns null for anything that isn't a
 * YouTube URL we can embed, so callers can fall back to a plain link.
 */
export function toYouTubeEmbed(url: string): string | null {
  let u: URL
  try {
    u = new URL(url)
  } catch {
    return null
  }
  const host = u.hostname.replace(/^www\./, "")

  // youtu.be/VIDEO_ID
  if (host === "youtu.be") {
    const id = u.pathname.slice(1).split("/")[0]
    return id ? `https://www.youtube.com/embed/${id}` : null
  }

  if (host !== "youtube.com" && host !== "m.youtube.com") return null

  // Already an embed URL
  if (u.pathname.startsWith("/embed/")) return url

  // /shorts/VIDEO_ID
  if (u.pathname.startsWith("/shorts/")) {
    const id = u.pathname.split("/")[2]
    return id ? `https://www.youtube.com/embed/${id}` : null
  }

  // /playlist?list=LIST_ID
  if (u.pathname === "/playlist") {
    const list = u.searchParams.get("list")
    return list
      ? `https://www.youtube.com/embed/videoseries?list=${list}`
      : null
  }

  // /watch?v=VIDEO_ID (optionally with &list=)
  if (u.pathname === "/watch") {
    const id = u.searchParams.get("v")
    if (!id) return null
    const list = u.searchParams.get("list")
    return list
      ? `https://www.youtube.com/embed/${id}?list=${list}`
      : `https://www.youtube.com/embed/${id}`
  }

  return null
}

export function isEmbeddableVideo(url: string): boolean {
  return toYouTubeEmbed(url) !== null
}

export function VideoEmbed({
  url,
  title,
  autoplay = false,
}: {
  url: string
  title: string
  /** Start muted-autoplay (browsers only allow autoplay when muted). */
  autoplay?: boolean
}) {
  const embed = toYouTubeEmbed(url)
  const [failed, setFailed] = useState(false)
  if (!embed) return null
  const src = autoplay
    ? embed + (embed.includes("?") ? "&" : "?") + "autoplay=1&mute=1"
    : embed

  // If the frame fails to load (blocked network, offline, removed video), fall
  // back to a link so the learner can still reach it.
  if (failed) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-3 text-sm shadow-tile"
      >
        <AlertTriangle className="h-4 w-4 shrink-0 text-brand-orange" />
        <span className="min-w-0 flex-1 truncate">
          Couldn&apos;t load player — open {title} on YouTube
        </span>
        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      </a>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-tile">
      <div className="relative aspect-video w-full bg-muted">
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onError={() => setFailed(true)}
        />
      </div>
      <p className="truncate px-3 py-2 text-xs font-medium text-muted-foreground">
        {title}
      </p>
    </div>
  )
}
