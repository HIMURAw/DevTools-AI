import { z } from "zod"

import { MAX_INPUT_LENGTH } from "@/constants/limits"
import type { ToolInput, ToolPrompt } from "@/types/tool"

export const schema = z.object({
  input: z
    .string()
    .min(1, "Paste a git diff or describe your changes.")
    .max(
      MAX_INPUT_LENGTH,
      "That's too long — try summarizing or splitting it up."
    ),
})

export function buildPrompt(input: ToolInput): ToolPrompt {
  return {
    system:
      "You write Conventional Commit messages (https://www.conventionalcommits.org). " +
      "Given a git diff or a plain description of changes, output ONLY the commit message — " +
      "a type(scope): subject line under 72 characters, optionally followed by a blank line and a short body " +
      "explaining the why when it adds real value. Valid types: feat, fix, refactor, perf, docs, test, chore, build, ci, style. " +
      "Do not add explanations, markdown formatting, or surrounding quotes — output the raw commit message text only.",
    user: `Generate a Conventional Commit message for these changes:\n\n${input.input}`,
  }
}
