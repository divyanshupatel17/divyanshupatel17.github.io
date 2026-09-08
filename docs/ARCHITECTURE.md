# Architecture

Static portfolio site — React + Vite build, deployed as static output to GitHub Pages.

## Structure

- `src/components/layout/` — `SiteNav`, the floating pill nav with theme toggle.
- `src/components/hero/` — the hero canvas: `Hero`, `PixelTiles`, `Stamp`, and
  `dappledLight.ts` (the WebGL shader).
- `src/components/sections/` — `Work`, `Beyond`, `About`, `SiteFooter`, `GrassScene`.
- `src/components/effects/` — `CustomCursor` and `LeafFall`.
- `src/components/ui/` — inline SVG icons and the monogram.
- `src/hooks/` — `useTheme` (day/night, persisted) and `useReveal` (scroll entrances).
- `src/data/profile.ts` — every user facing string, so a copy pass touches one file.
- `src/styles/` — `tokens.css`, `base.css`, `hero.css`, `sections.css`, joined by `index.css`.
- `public/` — copied verbatim into `dist/`: `CNAME`, `portrait.jpg`, `resume.pdf`, `favicon.svg`.

No CSS framework and no animation library. Everything below is hand written.

## Page structure

One page, four blocks: the hero, `#work` (project wall), `#beyond` (sticky note and
figures), `#about`, and the footer at `#contact`.

## Design system

Reference design: the layout, palette, type scale and motion language were rebuilt from
`../ref2` and the live `adityaaa.com`. The markup, CSS and shaders here are original;
nothing is copied from that site.

Colour is entirely token driven (`tokens.css`), and the night theme is a single
`body.night-mode` class that redefines the same variables, so there is no parallel
stylesheet. `index.html` sets the theme before first paint to avoid a flash.

Substitutions from the reference, which uses licensed faces and its own artwork:

- **Fraunces** stands in for the reference's display serif, **Caveat** for its handwriting
  face. **Bricolage Grotesque** is the same sans, and is freely available.
- Every illustration is generated rather than shipped: the stamp perforation is a CSS mask,
  the monogram and icons are inline SVG, and the dappled light, falling leaves and meadow
  are drawn at runtime.

## The hero canvas

The hero is authored against a fixed 1440x776 design space with hand placed coordinates,
then scaled with a transform (`--hero-scale`, 0.9 to match the reference's own zoom) rather
than reflowed, so the grid, tiles, stickers and stamp keep their exact relation to the type.
Below 900px it abandons the canvas for ordinary stacked flow.

## Animation

- **Dappled light** (`dappledLight.ts`) — raw WebGL on a single full screen triangle. The
  canopy is procedural: domain warped fBm carved into leaf clumps, blurred over a few taps,
  swayed and twisted about an anchor, with grain and edge feathering. Night mode adds a
  backlit moon (diffuse glow plus a ray cone) occluded by the leaves. Uniform branching is
  avoided in favour of `step`/`mix`, because some mobile drivers miscompile it.
- **Falling leaves** and the **meadow** are 2D canvas, both parked when off screen or when
  the tab is hidden.
- **Custom cursor** eases towards the pointer and reads its label from `data-cursor`. It
  only mounts for `(hover: hover) and (pointer: fine)`.
- **Entrances** — hero lines wipe up on load; everything else fades in through `useReveal`.
- **Pixel tiles** burst into shards when poked, then fade back in.

Everything collapses to static under `prefers-reduced-motion: reduce`.

## Data flow

No backend. All content compiles into the bundle from `src/data/profile.ts`.

## Hosting

GitHub Pages serves the built `dist/` output. `CNAME` (in `public/`) points the custom
domain `divyanshupatel.com` at the Pages deployment.

## Branches

- `main` — the current design.
- `yellow` — the previous design pass (Clarvos derived, five sections, yellow and black),
  kept intact for reference.
