import { z } from "zod"

import { MAX_INPUT_LENGTH } from "@/constants/limits"
import type { ToolInput, ToolPrompt } from "@/types/tool"

export const schema = z.object({
  input: z
    .string()
    .min(1, "Paste some JSON to convert.")
    .max(MAX_INPUT_LENGTH)
    .refine(
      (value) => {
        try {
          JSON.parse(value)
          return true
        } catch {
          return false
        }
      },
      { message: "That doesn't look like valid JSON." }
    ),
  rootName: z.string().max(60),
})

export function buildPrompt(input: ToolInput): ToolPrompt {
  const rootName = input.rootName?.trim() || "Root"

  return {
    system:
      "You convert JSON into precise, idiomatic TypeScript types. Output ONLY TypeScript interface declarations in a fenced " +
      "code block — no explanation before or after. Infer the narrowest reasonable types (use union types for arrays with mixed " +
      "primitives, mark fields optional only when the JSON structure implies it, use string for date-like strings unless obviously " +
      `a number/boolean). Name the top-level interface "${rootName}" and give nested object types clear, descriptive names derived ` +
      "from their parent property.",
    user: `Convert this JSON to TypeScript interfaces:\n\n\`\`\`json\n${input.input}\n\`\`\``,
  }
}
