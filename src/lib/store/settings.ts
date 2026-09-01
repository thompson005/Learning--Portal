import type { AppSettings } from "@/types"

const SETTINGS_KEY = "technieum_settings"

function defaultSettings(): AppSettings {
  return {
    theme: "dark",
    managerPin: "1234",
    onboarded: false,
  }
}

export function getSettings(): AppSettings {
  if (typeof window === "undefined") return defaultSettings()
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY)
    if (!raw) return defaultSettings()
    return { ...defaultSettings(), ...(JSON.parse(raw) as AppSettings) }
  } catch {
    return defaultSettings()
  }
}

export function updateSettings(update: Partial<AppSettings>) {
  const settings = getSettings()
  const next = { ...settings, ...update }
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(next))
    window.dispatchEvent(new CustomEvent("technieum:settings-changed"))
  }
  return next
}
