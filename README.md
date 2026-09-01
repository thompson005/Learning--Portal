# Technieum Cybersecurity Onboarding Portal

An internal web portal for Technieum's 3-month offensive security onboarding programme. New hires study the curriculum, take quizzes, and track daily progress (stored locally in the browser); managers/admins sign in at `/admin` to monitor cohort progress, backed by a real database.

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v3 (brand config in `tailwind.config.ts`)
- shadcn-style UI primitives (hand-authored under `src/components/ui`, not the CLI)
- **Prisma + SQLite** — admin accounts, sessions, and cohort/trainee tracking
- **tesseract.js** (OCR) + **DeepSeek API** — automated PortSwigger lab-completion screenshot verification
- lucide-react icons, recharts, next-themes, sonner

## Setup

```bash
npm install
npx prisma migrate dev   # creates prisma/dev.db and applies the schema
npm run db:seed          # creates the default admin account
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/dashboard`. On first visit you'll see an onboarding modal asking for your name and programme start date (stored in `localStorage`, per-browser).

```bash
npm run build           # production build
npm run start           # run the production build
npm run lint             # eslint
npm run db:studio        # browse the SQLite DB in Prisma Studio
npm run docs:generate    # regenerate docs/*.md snapshots of all course content
```

### Environment variables (`.env`)

| Variable | Purpose | Default |
|---|---|---|
| `DATABASE_URL` | SQLite file location | `file:./dev.db` |
| `SESSION_SECRET` | Not currently used for signing (sessions are DB-backed), reserved for future use | — |
| `DEFAULT_ADMIN_USERNAME` / `DEFAULT_ADMIN_PASSWORD` | Seeded admin login — **change the password after first login** | `admin` / `TechnieumAdmin123!` |
| `DEEPSEEK_API_KEY` | Enables AI-based screenshot verification (see below). Leave blank to fall back to a text-heuristic check | _(blank)_ |

## Admin Area (`/admin`)

Cohort/trainee tracking now lives at `/admin`, completely separate from the trainee-facing portal (no shared sidebar/nav) and gated by a real login (`/admin/login`) — not a client-side PIN.

