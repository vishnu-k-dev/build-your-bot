'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SURVEY_QUESTIONS } from '@/lib/survey'

type Step = 'survey' | 'naming'

export default function SetupPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('survey')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [businessName, setBusinessName] = useState('')
  const [botName, setBotName] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const total = SURVEY_QUESTIONS.length
  const q = SURVEY_QUESTIONS[currentQ]
  const progressPct = Math.round(((currentQ + 1) / (total + 1)) * 100)

  function handleAnswer(value: string) {
    setAnswers(prev => ({ ...prev, [q.id]: value }))
  }

  function next() {
    if (currentQ < total - 1) setCurrentQ(c => c + 1)
    else setStep('naming')
  }

  function back() {
    if (step === 'naming') { setStep('survey'); setCurrentQ(total - 1) }
    else if (currentQ > 0) setCurrentQ(c => c - 1)
  }

  async function finish() {
    if (!businessName.trim() || !botName.trim()) return
    setSaving(true); setError('')

    // Generate UUID client-side so we don't depend on parsing the response body
    const botId = crypto.randomUUID()

    try {
      const res = await fetch('/api/bot-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ botId, businessName, botName, survey: answers }),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        const msg = text ? JSON.parse(text).error : `Server error ${res.status}`
        throw new Error(msg)
      }

      // Store and redirect — we already know the botId
      localStorage.setItem('botId', botId)
      localStorage.setItem('botName', botName)
      localStorage.setItem('businessName', businessName)
      router.push('/chat')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setSaving(false)
    }
  }

  const namingStep = step === 'naming'
  const namingProgress = Math.round((total / (total + 1)) * 100)

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Top bar */}
      <header className="w-full px-8 py-5 flex items-center justify-between border-b border-slate-100 bg-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span className="font-semibold text-slate-800 tracking-tight">Build Your Bot</span>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          Step {namingStep ? total + 1 : currentQ + 1} of {total + 1}
        </span>
      </header>

      {/* Progress */}
      <div className="w-full h-0.5 bg-slate-100">
        <div
          className="h-0.5 bg-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${namingStep ? namingProgress : progressPct}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">

          {namingStep ? (
            /* ── Naming step ── */
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Almost there!
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Name your bot</h1>
                <p className="text-slate-500">This is what your customers will see when they chat.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Business name</label>
                  <input
                    type="text"
                    placeholder="e.g. Bloom Boutique"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    autoFocus
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Bot name</label>
                  <input
                    type="text"
                    placeholder="e.g. Aria, Max, Support Bot"
                    value={botName}
                    onChange={e => setBotName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && finish()}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>
                )}
                <div className="flex items-center justify-between pt-2">
                  <button onClick={back} className="text-sm text-slate-400 hover:text-slate-600 transition font-medium">
                    ← Back
                  </button>
                  <button
                    onClick={finish}
                    disabled={saving || !businessName.trim() || !botName.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-200 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition text-sm flex items-center gap-2"
                  >
                    {saving ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"/> Creating…</>
                    ) : (
                      <>Launch My Bot <span>→</span></>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ── Survey step ── */
            <div>
              <div className="mb-8">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Question {currentQ + 1}
                </span>
                <h1 className="text-2xl font-bold text-slate-900 mt-2 mb-2 leading-snug">{q.question}</h1>
                <p className="text-slate-400 text-sm">{q.hint}</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                {q.type === 'select' && (
                  <div className="space-y-2.5">
                    {q.options!.map(opt => (
                      <button
                        key={opt}
                        onClick={() => { handleAnswer(opt); setTimeout(next, 180) }}
                        className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ${
                          answers[q.id] === opt
                            ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                            : 'border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${answers[q.id] === opt ? 'border-blue-500 bg-blue-500' : 'border-slate-300'}`}>
                            {answers[q.id] === opt && <span className="w-1.5 h-1.5 rounded-full bg-white"/>}
                          </span>
                          {opt}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {q.type === 'text' && (
                  <input
                    type="text"
                    placeholder={q.hint}
                    value={answers[q.id] || ''}
                    onChange={e => handleAnswer(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && next()}
                    autoFocus
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  />
                )}

                {q.type === 'textarea' && (
                  <textarea
                    placeholder={q.hint}
                    value={answers[q.id] || ''}
                    onChange={e => handleAnswer(e.target.value)}
                    rows={4}
                    autoFocus
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm resize-none"
                  />
                )}

                {q.type !== 'select' && (
                  <div className="flex items-center justify-between mt-5">
                    <button
                      onClick={back}
                      className={`text-sm text-slate-400 hover:text-slate-600 transition font-medium ${currentQ === 0 ? 'invisible' : ''}`}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={next}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition text-sm"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>

              <div className="text-center mt-5">
                <button onClick={next} className="text-xs text-slate-400 hover:text-slate-500 transition underline underline-offset-2">
                  Skip this question
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
