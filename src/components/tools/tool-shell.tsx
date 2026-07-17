"use client"

import * as React from "react"
import Link from "next/link"
import { Controller, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RotateCcwIcon, SparklesIcon, WandSparklesIcon } from "lucide-react"
import type { ZodType } from "zod"

import type { ToolDefinition, ToolInput } from "@/types/tool"
import { useAiCompletion } from "@/hooks/use-ai-completion"
import { useSettingsStore } from "@/lib/store/settings-store"
import { AI_MODELS } from "@/config/models"
import { getToolBySlug } from "@/config/tools.config"
import { getDefaultInput } from "@/services/tool.service"
import { detectLanguage } from "@/lib/utils/detect-language"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToolOutputPanel } from "@/components/tools/tool-output-panel"

export function ToolShell({ slug }: { slug: string }) {
  const tool = getToolBySlug(slug)

  // Never happens in practice — the page-level notFound() guard already
  // validates the slug — but keeps this component safe to use standalone.
  if (!tool) return null

  return <ToolShellForTool tool={tool} />
}

function ToolShellForTool({ tool }: { tool: ToolDefinition }) {
  const model = useSettingsStore((state) => state.model)
  const temperature = useSettingsStore((state) => state.temperature)
  const maxTokens = useSettingsStore((state) => state.maxTokens)
  const { output, status, error, execute, reset } = useAiCompletion(tool.slug)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset: resetForm,
    formState: { errors, dirtyFields },
  } = useForm<ToolInput>({
    resolver: zodResolver(tool.schema as ZodType<ToolInput, ToolInput>),
    defaultValues: getDefaultInput(tool),
  })

  const onSubmit = handleSubmit((values) => {
    execute({ input: values, model, temperature, maxTokens })
  })

  const hasLanguageField = tool.fields.some((field) => field.id === "language")
  const codeValue = useWatch({ control, name: "input" })
  const languageTouched = Boolean(dirtyFields.language)

  React.useEffect(() => {
    if (!hasLanguageField || languageTouched) return

    const timer = setTimeout(() => {
      const detected = detectLanguage(codeValue ?? "")
      if (detected) {
        setValue("language", detected, { shouldDirty: false })
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [codeValue, hasLanguageField, languageTouched, setValue])

  const handleLoadExample = () => {
    resetForm(tool.exampleInput)
  }

  const handleReset = () => {
    resetForm(getDefaultInput(tool))
    reset()
  }

  const isRunning = status === "loading" || status === "streaming"
  const currentModel = AI_MODELS.find((option) => option.id === model)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form
        onSubmit={onSubmit}
        className="glass-card flex flex-col gap-4 rounded-2xl p-5"
      >
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm font-medium">
            Input
          </span>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleLoadExample}
            >
              <WandSparklesIcon className="size-3.5" />
              Example
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
            >
              <RotateCcwIcon className="size-3.5" />
              Reset
            </Button>
          </div>
        </div>

        {tool.fields.map((field) => (
          <div key={field.id} className="flex flex-col gap-1.5">
            <Label htmlFor={field.id}>{field.label}</Label>

            {field.type === "textarea" && (
              <Textarea
                id={field.id}
                placeholder={field.placeholder}
                rows={field.rows ?? 6}
                className="font-mono text-sm"
                aria-invalid={Boolean(errors[field.id])}
                {...register(field.id)}
              />
            )}

            {field.type === "text" && (
              <Input
                id={field.id}
                placeholder={field.placeholder}
                aria-invalid={Boolean(errors[field.id])}
                {...register(field.id)}
              />
            )}

            {field.type === "select" && (
              <Controller
                control={control}
                name={field.id}
                render={({ field: controllerField }) => (
                  <Select
                    value={controllerField.value}
                    onValueChange={controllerField.onChange}
                  >
                    <SelectTrigger id={field.id} className="w-full">
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {(field.options ?? []).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            )}

            {errors[field.id] && (
              <p className="text-destructive text-xs">
                {errors[field.id]?.message}
              </p>
            )}
          </div>
        ))}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="text-muted-foreground text-xs">
            Using{" "}
            <span className="text-foreground font-medium">
              {currentModel?.label ?? model}
            </span>{" "}
            ·{" "}
            <Link href="/settings" className="underline underline-offset-2">
              Change
            </Link>
          </p>
          <Button type="submit" disabled={isRunning}>
            <SparklesIcon className="size-4" />
            {isRunning ? "Running…" : "Run"}
          </Button>
        </div>
      </form>

      <ToolOutputPanel
        status={status}
        output={output}
        error={error}
        outputFormat={tool.outputFormat}
        onRetry={onSubmit}
      />
    </div>
  )
}
