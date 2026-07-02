<div align="center">

![Falak Banner](https://raw.githubusercontent.com/7se7en72025/kata-ui/main/public/dashboard-mockup.png)

# Falak

**Motion-driven React components that feel alive.**

Form follows force. Not just what things look like â€” how they feel.

[![NPM Version](https://img.shields.io/npm/v/falak.svg)](https://www.npmjs.com/package/falak)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/7se7en72025/kata-ui/pulls)
[![Stars](https://img.shields.io/github/stars/7se7en72025/kata-ui?style=social)](https://github.com/7se7en72025/kata-ui)
[![CI](https://github.com/7se7en72025/kata-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/7se7en72025/kata-ui/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/badge/tests-45%20passing-brightgreen)](https://github.com/7se7en72025/kata-ui)

<a href="https://vercel.com/oss">
  <img src="https://vercel.com/oss/oss-badge.svg" alt="Vercel OSS Program" />
</a>

</div>

---

## What is Falak?

Most component libraries focus on how things look. **Falak focuses on how things feel.** Every component is built with physics-based animations, intention-driven interactions, and the sense that UI elements have mass and momentum.

> **Form follows force.** Not just what things look like, how they feel.

### Why Falak?

| Feature               | Description                                            |
| --------------------- | ------------------------------------------------------ |
| **Motion-First**      | Physics-based animations built into every component    |
| **Accessible**        | WCAG compliant, tested with axe-core on every PR       |
| **Type-Safe**         | TypeScript strict mode with full autocompletion        |
| **Copy-Paste**        | Self-contained components, zero vendor lock-in         |
| **Dark Mode**         | Built-in theme support with CSS variables              |
| **Tree-Shakable**     | Import only what you need                              |
| **20+ Components**    | Hero sections, effects, buttons, navigation, utilities |
| **shadcn Compatible** | Install via CLI: `npx shadcn@latest add hero`          |

### Live Demo

**[kata-ui-rho.vercel.app](https://kata-ui-rho.vercel.app)** â€” See all components in action with live code examples.

---

## Quick Start

### Install via shadcn/ui CLI

```bash
npx shadcn@latest add https://kata-ui-rho.vercel.app/r/hero
```

### Install via npm

```bash
npm install falak
```

### Clone & Run Locally

```bash
git clone https://github.com/7se7en72025/kata-ui.git
cd falak
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Components

All 20+ components are installable via the [shadcn/ui registry](https://kata-ui-rho.vercel.app). Each component is copy-paste ready, accessible, and motion-driven.

### Hero & Landing

| Component             | Description                                                        | Install                                      |
| --------------------- | ------------------------------------------------------------------ | -------------------------------------------- |
| `Hero`                | Landing hero with liquid metal badge, gradient text, animated rays | `npx shadcn@latest add hero`                 |
| `ImpressionSection`   | Feature showcase with interactive tabs and dashboard mockup        | `npx shadcn@latest add impression-section`   |
| `TestimonialsSection` | Social proof with auto-scrolling testimonial cards                 | `npx shadcn@latest add testimonials-section` |
| `FaqSection`          | Collapsible FAQ accordion with smooth animations                   | `npx shadcn@latest add faq-section`          |
| `ShrineCards`         | Shrine-style card layout with hover effects                        | `npx shadcn@latest add shrine-cards`         |

### Effects & Animation

| Component        | Description                                                | Install                                 |
| ---------------- | ---------------------------------------------------------- | --------------------------------------- |
| `GlitchText`     | Cyberpunk glitch with chromatic aberration + CRT scanlines | `npx shadcn@latest add glitch-text`     |
| `LiquidMetal`    | 3D liquid metal shader with chrome border effect           | `npx shadcn@latest add liquid-metal`    |
| `GlowButton`     | Button with animated glow hover and press feedback         | `npx shadcn@latest add glow-button`     |
| `AnimatedButton` | Button with physics-based press animation                  | `npx shadcn@latest add animated-button` |
| `AnimatedRays`   | Rotating ray background for hero sections                  | `npx shadcn@latest add animated-rays`   |

### Layout & Navigation

| Component     | Description                                                    | Install                              |
| ------------- | -------------------------------------------------------------- | ------------------------------------ |
| `Navbar`      | Fixed navbar with theme toggle, search spotlight, border trace | `npx shadcn@latest add navbar`       |
| `Footer`      | Branded footer with theme-aware styling                        | `npx shadcn@latest add footer`       |
| `SideFrame`   | SVG ruler guides with scroll/cursor tracking                   | `npx shadcn@latest add side-frame`   |
| `LazySection` | Lazy-load with IntersectionObserver (400px root margin)        | `npx shadcn@latest add lazy-section` |
| `DocsSidebar` | Documentation sidebar with active state tracking               | `npx shadcn@latest add docs-sidebar` |

### Utility

| Component       | Description                                       | Install                                |
| --------------- | ------------------------------------------------- | -------------------------------------- |
| `CodeBlock`     | Syntax-highlighted code with copy button + tabs   | `npx shadcn@latest add code-block`     |
| `ErrorBoundary` | React error boundary with retry + custom fallback | `npx shadcn@latest add error-boundary` |
| `TechLogos`     | Animated tech stack marquee with auto-scrolling   | `npx shadcn@latest add tech-logos`     |
| `StackedLogos`  | Logo carousel with hover effects                  | `npx shadcn@latest add stacked-logos`  |

---

## Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)

</div>

---

## Scripts

| Command                  | Description                |
| ------------------------ | -------------------------- |
| `npm run dev`            | Start development server   |
| `npm run build`          | Build for production       |
| `npm run test`           | Run 45 unit tests (Vitest) |
| `npm run test:e2e`       | Run Playwright E2E tests   |
| `npm run lint`           | Run ESLint                 |
| `npm run typecheck`      | TypeScript type check      |
| `npm run format`         | Format with Prettier       |
| `npm run test:coverage`  | Run tests with coverage    |
| `npm run registry:build` | Build shadcn registry      |

---

## Testing

- **45 unit tests** â€” Vitest + React Testing Library
- **Accessibility** â€” axe-core WCAG compliance on every PR
- **E2E tests** â€” Playwright across Chromium, Firefox, WebKit
- **Performance** â€” Lighthouse CI audits
- **Coverage** â€” 50% threshold enforced

## CI/CD

- **CI** â€” Lint + typecheck, test matrix (Ubuntu/Windows x Node 18/20), build, CodeQL security scanning
- **CD** â€” Auto-deploy staging on push, production on tag
- **Preview** â€” PR preview deployments on every pull request
- **Docker** â€” Multi-arch build + Trivy vulnerability scanning
- **Nightly** â€” Scheduled builds for dependency health
- **npm** â€” Auto-publish on version tag

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
# Fork & clone
git clone https://github.com/YOUR_USERNAME/kata-ui.git
cd falak
npm install
git checkout -b feature/amazing-feature
# Make changes, then...
npm run lint && npm run test
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature
# Open PR
```

---

## Community

- **GitHub** â€” [github.com/7se7en72025/kata-ui](https://github.com/7se7en72025/kata-ui)
- **Issues** â€” [Report bugs](https://github.com/7se7en72025/kata-ui/issues)
- **Discussions** â€” [Join the conversation](https://github.com/7se7en72025/kata-ui/discussions)

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Report vulnerabilities via [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) â€” Free for personal and commercial use.

---

<div align="center">

**Built with passion. Powered by Vercel.**

[![Vercel OSS](https://vercel.com/oss/oss-badge.svg)](https://vercel.com/open-source-program)

### Why Vercel OSS?

Falak fills a gap in the React ecosystem: **motion-driven, accessible components that feel alive**. Most libraries focus on how things look. Falak focuses on how things **feel** â€” physics-based animations, intention-driven interactions, and weight.

**What makes us different:**

- Only component library with built-in WebGL shaders (liquid metal effect)
- axe-core accessibility testing on every PR
- shadcn registry for zero-friction adoption
- 45+ unit tests, E2E across 3 browsers, Lighthouse CI
- Deployed on Vercel with preview deployments for every PR

[Read our full application â†’](PITCH.md)

</div>
