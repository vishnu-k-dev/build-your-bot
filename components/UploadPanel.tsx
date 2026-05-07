'use client'

import { useState, useRef } from 'react'

interface Props {
  onUploaded: (sourceId: string, name: string) => void
  botId?: string
}

export function UploadPanel({ onUploaded, botId }: Props) {
  const [tab, setTab] = useState<'pdf' | 'url' | 'faq'>('pdf')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [url, setUrl] = useState('')
  const [faqName, setFaqName] = useState('')
  const [faqText, setFaqText] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function upload() {
    setError('')
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('type', tab)

      if (tab === 'pdf') {
        const file = fileRef.current?.files?.[0]
        if (!file) throw new Error('Select a PDF')
        fd.append('file', file)
      } else if (tab === 'url') {
        if (!url) throw new Error('Enter a URL')
        fd.append('url', url)
      } else {
        if (!faqText) throw new Error('Enter FAQ text')
        fd.append('name', faqName || 'FAQ')
        fd.append('text', faqText)
      }

      if (botId) fd.append('botId', botId)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      onUploaded(data.sourceId, data.name)
      setUrl('')
      setFaqText('')
      setFaqName('')
      if (fileRef.current) fileRef.current.value = ''
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'pdf' as const, label: 'Upload PDF' },
    { id: 'url' as const, label: 'Website URL' },
    { id: 'faq' as const, label: 'FAQ Text' },
  ]

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex gap-2 mb-5">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'pdf' && (
        <div
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          <input ref={fileRef} type="file" accept=".pdf" className="hidden" />
          <p className="text-4xl mb-2">📄</p>
          <p className="text-gray-500">Click to select a PDF</p>
          <p className="text-xs text-gray-400 mt-1">{fileRef.current?.files?.[0]?.name || 'No file selected'}</p>
        </div>
      )}

      {tab === 'url' && (
        <input
          type="url"
          placeholder="https://yoursite.com/faq"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {tab === 'faq' && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Source name (e.g. FAQ Page)"
            value={faqName}
            onChange={e => setFaqName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Paste your FAQ content here..."
            value={faqText}
            onChange={e => setFaqText(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

      <button
        onClick={upload}
        disabled={loading}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-3 rounded-xl transition-colors"
      >
        {loading ? 'Processing…' : 'Add Source'}
      </button>
    </div>
  )
}
