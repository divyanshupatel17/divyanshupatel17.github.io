# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/), [SemVer](https://semver.org/).

## [Unreleased]

### Added
- Site rebuilt on a neo-brutalist editorial design, ported from a Lovable-generated
  reference (`../ref3`) and `design/mockups/complete-all-sections.png`: ink/paper/red
  palette, Anton/Barlow/JetBrains Mono/Caveat type system, five sections (hero, about,
  projects, milestones, contact) plus nav and footer.
- Tailwind CSS v4 (`@tailwindcss/vite`), `motion` (Framer Motion) for scroll reveals,
  magnetic buttons, spotlight and tilt cards, and `lucide-react` for icons.
- An interactive 3D moon in the contact section (`src/components/interactive-moon.tsx`,
  raw Three.js): only the sphere's cresting top edge is shown, full width, drag to spin
  in both axes, with slow auto-rotation on idle.

### Removed
- The previous in-progress redesign attempt (now on the `legacy-design` branch).

## [0.2.0] (superseded by Unreleased above, kept for history)

### Added
- Repo scaffolding from TEMPLATE (AGENTS.md, docs, license).
- New design rebuilt from the `../ref2` reference: warm dotted paper, a hand
  placed hero canvas, a floating pill nav, and a day/night theme driven by one
  class over the token set.
- Real content throughout, from `src/data/profile.ts`: ISRO graph neural network
  research, VIT Verse, the digital twin and leukemia projects, education and
  skills. Portrait and resume added to `public/`.
- Animation written from scratch, no library: a procedural WebGL dappled light
  canopy with a night time moon, canvas falling leaves, a canvas meadow with a
  rover, a trailing custom cursor, burstable hero tiles, and scroll reveals.

### Removed
- The previous design pass (now on the `yellow` branch): the five section
  Clarvos derived layout and everything under `src/`.

## [0.1.0] - 2026-09-07

### Added
- Initial placeholder site and custom domain (`CNAME`).
