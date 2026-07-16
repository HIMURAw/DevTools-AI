import { z } from "zod"

import { MAX_INPUT_LENGTH } from "@/constants/limits"
import type { ToolInput, ToolPrompt } from "@/types/tool"

export const schema = z.object({
  input: z
    .string()
    .min(1, "Describe the pattern you need to match.")
    .max(MAX_INPUT_LENGTH),
  flavor: z.string().max(20),
})

export function buildPrompt(input: ToolInput): ToolPrompt {
  const flavor = input.flavor?.trim() || "JavaScript"

  return {
    system:
      `You write regular expressions for the ${flavor} regex flavor. Given a plain-language description, respond with: ` +
      "the regex pattern on its own line (wrapped in the language's normal delimiters where idiomatic, e.g. /pattern/flags for JavaScript), " +
      "followed by a short bullet list explaining each part of the pattern, followed by 2-3 example strings that match and 1 that doesn't. " +
      "Keep it concise and correct — test the pattern mentally against the examples before answering.",
    user: `Write a ${flavor} regular expression for: ${input.input}`,
  }
}
