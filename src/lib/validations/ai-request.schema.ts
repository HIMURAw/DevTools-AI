import { z } from "zod"

import {
  MAX_TOKENS_MAX,
  MAX_TOKENS_MIN,
  TEMPERATURE_MAX,
  TEMPERATURE_MIN,
} from "@/constants/limits"

export const aiRequestEnvelopeSchema = z.object({
  input: z.record(z.string(), z.string()),
  model: z.string().min(1),
  temperature: z.number().min(TEMPERATURE_MIN).max(TEMPERATURE_MAX),
  maxTokens: z.number().min(MAX_TOKENS_MIN).max(MAX_TOKENS_MAX),
})

export type AiRequestEnvelope = z.infer<typeof aiRequestEnvelopeSchema>
