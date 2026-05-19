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

interface StudentRow {
  id: string
  name: string
  usn: string
  branch: string
  semester: string
  created_at: string
}

export default function AdminDashboard() {
  const [feedback, setFeedback] = useState<FeedbackRow[]>([])
  const [students, setStudents] = useState<StudentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'overview' | 'students' | 'feedback'>('overview')
  const [feedbackFilter, setFeedbackFilter] = useState<'all' | 'up' | 'down'>('all')

  useEffect(() => {
    Promise.all([
      fetch(`/api/feedback?botId=${BOT_ID}`).then(r => r.json()),
      fetch('/api/students').then(r => r.json()),
    ]).then(([fb, st]) => {
      setFeedback(Array.isArray(fb) ? fb : [])
      setStudents(Array.isArray(st) ? st : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const upCount = feedback.filter(f => f.rating === 'up').length
  const downCount = feedback.filter(f => f.rating === 'down').length
  const totalFeedback = feedback.length
  const satisfactionRate = totalFeedback > 0 ? Math.round((upCount / totalFeedback) * 100) : null
  const shownFeedback = feedback.filter(f => feedbackFilter === 'all' || f.rating === feedbackFilter)

  // Branch breakdown
  const branchCount = students.reduce((acc, s) => {
    acc[s.branch] = (acc[s.branch] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
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

      {/* Tabs */}
      <div className="bg-white border-b border-slate-100 px-8">
        <div className="flex gap-1">
          {(['overview', 'students', 'feedback'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition capitalize ${tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
              {t === 'overview' ? '📊 Overview' : t === 'students' ? '🎓 Students' : '💬 Feedback'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center">
                <p className="text-3xl font-bold text-blue-600">{students.length}</p>
                <p className="text-sm text-slate-500 mt-1">Total Students</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center">
                <p className="text-3xl font-bold text-slate-900">{totalFeedback}</p>
                <p className="text-sm text-slate-500 mt-1">Questions Asked</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center">
                <p className="text-3xl font-bold text-emerald-600">{upCount} 👍</p>
                <p className="text-sm text-slate-500 mt-1">Helpful</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center">
                <p className="text-3xl font-bold text-slate-900">{satisfactionRate !== null ? `${satisfactionRate}%` : '—'}</p>
                <p className="text-sm text-slate-500 mt-1">Satisfaction</p>
              </div>
            </div>

            {/* Branch breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Students by Branch</h2>
              {Object.keys(branchCount).length === 0 ? (
                <p className="text-sm text-slate-400">No students yet.</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(branchCount).sort((a, b) => b[1] - a[1]).map(([branch, count]) => (
                    <div key={branch} className="flex items-center gap-3">
                      <span className="text-sm text-slate-600 w-28 flex-shrink-0">{branch}</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${Math.round((count / students.length) * 100)}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 w-6 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent activity */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-900">Recent Questions</h2>
              </div>
              {loading ? (
                <div className="p-8 text-center text-slate-400 text-sm">Loading…</div>
              ) : feedback.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">No questions yet.</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {feedback.slice(0, 5).map(row => (
                    <div key={row.id} className="px-6 py-3.5 flex items-center justify-between gap-4">
                      <p className="text-sm text-slate-700 truncate">{row.question}</p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span>{row.rating === 'up' ? '👍' : '👎'}</span>
                        <span className="text-xs text-slate-400">{new Date(row.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* STUDENTS TAB */}
        {tab === 'students' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Registered Students</h2>
              <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">{students.length} total</span>
            </div>
            {loading ? (
              <div className="p-10 text-center text-slate-400 text-sm">Loading…</div>
            ) : students.length === 0 ? (
              <div className="p-10 text-center text-slate-400 text-sm">No students have used the chatbot yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">#</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">USN</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Branch</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Semester</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((s, i) => (
                      <tr key={s.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-3.5 text-slate-400">{i + 1}</td>
                        <td className="px-6 py-3.5 font-medium text-slate-800">{s.name}</td>
                        <td className="px-6 py-3.5 font-mono text-slate-600 text-xs">{s.usn || '—'}</td>
                        <td className="px-6 py-3.5">
                          <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">{s.branch}</span>
                        </td>
                        <td className="px-6 py-3.5 text-slate-600">{s.semester}</td>
                        <td className="px-6 py-3.5 text-slate-400 text-xs">{new Date(s.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* FEEDBACK TAB */}
        {tab === 'feedback' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Student Feedback</h2>
              <div className="flex gap-1">
                {(['all', 'up', 'down'] as const).map(t => (
                  <button key={t} onClick={() => setFeedbackFilter(t)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition ${feedbackFilter === t ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
                    {t === 'all' ? `All (${totalFeedback})` : t === 'up' ? `👍 ${upCount}` : `👎 ${downCount}`}
                  </button>
                ))}
              </div>
            </div>
            {loading ? (
              <div className="p-10 text-center text-slate-400 text-sm">Loading…</div>
            ) : shownFeedback.length === 0 ? (
              <div className="p-10 text-center text-slate-400 text-sm">No feedback yet.</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {shownFeedback.map(row => (
                  <div key={row.id} className="px-6 py-4 hover:bg-slate-50 transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 mb-1">Q: {row.question}</p>
                        <p className="text-xs text-slate-500 line-clamp-2">A: {row.answer}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-lg">{row.rating === 'up' ? '👍' : '👎'}</span>
                        <span className="text-xs text-slate-400">{new Date(row.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
