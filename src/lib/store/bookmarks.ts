const BOOKMARKS_KEY = "technieum_glossary_bookmarks"

export function getBookmarks(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(BOOKMARKS_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function toggleBookmark(termId: string): string[] {
  const current = getBookmarks()
  const next = current.includes(termId) ? current.filter((id) => id !== termId) : [...current, termId]
  if (typeof window !== "undefined") {
    window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next))
  }
  return next
}
