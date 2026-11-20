import type { Module, Lab, TopicQuiz, ModuleQuiz } from "@/types"

import { CURRICULUM } from "@/lib/data/curriculum"
import { LABS } from "@/lib/data/labs"
import { TOPIC_QUIZZES } from "@/lib/data/topicQuizzes"
import { MODULE_QUIZZES } from "@/lib/data/moduleQuizzes"
import { CYBER_EXTRA_LABS } from "./cyberExtraLabs"

import { AI_CURRICULUM } from "./aiCurriculum"
import { AI_TOPIC_QUIZZES } from "./aiTopicQuizzes"
import { AI_LABS } from "./aiLabs"
import { CLOUD_CURRICULUM } from "./cloudCurriculum"
import { CLOUD_TOPIC_QUIZZES } from "./cloudTopicQuizzes"
import { CLOUD_LABS } from "./cloudLabs"

export interface Track {
  id: string
  name: string
  shortName: string
  blurb: string
  curriculum: Module[]
  labs: Lab[]
  topicQuizzes: TopicQuiz[]
  moduleQuizzes: ModuleQuiz[]
  phases: { month: number; name: string }[]
}

export const TRACKS: Track[] = [
  {
    id: "cyber",
    name: "Offensive Security",
    shortName: "Offensive Security",
    blurb: "The core pentesting path — networks, web, exploitation, reporting.",
    curriculum: CURRICULUM,
    labs: [...LABS, ...CYBER_EXTRA_LABS],
    topicQuizzes: TOPIC_QUIZZES,
    moduleQuizzes: MODULE_QUIZZES,
    phases: [
      { month: 1, name: "Foundations" },
      { month: 2, name: "Core Offensive Skills" },
      { month: 3, name: "Exploitation + Reporting" },
      { month: 4, name: "Advanced Offensive Security" },
    ],
  },
  {
    id: "ai",
    name: "AI Security",
    shortName: "AI Security",
    blurb: "Attacking and defending AI/LLM systems end to end.",
    curriculum: AI_CURRICULUM,
    labs: AI_LABS,
    topicQuizzes: AI_TOPIC_QUIZZES,
    moduleQuizzes: [],
    phases: [
      { month: 1, name: "Foundations" },
      { month: 2, name: "Prompt Injection & Insecure Design" },
      { month: 3, name: "ML Attacks & Supply Chain" },
      { month: 4, name: "Defense & Red-Teaming" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud Security",
    shortName: "Cloud Security",
    blurb: "Securing and attacking AWS, Azure and GCP.",
    curriculum: CLOUD_CURRICULUM,
    labs: CLOUD_LABS,
    topicQuizzes: CLOUD_TOPIC_QUIZZES,
    moduleQuizzes: [],
    phases: [
      { month: 1, name: "Foundations: Accounts & Identity" },
      { month: 2, name: "Identity Attacks & Data Exposure" },
      { month: 3, name: "Workloads, Serverless & Kubernetes" },
      { month: 4, name: "Attack Paths, Detection & CSPM" },
    ],
  },
]

const KEY = "technieum_active_track"
let serverActive = "cyber"

export function getActiveTrackId(): string {
  if (typeof window === "undefined") return serverActive
  try {
    const id = window.localStorage.getItem(KEY)
    return id && TRACKS.some((t) => t.id === id) ? id : "cyber"
  } catch {
    return "cyber"
  }
}

export function setActiveTrackId(id: string): void {
  if (!TRACKS.some((t) => t.id === id)) return
  serverActive = id
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, id)
    } catch {
      /* ignore */
    }
    // Reuse the progress-changed event so every panel re-reads for the new track.
    window.dispatchEvent(new CustomEvent("technieum:track-changed"))
    window.dispatchEvent(new CustomEvent("technieum:progress-changed"))
  }
}

export function getTrack(id: string): Track {
  return TRACKS.find((t) => t.id === id) ?? TRACKS[0]
}

export function getActiveTrack(): Track {
  return getTrack(getActiveTrackId())
}

/** Look up a lab by id across ALL tracks (Offensive core + extras, AI, Cloud).
 *  Server code must use this — never a single track's list — or labs from the
 *  other tracks are reported as "Unknown lab id". */
export function findLab(labId: string): Lab | undefined {
  for (const t of TRACKS) {
    const lab = t.labs.find((l) => l.id === labId)
    if (lab) return lab
  }
  return undefined
}

// Which track owns a given module/topic/lab id (ids are globally unique).
export function trackForModuleId(moduleId: string): Track | undefined {
  return TRACKS.find((t) => t.curriculum.some((m) => m.id === moduleId))
}
export function trackForTopicId(topicId: string): Track | undefined {
  return TRACKS.find((t) =>
    t.curriculum.some((m) => m.topics.some((tp) => tp.id === topicId)),
  )
}

// Active-track data accessors (read at call time so they follow the switch).
export function activeCurriculum(): Module[] {
  return getActiveTrack().curriculum
}
export function activeLabs(): Lab[] {
  return getActiveTrack().labs
}
export function activeTopicQuizzes(): TopicQuiz[] {
  return getActiveTrack().topicQuizzes
}
export function activeModuleQuizzes(): ModuleQuiz[] {
  return getActiveTrack().moduleQuizzes
}
