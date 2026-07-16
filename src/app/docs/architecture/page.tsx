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
      <pre>{`ToolShell (client)
  -> useAiCompletion hook
  -> POST /api/ai/[slug]
       -> tools.config.ts  (look up tool by slug)
       -> tool.schema.safeParse(input)  (Zod validation)
       -> services/ai-service.ts  (build prompt + call OpenRouter)
       -> lib/ai/openrouter-client.ts  (server-only, streams response)
  <- plain-text stream
  -> ToolOutputPanel renders markdown / code / text`}</pre>

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
          <strong>No server-side storage.</strong> There is no database.
          Nothing about a request is persisted after the response streams
          back.
        </li>
      </ul>
    </Prose>
  )
}
