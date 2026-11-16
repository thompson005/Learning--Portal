"use client"

import { useEffect, useState } from "react"

import { getActiveTrackId, getActiveTrack, type Track } from "./registry"

/** Current active track id; re-renders the component when the track switches. */
export function useActiveTrackId(): string {
  const [id, setId] = useState("cyber")
  useEffect(() => {
    setId(getActiveTrackId())
    const h = () => setId(getActiveTrackId())
    window.addEventListener("technieum:track-changed", h)
    return () => window.removeEventListener("technieum:track-changed", h)
  }, [])
  return id
}

/** The active Track object, reactive to switches. */
export function useActiveTrack(): Track {
  const id = useActiveTrackId()
  return getActiveTrack() && id ? getActiveTrack() : getActiveTrack()
}
