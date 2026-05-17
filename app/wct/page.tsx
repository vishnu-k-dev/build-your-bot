'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { ChatWindow } from '@/components/ChatWindow'
import { BOT_ID, BOT_NAME, COLLEGE_NAME } from '@/data/college-knowledge-base'
import Link from 'next/link'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

export default function WCTChatPage() {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = getSupabase()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUser(data.user)
      setLoading(false)
    })
  }, [router])

  async function handleLogout() {
    await getSupabase().auth.signOut()
    router.push('/login')
  }

  if (loading) return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"/>
    </div>
  )

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student'
  const program = user?.user_metadata?.program
  const semester = user?.user_metadata?.semester

  return (
    <div className="h-screen bg-[#f8fafc] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm leading-tight">{BOT_NAME}</p>
            <p className="text-xs text-slate-400">{COLLEGE_NAME}</p>
          </div>
          <div className="flex items-center gap-1.5 ml-1">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/>
            <span className="text-xs text-emerald-600 font-medium">Online 24/7</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-slate-700">{displayName}</p>
            {program && <p className="text-xs text-slate-400">{program} {semester ? `· ${semester}` : ''}</p>}
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <button onClick={handleLogout} className="text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition">
            Sign Out
          </button>
        </div>
      </header>

      {/* Quick action chips */}
      <div className="bg-white border-b border-slate-100 px-6 py-2.5 flex gap-2 overflow-x-auto flex-shrink-0">
        {[
          "What's today's timetable?",
          "When is the Machine Learning exam?",
          "What is the MCA fee?",
          "When do admissions open?",
          "What are hostel timings?",
          "How much attendance is required?",
        ].map(q => (
          <button
            key={q}
            onClick={() => {
              const event = new CustomEvent('wct-quick-ask', { detail: q })
              window.dispatchEvent(event)
            }}
            className="flex-shrink-0 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-3 py-1.5 rounded-full transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-hidden max-w-3xl w-full mx-auto px-4 py-4 flex flex-col">
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <ChatWindow botId={BOT_ID} botName={BOT_NAME} enableFeedback />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-2 text-xs text-slate-400">
        WCT Assistant · Powered by AI · <Link href="/admin" className="hover:underline">Admin Dashboard</Link>
      </div>
    </div>
  )
}
