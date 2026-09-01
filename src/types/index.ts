export type Status = "not_started" | "in_progress" | "completed" | "skipped"

export type TopicType = "theory" | "lab" | "setup" | "exercise"

export type Difficulty = "easy" | "medium" | "hard"

export interface Resource {
  title: string
  url: string
  type: "link" | "video" | "platform" | "tool"
}

export interface Topic {
  id: string
  moduleId: string
  number: number
  title: string
  type: TopicType
  week: number
  description?: string
  resources?: Resource[]
  keyPoints?: string[]
  terminalCommands?: string[]
  /** Slideshow walkthrough — one diagram-backed slide per concept beat. Falls back to description/keyPoints when absent. */
  slides?: LabSlide[]
}

export interface Module {
  id: string
  name: string
  shortName: string
  month: 1 | 2 | 3 | 4
  weeks: number[]
  description: string
  topics: Topic[]
  estimatedHours: number
  prerequisites?: string[]
  outcomes: string[]
  resources?: Resource[]
}

// ---------------------------------------------------------------------------
// Lab diagrams — a small fixed vocabulary of SVG diagram shapes, each
// parametrized with a specific lab's real steps/tools/targets so every lab
// reads differently even though they share a rendering system.
// ---------------------------------------------------------------------------

export interface NetworkNode {
  id: string
  label: string
  kind: "attacker" | "victim" | "server" | "router" | "firewall" | "device"
}
export interface NetworkEdge {
  from: string
  to: string
  label?: string
  dashed?: boolean
}
export interface NetworkTopologyDiagram {
  type: "network-topology"
  nodes: NetworkNode[]
  edges: NetworkEdge[]
}

export interface RequestResponseDiagram {
  type: "request-response"
  leftLabel: string
  rightLabel: string
  exchanges: { direction: "right" | "left"; label: string; payload?: string }[]
}

export interface TerminalDiagram {
  type: "terminal"
  prompt: string
  lines: { command?: string; output?: string }[]
}

export interface LayerStackDiagram {
  type: "layer-stack"
  layers: { label: string; detail?: string; highlighted?: boolean }[]
}

export interface FlowChainDiagram {
  type: "flow-chain"
  steps: { label: string; detail?: string }[]
}

export interface GraphTreeDiagram {
  type: "graph-tree"
  nodes: { id: string; label: string; highlighted?: boolean }[]
  edges: { from: string; to: string; label?: string }[]
}

export interface FileTreeDiagram {
  type: "file-tree"
  root: string
  entries: { path: string; depth: number; flagged?: boolean; note?: string }[]
}

export interface ContainerArchDiagram {
  type: "container-arch"
  hostLabel: string
  containerLabel: string
  image: string
  hostPort: number
  containerPort: number
}

export interface BrowserMockupDiagram {
  type: "browser-mockup"
  url: string
  annotations: { label: string; note: string }[]
}

export interface PacketCaptureDiagram {
  type: "packet-capture"
  rows: {
    time: string
    source: string
    dest: string
    protocol: string
    info: string
    highlighted?: boolean
  }[]
}

export interface ComparisonDiagram {
  type: "comparison"
  columns: { label: string; points: string[]; highlighted?: boolean }[]
}

export type LabDiagram =
  | NetworkTopologyDiagram
  | RequestResponseDiagram
  | TerminalDiagram
  | LayerStackDiagram
  | FlowChainDiagram
  | GraphTreeDiagram
  | FileTreeDiagram
  | ContainerArchDiagram
  | BrowserMockupDiagram
  | PacketCaptureDiagram
  | ComparisonDiagram

