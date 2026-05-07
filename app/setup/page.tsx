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
  const progress = Math.round(((currentQ + 1) / (total + 1)) * 100) // +1 for naming step

  function handleAnswer(value: string) {
    setAnswers(prev => ({ ...prev, [q.id]: value }))
  }

  function next() {
    if (currentQ < total - 1) {
      setCurrentQ(c => c + 1)
    } else {
      setStep('naming')
    }
  }

  function back() {
    if (step === 'naming') {
      setStep('survey')
      setCurrentQ(total - 1)
    } else if (currentQ > 0) {
      setCurrentQ(c => c - 1)
    }
  }

  async function finish() {
    if (!businessName.trim() || !botName.trim()) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/bot-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, botName, survey: answers }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      localStorage.setItem('botId', data.botId)
      localStorage.setItem('botName', botName)
      localStorage.setItem('businessName', businessName)
      router.push('/chat')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setSaving(false)
    }
  }

  // ── Naming step (last) ───────────────────────────────────────────
  if (step === 'naming') {
    const namingProgress = Math.round((total / (total + 1)) * 100)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">B</div>
              <span className="text-sm font-medium text-gray-600">Almost done!</span>
            </div>
            <span className="text-xs text-gray-400">{total + 1} / {total + 1}</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-8">
            <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" style={{ width: `${namingProgress}%` }} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Last step — name your bot</h2>
              <p className="text-sm text-gray-400 mb-5">This is what customers will see</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Your business name</label>
              <input
                type="text"
                placeholder="e.g. Bloom Boutique"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                autoFocus
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">What should we call your bot?</label>
              <input
                type="text"
                placeholder="e.g. Aria, Max, Support Bot"
                value={botName}
                onChange={e => setBotName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && finish()}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-between pt-1">
              <button onClick={back} className="text-sm text-gray-400 hover:text-gray-600">← Back</button>
              <button
                onClick={finish}
                disabled={saving || !businessName.trim() || !botName.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                {saving ? 'Creating your bot…' : '🚀 Launch My Bot'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Survey screen ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">B</div>
            <span className="text-sm font-medium text-gray-600">Build Your Bot</span>
          </div>
          <span className="text-xs text-gray-400">{currentQ + 1} / {total + 1}</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-8">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">{q.question}</h2>
          <p className="text-sm text-gray-400 mb-5">{q.hint}</p>

          {q.type === 'select' && (
            <div className="space-y-2.5">
              {q.options!.map(opt => (
                <button
                  key={opt}
                  onClick={() => { handleAnswer(opt); setTimeout(next, 200) }}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-colors ${
                    answers[q.id] === opt
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  {opt}
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
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          )}

          {q.type === 'textarea' && (
            <textarea
              placeholder={q.hint}
              value={answers[q.id] || ''}
              onChange={e => handleAnswer(e.target.value)}
              rows={4}
              autoFocus
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 resize-none"
            />
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={back}
              className={`text-sm text-gray-400 hover:text-gray-600 transition-colors ${currentQ === 0 ? 'invisible' : ''}`}
            >
              ← Back
            </button>

            {q.type !== 'select' && (
              <button
                onClick={next}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        <p className="text-center mt-4">
          <button onClick={next} className="text-xs text-gray-400 hover:text-gray-500 underline underline-offset-2">
            Skip this question
          </button>
        </p>
      </div>
    </div>
  )
}
