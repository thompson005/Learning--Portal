# Technieum Learning Portal

Self-paced offensive-security onboarding portal. 223 topics, 59 hands-on labs,
in-app quizzes, XP/rank gamification. The learning experience (topics, labs
content, progress, quizzes, XP) runs entirely client-side (browser
`localStorage`) — no database or backend needed to use it.

## Local development

```bash
npm install
cp .env.example .env      # fill in the values (see below)
npm run db:seed           # creates the local SQLite DB + default admin
npm run dev               # http://localhost:3333
```

## Deploying to Vercel

The portal itself works on Vercel out of the box — every learner-facing page is
a client component, so it needs no server database to run.

1. Import the GitHub repo into Vercel (framework auto-detected as Next.js).
2. Set the environment variables below in **Project → Settings → Environment Variables**.
3. Deploy. `prisma generate` runs automatically on install/build.

### Environment variables

| Variable | Needed for | Notes |
|----------|-----------|-------|
| `DATABASE_URL` | admin dashboard, Docker-lab tracking | Optional for the learner portal. See the DB note below. |
| `SESSION_SECRET` | admin login | Any long random string. |
| `DEFAULT_ADMIN_USERNAME` / `DEFAULT_ADMIN_PASSWORD` | seeding the admin account | Only used by `npm run db:seed`. |
| `DEEPSEEK_API_KEY` | AI screenshot verification | Optional — without it, screenshot checks fall back to an OCR-only heuristic. |

### What works on Vercel vs. what needs more

- **Learner portal (topics, labs, quizzes, progress, XP):** works fully — client-side only.
- **Docker labs ("Start Lab"):** cannot run on Vercel (serverless has no Docker daemon).
  Every web lab already ships an **Online Alternative** link (free PortSwigger
  Web Security Academy labs) that needs no local setup — use those on the hosted site.
- **Admin cohort dashboard + Docker-lab run tracking:** use Prisma. The bundled
  provider is SQLite (`file:./dev.db`), which does **not** persist on Vercel's
  read-only serverless filesystem. To run these features on a host, point
  `DATABASE_URL` at a persistent Postgres (e.g. Neon / Vercel Postgres) and
  switch the Prisma provider to `postgresql`. For "just host the learning
  content" this is not required — those routes simply return an error and the
  learner portal is unaffected.

## Scripts

- `npm run dev` — dev server on port 3333
- `npm run build` — production build (runs `prisma generate` first)
- `npm run db:seed` — seed local DB + admin
- `npm run docs:generate` — regenerate the Markdown docs in `docs/`
