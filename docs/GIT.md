# Git

## Commit tags

| Tag | Use |
|---|---|
| `feat:` | new feature or content |
| `fix:` | bug fix |
| `chore:` | tooling, deps, config |
| `docs:` | documentation only |
| `style:` | visual/CSS-only change |

## Branches

- `main` — always deployable; GitHub Pages builds from it.
- Feature branches: `feat/<short-name>`, `fix/<short-name>`.

## PRs

Solo repo — PRs optional. Squash-merge feature branches into `main` when used.

## GitHub Releases

Tag `vX.Y.Z` on notable milestones (e.g. site relaunch). Release body: summary of what changed,
linking the relevant `docs/CHANGELOG.md` entry.
