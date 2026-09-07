# Architecture

Static portfolio site — React + Vite build, deployed as static output to GitHub Pages.

## Structure

- `src/components/layout/` — `Nav`, the fixed frame and top bar.
- `src/components/sections/` — one file per page section: `Home`, `About`, `Work`,
  `Achievements`, `Contact`. `Contact` also renders the footer, because the CTA and footer are
  one continuous dark block in the design.
- `src/components/ui/` — `Button`, `SplitWords`, inline SVG icons.
- `src/hooks/useReveal.ts` — one IntersectionObserver per section, adds `is-visible` to
  descendant `.reveal` elements.
- `src/data/content.ts` — every user facing string, so a copy pass touches one file. All values
  are placeholders until real content is written.
- `src/styles/` — `tokens.css` (variables), `base.css` (reset and type primitives),
  `components.css` (everything else), pulled together by `index.css`.
- `public/` — static assets copied verbatim into `dist/`, including `CNAME`.
- `index.html` — Vite entry point, loads Inter and Outfit from Google Fonts.

No CSS framework. The design is a hand written token system; Tailwind was removed when the
current design landed.

## Page structure

Five sections in fixed order, matching the nav: Home (dark hero), About (heading plus four step
cards), Work (four pinned feature panels), Achievements (two sliding stat bars), Contact (dark
CTA plus footer).

## Design system

Reference design: the layout, spacing, colour and motion language were rebuilt from
`../ref1` (a saved copy of `clarvos.com`) with portfolio branding and placeholder copy. The
markup and CSS here are original; nothing is copied from that export.

Two mechanisms carry most of the layout:

- **Fluid root size.** `body { font-size: 0.9svw }` and every size token in `em`, so the whole
  page scales with the viewport instead of needing a breakpoint per element. Below 991px the root
  locks to `1rem` and the token overrides in `tokens.css` take over.
- **The page frame.** `.nav-frame` is a fixed, non interactive `1em` border in the page
  background colour. Full bleed dark sections therefore read as inset with rounded corners
  without each one carrying a margin. `.nav-corner` uses a radial gradient to draw the concave
  fillet where the top bar meets that frame.

Substitutions from the reference: headings use Outfit (Google Fonts) in place of the reference's
licensed PPFrama, and all product surface mockups are original placeholder components.

## Animation

No animation library. Three mechanisms:

- Hero heading words rise into place on load (`SplitWords` plus a CSS keyframe, staggered through
  a `--word-delay` custom property).
- `.reveal` elements fade and slide in on scroll, driven by `useReveal`. `from-left` and
  `from-right` variants drive the Achievements bars.
- The Work panels stack with `position: sticky`, so each pins under the nav while the next slides
  over it.

All of it collapses to static under `prefers-reduced-motion: reduce`.

## Data flow

No backend. All content is compiled into the bundle at build time from `src/data/content.ts`.

## Hosting

GitHub Pages serves the built `dist/` output from this repo. `CNAME` (in `public/`) points the
custom domain `divyanshupatel.com` at the Pages deployment.
