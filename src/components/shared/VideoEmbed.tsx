"use client"

import { useEffect, useRef, useState } from "react"
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

/* ---- YouTube IFrame Player API (loaded once) ---------------------------------
 * A plain <iframe> shows YouTube's own "Video unavailable" box and the page never
 * learns about it. The player API reports an error code, so we can show a clear
 * fallback (thumbnail + "Watch on YouTube") and let the parent try another video. */
type YTPlayer = { destroy: () => void }
type YTApi = {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string
      width: string
      height: string
      playerVars: Record<string, string | number>
      events: { onError: (e: { data: number }) => void }
    },
  ) => YTPlayer
}
declare global {
  interface Window {
    YT?: YTApi
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<YTApi> | null = null
function loadYouTubeApi(): Promise<YTApi> {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (!apiPromise) {
    apiPromise = new Promise<YTApi>((resolve, reject) => {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        resolve(window.YT as YTApi)
      }
      const s = document.createElement("script")
      s.src = "https://www.youtube.com/iframe_api"
      s.async = true
      s.onerror = () => {
        apiPromise = null
        reject(new Error("youtube api blocked"))
      }
      document.head.appendChild(s)
    })
  }
  return apiPromise
}

function videoIdFromEmbed(embed: string): string | null {
  const m = embed.match(/\/embed\/([\w-]{11})(?:\?|$)/)
  return m ? m[1] : null
}

function videoIdFromUrl(url: string): string | null {
  return (
    url.match(/[?&]v=([\w-]{11})/)?.[1] ??
    url.match(/youtu\.be\/([\w-]{11})/)?.[1] ??
    null
  )
}

function errorMessage(code: number | null): string {
  switch (code) {
    case 100:
      return "This video was removed or made private."
    case 101:
    case 150:
      return "The owner doesn't allow this video to play outside YouTube."
    case 153:
      return "YouTube blocked the embedded player for this page."
    case -1:
      return "The YouTube player could not be loaded (network blocked?)."
    default:
      return "This video can't be played here."
  }
}

function VideoFallback({
  url,
  title,
  code,
}: {
  url: string
  title: string
  code: number | null
}) {
  const id = videoIdFromUrl(url)
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-xl border border-border bg-card shadow-tile"
    >
      <div className="relative aspect-video w-full bg-muted">
        {id && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
          <AlertTriangle className="h-5 w-5 text-brand-orange" />
          <p className="text-sm font-medium text-foreground">
            {errorMessage(code)}
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange px-3 py-1.5 text-xs font-semibold text-white group-hover:bg-brand-orange/90">
            Watch on YouTube <ExternalLink className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
      <p className="truncate px-3 py-2 text-xs font-medium text-muted-foreground">
        {title}
      </p>
    </a>
  )
}

function VideoCaption({ url, title }: { url: string; title: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <p className="min-w-0 flex-1 truncate text-xs font-medium text-muted-foreground">
        {title}
      </p>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        title="Open on YouTube if the player does not load"
      >
        YouTube <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  )
}

export function VideoEmbed({
  url,
  title,
  autoplay = false,
  onError,
}: {
  url: string
  title: string
  /** Start muted-autoplay (browsers only allow autoplay when muted). */
  autoplay?: boolean
  /** Called once with the YouTube error code if this video cannot be played. */
  onError?: (code: number) => void
}) {
  const embed = toYouTubeEmbed(url)
  const videoId = embed ? videoIdFromEmbed(embed) : null
  const hostRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<number | null>(null)
  const [frameFailed, setFrameFailed] = useState(false)

  useEffect(() => {
    if (!videoId || !hostRef.current) return
    let dead = false
    let player: YTPlayer | undefined
    loadYouTubeApi()
      .then((YT) => {
        if (dead || !hostRef.current) return
        const mount = document.createElement("div")
        hostRef.current.replaceChildren(mount)
        player = new YT.Player(mount, {
          videoId,
          width: "100%",
          height: "100%",
          playerVars: {
            rel: 0,
            playsinline: 1,
            modestbranding: 1,
            origin: window.location.origin,
            ...(autoplay ? { autoplay: 1, mute: 1 } : {}),
          },
          events: {
            onError: (e) => {
              if (dead) return
              setError(e.data)
              onError?.(e.data)
            },
          },
        })
      })
      .catch(() => {
        if (dead) return
        setError(-1)
        onError?.(-1)
      })
    return () => {
      dead = true
      try {
        player?.destroy()
      } catch {
        /* player already gone */
      }
    }
    // onError is intentionally not a dependency: it must not recreate the player.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, autoplay])

  if (!embed) return null
  if (error !== null) return <VideoFallback url={url} title={title} code={error} />

  // Playlists (anything without a single video id) use a plain iframe.
  if (!videoId) {
    const src = autoplay
      ? embed + (embed.includes("?") ? "&" : "?") + "autoplay=1&mute=1"
      : embed
    if (frameFailed) return <VideoFallback url={url} title={title} code={null} />
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
            onError={() => setFrameFailed(true)}
          />
        </div>
        <VideoCaption url={url} title={title} />
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-tile">
      <div
        ref={hostRef}
        className="relative aspect-video w-full bg-muted [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:h-full [&>iframe]:w-full"
      />
      <VideoCaption url={url} title={title} />
    </div>
  )
}
