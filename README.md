# NYXA UI

A space-themed UI component library with a 3D interactive landing page, built for the future of component development.

## What is NYXA UI?

NYXA UI is an open-source component library designed for modern web applications. It combines a **space/cockpit aesthetic** with reusable, accessible React components. The library ships with a fully immersive 3D landing experience featuring a scrollable cockpit interface, animated HUD elements, and a component catalog.

## Features

### 3D Landing Experience
- **Scroll-driven camera orbit** — camera travels around a planet as you scroll through 6 sections
- **Cockpit HUD overlay** — top navbar, side panels, and stat displays styled as a spaceship cockpit
- **3D scene** — planet, asteroids, dust particles, twinkling stars, and speed lines rendered via Three.js / React Three Fiber
- **GSAP animations** — smooth scroll transitions, stroke-draw effects, and decrypt-style text reveals

### Component Library
- Reusable R3F components: `TwinkleStars`, `SpeedLines`, `DustParticles`, `Bloom` effects
- Utility hooks: `useSectionVisibility`, fullscreen detection
- HUD components: `ScrambleText`, `SearchBar`, `TopNavbar`, `LeftPanel`, `Nav3`, `TechStack`, `ComponentsSection`

### Performance
- Manual chunk splitting (three-vendor, animation-vendor, ui-vendor)
- Consolidated `useFrame` loops for particle systems
- Shared materials across instanced meshes
- Pre-computed orbit paths at module scope
- `React.memo` + `useMemo` + `useCallback` throughout
- CSS `contain` on scroll sections
- `gsap-core` only (no CSS plugin)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| 3D Engine | Three.js + React Three Fiber + drei |
| Animation | GSAP (gsap-core) |
| State | Valtio |
| Build | Vite + Rolldown |
| Monorepo | pnpm workspaces + Turborepo |
| Language | JavaScript (no TypeScript) |

## Project Structure

```
kata-ui/
├── apps/
│   └── web/                    # Vite landing page
│       ├── public/images/      # SVG assets, textures
│       ├── public/models/      # 3D models (.glb)
│       └── src/
│           ├── components/     # All UI + 3D components
│           ├── hooks/          # Custom hooks
│           ├── styles/         # SCSS modules
│           └── utils/          # Shared utilities
├── packages/
│   └── ui/                     # Reusable R3F component library
└── pnpm-workspace.yaml
```

## Getting Started

```bash
# Install pnpm (if not installed)
npm install -g pnpm

# Install dependencies
pnpm install

# Start dev server
cd apps/web
pnpm dev
```

## Building

```bash
cd apps/web
pnpm build
```

## Design Principles

1. **Space aesthetic** — Every element feels like part of a spaceship cockpit
2. **Performance first** — Minimal re-renders, shared resources, optimized bundles
3. **No comments** — Clean, self-documenting code
4. **Accessible** — Keyboard navigation, focus management, reduced motion support
5. **Composable** — Components work independently or together

## SVG Assets

| File | Purpose |
|------|---------|
| `topnavbarhome.svg` | Top HUD navbar with search, nav buttons |
| `fullscreensvg.svg` | "Best viewed fullscreen" prompt |
| `comingsoonsvg.svg` | "Coming Soon" popup for features |
| `l1.svg` | Left side panel overlay |
| `nav22.svg` | Tech stack screen (section 2) |
| `nav24.svg` | Bottom HUD bar |
| `nav31.svg` | Family management screen (section 3) |
| `cursor.svg` | Custom crosshair cursor |

## Browser Support

- Chrome/Edge 90+ (full support)
- Firefox 90+ (full support)
- Safari 15+ (full support)
- **Note:** `backdrop-filter: blur()` is never used near the WebGL canvas — it breaks Chromium compositing

## License

This project is licensed under either of:

- **MIT License** — see [LICENSE-MIT](LICENSE-MIT) for details
- **Apache License 2.0** — see [LICENSE-APACHE](LICENSE-APACHE) for details

at your option.

```
SPDX-License-Identifier: MIT OR Apache-2.0
```

**Which license should I choose?**

| License | Best For |
|---------|----------|
| **MIT** | Simple projects, maximum compatibility, minimal restrictions |
| **Apache 2.0** | Enterprise use, patent protection, derivative works with patent grants |

Both are permissive and allow commercial use, modification, and distribution.
