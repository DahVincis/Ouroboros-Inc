# Ouroboros Inc — Portfolio Site

## Stack
- **React 18 + TypeScript** via Vite
- **Tailwind CSS v3** (custom theme tokens: `ob-black`, `ob-dark`, `ob-white`, `ob-muted`, `ob-border`, `cream`, `cream-dark`)
- **Headless UI** for the project modal (Dialog + Transition)
- **Framer Motion** for card entrance animations
- **Lucide React** for icons

## Dev
```
npm run dev     # Vite dev server (default port 5173)
npm run build   # tsc + vite build
npm run preview # preview production build
```

## Project structure
```
src/
  components/
    Navbar.tsx       # Fixed top nav — always solid bg, no scroll-based opacity
    Hero.tsx
    ProjectGrid.tsx  # Renders ProjectCard grid from projects.ts
    ProjectCard.tsx  # 4:3 card; desktop type uses bg-contain+bg-center, others bg-cover+bg-top
    ProjectModal.tsx # Full-screen modal; tusky-app gets phone-frame treatment
    Services.tsx
    About.tsx
    TeamBios.tsx
    Footer.tsx
  data/
    projects.ts      # Single source of truth for all project cards
    team.ts
  context/
    ThemeContext.tsx  # dark/light toggle stored in localStorage
  index.css          # Tailwind base + custom utilities (text-gradient, section-label, etc.)
public/
  demos/             # Static self-contained demo sites served as iframes
    tusky-app/       # Compiled React/Vite app (index-KOz6Kv-h.js)
    lagoinha-ct/
    lucianos-services/
    special-finishes/
    stolochi/
  screenshots/       # Card thumbnail images
  logo.png
```

## Key conventions

### Adding a project
Edit `src/data/projects.ts`. Fields:
- `iframeUrl` — path to static demo under `public/demos/`; set `null` if none
- `liveUrl` — used for the "Open Live Site" CTA when embedding is blocked
- `screenshot` — path under `public/screenshots/`; card uses it as background
- `youtubeId` — renders a YouTube embed in the modal instead of an iframe
- `type: 'web' | 'desktop' | 'pwa'` — controls card background sizing behavior

### ProjectCard background behavior
- `web` / `pwa` → `bg-cover bg-top` (shows top of website screenshots)
- `desktop` → `bg-contain bg-no-repeat bg-center` + gradient base layer (shows full app logo without cropping)

### ProjectModal rendering logic (priority order)
1. `project.id === 'tusky-app'` → phone-frame experience (Start Test splash → scaled iframe at 390×760 scaled to 0.7128)
2. `embedUrl` exists → full-width iframe (YouTube or direct demo)
3. `project.liveUrl` exists → screenshot + "Open Live Site" CTA
4. fallback → "coming soon" gradient panel with GitHub link

### Tusky demo — BrowserRouter path fix
`public/demos/tusky-app/index.html` injects `history.replaceState(null, '', '/')` before React loads. This is required because the app's BrowserRouter routes (`/`, `/page-two`, `/page-three`) don't match the served path `/demos/tusky-app/index.html`, leaving content blank until navigation occurs.

### Navbar
Always solid — `bg-[#F5F0EB] dark:bg-ob-black`. No scroll-based transparency.
