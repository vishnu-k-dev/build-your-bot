'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { UploadPanel } from '@/components/UploadPanel'
import { SourceList } from '@/components/SourceList'

interface Source { id: string; name: string; type: string }

export default function Dashboard() {
  const [botId, setBotId] = useState<string | null>(null)
  const [botName, setBotName] = useState('Your Bot')
  const [businessName, setBusinessName] = useState('')
  const [sources, setSources] = useState<Source[]>([])
  const [pendingIds, setPendingIds] = useState<string[]>([])
  const [trainStatus, setTrainStatus] = useState<'idle' | 'training' | 'ready' | 'error'>('idle')

  useEffect(() => {
    const id = localStorage.getItem('botId')
    setBotId(id)
    setBotName(localStorage.getItem('botName') || 'Your Bot')
    setBusinessName(localStorage.getItem('businessName') || '')
    if (id) {
      fetch('/api/sources?botId=' + id).then(r => r.json()).then(data => {
        if (Array.isArray(data)) setSources(data)
      })
    }
  }, [])

  function handleUploaded(sourceId: string, name: string) {
    setSources(prev => [{ id: sourceId, name, type: 'pdf' }, ...prev])
    setPendingIds(prev => [...prev, sourceId])
    setTrainStatus('idle')
  }

  async function handleDelete(id: string) {
    await fetch('/api/sources', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setSources(prev => prev.filter(s => s.id !== id))
    setPendingIds(prev => prev.filter(p => p !== id))
  }

  async function handleTrain() {
    const ids = pendingIds.length ? pendingIds : sources.map(s => s.id)
    if (!ids.length) return
    setTrainStatus('training')
    try {
      await Promise.all(ids.map(id => fetch('/api/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceId: id }),
      })))
      setPendingIds([])
      setTrainStatus('ready')
    } catch { setTrainStatus('error') }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm leading-tight">{botName}</p>
            {businessName && <p className="text-xs text-slate-400">{businessName}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/setup" className="text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition font-medium">
            Edit Setup
          </Link>
          <Link
            href={`/chat?botId=${botId}`}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Open Chat
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Knowledge Base</h1>
          <p className="text-slate-500 text-sm mt-1">
            Teach <span className="font-medium text-blue-600">{botName}</span> about your business — PDFs, URLs, or text.
          </p>
        </div>

        <UploadPanel onUploaded={handleUploaded} botId={botId || undefined} />
        <SourceList sources={sources} onDelete={handleDelete} onTrain={handleTrain} trainStatus={trainStatus} />

        {sources.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
            </div>
            <p className="font-semibold text-slate-700 text-sm">No content yet</p>
            <p className="text-slate-400 text-xs mt-1">Upload a PDF, add a URL, or paste FAQ text above</p>
          </div>
        )}

        {trainStatus === 'ready' && (
          <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900 text-sm">🎉 {botName} is trained and ready!</p>
              <p className="text-slate-500 text-xs mt-0.5">Your bot now knows your business content.</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/chat?botId=${botId}`} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition">
                Chat now →
              </Link>
              <Link href="/embed-page" className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-slate-50 transition">
                Embed
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
