'use client'

interface Source {
  name: string
  snippet: string
}

export function SourceCard({ source }: { source: Source }) {
  return (
    <div className="mt-2 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm">
      <div className="flex items-center gap-1.5 font-medium text-blue-700 mb-1">
        <span>📄</span>
        <span className="truncate max-w-[200px]">{source.name}</span>
      </div>
      <p className="text-gray-600 line-clamp-3 italic">"{source.snippet}..."</p>
    </div>
  )
}
