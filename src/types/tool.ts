import type { LucideIcon } from "lucide-react"
import type { ZodTypeAny } from "zod"

export type ToolCategory = "generate" | "analyze" | "convert"
export type ToolOutputFormat = "markdown" | "code" | "text"

export type ToolInput = Record<string, string>

export interface ToolField {
  id: string
  label: string
  type: "textarea" | "text" | "select"
  placeholder?: string
  required?: boolean
  rows?: number
  options?: { label: string; value: string }[]
}

export interface ToolPrompt {
  system: string
  user: string
}

export interface ToolDefinition {
  id: string
  slug: string
  name: string
  shortDescription: string
  longDescription: string
  category: ToolCategory
  icon: LucideIcon
  outputFormat: ToolOutputFormat
  fields: ToolField[]
  exampleInput: ToolInput
  schema: ZodTypeAny
  buildPrompt: (input: ToolInput) => ToolPrompt
}
