# Ouroboros Studios

> **Infinitely Reliable** - Portfolio website for Ouroboros Studios., a freelance software development studio by Pedro Henrique Fernandes and Kelvyn Luciano.

## Overview

Single-page portfolio site showcasing 6 projects built across web, desktop, and PWA. Projects are displayed as interactive cards that open embedded iframes (or a YouTube demo) directly within the portfolio, so visitors can interact with the work without leaving the site.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (custom brand palette)
- **Animations:** Framer Motion
- **Modals:** Headless UI
- **Icons:** Lucide React
- **Hosting:** Cloudflare Workers (static assets) — domain `studiosouroboros.com`

## Projects Showcased

| Project | Type | Stack |
| --- | --- | --- |
| Luciano's Services | PWA | React, Google Maps, AWS |
| Tusky App | Web App | React, TypeScript, Plaid, Clerk |
| Special Finishes | Web App | React, Supabase, Cloudflare Workers |
| Stolochi - Makeup & Hair | Web App | Next.js, TypeScript, Tailwind, Cloudflare Workers, Resend |
| LagoinhaCT | Full-Stack | Node.js, Express, MySQL, Passport.js |
| AudioPilot | Desktop | Python, PyQt6, OSC Protocol |

## Features

- Dark mode by default, toggleable with persistent preference
- Project cards with hover-reveal animations (description, tech stack, CTA)
- Project modal with three states:
  - **Embeddable iframe** — direct in-page interaction for self-hosted demos
  - **Live site preview** — screenshot thumbnail + "Open Live Site" button for sites that block embedding
  - **Coming soon** — gradient placeholder + GitHub link for undeployed projects
- YouTube embed for desktop app demos (AudioPilot)
- Responsive layout (mobile, tablet, desktop)
- Team bios with GitHub, LinkedIn, and email links
- Smooth Framer Motion entrance animations throughout

## Getting Started

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Project Structure

```text
src/
├── components/
│   ├── Navbar.tsx         # Fixed nav with dark mode toggle
│   ├── Hero.tsx           # Full-viewport landing section
│   ├── ProjectGrid.tsx    # 3-column project grid
│   ├── ProjectCard.tsx    # Card with hover reveal
│   ├── ProjectModal.tsx   # iframe / YouTube modal
│   ├── About.tsx          # Company overview + stats
│   ├── Services.tsx       # Services offered
│   ├── TeamBios.tsx       # Pedro & Kelvyn profiles
│   └── Footer.tsx         # Contact + social links
├── context/
│   └── ThemeContext.tsx   # Dark/light mode state
├── data/
│   ├── projects.ts        # Project metadata and iframe URLs
│   └── team.ts            # Team member info
└── index.css              # Tailwind base + custom utilities
```

## Adding Project Demos

Each project in [src/data/projects.ts](src/data/projects.ts) supports three demo modes:

**Embeddable iframe** (site allows framing):

```ts
{ iframeUrl: 'https://your-deployed-url.com', liveUrl: null, screenshot: null }
```

**Live site preview** (site blocks iframes — e.g. Cloudflare Pages default):

```ts
{ iframeUrl: null, liveUrl: 'https://your-deployed-url.com', screenshot: '/screenshots/project-id.jpg' }
```

Drop the screenshot at `public/screenshots/project-id.jpg`. If omitted, falls back to the gradient.

**Coming soon** (not yet deployed):

```ts
{ iframeUrl: null, liveUrl: null, screenshot: null }
```

Demo bundles under `public/demos/<id>/` are static production builds copied in from each
project's own repo — they do not update themselves. See [CLAUDE.md](CLAUDE.md) for how to
refresh one, including stripping the source site's analytics tag from the copy.

Where a project is deployed somewhere that permits framing, `iframeUrl` can point at the live
URL instead and the bundle dropped entirely — the card then never goes stale, at the cost of
depending on that deployment being up. Stolochi works this way.

## Image Assets

```text
public/
├── logo.png                  # Ouroboros logo (transparent background)
└── team-photos/
    ├── kelvyn.png
    └── pedro.jpg
```

## Build & Deploy

```bash
npm run build         # outputs to dist/
npm run preview       # preview production build locally
npm run check:assets  # fail if any asset breaches Cloudflare's 25 MiB / 20k file limits
npm run deploy        # build → check assets → wrangler deploy
```

The site deploys to **Cloudflare Workers** as an assets-only Worker (no Worker script, no
bindings) — see [wrangler.jsonc](wrangler.jsonc). Run `wrangler login` once; auth is
per-developer OAuth rather than a shared credential, and deploys are versioned so
`wrangler rollback` undoes a bad one.

Two things to know before changing routing or refreshing a demo bundle, both documented in
[CLAUDE.md](CLAUDE.md): `not_found_handling` must stay at its default `"none"` (setting
`"single-page-application"` would shadow the `public/demos/*` bundles), and Cloudflare rejects
any single static asset over **25 MiB** — which `npm run check:assets` catches at deploy time
instead of upload time.

## Team

| Name | Links |
| --- | --- |
| **Pedro Henrique Fernandes** | [GitHub](https://github.com/DahVincis) · [LinkedIn](https://www.linkedin.com/in/dahvincis/) |
| **Kelvyn Luciano** | [GitHub](https://github.com/Kelvinluciano312) · [LinkedIn](https://www.linkedin.com/in/kelvyn-luciano/) |

**Contact:** [ouroboros2043@gmail.com](mailto:ouroboros2043@gmail.com)
