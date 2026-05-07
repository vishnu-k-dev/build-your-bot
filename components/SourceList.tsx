'use client'

import React from 'react'

interface Source { id: string; name: string; type: string }

const typeIcon: Record<string, React.ReactElement> = {
  pdf: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
  ),
  url: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  ),
  faq: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
}

interface Props {
  sources: Source[]
  onDelete: (id: string) => void
  onTrain: () => void
  trainStatus: 'idle' | 'training' | 'ready' | 'error'
}

export function SourceList({ sources, onDelete, onTrain, trainStatus }: Props) {
  if (!sources.length) return null

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700">Sources</h2>
        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{sources.length}</span>
      </div>

      <ul className="divide-y divide-slate-50">
        {sources.map(s => (
          <li key={s.id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2.5 text-sm text-slate-700 min-w-0">
              <span className="text-slate-400 flex-shrink-0">{typeIcon[s.type]}</span>
              <span className="truncate text-sm">{s.name}</span>
            </div>
            <button
              onClick={() => onDelete(s.id)}
              className="text-slate-300 hover:text-red-400 transition ml-3 flex-shrink-0 p-1 rounded-lg hover:bg-red-50"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </button>
          </li>
        ))}
      </ul>

      <div className="px-5 py-4 border-t border-slate-100">
        <button
          onClick={onTrain}
          disabled={trainStatus === 'training'}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 ${
            trainStatus === 'ready'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
              : trainStatus === 'error'
              ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
              : 'bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white'
          }`}
        >
          {trainStatus === 'training' && (
            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Training…</>
          )}
          {trainStatus === 'ready' && (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Bot is ready — Retrain</>
          )}
          {trainStatus === 'idle' && 'Train Bot'}
          {trainStatus === 'error' && 'Training Failed — Retry'}
        </button>
      </div>
    </div>
  )
}
