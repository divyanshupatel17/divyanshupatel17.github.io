# Architecture

Static portfolio site — React + Vite build, deployed as static output to GitHub Pages.

## Structure

- `src/components/site-nav.tsx` — fixed nav with active-section highlight and a mobile menu.
- `src/components/section-*.tsx` — one file per page section: `hero`, `about`, `projects`,
  `milestones`, `contact`.
- `src/components/interactive-moon.tsx` — the drag-to-rotate 3D moon in the contact section
  (raw Three.js, no React renderer wrapper).
- `src/components/site-footer.tsx` — the footer band.
- `src/components/icons.tsx` — social links (GitHub, LinkedIn, Instagram, email).
- `src/components/motion-primitives.tsx` — `Reveal`, `RevealWords`, `CountUp`, `Magnet`,
  `SpotlightCard`, `TiltedCard`. Small `motion/react` (Framer Motion) wrappers reused across
  sections instead of repeating animation config inline.
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge).
- `src/assets/` — decorative collage photos and the moon texture (bundled, hashed by Vite).
- `src/styles.css` — Tailwind v4 entry point and the design tokens (`@theme inline`).
- `public/` — copied verbatim into `dist/`: `CNAME`, `portrait.jpg`, `resume.pdf`, `favicon.svg`.

Styling is Tailwind CSS v4 (`@tailwindcss/vite`, no `tailwind.config.*`, tokens declared in
`styles.css`). Animation is `motion` (Framer Motion). Icons are `lucide-react`. The moon is
raw `three`.

## Page structure

One page, five sections: hero (`#home`), about (`#about`), projects (`#projects`),
milestones (`#achievements`), contact (`#contact`), followed by the footer.

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

## The interactive moon

`interactive-moon.tsx` renders a Three.js sphere with an orthographic camera, positioned so
only its cresting top edge is visible, spanning the full width of its container — the rest of
the sphere sits below the frame. Key detail: an equirectangular texture is heavily distorted
at its poles, so the sphere carries a fixed 90 degree base tilt to keep the camera looking at
the detailed equator band instead of a blurry pole. Users can drag (pointer events, both axes)
to spin it; it eases back into a slow auto-rotation after a short idle period. Vertical drag is
clamped to keep the textured band on screen; horizontal spin is unrestricted (full 360).

## Animation

- **Reveal / RevealWords** — scroll-triggered fade-and-lift entrances (`motion/react`
  `whileInView`), used across every section.
- **CountUp** — animates stat numbers once they scroll into view.
- **Magnet** — buttons drift subtly toward the cursor.
- **SpotlightCard / TiltedCard** — cursor-following glow and light 3D tilt on project cards
  and polaroids.
- **Interactive moon** — see above.

## Data flow

No backend. Content lives inline in each section component (ported from
`src/data/profile.ts` in the previous design plus the approved mockup copy).

## Hosting

GitHub Pages serves the built `dist/` output. `CNAME` (in `public/`) points the custom
domain `divyanshupatel.com` at the Pages deployment.

## Branches

- `main` — the current design (Lovable-reference rebuild).
- `legacy-design` — the previous in-progress redesign pass, kept intact for reference.
- `yellow` — an earlier design pass (Clarvos derived, five sections, yellow and black), kept
  intact for reference.
