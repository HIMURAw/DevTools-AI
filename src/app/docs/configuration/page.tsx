import type { Metadata } from "next"

import { Prose } from "@/components/docs/prose"

export const metadata: Metadata = {
  title: "Configuration",
  description: "Environment variables and runtime configuration.",
}

export default function DocsConfigurationPage() {
  return (
    <Prose>
      <h1 className="text-2xl font-bold tracking-tight">Configuration</h1>

      <h2>Environment variables</h2>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>OPENROUTER_API_KEY</code>
            </td>
            <td>Yes</td>
            <td>
              Server-only. Read exclusively in{" "}
              <code>src/lib/ai/openrouter-client.ts</code> and never sent to the
              browser.
            </td>
          </tr>
          <tr>
            <td>
              <code>NEXT_PUBLIC_SITE_URL</code>
            </td>
            <td>No</td>
            <td>Used for metadata, OpenGraph tags, and the sitemap.</td>
          </tr>
        </tbody>
      </table>

      <h2>Allowed models</h2>
      <p>
        The tools endpoint rejects any <code>model</code> not present in{" "}
        <code>src/config/models.ts</code>. This keeps the app limited to a
        curated list of free OpenRouter models rather than accepting arbitrary
        model IDs from the client. Add a model there to make it selectable in
        Settings.
      </p>

      <h2>User preferences</h2>
      <p>
        Model, temperature, and max tokens are stored in a Zustand store
        persisted to <code>localStorage</code> under the key{" "}
        <code>devtools-ai:settings</code> (see{" "}
        <code>src/lib/store/settings-store.ts</code>). Theme is managed
        separately by <code>next-themes</code>. Neither is sent to a server.
      </p>
    </Prose>
  )
}
