# Contributing to Falak

Thanks for your interest in contributing to Falak! Here's how to get started.

## Development Setup

```bash
# Clone the repo
git clone https://github.com/7se7en72025/kata-ui.git
cd falak

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Available Scripts

| Command                  | Description              |
| ------------------------ | ------------------------ |
| `npm run dev`            | Start development server |
| `npm run build`          | Build for production     |
| `npm run lint`           | Run ESLint               |
| `npm run lint:fix`       | Fix lint errors          |
| `npm run format`         | Format with Prettier     |
| `npm run format:check`   | Check formatting         |
| `npm run typecheck`      | TypeScript type check    |
| `npm run test`           | Run unit tests           |
| `npm run test:watch`     | Run tests in watch mode  |
| `npm run test:coverage`  | Run tests with coverage  |
| `npm run test:e2e`       | Run Playwright E2E tests |
| `npm run registry:build` | Build shadcn registry    |

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new component
fix: resolve animation glitch
docs: update installation guide
style: format code
refactor: simplify props handling
perf: optimize rendering
test: add button tests
build: update dependencies
ci: add e2e workflow
chore: update README
```

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run lint` and `npm run test`
4. Commit with a conventional commit message
5. Open a PR with a clear description

## Testing

- **Unit tests**: `__tests__/` directory using Vitest
- **E2E tests**: `e2e/` directory using Playwright
- **Accessibility**: Tests use axe-core for WCAG compliance

## Code Style

- Use TypeScript strict mode
- Follow the existing code patterns
- Run `npm run format` before committing
- Pre-commit hooks will auto-lint staged files

## Reporting Issues

- Use the bug report template for bugs
- Use the feature request template for suggestions
- Include reproduction steps for bugs

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
