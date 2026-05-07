'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ChatWindow } from '@/components/ChatWindow'
import { Suspense, useEffect, useState } from 'react'

function ChatPageInner() {
  const params = useSearchParams()
  const botId = params.get('botId') || (typeof window !== 'undefined' ? localStorage.getItem('botId') : null)
  const [botName, setBotName] = useState('AI Assistant')

  useEffect(() => {
    const name = localStorage.getItem('botName')
    if (name) setBotName(name)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg">🤖</div>
          <span className="font-bold text-gray-900">{botName}</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            + Add Knowledge
          </Link>
          <Link href="/setup" className="text-xs text-gray-400 hover:text-gray-600">
            Edit Setup
          </Link>
        </div>
      </header>

      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 flex flex-col">
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
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
