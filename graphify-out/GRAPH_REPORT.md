# Graph Report - Ouroboros-Inc  (2026-10-10)

## Corpus Check
- 40 files · ~238,223 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 3, .css 2, .jsonc 1)

## Summary
- 131 nodes · 182 edges · 11 communities (9 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Package Manifest
- App Shell & Sections
- App TS Config
- Node TS Config
- Navbar & Theme Context
- Project Showcase Cards
- Dev Dependencies
- NPM Scripts
- Asset Size Checker
- Root TS Config

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `compilerOptions` - 14 edges
3. `react` - 9 edges
4. `App()` - 9 edges
5. `lucide-react` - 8 edges
6. `framer-motion` - 7 edges
7. `scripts` - 6 edges
8. `Project` - 6 edges
9. `ProjectGrid()` - 5 edges
10. `Navbar()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `Navbar()`  [EXTRACTED]
  src/App.tsx → src/components/Navbar.tsx
- `App()` --calls--> `ProjectGrid()`  [EXTRACTED]
  src/App.tsx → src/components/ProjectGrid.tsx
- `ProjectCardProps` --references--> `Project`  [EXTRACTED]
  src/components/ProjectCard.tsx → src/data/projects.ts
- `ProjectModalProps` --references--> `Project`  [EXTRACTED]
  src/components/ProjectModal.tsx → src/data/projects.ts
- `App()` --calls--> `About()`  [EXTRACTED]
  src/App.tsx → src/components/About.tsx

## Import Cycles
- None detected.

## Communities (11 total, 2 thin omitted)

### Community 0 - "Package Manifest"
Cohesion: 0.09
Nodes (21): dependencies, framer-motion, @headlessui/react, lucide-react, react, react-dom, name, private (+13 more)

### Community 1 - "App Shell & Sections"
Cohesion: 0.18
Nodes (14): framer-motion, lucide-react, App(), About(), stats, Footer(), navLinks, socials (+6 more)

### Community 2 - "App TS Config"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleDetection, moduleResolution (+9 more)

### Community 3 - "Node TS Config"
Cohesion: 0.12
Nodes (15): compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleDetection, moduleResolution, noEmit (+7 more)

### Community 4 - "Navbar & Theme Context"
Cohesion: 0.22
Nodes (9): react, react-dom, Navbar(), navLinks, Theme, ThemeContext, ThemeContextType, ThemeProvider() (+1 more)

### Community 5 - "Project Showcase Cards"
Cohesion: 0.31
Nodes (9): ProjectCard(), ProjectCardProps, typeIcons, typeLabels, ProjectGrid(), ProjectModal(), ProjectModalProps, Project (+1 more)

### Community 6 - "Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, typescript, vite (+2 more)

### Community 7 - "NPM Scripts"
Cohesion: 0.33
Nodes (6): scripts, build, check:assets, deploy, dev, preview

### Community 8 - "Asset Size Checker"
Cohesion: 0.33
Nodes (3): files, tooBig, walk()

## Knowledge Gaps
- **6 isolated node(s):** `@types/react`, `@types/react-dom`, `autoprefixer`, `postcss`, `typescript` (+1 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 78 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Navbar & Theme Context` to `Package Manifest`, `App Shell & Sections`, `Project Showcase Cards`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **What connects `@types/react`, `@types/react-dom`, `autoprefixer` to the rest of the system?**
  _6 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Package Manifest` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `Dev Dependencies` to `Package Manifest`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Should `App TS Config` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `App Shell & Sections` to `Package Manifest`, `Navbar & Theme Context`, `Project Showcase Cards`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Should `Node TS Config` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._