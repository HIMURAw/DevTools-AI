import { AlertCircleIcon, SparklesIcon } from "lucide-react"

import type { ToolOutputFormat } from "@/types/tool"
import type { AiCompletionStatus } from "@/hooks/use-ai-completion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CopyButton } from "@/components/tools/copy-button"
import { MarkdownRenderer } from "@/components/tools/output-renderers/markdown-renderer"
import { CodeRenderer } from "@/components/tools/output-renderers/code-renderer"
import { TextRenderer } from "@/components/tools/output-renderers/text-renderer"

interface ToolOutputPanelProps {
  status: AiCompletionStatus
  output: string
  error: string | null
  outputFormat: ToolOutputFormat
  onRetry: () => void
}

export function ToolOutputPanel({
  status,
  output,
  error,
  outputFormat,
  onRetry,
}: ToolOutputPanelProps) {
  return (
    <div className="glass-card flex min-h-[320px] flex-col rounded-2xl">
      <div className="border-border/60 flex items-center justify-between border-b px-4 py-3">
        <span className="text-muted-foreground text-sm font-medium">
          Output
        </span>
        <CopyButton value={output} disabled={status === "loading" || !output} />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {status === "idle" && (
          <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 py-12 text-center">
            <SparklesIcon className="size-6 opacity-50" />
            <p className="text-sm">Your result will appear here.</p>
          </div>
        )}

        {status === "loading" && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        )}

        {status === "error" && (
          <div className="flex h-full flex-col items-center justify-center gap-3 py-12 text-center">
            <AlertCircleIcon className="text-destructive size-6" />
            <p className="text-muted-foreground max-w-sm text-sm">{error}</p>
            <Button type="button" variant="outline" size="sm" onClick={onRetry}>
              Try again
            </Button>
          </div>
        )}

        {(status === "streaming" || status === "success") &&
          (output ? (
            <OutputRenderer format={outputFormat} content={output} />
          ) : (
            <div className="flex h-full items-center justify-center py-12">
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
      </div>
    </div>
  )
}

function OutputRenderer({
  format,
  content,
}: {
  format: ToolOutputFormat
  content: string
}) {
  if (format === "markdown") return <MarkdownRenderer content={content} />
  if (format === "code") return <CodeRenderer content={content} />
  return <TextRenderer content={content} />
}
