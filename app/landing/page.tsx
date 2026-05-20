import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">

      {/* Nav */}
      <nav className="px-8 py-5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <span className="font-black text-slate-900 tracking-tight text-lg">WCT Assistant</span>
        </div>
        <Link href="/wct"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-md shadow-indigo-200">
          Chat Now →
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-10 pb-24 overflow-hidden">

        {/* Background gradient blobs */}
        <div className="absolute top-[-80px] left-[-100px] w-[400px] h-[400px] bg-indigo-100 rounded-full opacity-60 blur-3xl pointer-events-none" />
        <div className="absolute top-[60px] right-[-80px] w-[300px] h-[300px] bg-pink-100 rounded-full opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[30%] w-[250px] h-[250px] bg-yellow-100 rounded-full opacity-40 blur-3xl pointer-events-none" />

        {/* Floating doodles */}
        {/* Graduation cap — top left */}
        <svg className="absolute top-8 left-[6%] opacity-20 rotate-[-12deg]" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>

        {/* Star — top right */}
        <svg className="absolute top-12 right-[8%] opacity-25 rotate-[20deg]" width="40" height="40" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>

        {/* Book — left */}
        <svg className="absolute top-[38%] left-[3%] opacity-20 rotate-[8deg]" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>

        {/* Lightbulb — right */}
        <svg className="absolute top-[30%] right-[4%] opacity-20 rotate-[-10deg]" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/>
          <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
        </svg>

        {/* Pencil — bottom left */}
        <svg className="absolute bottom-16 left-[8%] opacity-20 rotate-[30deg]" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="2" x2="22" y2="6"/><path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"/>
        </svg>

        {/* Sparkle dots scattered */}
        <div className="absolute top-[20%] left-[22%] w-3 h-3 bg-pink-400 rounded-full opacity-40" />
        <div className="absolute top-[55%] right-[18%] w-2 h-2 bg-indigo-400 rounded-full opacity-50" />
        <div className="absolute bottom-20 right-[30%] w-4 h-4 bg-yellow-400 rounded-full opacity-30" />
        <div className="absolute top-[15%] right-[25%] w-2 h-2 bg-emerald-400 rounded-full opacity-40" />

        {/* Squiggly line doodle — top center */}
        <svg className="absolute top-4 left-[40%] opacity-15" width="120" height="30" viewBox="0 0 120 30">
          <path d="M0 15 Q15 0 30 15 Q45 30 60 15 Q75 0 90 15 Q105 30 120 15" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>

        {/* Chat bubble doodle — bottom right */}
        <svg className="absolute bottom-8 right-[10%] opacity-15 rotate-[15deg]" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 text-xs font-bold px-4 py-2 rounded-full mb-8 border border-indigo-100 shadow-sm">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"/>
            AI-Powered · Free · Available 24/7
          </div>

          <h1 className="text-5xl sm:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Stop Googling.<br/>
            <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Just Ask WCT.
            </span>
          </h1>

          <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Timetables, exam dates, fees, faculty contacts, hostel rules — your college AI assistant knows it all. Get answers in seconds, not hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/wct"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-9 py-4 rounded-2xl text-base transition shadow-xl shadow-indigo-200 flex items-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Chat Now — It&apos;s Free
            </Link>
            <p className="text-sm text-slate-400 font-medium">No account · No password · Just your USN</p>
          </div>

          {/* Topic chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { emoji: '📅', label: "Today's Timetable", color: 'bg-blue-50 text-blue-700 border-blue-100' },
              { emoji: '📝', label: 'Exam Schedule', color: 'bg-purple-50 text-purple-700 border-purple-100' },
              { emoji: '💰', label: 'Fee Structure', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
              { emoji: '👨‍🏫', label: 'Faculty Contacts', color: 'bg-orange-50 text-orange-700 border-orange-100' },
              { emoji: '🏠', label: 'Hostel Rules', color: 'bg-pink-50 text-pink-700 border-pink-100' },
              { emoji: '📢', label: 'Circulars', color: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
              { emoji: '🎓', label: 'Admissions', color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
              { emoji: '📋', label: 'Attendance Policy', color: 'bg-red-50 text-red-700 border-red-100' },
            ].map(t => (
              <span key={t.label} className={`border text-sm px-4 py-2 rounded-full font-semibold ${t.color}`}>
                {t.emoji} {t.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAT PREVIEW MOCKUP ── */}
      <section className="bg-gradient-to-b from-white to-slate-50 px-6 py-16 flex flex-col items-center">
        <p className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-3">See it in action</p>
        <h2 className="text-2xl font-black text-slate-900 mb-10 text-center">Real questions. Real answers.</h2>

        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-100 overflow-hidden">
          {/* Mock header */}
          <div className="bg-indigo-600 px-5 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm">WCT Assistant</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"/>
                <span className="text-white/70 text-xs">Online</span>
              </div>
            </div>
          </div>

          {/* Mock messages */}
          <div className="p-5 space-y-4 bg-slate-50/50">
            {[
              { role: 'user', text: "What's today's timetable for MCA sem 4?" },
              { role: 'bot', text: "Here's your MCA Sem 4 schedule for Tuesday:\n9–10 AM · Cloud Computing · Prof. Rajan Mehta\n10–11 AM · Mobile App Dev · Prof. Priya Sharma\n11–12 PM · Machine Learning · Prof. Ananya Krishnan\n2–4 PM · Cloud & DevOps Lab" },
              { role: 'user', text: 'When is the ML exam?' },
              { role: 'bot', text: '📅 Machine Learning (CS401) exam is on June 2, 2025 from 10 AM – 1 PM in Exam Hall A (EA-101). Carry your Hall Ticket + College ID!' },
            ].map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-md'
                    : 'bg-white text-slate-700 border border-slate-100 shadow-sm rounded-bl-md'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Mock input */}
          <div className="px-4 py-3 border-t border-slate-100 flex gap-2">
            <div className="flex-1 bg-slate-100 rounded-xl px-4 py-2.5 text-xs text-slate-400">Ask anything about WCT…</div>
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold text-indigo-400 tracking-widest uppercase text-center mb-3">Simple as it gets</p>
          <h2 className="text-2xl font-black text-slate-900 text-center mb-10">Three steps to any answer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { step: '01', emoji: '🙋', color: 'bg-indigo-50 border-indigo-100', accent: 'text-indigo-600', title: 'Drop your details', desc: 'Name, USN, branch, semester. That\'s it. No email, no password.' },
              { step: '02', emoji: '💬', color: 'bg-pink-50 border-pink-100', accent: 'text-pink-600', title: 'Ask your question', desc: 'Type it exactly how you\'d text a friend. No special format needed.' },
              { step: '03', emoji: '⚡', color: 'bg-yellow-50 border-yellow-100', accent: 'text-yellow-600', title: 'Get the answer', desc: 'AI pulls the exact info from college documents. Done in seconds.' },
            ].map(item => (
              <div key={item.step} className={`${item.color} border rounded-2xl p-7 text-center`}>
                <div className="text-4xl mb-4">{item.emoji}</div>
                <p className={`text-xs font-black tracking-widest mb-2 ${item.accent}`}>STEP {item.step}</p>
                <h3 className="font-black text-slate-900 mb-2 text-base">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-12">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center text-white">
          {[
            { val: '8', label: 'Knowledge Sources' },
            { val: '24/7', label: 'Always On' },
            { val: '< 3s', label: 'Response Time' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-4xl font-black">{s.val}</p>
              <p className="text-sm text-white/70 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative px-6 py-20 text-center overflow-hidden bg-white">
        {/* doodle dots */}
        <div className="absolute top-6 left-[10%] w-3 h-3 bg-indigo-300 rounded-full opacity-50" />
        <div className="absolute bottom-10 right-[12%] w-4 h-4 bg-pink-300 rounded-full opacity-40" />
        <div className="absolute top-10 right-[20%] w-2 h-2 bg-yellow-400 rounded-full opacity-60" />

        <div className="text-5xl mb-5">🎓</div>
        <h2 className="text-3xl font-black text-slate-900 mb-3">Your AI campus buddy is ready.</h2>
        <p className="text-slate-500 mb-8 font-medium">No more chasing faculty for simple info. Ask. Get answers. Move on.</p>
        <Link href="/wct"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black px-9 py-4 rounded-2xl text-base transition shadow-xl shadow-indigo-200">
          Start Chatting — It&apos;s Free →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
        <span className="font-medium">© 2025 Westbrook College of Technology</span>
        <span>Built with Groq · Cohere · Supabase · Next.js</span>
      </footer>

    </div>
  )
}
