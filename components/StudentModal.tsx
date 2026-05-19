'use client'
import { useState } from 'react'

export interface StudentInfo {
  name: string
  usn: string
  branch: string
  semester: string
}

interface Props {
  onSubmit: (info: StudentInfo) => void
}

export function StudentModal({ onSubmit }: Props) {
  const [name, setName] = useState('')
  const [usn, setUsn] = useState('')
  const [branch, setBranch] = useState('')
  const [semester, setSemester] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !usn.trim() || !branch || !semester) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true); setError('')
    try {
      await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), usn: usn.trim().toUpperCase(), branch, semester }),
      })
    } catch { /* silent — still proceed */ }
    onSubmit({ name: name.trim(), usn: usn.trim().toUpperCase(), branch, semester })
    setLoading(false)
  }

  const branches = ['MCA', 'BCA', 'B.Tech CSE', 'B.Tech IT', 'MBA']
  const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8']

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-7 border border-slate-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm leading-tight">WCT Assistant</p>
            <p className="text-xs text-slate-400">Westbrook College of Technology</p>
          </div>
        </div>

        <h2 className="text-lg font-bold text-slate-900 mb-1">Welcome! Quick intro 👋</h2>
        <p className="text-sm text-slate-500 mb-5">Just a few details before we start — no account needed.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">USN</label>
            <input
              type="text"
              placeholder="e.g. 1WB22MCA001"
              value={usn}
              onChange={e => setUsn(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Branch</label>
              <select
                value={branch}
                onChange={e => setBranch(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                <option value="">Select</option>
                {branches.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Semester</label>
              <select
                value={semester}
                onChange={e => setSemester(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                <option value="">Select</option>
                {semesters.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2 mt-2"
          >
            {loading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/><span>Starting…</span></>
              : 'Start Chatting →'
            }
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-4">
          Your info is only used to improve the chatbot experience.
        </p>
      </div>
    </div>
  )
}
