import type { Metadata } from "next"

import { tools } from "@/config/tools.config"
import { Prose } from "@/components/docs/prose"

export const metadata: Metadata = {
  title: "API Reference",
  description: "The request and response contract for the tools endpoint.",
}

export default function DocsApiPage() {
  return (
    <Prose>
      <h1 className="text-2xl font-bold tracking-tight">API Reference</h1>
      <p>
        One Route Handler serves every tool: <code>POST /api/ai/[slug]</code>,
        where <code>slug</code> is any tool slug from{" "}
        <code>config/tools.config.ts</code>.
      </p>

      <h2>Request body</h2>
      <pre>{`{
  "input": { "input": "...", "language": "TypeScript" },
  "model": "qwen/qwen3-coder:free",
  "temperature": 0.4,
  "maxTokens": 2048
}`}</pre>
      <p>
        <code>input</code> is a flat string-keyed object — its exact shape
        depends on the tool&rsquo;s fields. <code>model</code> must be one of
        the IDs in <code>config/models.ts</code>.
      </p>

      <h2>Response</h2>
      <p>
        On success, the response body is a raw UTF-8 text stream (
        <code>Content-Type: text/plain</code>) — the completion, streamed as
        it&rsquo;s generated. There is no JSON envelope on success.
      </p>
      <p>On failure, the response is JSON:</p>
      <pre>{`{
  "error": { "message": "...", "code": "VALIDATION_ERROR" }
}`}</pre>

      <h2>Error codes</h2>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Status</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>VALIDATION_ERROR</code>
            </td>
            <td>400</td>
            <td>Request body or tool input failed schema validation</td>
          </tr>
          <tr>
            <td>
              <code>TOOL_NOT_FOUND</code>
            </td>
            <td>404</td>
            <td>The slug doesn&rsquo;t match a registered tool</td>
          </tr>
          <tr>
            <td>
              <code>MODEL_NOT_ALLOWED</code>
            </td>
            <td>400</td>
            <td>The requested model isn&rsquo;t in the allowlist</td>
          </tr>
          <tr>
            <td>
              <code>MISSING_API_KEY</code>
            </td>
            <td>500</td>
            <td>
              <code>OPENROUTER_API_KEY</code> isn&rsquo;t set on the server
            </td>
          </tr>
          <tr>
            <td>
              <code>RATE_LIMITED</code>
            </td>
            <td>429</td>
            <td>OpenRouter rate-limited the request</td>
          </tr>
          <tr>
            <td>
              <code>UPSTREAM_ERROR</code>
            </td>
            <td>502</td>
            <td>OpenRouter returned a non-2xx response</td>
          </tr>
        </tbody>
      </table>

      <h2>Available tool slugs</h2>
      <ul>
        {tools.map((tool) => (
          <li key={tool.id}>
            <code>{tool.slug}</code>
          </li>
        ))}
      </ul>
    </Prose>
  )
}
