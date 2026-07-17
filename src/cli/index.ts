#!/usr/bin/env node
import { createRequire } from "node:module"
import { Command } from "commander"

import { tools } from "@/config/tools.config"
import { AI_MODELS, DEFAULT_MODEL_ID } from "@/config/models"
import { DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE } from "@/constants/limits"
import { colors } from "@/cli/lib/colors"
import { toKebabCase } from "@/cli/lib/read-input"
import { runToolCommand } from "@/cli/lib/run-tool-command"

// Next.js loads .env* files automatically; a standalone CLI process doesn't,
// so load the same files here for a consistent OPENROUTER_API_KEY setup.
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file)
  } catch {
    // File doesn't exist — fine, env vars may be set another way.
  }
}

const CLI_ALIASES: Record<string, string> = {
  "code-explainer": "explain",
  "bug-finder": "bugs",
  "commit-message-generator": "commit",
  "readme-generator": "readme",
  "regex-generator": "regex",
  "sql-generator": "sql",
  "json-to-typescript": "json2ts",
  "email-generator": "email",
  "code-optimizer": "optimize",
  "code-reviewer": "review",
}

const require = createRequire(import.meta.url)
const { version } = require("../../package.json") as { version: string }

const program = new Command()

program
  .name("devtools-ai")
  .description("AI-powered developer tools, from your terminal.")
  .version(version)

program
  .command("list")
  .description("List every available tool")
  .action(() => {
    for (const tool of tools) {
      const alias = CLI_ALIASES[tool.slug]
      const name = alias
        ? `${alias} ${colors.dim(`(${tool.slug})`)}`
        : tool.slug
      console.log(`  ${colors.cyan(name)}`)
      console.log(`    ${tool.shortDescription}`)
    }
  })

program
  .command("models")
  .description("List the OpenRouter models available to every tool")
  .action(() => {
    for (const model of AI_MODELS) {
      const isDefault = model.id === DEFAULT_MODEL_ID
      console.log(
        `  ${colors.cyan(model.id)}${isDefault ? colors.dim(" (default)") : ""}`
      )
      console.log(`    ${model.description}`)
    }
  })

for (const tool of tools) {
  const command = program
    .command(tool.slug)
    .description(tool.shortDescription)
    .argument("[text]", "Inline input text (omit to use --file or stdin)")
    .option("-f, --file <path>", "Read input from a file")
    .option("--example", "Run with this tool's built-in example input")
    .option("-m, --model <id>", "OpenRouter model id", DEFAULT_MODEL_ID)
    .option(
      "-t, --temperature <number>",
      "Sampling temperature",
      String(DEFAULT_TEMPERATURE)
    )
    .option(
      "--max-tokens <number>",
      "Maximum response tokens",
      String(DEFAULT_MAX_TOKENS)
    )

  const alias = CLI_ALIASES[tool.slug]
  if (alias) command.alias(alias)

  for (const field of tool.fields) {
    if (field.id === "input") continue
    const flag = `--${toKebabCase(field.id)} <value>`
    const description = field.options
      ? `${field.label} (${field.options.map((o) => o.value).join(", ")})`
      : field.label
    command.option(flag, description)
  }

  command.action(async (text: string | undefined, options) => {
    await runToolCommand(tool, text, options)
  })
}

program.parseAsync(process.argv).catch((error: unknown) => {
  console.error(
    colors.red(error instanceof Error ? error.message : String(error))
  )
  process.exitCode = 1
})
