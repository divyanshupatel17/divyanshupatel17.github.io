# AGENTS.md

Instructions for AI coding assistants working in this repository. Single source of truth;
`CLAUDE.md` only points here.

This project uses the template from [github.com/divyanshupatel17/TEMPLATE](https://github.com/divyanshupatel17/TEMPLATE) —
check there for the current version of universal rules and doc formats before assuming this repo
has drifted from them.

---

## What this is

Personal portfolio / landing site for Divyanshu Patel, built as a static React site and served
via GitHub Pages at `divyanshupatel.com`. No backend.

## Repository layout

```
src/                              # React components, pages, styles
public/                           # static assets copied as-is
index.html                        # Vite entry HTML
CNAME                              # GitHub Pages custom domain
design/mockups/                   # wireframes, layout comps, Figma exports
design/assets/                    # source logos, icons, photos, illustrations
docs/                             # permanent documentation, see index below
.local/                           # untracked, never committed
```

Build: React + Vite, output as a static bundle (`dist/`) deployed to GitHub Pages. `CNAME` must
be copied into `dist/` on every build (via `public/CNAME` or a deploy step) or the custom domain
breaks.

## Docs index

| Topic | File |
|---|---|
| System design, page structure | `docs/ARCHITECTURE.md` |
| Commit tags, branches, PRs, GitHub Releases | `docs/GIT.md` |
| Reusable bug patterns | `docs/ISSUES_AND_LESSONS.md` |
| Notable changes per version | `docs/CHANGELOG.md` |

## Docs upkeep — do this before finishing any task, not just when asked

- **Stale docs**: if a change invalidates what a doc says, update that doc in the same change.
- **Reusable bug fix**: append one row to `docs/ISSUES_AND_LESSONS.md` in the same change. Skip
  one-off typos; only patterns likely to recur.
- **End of session**: before reporting a task complete, re-check whether anything above applies
  to what you just did. Don't wait to be asked.

## Build and test commands

| Command | Purpose |
|---|---|
| `npm install` | install dependencies |
| `npm run dev` | local dev server |
| `npm run build` | production build to `dist/` |
| `npx tsc --noEmit` (if TypeScript) | type check |
| `npm run lint` | lint |

## Universal rules

- Understand existing code before changing it. Never guess when the answer is in the codebase.
- Smallest correct change. No unrelated refactors, cleanup, or features.
- Fix root causes, not symptoms.
- Ask only when ambiguity could materially change behavior, design, or content.
- Comments: default to none. Add one only for a non-obvious WHY, 2-3 lines max.
- No em/en dash or hyphen in user-facing UI text — reword instead. Code comments are exempt.
- Never commit, push, merge, reset, or delete a branch without asking first — every time, even
  mid-task, even if a prior commit this session was approved.
- `git mv` for moves, so history follows.
- Never discard uncommitted changes. Don't modify unrelated files.
- Never mention Claude, Anthropic, or any AI tool in a commit, PR, or shipped UI string.
- Verification: review `git diff` and open the page in a browser before claiming a visual change
  works.

## Project-specific rules

- `CNAME` must always contain exactly `divyanshupatel.com` — GitHub Pages disables the custom
  domain if this file is removed or malformed, and it must survive every production build (place
  it in `public/` so the bundler copies it into `dist/`).
- This site is static output only — no server, no API routes, no client-side data fetching to a
  backend that doesn't exist yet.

## Naming conventions

- Directories: lowercase `snake_case`.
- React components: `PascalCase` filenames; hooks/utilities: `camelCase`.
- Design assets: descriptive, no size suffixes (`icon.png`, not `icon-512.png`).

## Things you must never change automatically

1. **`CNAME`.** Changing, removing, or losing it during a build breaks the custom domain in
   GitHub Pages settings.
2. **The build output path/deploy workflow**, once set up — a wrong `base` path in Vite config
   silently breaks all asset links on GitHub Pages.

## Repository workflow

See `docs/GIT.md` for the full commit/branch/PR/release spec. Summary: never commit without
asking first.
