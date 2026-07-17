import { readFile } from "node:fs/promises"

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
    return (await readFile(params.file, "utf-8")).trim()
  }
  if (params.positional) {
    return params.positional
  }
  return readStdin()
}

export function toKebabCase(id: string): string {
  return id.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}
