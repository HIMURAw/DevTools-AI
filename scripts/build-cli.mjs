import { build } from "esbuild"
import { rm } from "node:fs/promises"

await rm("dist/cli", { recursive: true, force: true })

await build({
  entryPoints: ["src/cli/index.ts"],
  outfile: "dist/cli/index.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  packages: "external",
  tsconfig: "tsconfig.json",
  logLevel: "info",
})
