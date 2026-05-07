'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ChatWindow } from '@/components/ChatWindow'
import { Suspense, useEffect, useState } from 'react'

function ChatPageInner() {
  const params = useSearchParams()
  const botId = params.get('botId') || (typeof window !== 'undefined' ? localStorage.getItem('botId') : null)
  const [botName, setBotName] = useState('Assistant')
  const [businessName, setBusinessName] = useState('')

  useEffect(() => {
    setBotName(localStorage.getItem('botName') || 'Assistant')
    setBusinessName(localStorage.getItem('businessName') || '')
  }, [])

  return (
    <div className="h-screen bg-[#f8fafc] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
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
          <div className="flex items-center gap-1.5 ml-1">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/>
            <span className="text-xs text-emerald-600 font-medium">Online</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/dashboard"
            className="text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Add Knowledge
          </Link>
          <Link
            href="/setup"
            className="text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition font-medium"
          >
            Edit Setup
          </Link>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-hidden max-w-3xl w-full mx-auto px-4 py-4 flex flex-col">
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <ChatWindow botId={botId || undefined} botName={botName} />
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense>
      <ChatPageInner />
    </Suspense>
  )
}
