// Dumps a compact per-module view of every track's topics (id, title,
// description, keyPoints) so the exercise-authoring workflow has grounded
// source material without shipping the full 950KB curriculum files to agents.
import { writeFileSync } from "node:fs"

import { CURRICULUM } from "../src/lib/data/curriculum"
import { AI_CURRICULUM } from "../src/lib/data/tracks/aiCurriculum"
import { CLOUD_CURRICULUM } from "../src/lib/data/tracks/cloudCurriculum"
import type { Module } from "../src/types"

function dump(track: string, mods: Module[]) {
  return mods.map((m) => ({
    track,
    moduleId: m.id,
    moduleName: m.name,
    topics: m.topics.map((t) => ({
      id: t.id,
      title: t.title,
      description: (t.description ?? "").slice(0, 600),
      keyPoints: (t.keyPoints ?? []).slice(0, 8),
      hasExercises: Array.isArray(t.exercises) && t.exercises.length > 0,
    })),
  }))
}

const all = [
  ...dump("cyber", CURRICULUM),
  ...dump("ai", AI_CURRICULUM),
  ...dump("cloud", CLOUD_CURRICULUM),
]

const out = process.argv[2] || "scripts/topics-dump.json"
writeFileSync(out, JSON.stringify(all, null, 2))
const topics = all.reduce((s, m) => s + m.topics.length, 0)
console.log(`Wrote ${all.length} modules / ${topics} topics to ${out}`)
