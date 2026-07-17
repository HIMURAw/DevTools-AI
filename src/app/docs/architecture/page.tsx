import type { Metadata } from "next"

import { Prose } from "@/components/docs/prose"

export const metadata: Metadata = {
  title: "Architecture",
  description: "How the tool registry and AI service layer fit together.",
}

export default function DocsArchitecturePage() {
  return (
    <Prose>
      <h1 className="text-2xl font-bold tracking-tight">Architecture</h1>
      <p>
        Every tool — regardless of what it does — flows through the same path,
        so there&rsquo;s one place to fix bugs and one place to add features.
      </p>

      <h2>Request flow</h2>
      <p>
        The web app and the CLI both end up calling the same{" "}
        <code>services/ai-service.ts</code> — the web app through an HTTP round
        trip, the CLI by importing it directly, since it runs in the same Node
        process.
      </p>
      <pre>{`Web:  ToolShell (client)
        -> useAiCompletion hook
        -> POST /api/ai/[slug]
             -> tools.config.ts  (look up tool by slug)
             -> tool.schema.safeParse(input)  (Zod validation)
             -> services/ai-service.ts  (build prompt + call OpenRouter)
             -> lib/ai/openrouter-client.ts  (server-only, streams response)
        <- plain-text stream
        -> ToolOutputPanel renders markdown / code / text

CLI:  src/cli/index.ts  (one Commander subcommand per registry entry)
        -> runToolCommand()  (collect --flags, file/stdin, or --example)
        -> tool.schema.safeParse(input)  (same Zod validation)
        -> services/ai-service.ts  (same call, no HTTP hop)
        -> process.stdout.write() as chunks arrive`}</pre>

      <h2>Where things live</h2>
      <table>
        <thead>
          <tr>
            <th>Path</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>config/tools.config.ts</code>
            </td>
            <td>
              The tool registry — fields, example input, output format, schema,
              and prompt builder for all ten tools
            </td>
          </tr>
          <tr>
            <td>
              <code>lib/ai/prompts/</code>
            </td>
            <td>One file per tool: its Zod schema and prompt builder</td>
          </tr>
          <tr>
            <td>
              <code>lib/ai/openrouter-client.ts</code>
            </td>
            <td>
              The only file that reads <code>OPENROUTER_API_KEY</code>; converts
              OpenRouter&rsquo;s SSE stream into plain text
            </td>
          </tr>
          <tr>
            <td>
              <code>app/api/ai/[slug]/route.ts</code>
            </td>
            <td>The single Route Handler that serves all ten tools</td>
          </tr>
          <tr>
            <td>
              <code>components/tools/tool-shell.tsx</code>
            </td>
            <td>
              Renders any tool&rsquo;s form and output from its registry entry
            </td>
          </tr>
          <tr>
            <td>
              <code>lib/store/settings-store.ts</code>
            </td>
            <td>Zustand store for model, temperature, and max tokens</td>
          </tr>
          <tr>
            <td>
              <code>services/tool.service.ts</code>
            </td>
            <td>
              Framework-agnostic helpers (like default input values) shared by
              the web form and the CLI
            </td>
          </tr>
          <tr>
            <td>
              <code>src/cli/index.ts</code>
            </td>
            <td>
              The CLI entry point — generates one subcommand per tool from the
              same registry
            </td>
          </tr>
          <tr>
            <td>
              <code>scripts/build-cli.mjs</code>
            </td>
            <td>
              esbuild bundles <code>src/cli</code> into{" "}
              <code>dist/cli/index.mjs</code>, resolving every <code>@/</code>{" "}
              import to a real relative path — the published npm package is this
              one file, no TypeScript loader needed at runtime
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Design choices</h2>
      <ul>
        <li>
          <strong>One dynamic route, not ten.</strong> Adding a tool means
          adding a registry entry, not a new API route or page.
        </li>
        <li>
          <strong>Model allowlisting.</strong> The client can request any model
          in <code>config/models.ts</code>, but never an arbitrary string — the
          route rejects anything else.
        </li>
        <li>
          <strong>No server-side storage.</strong> There is no database. Nothing
          about a request is persisted after the response streams back.
        </li>
        <li>
          <strong>One registry, two frontends.</strong> The CLI never calls the
          HTTP route — it imports <code>services/ai-service.ts</code> directly,
          so it stays in sync with the web app by construction rather than by
          duplicating logic.
        </li>
      </ul>
    </Prose>
  )
}
