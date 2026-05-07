'use client'

interface Source {
  name: string
  snippet: string
}

export function SourceCard({ source }: { source: Source }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/60 px-3.5 py-2.5 text-xs">
      <div className="flex items-center gap-1.5 text-blue-600 font-semibold mb-1">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        </svg>
        <span className="truncate max-w-[180px]">{source.name}</span>
      </div>
      <p className="text-slate-500 italic leading-relaxed line-clamp-2">"{source.snippet}…"</p>
    </div>
  )
}
