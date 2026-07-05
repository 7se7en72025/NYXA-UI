# NYXA UI

A space-themed UI component library for React and React Three Fiber. Build immersive 3D landing pages with a cockpit-style HUD aesthetic.

## Install

```bash
pnpm add @nyxa/ui
```

## Components

| Component | Description |
|-----------|-------------|
| `TwinkleStars` | Animated 3D star field with point sprites |
| `DustParticles` | Floating cosmic dust particles |
| `SpeedLines` | Warp-speed velocity lines |
| `Effects` | Bloom + tone mapping post-processing |
| `ErrorBoundary` | Themed error boundary with retry |

## Tech Stack

- React 18
- Three.js / React Three Fiber / Drei
- GSAP (scroll & animation)
- Valtio (state management)
- Vite + Turborepo (build)
- Biome (lint & format)

## Development

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Build all packages |
| `pnpm lint` | Run Biome linter |
| `pnpm format` | Format code |

## Project Structure

```
nyxa-ui/
├── apps/web/          # Landing page (Vite + React)
├── packages/ui/       # Reusable component library
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## License

MIT
