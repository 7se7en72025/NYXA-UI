# Kata UI — Landing Page Spec

## Global

- **Background**: `#0d0d0d` (dark theme only for now)
- **Font**: Inter (body), JetBrains Mono (code)
- **Max content width**: 900px centered
- **Side frame**: SVG ruler guides on left/right edges, 48px margin each side
- **Navbar**: Fixed top, full-width, transparent background with backdrop blur

---

## 1. Navbar

| Position | Content |
|----------|---------|
| Left | Logo image (`KATAUILOGOWHITE.svg`) — links to `/` |
| Center | Navigation links: `Home`, `Docs`, `Components` |
| Right | Search bar (`⌘K` badge), Theme toggle (moon icon), `View Docs` button |

- **Height**: 52px
- **Border bottom**: `1px solid #1a1a1a`
- **Search bar**: 240px wide, rounded, `#1a1a1a` background, `#333` border
- **View Docs button**: White bg, black text, 36px height, rounded 8px
- **Theme toggle**: Moon icon, shows "Light theme coming soon" toast on click

---

## 2. Hero Section

| Element | Text / Content |
|---------|----------------|
| Badge | Liquid metal animated badge: `"v0.1 — NOW IN DEVELOPMENT"` |
| Headline | `Form follows force.` (large, 80px+, bold, white) |
| Subtitle | `A component library built for developers who move fast.` |
| CTA Left | `Get Started →` (white bg, black text, rounded button) |
| CTA Right | `Star on GitHub` (border only, ghost button) |

- **Background**: CSS grid pattern (`hero-grid` class)
- **Alignment**: Left-aligned, vertically centered
- **Headline font**: Inter, weight 800, letter-spacing -0.03em
- **Subtitle**: 16px, `#888` color, max-width 480px
- **Button gap**: 12px between the two CTAs

---

## 3. Tech Stack

| Element | Content |
|---------|---------|
| Section title | `Tech Stack` — centered, 44px, bold, white |
| Card 1 | Next.js — icon `N`, white on black bg |
| Card 2 | Tailwind — icon `tw`, `#38bdf8` on `#0c1a2a` bg |
| Card 3 | TypeScript — icon `TS`, `#3178c6` on `#0d1a2e` bg |
| Card 4 | Framer — icon `f`, `#facc15` on `#1a1a00` bg |

- **Layout**: 4 cards in a row, no gap, 1px `#222` border between them
- **Container**: max-width 900px, centered, rounded 12px, `1px solid #222` border
- **Card padding**: 36px 20px
- **Card background**: `#0a0a0a`
- **Hover**: Radial glow in tech color at 15% opacity
- **Icon box**: 56x56, rounded 12px, colored bg, 1px `#333` border
- **Label**: 13px, `#888`, below icon

---

## 4. Glitch Text Showcase

| Element | Content |
|---------|---------|
| Label | `EFFECTS LIBRARY` — uppercase, 12px, `#888`, letter-spacing 0.2em |
| Main text | `<GlitchText />` — renders "KATA UI" with Doctor Glitch font + glitch animation |
| Subtext | `Doctor Glitch + CSS Chromatic Aberration` — 14px, `#666`, monospace |

- **Container**: max-width 900px, centered, `#0a0a0a` bg, `1px solid #222` border, rounded 12px
- **Padding**: 60px 40px
- **Layout**: Vertically stacked, centered text
- **Glitch text size**: `clamp(32px, 5vw, 56px)`
- **Glitch text color**: `#FFD700` (gold)

---

## 5. Open Source CTA

| Element | Text / Content |
|---------|----------------|
| Label | `MIT Licensed` — uppercase, 12px, `#888`, letter-spacing 0.2em |
| Headline line 1 | `100% Open Source` — white, bold, clamp(36px, 5vw, 56px) |
| Headline line 2 | `and Free Forever` — italic, gradient text stroke (transparent fill, `#444` stroke, gradient bg) |
| Description | `KataUI is and always will be free and open source. Use in personal and commercial projects. Contribute, fork, and make it your own.` |
| CTA 1 | `Star on GitHub` — white bg, black text, GitHub icon, links to `https://github.com/7se7en72025/kata-ui` |
| CTA 2 | `Read Documentation` — border only, `#ccc` text, links to `/docs` |

- **Layout**: Centered, vertically stacked
- **Padding**: 100px 120px
- **Description**: 16px, `#888`, max-width 560px, line-height 1.7
- **"and always will be"**: `#ccc`, font-weight 600 (inline highlight)
- **Button gap**: 12px between the two CTAs
- **Button padding**: 12px 24px, rounded 8px, 14px font

---

## 6. Footer

| Element | Content |
|---------|---------|
| Logo | Kata UI logo image |
| Brand | `Kata UI` text |
| License | `MIT Open Source 2026` |
| Links | `GitHub`, `Docs`, `Components` — right-aligned |

- **Height**: ~60px
- **Border top**: `1px solid #1a1a1a`
- **Background**: transparent
- **Layout**: Flex, space-between, vertically centered
- **Padding**: 0 120px

---

## Page Flow (top to bottom)

```
┌─────────────────────────────────────┐
│  Navbar (fixed)                     │
├─────────────────────────────────────┤
│                                     │
│  Hero                               │
│  "Form follows force."              │
│  [Get Started] [Star on GitHub]     │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Tech Stack                         │
│  [N] [tw] [TS] [f]                  │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Glitch Text Showcase               │
│  "KATA UI" (glitch animation)       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Open Source CTA                    │
│  "100% Open Source"                 │
│  "and Free Forever"                 │
│  [Star on GitHub] [Read Docs]       │
│                                     │
├─────────────────────────────────────┤
│  Footer                             │
└─────────────────────────────────────┘
```

---

## Colors Reference

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0d0d0d` | Page background |
| `--fg` | `#ffffff` | Primary text |
| Muted | `#888888` | Secondary text |
| Dim | `#666666` | Tertiary text |
| Border | `#222222` | Card/section borders |
| Accent | `#FFD700` | Glitch text, highlights |
| Card bg | `#0a0a0a` | Card backgrounds |

---

## Responsive

- **Mobile**: Stack everything vertically, reduce padding to 20px
- **Tablet**: Keep layout, reduce font sizes
- **Desktop**: Full layout as described above
- **Side frame**: Hidden on mobile/tablet
