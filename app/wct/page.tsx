'use client'
import { useState, useEffect } from 'react'
import { ChatWindow } from '@/components/ChatWindow'
import { StudentModal, StudentInfo } from '@/components/StudentModal'
import { BOT_ID, BOT_NAME, COLLEGE_NAME } from '@/data/college-knowledge-base'
import Link from 'next/link'

const STORAGE_KEY = 'wct_student'

export default function WCTChatPage() {
  const [student, setStudent] = useState<StudentInfo | null>(null)
  const [ready, setReady] = useState(false)

  // Check localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setStudent(JSON.parse(saved))
    } catch { /* ignore */ }
    setReady(true)
  }, [])

  function handleStudentSubmit(info: StudentInfo) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info))
    setStudent(info)
  }

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', timeZone: 'Asia/Kolkata' })

  const quickAsks = [
    `What is the timetable for ${today}?`,
    'When is the Machine Learning exam?',
    'What is the MCA fee structure?',
    'How do I approach Prof. Ananya Krishnan?',
    'What are the hostel gate timings?',
    'How much attendance is required?',
    'Any recent circulars or announcements?',
    'When do admissions open for 2025-26?',
  ]

  return (
    <div className="h-screen bg-[#f8fafc] flex flex-col">

      {/* Student info modal */}
      {ready && !student && <StudentModal onSubmit={handleStudentSubmit} />}

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
          {student && (
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-xs">
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-700">{student.name}</p>
                <p className="text-xs text-slate-400">{student.branch} · {student.semester}</p>
              </div>
            </div>
          )}
          <button
            onClick={() => { localStorage.removeItem(STORAGE_KEY); setStudent(null) }}
            className="text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition"
          >
            Change
          </button>
        </div>
      </header>

      {/* Quick chips */}
      <div className="bg-white border-b border-slate-100 px-6 py-2.5 flex gap-2 overflow-x-auto flex-shrink-0 scrollbar-hide">
        {quickAsks.map(q => (
          <button
            key={q}
            onClick={() => window.dispatchEvent(new CustomEvent('wct-quick-ask', { detail: q }))}
            className="flex-shrink-0 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-3 py-1.5 rounded-full transition whitespace-nowrap"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-hidden max-w-3xl w-full mx-auto px-4 py-4 flex flex-col">
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <ChatWindow botId={BOT_ID} botName={BOT_NAME} enableFeedback studentName={student?.name} />
        </div>
      </div>

      <div className="text-center py-2 text-xs text-slate-400">
        WCT Assistant · AI-powered student support
      </div>
    </div>
  )
}
