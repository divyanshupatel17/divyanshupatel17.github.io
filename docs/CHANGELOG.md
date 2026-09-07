# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/), [SemVer](https://semver.org/).

## [Unreleased]

### Added
- Repo scaffolding from TEMPLATE (AGENTS.md, docs, license).
- New design system rebuilt from the `../ref1` reference: token stylesheet, fluid
  root sizing, the fixed page frame with concave nav fillets, and the five
  sections (Home, About, Work, Achievements, Contact) with placeholder copy in
  `src/data/content.ts`.
- Load and scroll animations without a library: word by word hero entrance,
  IntersectionObserver reveals, and sticky stacking for the Work panels.

### Removed
- The previous design pass in full: the 3D moon and its Three.js dependencies,
  the runtime `profile.json` fetch, the section placeholders, and Tailwind.

## [0.1.0] - 2026-09-07

### Added
- Initial placeholder site and custom domain (`CNAME`).
