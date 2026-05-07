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
  const [fileName, setFileName] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function upload() {
    setError(''); setLoading(true)
    try {
      const fd = new FormData()
      fd.append('type', tab)
      if (botId) fd.append('botId', botId)

      if (tab === 'pdf') {
        const file = fileRef.current?.files?.[0]
        if (!file) throw new Error('Please select a PDF file')
        fd.append('file', file)
      } else if (tab === 'url') {
        if (!url) throw new Error('Please enter a URL')
        fd.append('url', url)
      } else {
        if (!faqText) throw new Error('Please enter some FAQ text')
        fd.append('name', faqName || 'FAQ')
        fd.append('text', faqText)
      }

      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      onUploaded(data.sourceId, data.name)
      setUrl(''); setFaqText(''); setFaqName(''); setFileName('')
      if (fileRef.current) fileRef.current.value = ''
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'pdf' as const, label: 'PDF', icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    )},
    { id: 'url' as const, label: 'Website URL', icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    )},
    { id: 'faq' as const, label: 'FAQ Text', icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    )},
  ]

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-100">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-colors ${
              tab === t.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/40'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      <div className="p-5">
        {tab === 'pdf' && (
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-slate-200 hover:border-blue-300 rounded-xl p-8 text-center cursor-pointer transition-colors group"
          >
            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={e => setFileName(e.target.files?.[0]?.name || '')}
            />
            <div className="w-10 h-10 bg-slate-100 group-hover:bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            {fileName ? (
              <p className="text-sm font-medium text-blue-600">{fileName}</p>
            ) : (
              <>
                <p className="text-sm font-medium text-slate-600">Click to upload PDF</p>
                <p className="text-xs text-slate-400 mt-1">Supports all PDF files</p>
              </>
            )}
          </div>
        )}

        {tab === 'url' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-50 transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <input
                type="url"
                placeholder="https://yoursite.com/faq"
                value={url}
                onChange={e => setUrl(e.target.value)}
                className="flex-1 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>
            <p className="text-xs text-slate-400">We'll extract the text content from this page</p>
          </div>
        )}

        {tab === 'faq' && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Source name (e.g. FAQ Page)"
              value={faqName}
              onChange={e => setFaqName(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-50 focus:border-blue-400 transition"
            />
            <textarea
              placeholder="Paste your FAQ content here…"
              value={faqText}
              onChange={e => setFaqText(e.target.value)}
              rows={5}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-50 focus:border-blue-400 transition resize-none"
            />
          </div>
        )}

        {error && (
          <div className="mt-3 flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-xs px-3.5 py-2.5 rounded-xl">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </div>
        )}

        <button
          onClick={upload}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-200 text-white font-semibold py-2.5 rounded-xl transition text-sm flex items-center justify-center gap-2"
        >
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/><span>Processing…</span></>
          ) : 'Add Source'}
        </button>
      </div>
    </div>
  )
}
