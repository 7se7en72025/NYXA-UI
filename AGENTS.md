# AGENTS.md â€” Falak

## Project Overview

Falak is a motion-driven React component library built with:

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui registry format

## Commands

| Command                  | Purpose                       |
| ------------------------ | ----------------------------- |
| `npm run dev`            | Start dev server on port 3000 |
| `npm run build`          | Production build              |
| `npm run test`           | Run 45 unit tests (Vitest)    |
| `npm run test:e2e`       | Run Playwright E2E tests      |
| `npm run lint`           | ESLint check                  |
| `npm run typecheck`      | TypeScript type check         |
| `npm run format`         | Prettier format               |
| `npm run registry:build` | Build shadcn registry         |

## Architecture

### Component Structure

```
components/          # Main component source (Next.js app)
â”œâ”€â”€ hero.tsx
â”œâ”€â”€ navbar.tsx
â”œâ”€â”€ glitch-text.tsx
â”œâ”€â”€ glow-button.tsx
â””â”€â”€ ...

registry/ui/         # shadcn-compatible registry (installable via CLI)
â”œâ”€â”€ hero.tsx
â”œâ”€â”€ navbar.tsx
â”œâ”€â”€ glitch-text.tsx
â””â”€â”€ utils.ts

lib/                 # Utility functions
â”œâ”€â”€ utils.ts         # cn() helper (clsx + tailwind-merge)
â””â”€â”€ env.ts          # Zod env validation

__tests__/           # Unit tests (mirrors components/ structure)
â”œâ”€â”€ components/
â”œâ”€â”€ a11y/
â””â”€â”€ api/

e2e/                 # Playwright E2E tests
```

### Key Patterns

1. **shadcn Registry** â€” Components in `registry/ui/` are installable via `npx shadcn@latest add <component>`
2. **Utility Function** â€” All components use `cn()` from `lib/utils.ts` for class merging
3. **"use client"** â€” All interactive components use `"use client"` directive
4. **Theme Support** â€” Components use CSS variables and `data-theme` attribute
5. **Testing** â€” Each component has a `*.test.tsx` file in `__tests__/components/`

### Installing a New Component

```bash
npx shadcn@latest add https://kata-ui-rho.vercel.app/r/<component-name>
```

### Adding a New Component

1. Create component in `components/<name>.tsx`
2. Add registry entry in `registry/ui/<name>.tsx`
3. Update `registry.json` with component metadata
4. Add test in `__tests__/components/<name>.test.tsx`
5. Run `npm run test` to verify
6. Run `npm run registry:build` to rebuild registry

## Code Style

- **TypeScript** â€” Strict mode, no `any` types
- **Tailwind** â€” Utility classes, no inline styles when possible
- **ESLint** â€” `next/core-web-vitals` config
- **Prettier** â€” Default config
- **Conventional Commits** â€” `feat:`, `fix:`, `docs:`, etc.

## Testing

- **Unit tests**: Vitest + React Testing Library
- **Accessibility**: axe-core for WCAG compliance
- **E2E**: Playwright across Chromium, Firefox, WebKit

## Deployment

- **Platform**: Vercel
- **CI/CD**: GitHub Actions
- **Preview**: Auto-deploy on PRs
- **Production**: Deploy on tag push
