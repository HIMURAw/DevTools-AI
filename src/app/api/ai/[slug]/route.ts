import { getToolBySlug } from "@/config/tools.config"
import { isAllowedModel } from "@/config/models"
import { AppError } from "@/lib/errors/app-error"
import { handleRouteError } from "@/lib/errors/handle-route-error"
import { aiRequestEnvelopeSchema } from "@/lib/validations/ai-request.schema"
import { runTool } from "@/services/ai-service"
import type { ToolInput } from "@/types/tool"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const tool = getToolBySlug(slug)

    if (!tool) {
      throw new AppError("TOOL_NOT_FOUND", `Unknown tool: ${slug}`, 404)
    }

    const json = await request.json().catch(() => null)
    const envelope = aiRequestEnvelopeSchema.safeParse(json)

    if (!envelope.success) {
      throw new AppError(
        "VALIDATION_ERROR",
        envelope.error.issues[0]?.message ?? "Invalid request.",
        400
      )
    }

    const { input, model, temperature, maxTokens } = envelope.data

    if (!isAllowedModel(model)) {
      throw new AppError(
        "MODEL_NOT_ALLOWED",
        `Model not allowed: ${model}`,
        400
      )
    }

    const parsedInput = tool.schema.safeParse(input)

    if (!parsedInput.success) {
      throw new AppError(
        "VALIDATION_ERROR",
        parsedInput.error.issues[0]?.message ?? "Invalid input.",
        400
      )
    }

    const stream = await runTool({
      tool,
      input: parsedInput.data as ToolInput,
      model,
      temperature,
      maxTokens,
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    return handleRouteError(error)
  }
}
