import { AppError } from "@/lib/errors/app-error"
import { siteConfig } from "@/config/site"
import type { CompletionRequest } from "@/types/ai"

const OPENROUTER_CHAT_COMPLETIONS_URL =
  "https://openrouter.ai/api/v1/chat/completions"

interface OpenRouterStreamChunk {
  choices?: { delta?: { content?: string } }[]
}

function createSseToTextStream(): TransformStream<Uint8Array, Uint8Array> {
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let buffer = ""

  return new TransformStream({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true })
      const lines = buffer.split("\n")
      buffer = lines.pop() ?? ""

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed.startsWith("data:")) continue

        const data = trimmed.slice(5).trim()
        if (data === "[DONE]") continue

        try {
          const parsed = JSON.parse(data) as OpenRouterStreamChunk
          const delta = parsed.choices?.[0]?.delta?.content
          if (delta) controller.enqueue(encoder.encode(delta))
        } catch {
          // Ignore partial/malformed SSE payloads; the buffer above
          // re-assembles lines split across chunk boundaries.
        }
      }
    },
  })
}

export async function streamChatCompletion(
  request: CompletionRequest
): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    throw new AppError(
      "MISSING_API_KEY",
      "OPENROUTER_API_KEY is not configured on the server.",
      500
    )
  }

  const response = await fetch(OPENROUTER_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": siteConfig.url,
      "X-Title": siteConfig.name,
    },
    body: JSON.stringify({
      model: request.model,
      messages: request.messages,
      temperature: request.temperature,
      max_tokens: request.maxTokens,
      stream: true,
    }),
  })

  if (!response.ok || !response.body) {
    const errorBody = await response.text().catch(() => "")
    const status = response.status === 429 ? 429 : 502
    throw new AppError(
      status === 429 ? "RATE_LIMITED" : "UPSTREAM_ERROR",
      `OpenRouter request failed (${response.status}): ${errorBody.slice(0, 300) || response.statusText}`,
      status
    )
  }

  return response.body.pipeThrough(createSseToTextStream())
}
