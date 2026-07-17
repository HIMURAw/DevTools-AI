#!/usr/bin/env node
import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"
import path from "node:path"

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const cliEntry = path.join(packageRoot, "src", "cli", "index.ts")

// Runs the TypeScript CLI entry directly via tsx's ESM loader, so no build
// step is required — this project isn't published/compiled to dist/.
// cwd is pinned to packageRoot so .env/.env.local resolve consistently
// regardless of where the user invokes the command from; the user's actual
// cwd is passed through so --file paths still resolve relative to it.
const child = spawn(
  process.execPath,
  ["--import", "tsx", cliEntry, ...process.argv.slice(2)],
  {
    stdio: "inherit",
    cwd: packageRoot,
    env: { ...process.env, DEVTOOLS_AI_CALLER_CWD: process.cwd() },
  }
)

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
  } else {
    process.exit(code ?? 0)
  }
})

child.on("error", (error) => {
  console.error(`Failed to start devtools-ai: ${error.message}`)
  process.exit(1)
})
