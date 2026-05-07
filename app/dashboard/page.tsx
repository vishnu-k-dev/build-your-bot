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
    const bn = localStorage.getItem('botName') || 'Your Bot'
    const biz = localStorage.getItem('businessName') || ''
    setBotId(id)
    setBotName(bn)
    setBusinessName(biz)

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
    } catch {
      setTrainStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">B</div>
          <div>
            <p className="font-semibold text-gray-900 text-sm leading-tight">{botName}</p>
            <p className="text-xs text-gray-400">{businessName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {trainStatus === 'ready' && (
            <Link href={`/chat?botId=${botId}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Open Chat →
            </Link>
          )}
          <Link href="/setup" className="text-xs text-gray-400 hover:text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100">
            Edit Setup
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-500 mt-1">Teach <span className="font-medium text-blue-600">{botName}</span> about your business.</p>
        </div>

        <UploadPanel onUploaded={handleUploaded} botId={botId || undefined} />
        <SourceList sources={sources} onDelete={handleDelete} onTrain={handleTrain} trainStatus={trainStatus} />

        {trainStatus === 'ready' && (
          <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5 text-center">
            <p className="text-blue-700 font-semibold mb-1">🎉 {botName} is ready!</p>
            <p className="text-blue-500 text-sm mb-4">Your bot now knows your business inside out.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href={`/chat?botId=${botId}`} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700">
                Chat with {botName}
              </Link>
              <Link href="/embed-page" className="bg-white border border-blue-300 text-blue-700 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-50">
                Get Embed Code
              </Link>
            </div>
          </div>
        )}

        {sources.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center">
            <p className="text-3xl mb-2">📚</p>
            <p className="text-gray-500 font-medium">No content yet</p>
            <p className="text-gray-400 text-sm mt-1">Upload a PDF, add a URL, or paste FAQ text above</p>
          </div>
        )}
      </main>
    </div>
  )
}
