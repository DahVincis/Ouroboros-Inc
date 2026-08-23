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

## Deployment — Cloudflare Workers

The site is an assets-only Worker: no Worker script, no bindings, `dist/` uploaded as static
assets. Config is `wrangler.jsonc`, all four meaningful lines of it.

**Deploy:** `npm run deploy` — builds, runs the asset guardrail, then `wrangler deploy`.
Requires `wrangler login` once per developer (OAuth, per-person — no shared static
credential). Deploys are atomic and versioned, so a bad deploy rolls back with
`wrangler rollback` instead of a re-sync plus a cache invalidation.

**⚠️ Deploy gotcha:** Do NOT set `not_found_handling: "single-page-application"` in
`wrangler.jsonc`. This site has **no client-side router** — every URL is a real file on disk —
and that setting returns `index.html` with a 200 for every unmatched path, which would shadow
the static `public/demos/<id>/index.html` bundles. The default (`"none"`, a real 404) is
correct and is deliberately left unset. This is the same trap as a blanket 403/404 → `/index.html`
rewrite on a CDN; it survived the move off CloudFront, so it is still worth guarding.
Regression test: after any routing change, confirm a bogus path like `/nope` returns 404 and
**not** the portfolio homepage, and that all five `/demos/<id>/` subpaths still load.

`html_handling` is likewise left at its default (`"auto-trailing-slash"`), which already
resolves `/demos/<id>/` to that directory's `index.html`.

**Asset limits (the reason for the guardrail):** Cloudflare caps static assets at **25 MiB per
file** on every plan — free and paid alike; the plan split is on file *count* (20,000 free vs
100,000 paid), not size. `npm run check:assets` walks `dist/` and fails the deploy if anything
breaches either limit. It is chained explicitly after `build` rather than wired as a
`predeploy` hook, because npm would run a `predeploy` hook *before* the build and check a
stale `dist/`.

### Hosting facts

Cloudflare zone `f240bc13b46a6305e5df64cd72804f48` on account
`48fe1b5d081768ff30ff3cc05f1b3122`, nameservers `elliot`/`reza.ns.cloudflare.com`.
`studiosouroboros.com` and `www` are Workers Custom Domains on `ouroboros-portfolio`.
Registrar is Cloudflare (expires 2028-06-03); their registrar lock is on by default and must
be cleared before any future transfer. None of these IDs are secrets.

The site was on AWS S3+CloudFront until 2026-08-23; all of that is deleted and the account is
empty. See `git log` for the migration if you need the history.

**Debugging note:** `dig` from the dev machine is unreliable — something local (VPN?)
intercepts port 53 and answers non-authoritatively (`ra` set, no `aa`, decrementing TTL). It
reported stale IPs for hours after the DNS cutover and nearly caused a wrong diagnosis. Check
records over DNS-over-HTTPS instead, and test the site by pinning the edge IP:

```bash
curl -s -H 'accept: application/dns-json' 'https://dns.google/resolve?name=studiosouroboros.com&type=A'
curl --resolve studiosouroboros.com:443:104.21.9.188 -sI https://studiosouroboros.com/
```

## Refreshing a project demo

`public/demos/<id>/` holds a **static production build of another repo**, copied in by hand. It
does not update itself — when the source project ships, this snapshot goes stale (the Special
Finishes bundle sat on a pre-rebuild build for months, still carrying `react-slick` fonts).

To refresh one, e.g. Special Finishes (source: `../Project-Special`):

```bash
cd ../Project-Special/client && CI=true npm run build   # -> client/build
rm -rf ../../Ouroboros-Inc/public/demos/special-finishes
cp -r build ../../Ouroboros-Inc/public/demos/special-finishes
rm -rf build                                            # its CLAUDE.md asks for this
```

Then, before deploying:

- **Strip the source site's analytics tag from the copied `index.html`.** Special Finishes carries
  a GA4 tag; left in, every portfolio visitor who opens the card is counted as a client-site
  visitor and pollutes the client's weekly report. Same applies to any demo that adds analytics.
- The build must use **relative asset paths** so it works under `/demos/<id>/`. CRA does this with
  `"homepage": "."` in its `package.json`; Vite needs `base: './'`.
- Re-check the project's `tech`, `description`, and `longDescription` in `src/data/projects.ts` —
  a rebuild usually means the stack blurb is out of date too.
- **Check image sizes.** Cloudflare refuses any static asset over 25 MiB, so an oversized image
  in a refreshed bundle breaks the deploy. Run `npm run check:assets` after copying.

**⚠️ The `lagoinha-ct` bundle carries hand-optimized images.** Its slideshow photos were
6000×4000 PNGs (34 MB, 26 MB, 25 MB) — three of them over Cloudflare's 25 MiB ceiling. They
were resized to 1920px WebP (~350 KB for all three), ~44 MB of unreferenced assets were
deleted, and `slideshow2.JPG` was renamed to `slideshow2.jpg` to fix a reference that had been
404ing on the case-sensitive origin. **Re-copying the upstream bundle silently reverts all of
this.** The real fix belongs in the source repo; until then, redo it after any refresh.

## Security notes

- **No secrets in the repo.** `.env` / `.env.*.local` are gitignored; there are no committed
  credential, key, or `.pem` files. The bundled `public/demos/*` are static production builds and
  contain **no live API keys** (the Tusky/Plaid/Clerk demo is a mock UI).
- **Deploy auth is per-developer OAuth** (`wrangler login`), not a shared static credential.
  Nothing to paste, nothing to rotate. For CI, use a scoped Cloudflare API token in repository
  secrets — never a committed token.
- **No AWS involvement any more.** The account's resources and the `ouroboros-deploy` IAM
  user were deleted 2026-08-23; the stale keys in `~/.aws/credentials` are dead. No AWS
  credentials have ever been committed here — history was scanned for key IDs, credential
  keywords, and `.env`/`.pem` files.
- If a project demo ever needs a client-side key, scope/restrict it (HTTP referrer or domain
  allowlist) before bundling, since everything under `public/` is publicly served.

## Team / contact

- **Pedro Henrique Fernandes** — Full-Stack Dev — GitHub `DahVincis`, ph.leao2099@gmail.com
- **Kelvyn Luciano** — Full-Stack Dev — GitHub `Kelvinluciano312`, kelvinluciano2@gmail.com
- Studio contact: ouroboros2043@gmail.com
- Repo: https://github.com/DahVincis/Ouroboros-Inc (default branch `main`)
