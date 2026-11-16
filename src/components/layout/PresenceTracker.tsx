"use client"

import { useEffect, useRef } from "react"

const FLUSH_INTERVAL_MS = 60_000

function localDay(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

/**
 * Tracks how long the learner is actually on the portal and reports it to the
 * server as a heartbeat. Only counts seconds while the tab is visible AND
 * focused, so background tabs don't inflate time. Mounted once in the shell.
 */
export function PresenceTracker() {
  const accRef = useRef(0)
  const sendingRef = useRef(false)

  useEffect(() => {
    function isActive() {
      return (
        document.visibilityState === "visible" &&
        (typeof document.hasFocus === "function" ? document.hasFocus() : true)
      )
    }

    const tick = setInterval(() => {
      if (isActive()) accRef.current += 1
    }, 1000)

    function flush(useBeacon = false) {
      const seconds = accRef.current
      if (seconds <= 0 || sendingRef.current) return
      accRef.current = 0
      const payload = JSON.stringify({ seconds, day: localDay() })
      if (useBeacon && typeof navigator.sendBeacon === "function") {
        navigator.sendBeacon(
          "/api/me/heartbeat",
          new Blob([payload], { type: "application/json" }),
        )
        return
      }
      sendingRef.current = true
      fetch("/api/me/heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      })
        .catch(() => {
          // put the seconds back so they aren't lost on a transient failure
          accRef.current += seconds
        })
        .finally(() => {
          sendingRef.current = false
        })
    }

    const flushTimer = setInterval(() => flush(false), FLUSH_INTERVAL_MS)

    function onVisibility() {
      if (document.visibilityState === "hidden") flush(true)
    }
    function onPageHide() {
      flush(true)
    }

    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("pagehide", onPageHide)

    return () => {
      clearInterval(tick)
      clearInterval(flushTimer)
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("pagehide", onPageHide)
      flush(true)
    }
  }, [])

  return null
}
