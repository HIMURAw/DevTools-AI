# Security Policy

## Supported versions

DevTools AI is pre-1.0 and developed on a single `main` branch. Security fixes are applied to the latest commit only — there are no maintained release branches yet.

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Instead, report it privately through the [Contact page](https://devtools-ai.dev/contact) (it opens a pre-filled GitHub issue you can redirect into a private channel) or via a [GitHub Security Advisory](https://github.com/HIMURAw/DevTools-AI/security/advisories/new) on this repository.

Please include:

- A description of the vulnerability and its potential impact
- Steps to reproduce it
- Any relevant logs or proof-of-concept code

You should get an initial response within a few days.

## What's already accounted for

- **`OPENROUTER_API_KEY`** is read only in `src/lib/ai/openrouter-client.ts`, a server-only module. It is never included in any response sent to the browser or the CLI's stdout.
- **Model allowlisting** — the `/api/ai/[slug]` route rejects any `model` value not present in `src/config/models.ts`, so a client can't force arbitrary model IDs or parameters through to OpenRouter.
- **No server-side storage** — there is no database and no logging of request/response content, so there's nothing to leak on that front. See [Privacy](https://devtools-ai.dev/privacy) for the full picture.
- **Input validation** — every tool's input is validated with Zod, both on the web API route and in the CLI, before it's used to build a prompt.

## Known limitations

- **No rate limiting** is implemented on `/api/ai/[slug]`. A naive in-memory limiter would silently stop working across multiple serverless instances, which is worse than not having one — so instead of shipping something that looks safe but isn't, this is left as an explicit gap. If you deploy a public instance, put a real rate limiter (e.g. Upstash, or your platform's edge/WAF rules) in front of it.
- This project has not had a formal third-party security audit. Use your own judgment before deploying a public instance with a funded API key.
