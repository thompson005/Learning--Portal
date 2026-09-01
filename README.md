# Technieum Learning Portal

Self-paced offensive-security onboarding portal. 223 topics, 59 hands-on labs,
in-app quizzes, XP/rank gamification.

Each learner signs up with an email + password. Progress, quizzes and XP are held
in the browser (`localStorage`) for a snappy experience **and** synced to the
server per account, so a user gets the same progress on any device/browser they
log in from. This requires a database (see below).

## Local development

```bash
npm install
cp .env.example .env      # fill in the values (see below) — point DATABASE_URL at a Postgres
npx prisma db push        # creates the tables (users, sessions, admin, lab runs)
npm run db:seed           # creates the default admin account
npm run dev               # http://localhost:3333
```

The Prisma provider is `postgresql`. For a quick local Postgres, either use a free
hosted one (Neon / Supabase) or run one in Docker:

```bash
docker run --name technieum-pg -e POSTGRES_PASSWORD=dev -p 5432:5432 -d postgres:16
# then DATABASE_URL="postgresql://postgres:dev@localhost:5432/postgres"
```

## Deploying to Vercel

1. Provision a Postgres database (Vercel Postgres, Neon, or Supabase).
2. Import the GitHub repo into Vercel (framework auto-detected as Next.js).
3. Set the environment variables below in **Project → Settings → Environment Variables**
   — `DATABASE_URL` is required for accounts to work.
4. Create the tables against your Postgres once: `npx prisma db push` (run locally
   with the production `DATABASE_URL`, or as a one-off).
5. Deploy. `prisma generate` runs automatically on install/build.

### Environment variables

| Variable | Needed for | Notes |
|----------|-----------|-------|
| `DATABASE_URL` | learner accounts + progress sync, admin dashboard, Docker-lab tracking | **Required.** Postgres connection string. |
| `SESSION_SECRET` | admin login | Any long random string. |
| `DEFAULT_ADMIN_USERNAME` / `DEFAULT_ADMIN_PASSWORD` | seeding the admin account | Only used by `npm run db:seed`. |
| `DEEPSEEK_API_KEY` | AI screenshot verification | Optional — without it, screenshot checks fall back to an OCR-only heuristic. |

### What works on Vercel vs. what needs more

- **Learner portal (topics, labs, quizzes, progress, XP):** works fully. Content
  renders client-side; accounts + cross-device progress sync need `DATABASE_URL`.
- **Docker labs ("Start Lab"):** cannot run on Vercel (serverless has no Docker daemon).
  Every web lab already ships an **Online Alternative** link (free PortSwigger
  Web Security Academy labs) that needs no local setup — use those on the hosted site.
- **Admin cohort dashboard + Docker-lab run tracking:** also use the same Postgres.

## Scripts

- `npm run dev` — dev server on port 3333
- `npm run build` — production build (runs `prisma generate` first)
- `npm run db:seed` — seed local DB + admin
- `npm run docs:generate` — regenerate the Markdown docs in `docs/`
