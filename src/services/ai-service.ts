import { streamChatCompletion } from "@/lib/ai/openrouter-client"
import type { ToolDefinition, ToolInput } from "@/types/tool"

export interface RunToolParams {
  tool: ToolDefinition
  input: ToolInput
  model: string
  temperature: number
  maxTokens: number
}

export function runTool(
  params: RunToolParams
): Promise<ReadableStream<Uint8Array>> {
  const { tool, input, model, temperature, maxTokens } = params
  const prompt = tool.buildPrompt(input)

  return streamChatCompletion({
    model,
    temperature,
    maxTokens,
    messages: [
      { role: "system", content: prompt.system },
      { role: "user", content: prompt.user },
    ],
  })
}
