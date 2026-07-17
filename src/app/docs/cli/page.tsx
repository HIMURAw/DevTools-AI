import type { Metadata } from "next"
import Link from "next/link"

import { tools } from "@/config/tools.config"
import { toKebabCase } from "@/cli/lib/read-input"
import { Prose } from "@/components/docs/prose"

export const metadata: Metadata = {
  title: "CLI Reference",
  description:
    "Install devtools-ai globally via npm and run every tool from your terminal — every command, every flag.",
}

const exampleCommands: Record<string, string> = {
  "code-explainer": "devtools-ai explain --file src/utils/debounce.ts",
  "bug-finder": "devtools-ai bugs --file src/api/handler.js",
  "commit-message-generator":
    'git diff --staged | devtools-ai commit\ndevtools-ai commit "added rate limiting to the login endpoint"',
  "readme-generator":
    'devtools-ai readme "TaskFlow: a minimal CLI todo app written in Go. Features: add/remove/list tasks, due dates, tags."',
  "regex-generator":
    'devtools-ai regex "match a valid email address" --flavor Python',
  "sql-generator":
    'devtools-ai sql "top 10 customers by revenue" --schema-info "orders(id, customer_id, amount)" --dialect MySQL',
  "json-to-typescript": "devtools-ai json2ts --file data.json --root-name User",
  "email-generator":
    'devtools-ai email "ask a teammate for a PR review before EOD" --tone Friendly',
  "code-optimizer": "devtools-ai optimize --file src/utils/search.js",
  "code-reviewer": "devtools-ai review --file src/api/users.ts",
}

export default function DocsCliPage() {
  return (
    <Prose>
      <h1 className="text-2xl font-bold tracking-tight">CLI Reference</h1>
      <p>
        Every tool on this site is also a terminal command, backed by the exact
        same prompts, Zod validation, and OpenRouter streaming as the web app —
        see <Link href="/docs/architecture">Architecture</Link> for how the two
        share one service layer.
      </p>

      <h2>Install</h2>
      <p>Three ways to run it, from quickest to most permanent:</p>
      <pre>{`# 1. From a clone, no install — good for trying it out
git clone https://github.com/HIMURAw/DevTools-AI.git
cd DevTools-AI && pnpm install
pnpm cli explain --file src/index.ts

# 2. Global command, straight from GitHub — no clone needed
npm install -g github:HIMURAw/DevTools-AI
devtools-ai list

# 3. Global command, from a local clone
git clone https://github.com/HIMURAw/DevTools-AI.git
cd DevTools-AI && npm install -g .`}</pre>
      <p>
        Methods 2 and 3 install a real <code>devtools-ai</code> command onto
        your <code>PATH</code> — the published package is a single bundled file
        (see <Link href="/docs/architecture">Architecture</Link>), so
        there&rsquo;s no separate build step to run yourself.
      </p>

      <h2>Configuration</h2>
      <p>
        The CLI reads <code>OPENROUTER_API_KEY</code> like any other terminal
        tool: from your shell environment, or from a <code>.env</code> /{" "}
        <code>.env.local</code> file in whatever directory you run it from.
        There&rsquo;s no separate CLI-only config file.
      </p>
      <pre>{`# Windows (PowerShell), current session only
$env:OPENROUTER_API_KEY = "sk-or-v1-..."

# Windows (PowerShell), persisted for future sessions
[Environment]::SetEnvironmentVariable("OPENROUTER_API_KEY", "sk-or-v1-...", "User")

# macOS/Linux
export OPENROUTER_API_KEY="sk-or-v1-..."`}</pre>
      <p>
        See <Link href="/docs/configuration">Configuration</Link> for what else
        is configurable.
      </p>

      <h2>Commands</h2>
      <pre>{`devtools-ai list                 # every available tool
devtools-ai models                # every allowed OpenRouter model
devtools-ai <tool> [text] [options]`}</pre>

      <h2>Input</h2>
      <p>
        Every tool command takes its main input one of three ways — the first
        one provided wins:
      </p>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Inline text</td>
            <td>
              <code>devtools-ai commit &quot;fixed the retry loop&quot;</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>--file &lt;path&gt;</code>
            </td>
            <td>
              <code>devtools-ai review --file src/app.ts</code>
            </td>
          </tr>
          <tr>
            <td>Piped stdin</td>
            <td>
              <code>git diff | devtools-ai commit</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Pass <code>--example</code> instead to run a tool against its built-in
        sample input — the same one the &ldquo;Example&rdquo; button loads on
        the web app.
      </p>

      <h2>Global flags</h2>
      <table>
        <thead>
          <tr>
            <th>Flag</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>-f, --file &lt;path&gt;</code>
            </td>
            <td>—</td>
            <td>Read the primary input from a file</td>
          </tr>
          <tr>
            <td>
              <code>--example</code>
            </td>
            <td>—</td>
            <td>Use the tool&rsquo;s built-in example input</td>
          </tr>
          <tr>
            <td>
              <code>-m, --model &lt;id&gt;</code>
            </td>
            <td>
              <code>qwen/qwen3-coder:free</code>
            </td>
            <td>
              Must be one of the models from <code>devtools-ai models</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>-t, --temperature &lt;number&gt;</code>
            </td>
            <td>
              <code>0.4</code>
            </td>
            <td>0 (deterministic) to 1.5 (creative)</td>
          </tr>
          <tr>
            <td>
              <code>--max-tokens &lt;number&gt;</code>
            </td>
            <td>
              <code>2048</code>
            </td>
            <td>256–8192</td>
          </tr>
          <tr>
            <td>
              <code>-h, --help</code>
            </td>
            <td>—</td>
            <td>
              Show a command&rsquo;s flags, e.g.{" "}
              <code>devtools-ai review --help</code>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Output and exit codes</h2>
      <p>
        The result streams to <strong>stdout</strong> as it&rsquo;s generated —
        nothing else. The &ldquo;Tool · Model&rdquo; status line and any errors
        go to <strong>stderr</strong>, so redirecting stdout captures exactly
        the clean result:
      </p>
      <pre>{`devtools-ai readme "..." > README.md
devtools-ai commit "..." | git commit -F -`}</pre>
      <p>
        Exit code is <code>0</code> on success and <code>1</code> on any failure
        — missing input, a rejected model, a validation error, or an
        OpenRouter/network error.
      </p>

      <h2>Every tool</h2>
      <p>
        Each command also accepts its own extra flags, shown below. Run{" "}
        <code>devtools-ai &lt;tool&gt; --help</code> to see them from the
        terminal.
      </p>

      {tools.map((tool) => {
        const extraFields = tool.fields.filter((field) => field.id !== "input")
        return (
          <div key={tool.id} className="mb-6">
            <h3>
              {tool.name} —{" "}
              <code>
                devtools-ai {tool.cliAlias}{" "}
                <span className="text-muted-foreground">({tool.slug})</span>
              </code>
            </h3>
            <p>{tool.shortDescription}</p>
            {extraFields.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Flag</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {extraFields.map((field) => (
                    <tr key={field.id}>
                      <td>
                        <code>--{toKebabCase(field.id)} &lt;value&gt;</code>
                      </td>
                      <td>
                        {field.label}
                        {field.options && (
                          <> ({field.options.map((o) => o.value).join(", ")})</>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <pre>{exampleCommands[tool.id]}</pre>
          </div>
        )
      })}
    </Prose>
  )
}
