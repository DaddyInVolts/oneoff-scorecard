# One-off Scorecard

Self-service custom-window scorecard requests for the Expedite experimentation
platform — product specification and clickable prototype.

**Live site:** [https://daddyinvolts.github.io/oneoff-scorecard/](https://daddyinvolts.github.io/oneoff-scorecard/)
· **Prototype:** [/prototype/](https://daddyinvolts.github.io/oneoff-scorecard/prototype/)

## Structure

| Path | What it is |
| --- | --- |
| `spec.html` | Hand-written product spec, deployed as the site root (`/oneoff-scorecard/`) |
| `src/`, `public/`, `index.html` | Vite + React + Fluent UI prototype source |
| `prototype/` (built) | Vite build output, deployed at `/oneoff-scorecard/prototype/` |
| `.github/workflows/deploy.yml` | Builds the prototype, assembles `_site/` (spec at root + built prototype at `/prototype/`), and publishes to GitHub Pages |

## Local development

```bash
npm install
npm run dev       # runs the prototype at http://localhost:5173/oneoff-scorecard/prototype/
npm run build     # outputs the prototype to dist/
npm run lint
```

The spec page (`spec.html`) is a static HTML file — open it directly in a
browser to preview.

## Deploy

Pushes to `master` trigger the GitHub Pages workflow:

1. `npm ci && npm run build` produces `dist/` (the prototype).
2. The workflow assembles `_site/` with `spec.html` → `_site/index.html` and
   `dist/` → `_site/prototype/`.
3. `_site/` is uploaded as the Pages artifact and deployed.

