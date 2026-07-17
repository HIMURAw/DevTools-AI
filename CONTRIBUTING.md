# Contributing to DevTools AI

Thanks for considering a contribution — small fixes, a new tool, a new OpenRouter model, or docs corrections are all welcome.

## Getting set up

```bash
git clone https://github.com/<your-fork>/DevTools-AI.git
cd DevTools-AI
pnpm install
cp .env.example .env.local   # add your OPENROUTER_API_KEY
pnpm dev                     # web app at http://localhost:3000
pnpm cli --help               # the CLI, run from source
```

Requires Node.js 20.9+ and [pnpm](https://pnpm.io).

## Before opening a PR

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

All four should pass. A pre-commit hook (Husky + lint-staged) runs ESLint and Prettier automatically on staged files.

## Commit messages

This repo follows [Conventional Commits](https://www.conventionalcommits.org) and enforces it with commitlint on every commit:

```
feat: add a Dockerfile generator tool
fix: correct temperature clamping in the settings store
docs: clarify CLI stdin behavior
```

## Adding a new tool

Every tool — web and CLI — comes from one registry entry, so this is the whole change:

1. Add a prompt builder and Zod schema in `src/lib/ai/prompts/<tool-name>.ts` (see any existing file there for the shape).
2. Register it in `src/config/tools.config.ts`: fields, example input, output format, and a `cliAlias`.

The API route, the web form, the output renderer, and the CLI subcommand all pick it up automatically — no other files to touch. See [Architecture](https://devtools-ai.dev/docs/architecture) for how the pieces fit together.

## Adding a model

Add an entry to `src/config/models.ts`. Only models listed there are accepted by the API route and selectable in Settings — this is intentional (see [Configuration](https://devtools-ai.dev/docs/configuration)), so new models need to be added there explicitly.

## Reporting bugs / requesting features

Open an [issue](https://github.com/HIMURAw/DevTools-AI/issues) with the provided template. For anything security-related, see [SECURITY.md](./SECURITY.md) instead of opening a public issue.

## Code style

- TypeScript strict mode, no `any`
- Prettier + ESLint (`pnpm format`, `pnpm lint:fix`)
- Prefer small, focused components and functions over premature abstraction

By contributing, you agree your contributions will be licensed under the project's [MIT License](./LICENSE).
