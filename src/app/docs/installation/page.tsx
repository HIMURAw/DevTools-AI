import type { Metadata } from "next"

import { Prose } from "@/components/docs/prose"

export const metadata: Metadata = {
  title: "Installation",
  description: "Install, run, and build DevTools AI locally.",
}

export default function DocsInstallationPage() {
  return (
    <Prose>
      <h1 className="text-2xl font-bold tracking-tight">Installation</h1>
      <p>DevTools AI uses pnpm as its package manager.</p>
      <pre>{`pnpm install`}</pre>

      <h2>Environment</h2>
      <p>
        Copy <code>.env.example</code> to <code>.env.local</code> and set{" "}
        <code>OPENROUTER_API_KEY</code>. See{" "}
        <a href="/docs/configuration">Configuration</a> for the full list of
        variables.
      </p>
      <pre>{`cp .env.example .env.local`}</pre>

      <h2>Scripts</h2>
      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>pnpm dev</code>
            </td>
            <td>Start the dev server with Turbopack</td>
          </tr>
          <tr>
            <td>
              <code>pnpm build</code>
            </td>
            <td>Production build</td>
          </tr>
          <tr>
            <td>
              <code>pnpm start</code>
            </td>
            <td>Run the production build</td>
          </tr>
          <tr>
            <td>
              <code>pnpm lint</code> / <code>lint:fix</code>
            </td>
            <td>ESLint, with autofix</td>
          </tr>
          <tr>
            <td>
              <code>pnpm format</code> / <code>format:check</code>
            </td>
            <td>Prettier, write or check only</td>
          </tr>
          <tr>
            <td>
              <code>pnpm typecheck</code>
            </td>
            <td>TypeScript, no emit</td>
          </tr>
          <tr>
            <td>
              <code>pnpm test</code> / <code>test:watch</code>
            </td>
            <td>Vitest, once or in watch mode</td>
          </tr>
        </tbody>
      </table>

      <h2>Adding an 11th tool</h2>
      <p>Every tool is defined in one place: no new routes required.</p>
      <ul>
        <li>
          Add a prompt builder and Zod schema in{" "}
          <code>src/lib/ai/prompts/</code>
        </li>
        <li>
          Register the tool in <code>src/config/tools.config.ts</code> with its
          fields, example input, and output format
        </li>
      </ul>
      <p>
        The shared route handler, form, and output renderer all pick it up
        automatically.
      </p>
    </Prose>
  )
}
