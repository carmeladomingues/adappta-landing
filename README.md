# Adappta Landing — Vite + React

Production-ready React app (Vite) of the Adappta landing page, ready to deploy on Vercel.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Outputs a static site to `dist/`.

## Deploy to Vercel

1. Push this folder to a Git repo (or run `vercel` from inside it with the Vercel CLI).
2. Import the repo in Vercel — it auto-detects Vite (`vercel.json` is included with the framework/build settings, so no manual config is required).
3. Deploy.

## Structure

- `src/App.jsx` — the full page (nav, hero, problem/solution/research/recognition/how-it-works/future-vision/final CTA/footer), scroll-reveal via `IntersectionObserver`.
- `src/index.css` — resets, keyframes, and hover states.
- `public/assets/` — real app screenshots used in the hero phone mockup and solution cards.
- `public/logo.svg` — the Adappta wordmark.

## Notes / next steps

- The "Nominated — UX Design Awards 2026" logos and the "City network visualization" graphic are still placeholders (striped boxes) — drop in real assets when available.
- Footer email/LinkedIn are placeholders (`hello@adappta.com`, `linkedin.com/company/adappta`) — update with real ones.
