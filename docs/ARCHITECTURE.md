# Architecture

Static portfolio site — React + Vite build, deployed as static output to GitHub Pages.

## Structure

- `src/components/site-nav.tsx` — fixed nav with active-section highlight and a mobile menu,
  rendered inside `glass-surface.tsx` (glass-refraction pill, ported from React Bits).
- `src/components/section-*.tsx` — one file per page section: `hero`, `about`, `projects`,
  `milestones`, `contact`. `contact` also renders `site-footer.tsx` as its last child (the
  footer is part of the contact section's flow, not a separate page-level section).
- `src/components/portrait-spotlight.tsx` — the hero portrait: a Canvas2D duotone halftone
  dot portrait with a real-color spotlight reveal that follows the pointer.
- `src/components/interactive-globe.tsx` — the drag-to-rotate dot-matrix globe in the contact
  section (`cobe`), cropped to its top dome and positioned behind the "Get in Touch" heading.
- `src/components/border-glow.tsx` — cursor-tracked mesh-gradient card border glow (React
  Bits `BorderGlow`), used on the About info cards and Milestones cards.
- `src/components/target-cursor.tsx` — the spinning/locking custom cursor (React Bits
  `TargetCursor`, needs `gsap`), scoped to the footer's social links only via a
  `pointermove`-driven bounds check in `site-footer.tsx` (not global).
- `src/components/site-footer.tsx` — the footer band (social strip + copyright bar).
- `src/components/icons.tsx` — `useSocials()`, a hook building the social-links list from
  `useProfile()` (see Data flow).
- `src/components/motion-primitives.tsx` — `Reveal`, `RevealWords`, `CountUp`, `Magnet`,
  `SpotlightCard`, `TiltedCard`. Small `motion/react` (Framer Motion) wrappers reused across
  sections instead of repeating animation config inline. Note: `SpotlightCard` wraps its
  children in a `position:relative` div with no intrinsic size — if every child inside it is
  itself absolutely positioned, that wrapper collapses to zero height (see
  `docs/ISSUES_AND_LESSONS.md`). Don't use it as an absolute-positioning root; give it at
  least one normal-flow child, or skip it and build the glow inline.
- `src/data/profile.json`, `src/data/project.json` — local copies of
  `divyanshupatel17/divyanshu-profile`'s `profile.json` / `project.json`, kept in sync by hand
  when that repo changes. `src/data/projects.ts` shapes the raw project JSON into ordered
  categories for the projects section.
- `src/hooks/use-profile.ts` — `useProfile()`, fetches the profile JSON from
  `divyanshupatel17/divyanshu-profile` on `raw.githubusercontent.com` at runtime and falls
  back to the bundled `src/data/profile.json` copy if that request fails.
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge).
- `src/assets/` — decorative collage photos (bundled, hashed by Vite).
- `src/styles.css` — Tailwind v4 entry point and the design tokens (`@theme inline`).
- `public/` — copied verbatim into `dist/`: `CNAME`, `portrait.jpg`, `resume.pdf`,
  `favicon-64.png`, `videos/project-preview.mp4` (placeholder background video for project
  cards, swap in real per-project clips later).

Styling is Tailwind CSS v4 (`@tailwindcss/vite`, no `tailwind.config.*`, tokens declared in
`styles.css`). Animation is `motion` (Framer Motion). Icons are `lucide-react`. The globe is
`cobe`. The footer cursor effect is `gsap`.

## Page structure

One page, five sections: hero (`#home`), about (`#about`), projects (`#projects`),
milestones (`#achievements`), contact (`#contact`) — the footer renders inside the contact
section, immediately after its content, not as a separate `section-screen` block.

## Design system

Neo-brutalist editorial look: `ink` (near-black) / `paper` (off-white) / `red` (signature
accent), declared as OKLCH tokens in `styles.css`. Fonts: **Anton** (display), **Barlow**
(body/sans), **JetBrains Mono** (labels/mono), **Caveat** (handwritten accents) — all loaded
from Google Fonts in `index.html`.

Design reference: `../ref3` (a Lovable-generated export) and
`design/mockups/complete-all-sections.png`. Content and copy were ported from the site's own
real profile data (name, projects, socials, resume) rather than the reference's placeholder
text, except where the mockup specified concrete section content (e.g. the four featured
project names), which was kept to match the approved design.

## The interactive globe

`interactive-globe.tsx` draws a dot-matrix Earth with `cobe` on a transparent canvas, cropped
by an `overflow-hidden` parent to just its top dome. Dragging rotates it left/right (`phi`
only — vertical drag was deliberately removed); it eases back into a slow idle auto-rotation
after a short idle period.

## Animation

- **Reveal / RevealWords** — scroll-triggered fade-and-lift entrances (`motion/react`
  `whileInView`), used across every section.
- **CountUp** — animates stat numbers once they scroll into view.
- **Magnet** — buttons drift subtly toward the cursor.
- **BorderGlow** — cursor-tracked mesh-gradient border glow on the About/Milestones cards.
- **TiltedCard** — light 3D tilt on the About section's polaroids.
- **TargetCursor** — spinning dot + locking corner brackets over the footer's social links.
- **Interactive globe** — see above.

## Data flow

No server-side backend, but the site does one client-side fetch: `useProfile()`
(`src/hooks/use-profile.ts`) pulls `profile.json` from the `divyanshupatel17/divyanshu-profile`
repo on `raw.githubusercontent.com` at runtime so social links only need updating in one
place, falling back to the bundled `src/data/profile.json` copy if that request fails (offline,
rate-limited, repo unreachable). Project data is not fetched — `src/data/project.json` is a
local copy of the same source repo's file, updated by hand when it changes, shaped by
`src/data/projects.ts` into the categories the projects section renders.

## Hosting

GitHub Pages serves the built `dist/` output. `CNAME` (in `public/`) points the custom
domain `divyanshupatel.com` at the Pages deployment.

## Branches

- `main` — the current design (Lovable-reference rebuild).
- `legacy-design` — the previous in-progress redesign pass, kept intact for reference.
- `yellow` — an earlier design pass (Clarvos derived, five sections, yellow and black), kept
  intact for reference.
