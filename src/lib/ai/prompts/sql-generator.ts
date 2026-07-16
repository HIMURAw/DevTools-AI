import { z } from "zod"

import { MAX_INPUT_LENGTH } from "@/constants/limits"
import type { ToolInput, ToolPrompt } from "@/types/tool"

export const schema = z.object({
  input: z
    .string()
    .min(1, "Describe the query you need.")
    .max(MAX_INPUT_LENGTH),
  schemaInfo: z.string().max(MAX_INPUT_LENGTH),
  dialect: z.string().max(30),
})

export function buildPrompt(input: ToolInput): ToolPrompt {
  const dialect = input.dialect?.trim() || "PostgreSQL"
  const schemaInfo = input.schemaInfo?.trim()

  return {
    system:
      `You write correct, efficient ${dialect} SQL. Given a description of the data needed (and optionally a table schema), ` +
      "respond with a single SQL query in a fenced code block, followed by a short explanation of what it does and any assumptions made " +
      "about table or column names when no schema was provided. Prefer explicit column lists over SELECT *, and use parameterized " +
      "placeholders (e.g. $1, ?) instead of inventing literal values when the query would take input.",
    user: schemaInfo
      ? `Schema:\n${schemaInfo}\n\nWrite a ${dialect} query for: ${input.input}`
      : `Write a ${dialect} query for: ${input.input}`,
  }
}
