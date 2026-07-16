import { z } from "zod"

import { MAX_INPUT_LENGTH } from "@/constants/limits"
import type { ToolInput, ToolPrompt } from "@/types/tool"

export const schema = z.object({
  input: z
    .string()
    .min(1, "Describe what the email needs to say.")
    .max(MAX_INPUT_LENGTH),
  tone: z.string().max(20),
})

export function buildPrompt(input: ToolInput): ToolPrompt {
  const tone = input.tone?.trim() || "Professional"

  return {
    system:
      `You write clear, well-structured workplace emails in a ${tone.toLowerCase()} tone. ` +
      "Output ONLY the email: an appropriate subject line on the first line prefixed with 'Subject: ', a blank line, " +
      "then the email body with a greeting and sign-off placeholder like [Your name]. No commentary before or after.",
    user: `Write an email for this situation: ${input.input}`,
  }
}
