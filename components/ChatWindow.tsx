'use client'

import { useState, useRef, useEffect } from 'react'
import { SourceCard } from './SourceCard'

interface Message {
  role: 'user' | 'bot'
  text: string
  sources?: Array<{ name: string; snippet: string }>
}

interface Props {
  botId?: string
  botName?: string
}

export function ChatWindow({ botId, botName = 'Assistant' }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: `Hi! I'm ${botName}. Ask me anything about our products or services.` },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send() {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: q }])
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, botId }),
      })
      const data = await res.json()
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: data.answer || data.error || 'Something went wrong.', sources: data.sources },
      ])
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Connection error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[85%]">
              <div className={`px-4 py-3 rounded-2xl text-sm ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-800 rounded-bl-sm'
              }`}>
                {m.text}
              </div>
              {m.sources?.map((s, j) => <SourceCard key={j} source={s} />)}
              {m.role === 'bot' && i > 0 && (
                <div className="flex gap-2 mt-1 ml-1">
                  <button className="text-gray-400 hover:text-green-500 text-sm" title="Helpful">👍</button>
                  <button className="text-gray-400 hover:text-red-400 text-sm" title="Not helpful">👎</button>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 px-4 py-3 rounded-2xl rounded-bl-sm text-sm animate-pulse">…</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-gray-200 p-3 flex gap-2">
        <input
          type="text"
          placeholder="Type your question…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  )
}
