import { z } from "zod"

import { MAX_INPUT_LENGTH } from "@/constants/limits"
import type { ToolInput, ToolPrompt } from "@/types/tool"

export const schema = z.object({
  input: z
    .string()
    .min(1, "Paste some code to optimize.")
    .max(MAX_INPUT_LENGTH, "That's too much code — try a smaller snippet."),
  language: z.string().max(40),
})

export function buildPrompt(input: ToolInput): ToolPrompt {
  const language = input.language?.trim()

  return {
    system:
      "You are a performance-focused senior engineer. Review the given code for concrete opportunities to improve " +
      "performance, readability, and maintainability — unnecessary re-computation, inefficient data structures, " +
      "redundant work, unclear naming, overly complex control flow. For each suggestion, explain the impact and show a " +
      "before/after code snippet. Do not suggest changes that alter behavior unless you explicitly call that out. " +
      "Respond in Markdown.",
    user: `Suggest optimizations for this${language ? ` ${language}` : ""} code:\n\n\`\`\`${language.toLowerCase()}\n${input.input}\n\`\`\``,
  }
}
