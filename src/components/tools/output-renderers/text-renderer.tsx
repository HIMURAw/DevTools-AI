export function TextRenderer({ content }: { content: string }) {
  return (
    <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-wrap">
      {content}
    </p>
  )
}
