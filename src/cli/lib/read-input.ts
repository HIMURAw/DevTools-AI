import { readFile } from "node:fs/promises"
import path from "node:path"

// The bin launcher pins the child process's cwd to the package root (so
// .env/.env.local resolve consistently) and forwards the user's real cwd
// here, so --file paths still resolve relative to where the user actually
// ran the command instead of relative to this package.
const callerCwd = process.env.DEVTOOLS_AI_CALLER_CWD || process.cwd()

async function readStdin(): Promise<string> {
  if (process.stdin.isTTY) return ""

  const chunks: Buffer[] = []
  for await (const chunk of process.stdin) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks).toString("utf-8").trim()
}

export async function resolvePrimaryInput(params: {
  file?: string
  positional?: string
}): Promise<string> {
  if (params.file) {
    const filePath = path.resolve(callerCwd, params.file)
    return (await readFile(filePath, "utf-8")).trim()
  }
  if (params.positional) {
    return params.positional
  }
  return readStdin()
}

export function toKebabCase(id: string): string {
  return id.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}
