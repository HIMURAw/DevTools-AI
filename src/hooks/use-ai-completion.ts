"use client"

import * as React from "react"

export type AiCompletionStatus =
  "idle" | "loading" | "streaming" | "success" | "error"

interface ExecuteParams {
  input: Record<string, string>
  model: string
  temperature: number
  maxTokens: number
}

interface UseAiCompletionResult {
  output: string
  status: AiCompletionStatus
  error: string | null
  execute: (params: ExecuteParams) => Promise<void>
  reset: () => void
}

export function useAiCompletion(toolSlug: string): UseAiCompletionResult {
  const [output, setOutput] = React.useState("")
  const [status, setStatus] = React.useState<AiCompletionStatus>("idle")
  const [error, setError] = React.useState<string | null>(null)
  const abortRef = React.useRef<AbortController | null>(null)

  const reset = React.useCallback(() => {
    abortRef.current?.abort()
    setOutput("")
    setStatus("idle")
    setError(null)
  }, [])

  React.useEffect(() => {
    return () => {
      abortRef.current?.abort()
    }
  }, [])

  const execute = React.useCallback(
    async (params: ExecuteParams) => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      setOutput("")
      setError(null)
      setStatus("loading")

      try {
        const response = await fetch(`/api/ai/${toolSlug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
          signal: controller.signal,
        })

        if (!response.ok || !response.body) {
          const data = await response.json().catch(() => null)
          throw new Error(
            data?.error?.message ?? `Request failed (${response.status})`
          )
        }

        setStatus("streaming")
        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          setOutput((prev) => prev + decoder.decode(value, { stream: true }))
        }

        setStatus("success")
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return
        setStatus("error")
        setError(err instanceof Error ? err.message : "Something went wrong.")
      }
    },
    [toolSlug]
  )

  return { output, status, error, execute, reset }
}
