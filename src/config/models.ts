import type { AiModelOption } from "@/types/ai"

export const AI_MODELS: AiModelOption[] = [
  {
    id: "qwen/qwen3-coder:free",
    label: "Qwen3 Coder 480B (free)",
    provider: "Qwen",
    description:
      "Coding-specialized model with a 1M token context window. Default for every tool.",
    contextLength: 1048576,
  },
  {
    id: "meta-llama/llama-3.3-70b-instruct:free",
    label: "Llama 3.3 70B Instruct (free)",
    provider: "Meta",
    description: "Strong general-purpose instruction-following model.",
    contextLength: 131072,
  },
  {
    id: "google/gemma-4-31b-it:free",
    label: "Gemma 4 31B IT (free)",
    provider: "Google",
    description: "Fast, well-rounded instruction-tuned model.",
    contextLength: 262144,
  },
  {
    id: "openai/gpt-oss-20b:free",
    label: "GPT-OSS 20B (free)",
    provider: "OpenAI",
    description: "OpenAI's open-weight model, good all-around reasoning.",
    contextLength: 131072,
  },
  {
    id: "nvidia/nemotron-3-super-120b-a12b:free",
    label: "Nemotron 3 Super (free)",
    provider: "NVIDIA",
    description: "Large context, frontier-leaning reasoning model.",
    contextLength: 1000000,
  },
  {
    id: "meta-llama/llama-3-8b-instruct:free",
    label: "Llama 3 8B Instruct (free)",
    provider: "Meta",
    description: "Efficient, high-quality instruction-following model.",
    contextLength: 8192,
  },
] as const

export const DEFAULT_MODEL_ID = AI_MODELS[0].id

export function isAllowedModel(modelId: string): boolean {
  return AI_MODELS.some((model) => model.id === modelId)
}
