import { z } from "zod"

import { MAX_INPUT_LENGTH } from "@/constants/limits"
import type { ToolInput, ToolPrompt } from "@/types/tool"

export const schema = z.object({
  input: z
    .string()
    .min(1, "Paste some code to review.")
    .max(MAX_INPUT_LENGTH, "That's too much code — try a smaller snippet."),
  language: z.string().max(40),
})

export function buildPrompt(input: ToolInput): ToolPrompt {
  const language = input.language?.trim()

  return {
    system:
      "You are a senior engineer performing a thorough code review. Structure your review in Markdown with sections: " +
      "**Summary** (one or two sentences), **Correctness** (bugs or risky logic), **Style & Readability**, " +
      "**Security** (only if relevant issues exist), and **Suggestions** (a prioritized list of concrete improvements). " +
      "Be direct and specific — reference the actual code rather than giving generic advice. If a section has nothing " +
      "notable, say so briefly rather than skipping it.",
    user: `Review the following${language ? ` ${language}` : ""} code:\n\n\`\`\`${language.toLowerCase()}\n${input.input}\n\`\`\``,
  }
}
