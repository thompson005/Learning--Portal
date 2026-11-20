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
  /** Hands-on interactive exercises — drag-to-order, match, or fill-in-the-blank. Rendered after the walkthrough; each awards XP once. */
  exercises?: Exercise[]
}

// ---------------------------------------------------------------------------
// Interactive exercises — a small fixed vocabulary of auto-graded, hands-on
// drills shown under a topic. Each is answered in-place and awards XP once.
// ---------------------------------------------------------------------------

/** Drag the items into the correct sequence. `items` are given in the CORRECT order; the renderer shuffles them for display. */
export interface OrderExercise {
  type: "order"
  prompt: string
  items: string[]
  explanation?: string
}

/** Match each left item to its correct right item. Pairs are given aligned; the renderer shuffles the right column. */
export interface MatchExercise {
  type: "match"
  prompt: string
  pairs: { left: string; right: string }[]
  explanation?: string
}

/** Fill each blank by placing the right token. `template` marks blanks with `___`; `blanks` lists the correct token for each blank in order; `distractors` are wrong tokens pooled in to make it non-trivial. */
export interface BlankExercise {
  type: "fill-blank"
  prompt: string
  template: string
  blanks: string[]
  distractors?: string[]
  explanation?: string
}

export type Exercise = OrderExercise | MatchExercise | BlankExercise

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
  /** For labs with no published image: a Git URL Docker can `docker build` directly (repo root has the Dockerfile), e.g. "https://github.com/org/repo.git#main". Built once on the host, then run like any other lab. */
  buildContext?: string
  /** In-browser, auto-graded cloud range (replaces manual self-marking). */
  range?: CloudRange
  /** Force the container platform, e.g. "linux/amd64" for an image with no ARM build (runs under emulation on the ARM DGX — needs the one-time qemu/binfmt setup). */
  imagePlatform?: string
  /** Slideshow walkthrough — one diagram-backed slide per real step. Falls back to `instructions` when absent. */
  slides?: LabSlide[]
  /** Progressive hints, gentlest first — revealed one at a time on request, never all at once. */
  hints?: string[]
}

// ---------------------------------------------------------------------------
// Cloud Range — a self-contained, auto-graded cloud lab that runs entirely in
// the browser (no real cloud account, no Docker). A lab has a scenario, a set of
// artifacts to inspect (policies, logs, configs), an optional scripted CLI
// terminal, and tasks the portal grades automatically.
// ---------------------------------------------------------------------------

export interface CloudArtifact {
  name: string
  language: "json" | "text" | "bash" | "yaml"
  content: string
  /** One line telling the learner what they are looking at. */
  note?: string
}

/** One scripted CLI behaviour. `match` is a regex source tested (case-insensitive)
 *  against the normalised command; `$1..$9` in `output` are its capture groups.
 *  `requires` are state keys that must already be set; `sets` are added on match. */
export interface TerminalRule {
  match: string
  output: string
  requires?: string[]
  sets?: string[]
}

export interface CloudTerminal {
  prompt: string
  intro?: string
  help?: string
  rules: TerminalRule[]
  fallback?: string
}

export interface PolicyTest {
  name: string
  action: string
  resource?: string
  principal?: string
  context?: Record<string, string | number | boolean | string[]>
  expect: "allow" | "deny"
}

/** Fixed policies evaluated together with the learner's edited one. */
export interface PolicyFixed {
  identity?: string[]
  resource?: string
  boundary?: string
  scp?: string[]
  crossAccount?: boolean
}

export type CloudTask =
  | { id: string; kind: "answer"; prompt: string; accept: string[]; explanation: string }
  | {
      id: string
      kind: "choice"
      prompt: string
      options: string[]
      correct: number[]
      explanation: string
    }
  | { id: string; kind: "flag"; prompt: string; flag: string; explanation: string }
  | {
      id: string
      kind: "policy"
      prompt: string
      /** Which slot the learner's policy occupies in the evaluation. */
      mode: "identity" | "resource" | "boundary" | "scp"
      starter: string
      /** A passing policy — used by the automated QA, never shown to learners. */
      solution: string
      fixed?: PolicyFixed
      tests: PolicyTest[]
      explanation: string
    }

export interface CloudRange {
  scenario: string
  artifacts: CloudArtifact[]
  terminal?: CloudTerminal
  tasks: CloudTask[]
  /** Terminal commands that reach every flag — replayed by the automated QA. */
  solution?: string[]
  /** Key takeaways shown once the range is complete. */
  takeaways: string[]
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
  /** Local-date (yyyy-mm-dd) strings on which the learner did something — drives the daily streak. */
  activityDates?: string[]
  /** The topic the learner most recently opened — powers "resume exactly where you left off". */
  lastTopicId?: string
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
