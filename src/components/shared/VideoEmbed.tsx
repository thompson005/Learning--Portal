"use client"

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

export function VideoEmbed({ url, title }: { url: string; title: string }) {
  const embed = toYouTubeEmbed(url)
  if (!embed) return null

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-tile">
      <div className="relative aspect-video w-full bg-muted">
        <iframe
          src={embed}
          title={title}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <p className="truncate px-3 py-2 text-xs font-medium text-muted-foreground">
        {title}
      </p>
    </div>
  )
}
