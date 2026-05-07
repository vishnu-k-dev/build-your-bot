'use client'

interface Source {
  id: string
  name: string
  type: string
}

const typeIcon: Record<string, string> = { pdf: '📄', url: '🌐', faq: '💬' }

interface Props {
  sources: Source[]
  onDelete: (id: string) => void
  onTrain: () => void
  trainStatus: 'idle' | 'training' | 'ready' | 'error'
}

export function SourceList({ sources, onDelete, onTrain, trainStatus }: Props) {
  if (!sources.length) return null

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="font-semibold text-gray-700 mb-4">Uploaded Sources</h2>
      <ul className="space-y-2 mb-5">
        {sources.map(s => (
          <li key={s.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
            <span className="flex items-center gap-2 text-sm text-gray-700 truncate">
              <span>{typeIcon[s.type] || '📁'}</span>
              <span className="truncate max-w-[220px]">{s.name}</span>
            </span>
            <button
              onClick={() => onDelete(s.id)}
              className="text-gray-400 hover:text-red-500 text-lg leading-none ml-2"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={onTrain}
        disabled={trainStatus === 'training'}
        className={`w-full py-3 rounded-xl font-semibold transition-colors ${
          trainStatus === 'ready'
            ? 'bg-green-500 text-white'
            : trainStatus === 'error'
            ? 'bg-red-500 text-white'
            : 'bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white'
        }`}
      >
        {trainStatus === 'training' && '⏳ Training…'}
        {trainStatus === 'ready' && '✓ Bot Ready — Train Again'}
        {trainStatus === 'idle' && 'Train Bot'}
        {trainStatus === 'error' && 'Training Failed — Retry'}
      </button>
    </div>
  )
}
