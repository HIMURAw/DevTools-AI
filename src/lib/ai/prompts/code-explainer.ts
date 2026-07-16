import { z } from "zod"

import { MAX_INPUT_LENGTH } from "@/constants/limits"
import type { ToolInput, ToolPrompt } from "@/types/tool"

export const schema = z.object({
  input: z
    .string()
    .min(1, "Paste some code to explain.")
    .max(MAX_INPUT_LENGTH, "That's too much code — try a smaller snippet."),
  language: z.string().max(40),
})

export function buildPrompt(input: ToolInput): ToolPrompt {
  const language = input.language?.trim()

  return {
    system:
      "You are an expert software engineer who explains code clearly and precisely. " +
      "Break the explanation into: a one-sentence summary, a walkthrough of what the code does step by step, " +
      "and any notable patterns, side effects, or gotchas. Use Markdown with short paragraphs and code spans for identifiers. " +
      "Be accurate — never invent behavior the code doesn't have.",
    user: `Explain the following${language ? ` ${language}` : ""} code:\n\n\`\`\`${language.toLowerCase()}\n${input.input}\n\`\`\``,
  }
}
