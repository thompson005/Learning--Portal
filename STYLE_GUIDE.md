# Refined Light 3D — Style Guide (locked)

The one design direction for the whole app. Premium, calm, light. Glass +
animated mesh gradients + layered depth + spring motion + subtle 3D tilt. One
bold accent (ember orange). Apple/Stripe energy. **Do not invent a different
look.** Restyle screens to THIS.

## Principles
- Light canvas, **glass** surfaces that float on it with layered soft shadows.
- One accent: `brand-orange` / `brand-orange-strong`. Semantic colors
  (`brand-green`, `brand-red`, `brand-purple`, `brand-blue`) only for data.
- Generous whitespace, large confident headings (`font-display`), `font-mono`
  for tiny uppercase labels (`tracking-widest text-muted-foreground`).
- Motion is tasteful: reveal-on-scroll, spring hover-raise, subtle tilt. Never
  constant/decorative motion. Always respect reduced motion (primitives do).
- Keep all existing behavior, data, routes and props. This is restyle only.

## Use these primitives (import, don't reinvent)
```tsx
import { GlassCard } from "@/components/ui3d/GlassCard"   // <GlassCard strong? lift? as?>
import { MeshGradient } from "@/components/ui3d/MeshGradient" // animated hero bg (place in a relative overflow-hidden parent)
import { TiltCard } from "@/components/ui3d/TiltCard"     // pointer 3D tilt wrapper
import { Reveal } from "@/components/ui3d/Reveal"         // scroll spring-in; `delay` to stagger; `as`
```

## Utility classes (in globals.css)
- `glass` / `glass-strong` — frosted surfaces (already rounded via wrapper; add `rounded-2xl`/`rounded-3xl`).
- `elev-1` / `elev-2` / `elev-3` — layered depth shadows.
- `lift` — spring hover-raise (use on interactive cards instead of ad-hoc hover).
- `tilt3d` — consumed by TiltCard; don't use directly.
- `reveal` / `is-in` — consumed by Reveal; don't use directly.
- `app-canvas` — page wash (already applied app-wide; don't re-add).
- `sheen::before` — animated conic sheen for a hero accent ring (use sparingly).

## Patterns
**Hero (page top):**
```tsx
<section className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-10">
  <MeshGradient />
  <div className="relative"> ...title, intro... </div>
</section>
```

**Card grid with reveal + tilt + lift:**
```tsx
<Reveal as="div" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
  {items.map((it, i) => (
    <TiltCard key={it.id}>
      <GlassCard lift className="h-full p-5"> ...card... </GlassCard>
    </TiltCard>
  ))}
</Reveal>
```

**Plain panel/section:** replace `bg-card shadow-tile` / `rounded-xl border border-border bg-card` with `glass rounded-2xl` (+ `elev-2` if it needs more depth). Keep paddings.

## Hard rules
- Light theme only. No dark backgrounds, no neon.
- Keep `brand-orange` as the single accent; introduce NO new hues.
- Don't touch: `globals.css`, `src/components/ui3d/*`, `AppShell.tsx`, the
  dashboard page (owned by the design lead). Edit only your assigned files.
- `npx tsc --noEmit` must pass. Preserve all props, data and behavior.
- Mobile-safe (works at 375px), keyboard focus visible, reduced-motion honored.