export interface SlideCheck {
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export interface LabSlide {
  title: string
  body: string
  diagram?: LabDiagram
  /** Optional inline recall check shown after the slide body — answering correctly awards XP. */
  check?: SlideCheck
}

/** An online, no-setup alternative for doing a lab (e.g. a free PortSwigger lab) when the local Docker target can't run — used on the hosted portal where Docker isn't available. */
export interface LabOnlineAlternative {
  /** Button/link label, e.g. "PortSwigger Web Security Academy — XSS". */
  label: string
  /** Direct URL to the online lab/category. */
  url: string
  /** One line on how this substitutes for the local Docker lab. */
  note?: string
}

/** A downloadable file a lab needs (sample capture, hash set, log, wordlist), served from /public/lab-assets. */
export interface LabAsset {
  /** Human-facing name shown on the download button, e.g. "password-spray.evtx". */
  name: string
  /** Path under /public, e.g. "/lab-assets/L11/password-spray.evtx". */
  path: string
  /** One-line description of what the file is and how it's used in the lab. */
  description: string
  /** Optional human-readable size, e.g. "1.1 MB". */
  size?: string
}

export interface Lab {
  id: string
  number: number
  week: number
  moduleId: string
  title: string
  description: string
  platform: string
  difficulty: Difficulty
  estimatedHours: number
  /** One-sentence statement of what the learner will accomplish — the mission, shown up front. */
  objective?: string
  /** Concrete, checkable outcomes that mean the lab is done — what "success" actually looks like. */
  successCriteria?: string[]
  /** Files the learner downloads to do the lab (captures, hashes, logs), hosted in-portal. */
  assets?: LabAsset[]
  /** Online, no-Docker way to do this lab (free PortSwigger lab etc.) — shown as a fallback on the hosted portal. Does not replace the local Docker path. */
  onlineAlternative?: LabOnlineAlternative
  instructions?: string[]
  resources?: Resource[]
  flagFormat?: string
  /** What a completion screenshot should show, e.g. "Congratulations, you solved the lab!" banner or a flag string pattern. Used to guide OCR/AI evidence verification. */
  completionIndicator?: string
  /** Docker Hub image (or GHCR ref) that stands up this lab's target locally, if one exists (e.g. "vulnerables/web-dvwa"). */
  dockerImage?: string
  /** Port the target app listens on INSIDE the container, mapped to a free host port at run time. */
  containerPort?: number
  /** Slideshow walkthrough — one diagram-backed slide per real step. Falls back to `instructions` when absent. */
  slides?: LabSlide[]
  /** Progressive hints, gentlest first — revealed one at a time on request, never all at once. */
  hints?: string[]
}

export interface GlossaryTerm {
  id: string
  term: string
  fullName: string
  category: string
  definition: string
  example: string
  learnMore: string
}

export interface WeekPlan {
  week: number
  month: 1 | 2 | 3 | 4
  theme: string
  modules: string[]
  keyTopics: string
  labs: string[]
  estimatedHours: number
  checkpoint: string
  resources: string[]
}

// Progress tracking
export interface TopicProgress {
  status: Status
  dateStarted?: string
  dateCompleted?: string
  selfScore?: number // 1-5
  notes?: string
}

export interface LabProgress {
  status: Status
  dateCompleted?: string
  flagOrEvidence?: string
  score?: number
  timeSpentHours?: number
  notes?: string
}

export interface QuizAttempt {
  score: number
  total: number
  lastAttempt: string
  answers?: number[]
}

export interface UserProgress {
  userId: string
  name: string
  startDate: string
  topics: Record<string, TopicProgress>
  labs: Record<string, LabProgress>
  topicQuizzes: Record<string, QuizAttempt>
  moduleQuizzes: Record<string, QuizAttempt>
  /** Slide checkpoint answers, keyed by `${ownerId}::${slideIndex}` — true once answered correctly. */
  checkpoints: Record<string, boolean>
  lastUpdated: string
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export interface TopicQuiz {
  topicId: string
  questions: QuizQuestion[]
}

export interface ModuleQuiz {
  moduleId: string
  questions: QuizQuestion[]
}

export interface AppSettings {
  theme: "dark" | "light"
  managerPin: string
  onboarded: boolean
}

export interface ManagerTrainee {
  id: string
  name: string
  // moduleId -> 0 (not started) | 1 (in progress) | 2 (completed)
  moduleStatus: Record<string, 0 | 1 | 2>
}
