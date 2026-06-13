# Kata UI — Status & Documentation

> Component library built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn registry.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + inline styles
- **Registry:** shadcn CLI (`npm run registry:build`)
- **Font:** Inter (body) + JetBrains Mono (code) via `next/font/google`
- **Theme:** Dark/Light via `data-theme` attribute on `<html>`

---

## Repository Structure

```
kata-ui/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout — Inter + JetBrains Mono fonts, data-theme="dark"
│   ├── page.tsx                  # Homepage — Hero, ShrineCards showcase, SideFrame, Navbar, Footer
│   ├── globals.css               # Global styles — CSS variables, theme tokens, animations
│   ├── not-found.tsx             # Custom 404 page
│   ├── error.tsx                 # Error boundary
│   ├── api/r/[slug]/route.ts     # Registry API endpoint (serves component JSON)
│   └── docs/
│       ├── layout.tsx            # Docs layout — Navbar + ResizablePanels (sidebar, content, TOC)
│       ├── page.tsx              # Docs home — Liquid Metal component page
│       ├── installation/
│       │   ├── nextjs/page.tsx   # Install Next.js guide
│       │   ├── tailwind/page.tsx # Install Tailwind guide
│       │   ├── utilities/page.tsx# Install utilities guide
│       │   └── cli/page.tsx      # CLI installation guide
│       └── layout/shrine-cards/
│           └── page.tsx          # Shrine Cards docs — Installation, Usage, Preview
│
├── components/                   # React components
│   ├── hero.tsx                  # Hero section — title, subtitle, CTA buttons
│   ├── navbar.tsx                # Fixed navbar — logo, search, theme toggle, docs button
│   ├── side-frame.tsx            # Fixed ruler side frames (left + right edges)
│   ├── footer.tsx                # Footer — logo, copyright
│   ├── animated-button.tsx       # CTA button — CSS shine mask sweep animation
│   ├── glow-button.tsx           # CTA button — inverted shine sweep (dark bg)
│   ├── liquid-metal.tsx          # Liquid Metal badge — metallic shimmer effect
│   ├── animated-rays.tsx         # Aurora/rays background animation
│   ├── resizable-panels.tsx      # 3-panel resizable layout (sidebar, content, TOC)
│   ├── docs-sidebar.tsx          # Docs left navigation — collapsible groups
│   ├── docs-toc.tsx              # Docs right table of contents
│   └── ui/
│       └── shrine-cards.tsx      # ShrineCards — expandable card grid with SVG shapes
│
├── registry/                     # shadcn registry (auto-generated)
│   └── ui/                       # Built component files for distribution
│
├── public/                       # Static assets
│   ├── shrine-cards/             # SVG card assets
│   │   ├── shrinecard1-7.svg     # Collapsed card SVGs (178×629, embedded base64 images)
│   │   └── shrinecardexpanded.svg# Expanded card SVG (405×615, purple stroke, dark fill)
│   ├── r/                        # Registry JSON files (built by shadcn)
│   ├── favicon.svg               # Site favicon
│   ├── KATAUILOGOWHITE.svg       # Logo (dark mode)
│   └── KATAUILOGOBLACK.svg       # Logo (light mode)
│
├── lib/
│   └── utils.ts                  # Utility functions (cn helper)
│
├── next.config.mjs               # Next.js config — image formats, security headers, caching
├── tailwind.config.ts            # Tailwind config
├── postcss.config.mjs            # PostCSS config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies and scripts
└── registry.json                 # shadcn registry manifest
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — Hero, ShrineCards showcase, SideFrame |
| `/docs` | Docs home — Liquid Metal component page |
| `/docs/installation/nextjs` | Next.js installation guide |
| `/docs/installation/tailwind` | Tailwind CSS installation guide |
| `/docs/installation/utilities` | Utilities installation guide |
| `/docs/installation/cli` | CLI installation guide |
| `/docs/layout/shrine-cards` | Shrine Cards — Installation, Usage, Preview |

---

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run registry:build  # Build shadcn registry
```

---

## Registry

Components are registered via `shadcn build`. Registry files are in:
- `public/r/*.json` — Built registry JSON files
- `registry/ui/*.tsx` — Source component files for distribution

Install via CLI:
```bash
npx shadcn@latest add https://kata-ui.vercel.app/r/shrine-cards.json
```

---

## Performance Optimizations Applied

| Optimization | Impact |
|---|---|
| Removed `framer-motion` from buttons | -40KB bundle |
| Replaced 3 `MutationObserver`s with CSS | Less JS execution |
| `side-frame.tsx`: RAF throttling | Smoother scroll |
| `shrine-cards.tsx`: `React.memo` | Fewer re-renders |
| `shrine-cards.tsx`: `loading="lazy"` | Faster initial load |
| `next.config.mjs`: Security headers | Better security |
| `next.config.mjs`: Asset caching | Faster repeat visits |
| `next.config.mjs`: AVIF/WebP images | Smaller images |
| Dynamic imports on homepage | Code splitting |
| Font `display: "swap"` | No FOIT |

**Bundle size (homepage):**
- Page JS: 2.59 kB
- First Load JS: 90 kB

---

## Theme System

- Dark mode: `data-theme="dark"` (default)
- Light mode: `data-theme="light"`
- CSS variables defined in `globals.css`
- Toggle via triangular clip-path transition in navbar

---

## SVG Assets

### Collapsed Cards (`shrinecard1-7.svg`)
- Dimensions: 178×629
- Embedded base64 images (circuit patterns, icons)
- Black stroke at 0.25 opacity
- Gaussian blur filter

### Expanded Card (`shrinecardexpanded.svg`)
- Dimensions: 405×615
- Purple stroke `#BC6DFF` at 3px
- Dark gradient fill (0.01 opacity)
- Inner glow filter

---

## License

MIT Licensed — Open Source 2026
