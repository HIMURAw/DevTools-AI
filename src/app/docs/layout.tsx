import { DocsSidebar } from "@/components/layout/docs-sidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <DocsSidebar />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}
