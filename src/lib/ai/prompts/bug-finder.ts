import { z } from "zod"

import { MAX_INPUT_LENGTH } from "@/constants/limits"
import type { ToolInput, ToolPrompt } from "@/types/tool"

export const schema = z.object({
  input: z
    .string()
    .min(1, "Paste some code to scan for bugs.")
    .max(MAX_INPUT_LENGTH, "That's too much code — try a smaller snippet."),
  language: z.string().max(40),
})

export function buildPrompt(input: ToolInput): ToolPrompt {
  const language = input.language?.trim()

  return {
    system:
      "You are a meticulous code reviewer focused on finding real bugs. Scan the given code for logic errors, " +
      "off-by-one mistakes, unhandled edge cases, race conditions, null/undefined dereferences, and incorrect assumptions. " +
      "For each issue found, give: severity (High/Medium/Low), a short title, the relevant line or snippet, why it's a problem, " +
      "and a concrete fix. If you find nothing, say so plainly instead of inventing issues. Respond in Markdown using a list.",
    user: `Find bugs in the following${language ? ` ${language}` : ""} code:\n\n\`\`\`${language.toLowerCase()}\n${input.input}\n\`\`\``,
  }
}
