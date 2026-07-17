import type { ToolDefinition, ToolInput } from "@/types/tool"

export function getDefaultInput(tool: ToolDefinition): ToolInput {
  return tool.fields.reduce<ToolInput>((acc, field) => {
    acc[field.id] =
      field.type === "select" ? (field.options?.[0]?.value ?? "") : ""
    return acc
  }, {})
}
