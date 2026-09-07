_Divyanshu Patel — Portfolio_
# divyanshupatel17.github.io

Personal portfolio / landing site for Divyanshu Patel, published via GitHub Pages at
[divyanshupatel.com](https://divyanshupatel.com).

_This project uses the template from [github.com/divyanshupatel17/TEMPLATE](https://github.com/divyanshupatel17/TEMPLATE)._

## Details

| Key | Value |
|---|---|
| Website | divyanshupatel.com |
| Platform | Static site (React + Vite, GitHub Pages) |
| Version | 0.1.0 |

## Tech stack

| Layer | Tech |
|---|---|
| Site | React, Vite (static build) |
| Hosting | GitHub Pages, custom domain via `CNAME` |

## Status

React + Vite scaffold in place. Contact and Footer are merged into one fully built section with
an interactive 3D Moon (Three.js). Home, About, Work, and Achievements remain placeholders,
designed and built one at a time.

## Repository structure

| Path | Contents |
|---|---|
| `src/` | React components, pages, styles |
| `public/` | Static assets copied as-is, including `CNAME` |
| `index.html` | Vite entry HTML |
| `design/mockups/` | Wireframes, layout comps, Figma exports |
| `design/assets/` | Source logos, icons, photos, illustrations |
| `docs/` | Permanent documentation — see Documentation below |
| `.local/` | Untracked scratch — gitignored, never committed |

## Getting started

1. `npm install`
2. `npm run dev` — local dev server
3. `npm run build` — production build to `dist/`
4. Push to `main` — CI builds and deploys `dist/` to GitHub Pages automatically.

## Most important things to know

- Keep `CNAME` in `public/` so it always ends up in `dist/` — losing it breaks the custom domain.
- Set Vite's `base` correctly for a user/org GitHub Pages site (root `/`, not a repo subpath).

## Documentation

| Where | Topic | What |
|---|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Architecture | Page structure, hosting setup |
| [docs/GIT.md](docs/GIT.md) | Git & Releases | Commit tags, branches, PRs, GitHub Release format |
| [docs/ISSUES_AND_LESSONS.md](docs/ISSUES_AND_LESSONS.md) | Lessons | Reusable bug patterns |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | Changelog | Notable changes per version |
| [AGENTS.md](AGENTS.md) | Agents | Rules for AI agents working in this repo |

## License

See [LICENSE](LICENSE).

## Contact

1. Email: [itzdivyanshupatel@gmail.com](mailto:itzdivyanshupatel@gmail.com)
2. GitHub: [github.com/divyanshupatel17](https://github.com/divyanshupatel17)
