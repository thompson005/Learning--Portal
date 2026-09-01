import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import type { Resource } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Merges resource lists and drops duplicates by URL (keeps the first occurrence). */
export function dedupeResources(...lists: (Resource[] | undefined)[]): Resource[] {
  const seen = new Set<string>()
  const result: Resource[] = []
  for (const list of lists) {
    for (const r of list ?? []) {
      if (seen.has(r.url)) continue
      seen.add(r.url)
      result.push(r)
    }
  }
  return result
}
