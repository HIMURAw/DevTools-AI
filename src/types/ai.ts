export interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export interface CompletionRequest {
  model: string
  messages: ChatMessage[]
  temperature: number
  maxTokens: number
}

export interface AiModelOption {
  id: string
  label: string
  provider: string
  description: string
  contextLength: number
}
