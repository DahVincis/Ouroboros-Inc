# CLAUDE.md — Ouroboros Studios Portfolio

Context for AI assistants working on this repo. Keep it current as the project evolves.

## What this is

Single-page **portfolio website** for **Ouroboros Studios**, a freelance software studio by
Pedro Henrique Fernandes and Kelvyn Luciano. It showcases 6 client/personal projects as
interactive cards; each opens an embedded iframe, a live-site preview, or a "coming soon"
placeholder. Tagline: *"Infinitely Reliable."*

It is a **true single page** — there is **no client-side router** (no `react-router` in
`package.json`). Every URL path corresponds to a real file on disk. This matters for hosting
(see Deploy gotcha below).

## Tech stack

- React 18 + TypeScript
- Vite 5 (build tool / dev server)
- Tailwind CSS 3 (custom brand palette in `tailwind.config.ts`)
- Framer Motion (animations)
- Headless UI (modal)
- Lucide React (icons)

## Project structure

```
src/
├── App.tsx                 # Composes the page sections
├── main.tsx                # Entry
├── index.css               # Tailwind base + custom utilities
├── components/             # Navbar, Hero, ProjectGrid, ProjectCard, ProjectModal,
│                           #   About, Services, TeamBios, Footer
├── context/ThemeContext.tsx# Dark/light mode (dark by default, persisted)
└── data/
    ├── projects.ts         # The 6 showcased projects (source of truth for cards)
    └── team.ts             # Pedro & Kelvyn bios/links/skills
public/
├── logo.png
├── demos/<id>/             # Self-hosted static builds of each project (served as-is)
├── screenshots/<id>.(png|jpg)
└── team-photos/(pedro.jpg|kelvyn.png)
```

## The projects data model (`src/data/projects.ts`)

Each project chooses one **demo mode** via three fields:

- **Embeddable iframe:** `iframeUrl` set (usually `/demos/<id>/index.html`), `liveUrl` null,
  `screenshot` null.
- **Live-site preview:** `iframeUrl` null, `liveUrl` set, `screenshot` set (for sites that block
  framing — shows thumbnail + "Open Live Site").
- **Coming soon:** all three null (gradient placeholder + GitHub link).
- **YouTube demo:** `youtubeId` set (used by AudioPilot, a desktop app).

Current projects: Luciano's Services (PWA), Tusky App, Special Finishes, Stolochi – Makeup & Hair,
LagoinhaCT, AudioPilot.

## Commands

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc -b && vite build  → dist/
npm run preview   # serve the production build locally
```

## Deployment — AWS (in progress)

Target architecture (all in one AWS account):

```
Route 53 (domain + hosted zone)
  └─ A/AAAA alias → CloudFront distribution
                      ├─ ACM cert (us-east-1, DNS-validated)
                      └─ Origin Access Control → private S3 bucket (holds dist/)
```

- S3 bucket is **private** with Block Public Access ON; access is via CloudFront OAC, **not**
  S3 website-hosting mode.
- ACM certificate **must** be in `us-east-1` for CloudFront.
- Domain is being **registered via Route 53** (none owned yet as of this writing).
- Upload with `aws s3 sync dist/ s3://<bucket> --delete`, then invalidate CloudFront.

**⚠️ Deploy gotcha:** Do NOT add a blanket SPA rewrite (403/404 → `/index.html` for everything)
on CloudFront. This site has no client-side router, and a catch-all rewrite would shadow the
static `public/demos/<id>/index.html` bundles. Use targeted error handling only, and verify
`/demos/*` subpaths still load after any CloudFront error-page config.

> A `npm run deploy` script (build → s3 sync → CloudFront invalidation) will be added once the
> bucket/distribution exist; document its exact bucket + distribution ID here when created.

## Team / contact

- **Pedro Henrique Fernandes** — Full-Stack Dev — GitHub `DahVincis`, ph.leao2099@gmail.com
- **Kelvyn Luciano** — Full-Stack Dev — GitHub `Kelvinluciano312`, kelvinluciano2@gmail.com
- Studio contact: ouroboros2043@gmail.com
- Repo: https://github.com/DahVincis/Ouroboros-Inc (default branch `main`)
