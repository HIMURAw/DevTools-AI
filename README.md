# DevTools AI

An AI-powered developer toolkit — ten single-purpose tools (code explainer, bug finder, commit message generator, README generator, regex/SQL/TypeScript generators, email generator, code optimizer, code reviewer) sharing one AI service layer, available both as a **web app** and a **CLI**, powered by [OpenRouter](https://openrouter.ai).

## Features

- 10 focused AI tools behind one clean interface — see [Features](https://devtools-ai.dev/features) for details
- Streaming responses, in the browser and in the terminal
- Bring-your-own model: a curated list of free OpenRouter models, `qwen/qwen3-coder:free` by default
- Automatic programming-language detection for code inputs
- No accounts, no database — preferences persist only in your browser's local storage
- Dark-mode-first UI built with Next.js 16, React 19, Tailwind CSS v4, and shadcn/ui

## Installation

Requires Node.js 20.9+ and [pnpm](https://pnpm.io).

```bash
git clone <your-fork-url>
cd devtools-ai
pnpm install
cp .env.example .env.local
# add your OPENROUTER_API_KEY to .env.local — a key with no credits works,
# since the default model is free
```

## Development

```bash
pnpm dev            # start the web app at http://localhost:3000
pnpm cli --help      # run the CLI without installing it globally
pnpm build           # production build
pnpm lint            # ESLint
pnpm typecheck       # TypeScript, no emit
pnpm test            # Vitest
```

Full docs, including the API contract and architecture, live at [`/docs`](https://devtools-ai.dev/docs) (or `pnpm dev` and visit `/docs` locally).

## Using the CLI

The same ten tools are available from the terminal, backed by the exact same prompts and validation as the web app.

```bash
# run without installing globally
pnpm cli explain --file src/index.ts

# or install it as a global `devtools-ai` command
npm link
devtools-ai list
devtools-ai review --file src/app.ts
devtools-ai commit "fixed a race condition in the upload handler"
cat schema.sql | devtools-ai sql "top 10 customers by revenue"
```

Each tool command accepts inline text, `--file <path>`, or piped stdin as its primary input, plus `--model`, `--temperature`, `--max-tokens`, and any tool-specific flags (run `devtools-ai <tool> --help` to see them). `devtools-ai models` lists the available OpenRouter models.

## Folder structure

```
src/
  app/            Next.js routes (marketing pages, /tools, /docs, /api/ai/[slug])
  cli/            The CLI entry point and its Commander wiring
  components/     ui/ (shadcn primitives), layout/, tools/, marketing/, docs/, settings/, common/
  config/         site.ts, models.ts, tools.config.ts (the tool registry), docs.ts
  constants/      limits.ts, storage-keys.ts
  hooks/          use-ai-completion, use-mounted
  lib/
    ai/           openrouter-client.ts (server-only) and prompts/ (one file per tool)
    store/        Zustand settings store
    validations/  Zod schemas shared across the app
  services/       ai-service.ts and tool.service.ts — the layer the web UI and CLI both call
  types/          shared TypeScript types
bin/              devtools-ai.mjs, the global CLI launcher
```

The web UI and the CLI both call the same `services/ai-service.ts`, which builds a prompt from a tool's registry entry (`config/tools.config.ts`) and streams a completion via `lib/ai/openrouter-client.ts`. Adding an 11th tool means adding one entry to the registry — both the web UI and the CLI pick it up automatically.

## Environment variables

| Variable               | Required | Description                                                       |
| ---------------------- | -------- | ----------------------------------------------------------------- |
| `OPENROUTER_API_KEY`   | Yes      | Server-only. Never sent to the browser or exposed to CLI callers. |
| `NEXT_PUBLIC_SITE_URL` | No       | Used for metadata, OpenGraph tags, and the sitemap.               |

## Contributing

Issues and pull requests are welcome — see [Contact](https://devtools-ai.dev/contact) or open an issue directly on GitHub.

## License

[MIT](./LICENSE)
