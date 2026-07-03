# NYXA UI

A constellation-themed UI component library for React and React Three Fiber.

## Tech Stack

- React 18 — UI framework
- Three.js / React Three Fiber — 3D rendering
- @react-three/drei — Three.js helpers
- @react-three/postprocessing — Visual effects
- GSAP — Scroll & animation
- Framer Motion — UI transitions
- Valtio — State management
- Vite — Build tool
- Turborepo — Monorepo orchestration
- Biome — Linting & formatting

## Getting Started

```bash
pnpm install
pnpm dev
```

## Project Structure

```
nyxa-ui/
├── apps/
│   └── web/          # Landing page (Vite + React)
├── packages/
│   └── ui/           # Reusable component library
├── registry.json     # shadcn registry manifest
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Packages

### @nyxa/ui

Reusable 3D and UI components:

- `TwinkleStars` — 3D twinkling star field
- `DustParticles` — Floating dust particles
- `SpeedLines` — Warp speed effect
- `Effects` — Post-processing bloom & tone mapping
- `ErrorBoundary` — Themed error boundary

### @nyxa/web

The landing page application.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Build all packages |
| `pnpm lint` | Run Biome linter |
| `pnpm format` | Format code |

## License

MIT
