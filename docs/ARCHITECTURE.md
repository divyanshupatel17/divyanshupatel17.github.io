# Architecture

Static portfolio site — React + Vite build, deployed as static output to GitHub Pages.

## Structure

- `src/` — React components, pages, styles. Feature-first once the site grows past a single page.
- `public/` — static assets copied verbatim into `dist/`, including `CNAME`.
- `index.html` — Vite entry point.

## Data flow

No backend of our own. Almost all content is static/compiled into the bundle at build time. The
one exception: the Contact section fetches `profile.json` from
`github.com/divyanshupatel17/divyanshu-profile` at runtime to source social links and email, with
hardcoded fallback values (`src/data/socialLinks.ts`) used if that fetch fails.

## 3D Moon (Contact section)

`src/components/moon/` renders the footer's interactive Moon using Three.js via
`@react-three/fiber` and `@react-three/drei`.

- Model: `public/models/moon_small.glb`, Draco-compressed and texture-compressed from the
  original `design/assets/moon_small.glb` with `@gltf-transform/cli optimize` (13.8 MB to
  roughly 350 KB).
- The Three.js/R3F bundle is code-split (`React.lazy`) and only fetched once the section
  approaches the viewport (`src/hooks/useInView.ts`).
- Rendering pauses (`frameloop: 'never'`) when the section is off-screen or the tab is hidden,
  and a CSS gradient fallback (`MoonFallback.tsx`) covers loading, `prefers-reduced-motion`, and
  missing WebGL.
- Framing (`MoonModel.tsx`): the sphere is scaled to `SPHERE_WIDTH_RATIO` of the canvas width and
  sunk so only `SPHERE_CAP_DEPTH` of its radius clears the bottom edge, which keeps the same
  rising arc at every aspect ratio.
- Rotation is unbounded on both axes, and releasing a drag leaves the idle spin travelling along
  the direction of that drag rather than a fixed axis.

## Hosting

GitHub Pages serves the built `dist/` output from this repo. `CNAME` (in `public/`) points the
custom domain `divyanshupatel.com` at the Pages deployment.
