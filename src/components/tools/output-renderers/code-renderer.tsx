export function CodeRenderer({ content }: { content: string }) {
  return (
    <pre className="border-border bg-muted/50 overflow-x-auto rounded-lg border p-4 font-mono text-sm leading-relaxed">
      <code>{content}</code>
    </pre>
  )
}
