import { getDefaultInput } from "@/services/tool.service"
import { runTool } from "@/services/ai-service"
import { AppError } from "@/lib/errors/app-error"
import { detectLanguage } from "@/lib/utils/detect-language"
import { AI_MODELS, isAllowedModel } from "@/config/models"
import {
  MAX_TOKENS_MAX,
  MAX_TOKENS_MIN,
  TEMPERATURE_MAX,
  TEMPERATURE_MIN,
} from "@/constants/limits"
import type { ToolDefinition, ToolInput } from "@/types/tool"
import { colors } from "@/cli/lib/colors"
import { resolvePrimaryInput } from "@/cli/lib/read-input"

export interface RunToolCommandOptions {
  file?: string
  example?: boolean
  model: string
  temperature: string
  maxTokens: string
  [fieldId: string]: unknown
}

export async function runToolCommand(
  tool: ToolDefinition,
  positional: string | undefined,
  options: RunToolCommandOptions
): Promise<void> {
  let input: ToolInput

  if (options.example) {
    input = { ...tool.exampleInput }
  } else {
    input = getDefaultInput(tool)
    input.input = await resolvePrimaryInput({
      file: options.file,
      positional,
    })

    for (const field of tool.fields) {
      if (field.id === "input") continue
      const value = options[field.id]
      if (typeof value === "string" && value.length > 0) {
        input[field.id] = value
      }
    }

    const hasLanguageField = tool.fields.some(
      (field) => field.id === "language"
    )
    if (hasLanguageField && !input.language) {
      const detected = detectLanguage(input.input)
      if (detected) input.language = detected
    }
  }

  if (!input.input) {
    console.error(
      colors.red(
        "No input provided. Pass text, use --file <path>, pipe via stdin, or pass --example."
      )
    )
    process.exitCode = 1
    return
  }

  if (!isAllowedModel(options.model)) {
    console.error(
      colors.red(
        `Model "${options.model}" isn't allowed. Run "devtools-ai models" to see available models.`
      )
    )
    process.exitCode = 1
    return
  }

  const temperature = Number(options.temperature)
  if (
    Number.isNaN(temperature) ||
    temperature < TEMPERATURE_MIN ||
    temperature > TEMPERATURE_MAX
  ) {
    console.error(
      colors.red(
        `--temperature must be a number between ${TEMPERATURE_MIN} and ${TEMPERATURE_MAX}.`
      )
    )
    process.exitCode = 1
    return
  }

  const maxTokens = Number(options.maxTokens)
  if (
    Number.isNaN(maxTokens) ||
    maxTokens < MAX_TOKENS_MIN ||
    maxTokens > MAX_TOKENS_MAX
  ) {
    console.error(
      colors.red(
        `--max-tokens must be a number between ${MAX_TOKENS_MIN} and ${MAX_TOKENS_MAX}.`
      )
    )
    process.exitCode = 1
    return
  }

  const parsed = tool.schema.safeParse(input)
  if (!parsed.success) {
    console.error(
      colors.red(parsed.error.issues[0]?.message ?? "Invalid input.")
    )
    process.exitCode = 1
    return
  }

  const modelLabel =
    AI_MODELS.find((m) => m.id === options.model)?.label ?? options.model
  console.error(colors.dim(`${tool.name} · ${modelLabel}\n`))

  try {
    const stream = await runTool({
      tool,
      input: parsed.data as ToolInput,
      model: options.model,
      temperature,
      maxTokens,
    })

    const reader = stream.getReader()
    const decoder = new TextDecoder()
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      process.stdout.write(decoder.decode(value, { stream: true }))
    }
    process.stdout.write("\n")
  } catch (error) {
    if (error instanceof AppError) {
      console.error(colors.red(`\n${error.message}`))
    } else {
      console.error(
        colors.red(
          `\nUnexpected error: ${error instanceof Error ? error.message : String(error)}`
        )
      )
    }
    process.exitCode = 1
  }
}