- **Auth**: username + bcrypt-hashed password, checked server-side in `POST /api/admin/login`, backed by a DB-stored session (`Session` table) set as an httpOnly cookie. Guarded by `src/app/admin/(dashboard)/layout.tsx`, which redirects to `/admin/login` if there's no valid session.
- **Default login**: `admin` / `TechnieumAdmin123!` (from `.env` — change it before real use; there's no in-app change-password flow yet, so update `DEFAULT_ADMIN_PASSWORD` and re-seed, or update the `AdminUser` row directly via `npm run db:studio`).
- **Cohort tracking**: add up to 10 trainees, set their per-module status (Not Started / In Progress / Completed), see cohort averages, and export a CSV. All of this is stored in SQLite (`Trainee` / `TraineeModuleStatus` tables) via `src/lib/server/manager.ts` and the `/api/admin/trainees*` routes — no longer `localStorage`.

## Lab Completion Screenshot Verification

Every lab (all 38, not just PortSwigger ones) shows a panel in its expanded card: upload a screenshot proving completion and click **Verify**.

1. The image is OCR'd server-side with `tesseract.js` (`POST /api/labs/verify-screenshot`).
2. If `DEEPSEEK_API_KEY` is set, the extracted text is sent to DeepSeek's `deepseek-chat` model along with the lab's title, platform, and (if set) its `completionIndicator` — a short description in `labs.ts` of what a completion screenshot should show for that specific lab (a banner, a flag string, exploit output, etc). DeepSeek judges whether the OCR text plausibly shows real completion evidence (DeepSeek's API is text-only — there's no vision endpoint, so this is a text-based judgment on OCR output, not literal image analysis).
3. If no key is set, it falls back to a heuristic: checks for a "congratulations ... solved" banner, a `flag{...}`/`HTB{...}` pattern, or the lab's own `completionIndicator` substring.
4. On a verified result, the lab's status auto-updates to Completed; the result (verified/not, confidence, reasoning) is also saved into that lab's evidence field.

## Lab Environments (Docker)

Labs whose target is a real, actively-maintained open-source app that can run in a single container (`dockerImage`/`containerPort` set in `labs.ts` — currently DVWA and OWASP Juice Shop) get a **Lab Environment** panel with **Start Lab** / **Stop Lab** buttons, backed by the local Docker daemon.

- **One active lab at a time.** Starting a lab stops whatever else is running first — enforced server-side via the `LabRun` table (`prisma/schema.prisma`), not just in the UI.
- **Fixed host port** `18080` (only one container ever runs, so no port-scanning is needed) — `src/lib/server/dockerLabs.ts` shells out to the `docker` CLI (`run`/`rm -f`/`inspect`) via `execFile` with argument arrays, not a shell string, and only ever runs images from the app's own `labs.ts` data (never user input).
- **Self-healing:** if a container crashes right after starting, its logs are captured and the run is marked `failed` with the log tail attached; if a container dies later without the app noticing, the next status check detects it and clears the "active" state instead of trusting a stale DB row.
- Requires Docker Desktop (or another local Docker daemon) running on the machine hosting the portal. Routes: `POST /api/labs/docker/start`, `POST /api/labs/docker/stop`, `GET /api/labs/docker/status`.

## Automatic Status Tracking

Topic/lab status (Not Started / In Progress / Completed / Skipped) updates automatically so trainees don't have to manage it by hand — the manual dropdown still exists as an override (e.g. to mark something Skipped, or correct a wrong auto-detection):

- **Expanding** a topic or lab row for the first time moves it from Not Started to In Progress.
- **Passing a topic's quiz** (≥2/3 correct) auto-marks that topic Completed.
- **Filling in a lab's Evidence/Flag field**, or a **verified completion screenshot**, auto-marks that lab Completed.

## Quizzes

Every topic has a 3-question quiz; every module has a 10-question quiz. Both are multiple-choice with instant scoring and explanations, and results persist in `localStorage` (`topicQuizzes` / `moduleQuizzes` on the progress record) so "last score" survives a reload.

- Data: `src/lib/data/topicQuizzes.ts`, `src/lib/data/moduleQuizzes.ts` — arrays of `{ topicId | moduleId, questions: [{ question, options, correctIndex, explanation }] }`.
- UI: `src/components/quiz/QuizModal.tsx`, wired into `TopicRow.tsx` (topic quiz) and the module detail page's Overview tab (module quiz).
- To add/edit quiz questions, edit those two data files directly, or regenerate via the same mining approach used to build them (see `scripts/` — there's no automated regeneration script since question quality benefits from human review).

## Project Structure

```
prisma/
├── schema.prisma         # AdminUser, Session, Trainee, TraineeModuleStatus
└── seed.ts               # creates the default admin user

src/
├── app/
│   ├── (portal)/         # trainee-facing app: dashboard, modules, labs, progress, plan, glossary, settings — wrapped in AppShell (sidebar)
│   ├── admin/            # separate area, no shared sidebar: login page + PIN-free, DB-backed dashboard
│   └── api/               # admin auth + trainee CRUD + lab screenshot verification routes
├── components/
│   ├── layout/           # Sidebar, Header, MobileNav, AppShell (portal-only)
│   ├── dashboard/ modules/ labs/ plan/ glossary/ quiz/  # feature-specific components
│   ├── onboarding/       # first-run welcome modal
│   ├── shared/           # StatusBadge, ProgressBar, CodeBlock
│   └── ui/               # shadcn-style primitives (button, card, dialog, select, ...)
├── lib/
│   ├── data/             # curriculum.ts, labs.ts, glossary.ts, weeklyPlan.ts, topicQuizzes.ts, moduleQuizzes.ts, resourceAdditions.ts
│   ├── server/           # db.ts (Prisma client), auth.ts (sessions), manager.ts (Prisma-backed cohort tracking)
│   └── store/            # progress.ts, settings.ts, bookmarks.ts — localStorage read/write (trainee-side only)
└── types/                # shared TypeScript interfaces

scripts/
└── generate-docs.ts      # `npm run docs:generate` — dumps all course content data into docs/*.md

docs/                     # generated Markdown snapshots (curriculum, labs, glossary, weekly-plan) — human-readable mirror of the data files, regenerate after editing content
```

## How to Add or Edit Curriculum Content

All course content lives in data files under `src/lib/data/`. Nothing is fetched from a server for this part — edit these files, restart the dev server, and (optionally) run `npm run docs:generate` to refresh the Markdown snapshots in `docs/`.

### Adding a topic to a module

Open `src/lib/data/curriculum.ts`, find the module by its `id` (e.g. `"m9"`), and add an entry to its `topics` array:

```ts
{
  id: "m9-12",            // must be unique across the whole file
  moduleId: "m9",         // must match the parent module's id
  number: 999,            // sequential display number
  title: "New Topic Title",
  type: "theory",         // "theory" | "lab" | "setup" | "exercise"
  week: 9,
  description: "One or two sentences.",
  keyPoints: ["...", "..."],
  terminalCommands: ["..."],   // optional, only for command-heavy topics
  resources: [{ title: "...", url: "...", type: "link" }], // optional
}
```

The topic will automatically appear in the module's Topics tab, count toward its progress %, and show up in the dashboard/progress charts. To give it a quiz, add a matching entry to `src/lib/data/topicQuizzes.ts` (`topicId` must match). To add extra resource links without touching `curriculum.ts`, add them under that topic's id in `src/lib/data/resourceAdditions.ts` instead — both are merged in the UI.

### Adding a new module

Add a new object to the `CURRICULUM` array in `curriculum.ts` following the same shape as the existing modules (`id`, `name`, `shortName`, `month`, `weeks`, `description`, `estimatedHours`, `outcomes`, `topics`). Give it a unique `id` — this is what topics' `moduleId`, labs' `moduleId`, and quiz `moduleId`/`topicId` reference.

### Adding a lab

Add an entry to the `LABS` array in `src/lib/data/labs.ts`:

```ts
{
  id: "L39",
  number: 39,
  week: 12,
  moduleId: "m14",        // must match an existing module id
  title: "Lab Title",
  description: "What to do and what to submit.",
  platform: "Tool/Platform name",   // set to "PortSwigger" to get the screenshot-verify panel
  difficulty: "medium",   // "easy" | "medium" | "hard"
  estimatedHours: 2,
  instructions: ["Step 1", "Step 2", "..."],
  resources: [{ title: "...", url: "...", type: "platform" }],
}
```

### Adding a glossary term

Add an entry to `GLOSSARY` in `src/lib/data/glossary.ts` (`id`, `term`, `fullName`, `category`, `definition`, `example`, `learnMore`). Categories are derived automatically for the filter chips — reuse an existing category where it fits.

### Editing the 12-week plan

`src/lib/data/weeklyPlan.ts` holds one entry per week (`week`, `month`, `theme`, `modules` — an array of module ids, `keyTopics`, `labs` — an array of lab ids, `estimatedHours`, `checkpoint`, `resources`).

## Admin / Cohort Tracking — Adding Trainees

1. Go to `/admin` (or the **Admin** link at the bottom of the sidebar) and sign in.
2. Use the "Add trainee" field to add up to 10 trainees by name.
3. Click each cell's dropdown to set a trainee's status per module (Not Started / In Progress / Completed).
4. Use **Export CSV** to download the full cohort grid, including per-module cohort averages and each trainee's overall %.

This data lives in the SQLite database (`Trainee` / `TraineeModuleStatus` tables), not `localStorage` — it's shared across anyone who logs into `/admin` on this deployment, unlike a trainee's own personal progress which stays in their browser.

## Backing Up / Restoring Your Own Progress

A trainee's own progress (topics, labs, notes, scores, quiz results, name, start date) lives under the `technieum_progress` `localStorage` key — per-browser, not in the database.

- **Export**: go to **My Progress** or **Settings** and click **Export**/**Export all data** — downloads a JSON backup.
- **Import**: click **Import**/**Import data** and select a previously exported JSON file to restore it.
- **Reset**: **Settings → Danger zone → Reset everything** (or **My Progress → Reset**) clears all progress after a two-step confirmation. This cannot be undone — export a backup first if in doubt.

To back up the admin/cohort database instead, copy `prisma/dev.db` directly, or use `npm run db:studio` to inspect/export it.

## Customising Branding

Brand colours and fonts are defined in `tailwind.config.ts` under `theme.extend.colors` (the `brand-*` keys: `brand-navy`, `brand-blue`, `brand-teal`, `brand-orange`, `brand-green`, `brand-red`, `brand-purple`) and `theme.extend.fontFamily`. Light/dark theme tokens (background, foreground, card, border, etc.) are separate CSS variables in `src/app/globals.css` under `:root` and `.dark`. Reusable visual accents (`accent-bar`, `hero-gradient`, `text-gradient-brand`, `glow-teal`) are also defined there.

The sidebar is intentionally always styled with a navy gradient regardless of the light/dark theme toggle, since it's treated as fixed brand identity — change that in `src/components/layout/Sidebar.tsx` if you want it to follow the theme instead.

## Notes

- All 17 modules (M0–M15, with M3 split into Linux/Windows), 38 labs, and 41 glossary terms are fully populated with real content sourced from Technieum's internal course material — nothing is a placeholder.
- The current week is calculated automatically from the start date set during onboarding (`src/lib/store/progress.ts` → `getCurrentWeek`).
- Status changes anywhere in the trainee-facing app dispatch a `technieum:progress-changed` window event, which is what keeps the sidebar badges, dashboard stats, and progress charts in sync instantly without a page reload.
- The admin area intentionally does not share the trainee app's `AppShell`/sidebar — it's a fully separate route tree (`src/app/admin/`) with its own layout, by design.
