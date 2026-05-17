'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BOT_ID } from '@/data/college-knowledge-base'

interface FeedbackRow {
  id: string
  question: string
  answer: string
  rating: 'up' | 'down'
  created_at: string
}

export default function AdminDashboard() {
  const [feedback, setFeedback] = useState<FeedbackRow[]>([])
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)
  const [seedMsg, setSeedMsg] = useState('')
  const [seedProgress, setSeedProgress] = useState(0)
  const [seedTotal, setSeedTotal] = useState(0)
  const [tab, setTab] = useState<'all' | 'up' | 'down'>('all')

  useEffect(() => {
    fetch(`/api/feedback?botId=${BOT_ID}`)
      .then(r => r.json())
      .then(data => { setFeedback(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function seedKnowledgeBase() {
    setSeeding(true); setSeedMsg(''); setSeedProgress(0); setSeedTotal(0)
    try {
      // Step 1: init — get total doc count
      const init = await fetch('/api/seed', { method: 'POST' }).then(r => r.json())
      if (init.error) throw new Error(init.error)
      const total: number = init.total
      setSeedTotal(total)

      // Step 2: seed each doc individually
      for (let i = 0; i < total; i++) {
        setSeedMsg(`Seeding document ${i + 1} of ${total}…`)
        const res = await fetch(`/api/seed?doc=${i}`, { method: 'POST' })
        const data = await res.json()
        if (data.error) throw new Error(`Doc ${i + 1}: ${data.error}`)
        setSeedProgress(i + 1)
      }
      setSeedMsg(`✅ Done! Seeded ${total} documents successfully.`)
    } catch (e) {
      setSeedMsg(`❌ ${e instanceof Error ? e.message : 'Seed failed'}`)
    }
    setSeeding(false)
  }

  const shown = feedback.filter(f => tab === 'all' || f.rating === tab)
  const upCount = feedback.filter(f => f.rating === 'up').length
  const downCount = feedback.filter(f => f.rating === 'down').length
  const total = feedback.length
  const satisfactionRate = total > 0 ? Math.round((upCount / total) * 100) : null

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm">WCT Admin Dashboard</p>
            <p className="text-xs text-slate-400">Westbrook College of Technology</p>
          </div>
        </div>
        <Link href="/wct" className="text-sm text-blue-600 hover:underline font-medium">← Back to Chat</Link>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* Seed Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-semibold text-slate-900 mb-1">Knowledge Base</h2>
          <p className="text-sm text-slate-500 mb-4">Seed the bot with WCT college data — timetables, exams, fees, admissions, faculty, and more.</p>
          <div className="space-y-3">
            <button
              onClick={seedKnowledgeBase}
              disabled={seeding}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition flex items-center gap-2"
            >
              {seeding ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Seeding…</> : '🌱 Seed WCT Knowledge Base'}
            </button>
            {seeding && seedTotal > 0 && (
              <div className="space-y-1.5">
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((seedProgress / seedTotal) * 100)}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500">{seedProgress} / {seedTotal} documents</p>
              </div>
            )}
            {seedMsg && (
              <p className={`text-sm px-3 py-2 rounded-lg ${seedMsg.includes('❌') ? 'text-red-600 bg-red-50' : 'text-emerald-700 bg-emerald-50'}`}>
                {seedMsg}
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center">
            <p className="text-3xl font-bold text-slate-900">{total}</p>
            <p className="text-sm text-slate-500 mt-1">Total Feedback</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center">
            <p className="text-3xl font-bold text-emerald-600">{upCount} 👍</p>
            <p className="text-sm text-slate-500 mt-1">Helpful responses</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center">
            <p className="text-3xl font-bold text-slate-900">{satisfactionRate !== null ? `${satisfactionRate}%` : '—'}</p>
            <p className="text-sm text-slate-500 mt-1">Satisfaction Rate</p>
          </div>
        </div>

        {/* Feedback Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Student Feedback</h2>
            <div className="flex gap-1">
              {(['all', 'up', 'down'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition ${tab === t ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
                  {t === 'all' ? 'All' : t === 'up' ? '👍 Helpful' : '👎 Not Helpful'}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-400 text-sm">Loading feedback…</div>
          ) : shown.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-sm">No feedback yet. Students will rate responses in the chat.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {shown.map(row => (
                <div key={row.id} className="px-6 py-4 hover:bg-slate-50 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 mb-1">Q: {row.question}</p>
                      <p className="text-xs text-slate-500 line-clamp-2">A: {row.answer}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className={`text-lg`}>{row.rating === 'up' ? '👍' : '👎'}</span>
                      <span className="text-xs text-slate-400">{new Date(row.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Telegram Setup Guide */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-semibold text-slate-900 mb-1">📱 Telegram Bot Setup</h2>
          <p className="text-sm text-slate-500 mb-4">Connect students to WCT Assistant on Telegram in 3 steps.</p>
          <ol className="space-y-3 text-sm text-slate-700">
            <li className="flex gap-3">
              <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              <span>Open Telegram → search <strong>@BotFather</strong> → send <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">/newbot</code> → follow prompts → copy the <strong>Bot Token</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              <span>Add <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">TELEGRAM_BOT_TOKEN</code> and <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">NEXT_PUBLIC_APP_URL</code> to Vercel environment variables, then redeploy</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              <span>Set the webhook — run this in your browser (replace YOUR_TOKEN and YOUR_URL):<br/>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs mt-1 block break-all">
                  https://api.telegram.org/botYOUR_TOKEN/setWebhook?url=YOUR_VERCEL_URL/api/telegram
                </code>
              </span>
            </li>
          </ol>
          <p className="text-xs text-slate-400 mt-4">Once configured, students can chat with @YourBotName on Telegram and get instant answers.</p>
        </div>
      </div>
    </div>
  )
}
