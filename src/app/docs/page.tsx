import type { Metadata } from "next"
import Link from "next/link"

import { Prose } from "@/components/docs/prose"

export const metadata: Metadata = {
  title: "Getting Started",
  description: "What DevTools AI is and how the pieces fit together.",
}

export default function DocsGettingStartedPage() {
  return (
    <Prose>
      <h1 className="text-2xl font-bold tracking-tight">Getting Started</h1>
      <p>
        DevTools AI is a Next.js app that exposes ten single-purpose developer
        tools, each backed by a single, reusable AI service that proxies
        requests to <a href="https://openrouter.ai">OpenRouter</a>.
      </p>
      <h2>What you need</h2>
      <ul>
        <li>Node.js 20.9 or later</li>
        <li>pnpm</li>
        <li>
          An OpenRouter API key from{" "}
          <a
            href="https://openrouter.ai/keys"
            target="_blank"
            rel="noopener noreferrer"
          >
            openrouter.ai/keys
          </a>{" "}
          — the default model is free, so a key with no credits works fine
        </li>
      </ul>
      <h2>Quick start</h2>
      <pre>
        {`git clone <your-fork-url>
cd devtools-ai
pnpm install
cp .env.example .env.local
# add your OPENROUTER_API_KEY to .env.local
pnpm dev`}
      </pre>
      <p>
        Then open <code>http://localhost:3000</code> and pick any tool from{" "}
        <Link href="/tools">/tools</Link>.
      </p>
      <h2>Next steps</h2>
      <ul>
        <li>
          <Link href="/docs/installation">Installation</Link> — full setup and
          available scripts
        </li>
        <li>
          <Link href="/docs/configuration">Configuration</Link> — every
          environment variable and what it does
        </li>
        <li>
          <Link href="/docs/architecture">Architecture</Link> — how the tool
          registry and AI service layer fit together
        </li>
        <li>
          <Link href="/docs/api">API Reference</Link> — the request/response
          contract for the tools endpoint
        </li>
      </ul>
    </Prose>
  )
}
