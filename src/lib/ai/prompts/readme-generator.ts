import { z } from "zod"

import { MAX_INPUT_LENGTH } from "@/constants/limits"
import type { ToolInput, ToolPrompt } from "@/types/tool"

export const schema = z.object({
  input: z
    .string()
    .min(1, "Describe your project so a README can be generated.")
    .max(MAX_INPUT_LENGTH, "That's a lot of detail — try trimming it down."),
})

export function buildPrompt(input: ToolInput): ToolPrompt {
  return {
    system:
      "You write professional, well-structured README.md files for software projects. " +
      "Based on the project details provided, produce a complete README in Markdown with sections such as: " +
      "title and one-line description, Features, Installation, Usage, Configuration/Environment Variables (if relevant), " +
      "and License. Only include sections that make sense given the provided details — do not invent features, " +
      "commands, or environment variables that weren't mentioned or reasonably implied.",
    user: `Generate a README.md for this project:\n\n${input.input}`,
  }
}
