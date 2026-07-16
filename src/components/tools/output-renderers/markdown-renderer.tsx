import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mt-6 mb-3 text-xl font-semibold first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-6 mb-2 text-lg font-semibold first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-5 mb-2 text-base font-semibold first:mt-0">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-foreground/90 mb-3 leading-relaxed last:mb-0">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="text-foreground font-semibold">{children}</strong>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-2"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-border text-muted-foreground mb-3 border-l-2 pl-3 last:mb-0">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-border my-4" />,
  code: ({ className, children, ...props }) => {
    const isBlock = className?.includes("language-")
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
    return (
      <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-[0.85em]">
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre className="border-border bg-muted/50 mb-3 overflow-x-auto rounded-lg border p-3 font-mono text-[0.85em] last:mb-0">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mb-3 overflow-x-auto last:mb-0">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-border bg-muted border px-2 py-1 text-left font-medium">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-border border px-2 py-1">{children}</td>
  ),
}

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="text-sm">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
