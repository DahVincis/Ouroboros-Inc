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

## Deployment — AWS (live)

Architecture (all in AWS account **160928621948** / "Ouroboros Studios", region `us-east-1`):

```
Route 53 hosted zone (studiosouroboros.com)
  └─ A/AAAA alias → CloudFront distribution
                      ├─ ACM cert (us-east-1, DNS-validated)
                      └─ Origin Access Control → private S3 bucket (holds dist/)
```

**Live resource IDs:**

| Resource | Value |
|---|---|
| S3 bucket | `ouroboros-studios-site-160928621948` (private, Block Public Access ON) |
| CloudFront distribution | `E35O2GS84W5OKJ` → `d292op38ldzx86.cloudfront.net` |
| Origin Access Control | `E1JZQ8BKPDZE4I` |
| ACM certificate (us-east-1) | `arn:aws:acm:us-east-1:160928621948:certificate/1ad62d20-010b-49cf-9768-6401593d7200` (apex + www) |
| Route 53 hosted zone | `Z10088092LDNH6H48SZ6K` (studiosouroboros.com) |

Domain `studiosouroboros.com` is **registered at GoDaddy** with nameservers delegated to the
Route 53 hosted zone above. ACM cert **must** stay in `us-east-1` for CloudFront.

**Deploy:** `npm run deploy` — builds, `aws s3 sync dist/ s3://…  --delete`, then a CloudFront
`/*` invalidation. Requires the AWS CLI configured (profile `ouroboros-deploy`).

**⚠️ Deploy gotcha:** Do NOT add a blanket SPA rewrite (403/404 → `/index.html` for everything)
on CloudFront. This site has no client-side router, and a catch-all rewrite would shadow the
static `public/demos/<id>/index.html` bundles. Use targeted error handling only, and verify
`/demos/*` subpaths still load after any CloudFront error-page config.

## Security notes

- **No secrets in the repo.** `.env` / `.env.*.local` are gitignored; there are no committed
  credential, key, or `.pem` files. The bundled `public/demos/*` are static production builds and
  contain **no live API keys** (the Tusky/Plaid/Clerk demo is a mock UI).
- **AWS credentials live outside the repo** in `~/.aws/credentials` (profile `ouroboros-deploy`).
  Never paste access keys into source, commits, or chat. The IDs recorded in this file
  (bucket name, distribution ID, hosted zone ID, cert ARN, account ID) are **not** secrets.
- If a project demo ever needs a client-side key, scope/restrict it (HTTP referrer or domain
  allowlist) before bundling, since everything under `public/` is publicly served.

## Team / contact

- **Pedro Henrique Fernandes** — Full-Stack Dev — GitHub `DahVincis`, ph.leao2099@gmail.com
- **Kelvyn Luciano** — Full-Stack Dev — GitHub `Kelvinluciano312`, kelvinluciano2@gmail.com
- Studio contact: ouroboros2043@gmail.com
- Repo: https://github.com/DahVincis/Ouroboros-Inc (default branch `main`)
