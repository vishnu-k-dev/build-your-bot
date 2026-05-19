import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Nav */}
      <nav className="px-8 py-5 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <span className="font-bold text-slate-900 tracking-tight">WCT Assistant</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-sm text-slate-500 hover:text-slate-700 transition font-medium">Admin</Link>
          <Link href="/wct" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
            Chat Now →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full mb-8 border border-blue-100">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"/>
          AI-Powered · Available 24/7 · Instant Answers
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-3xl mb-6">
          Your College Questions,{' '}
          <span className="text-blue-600">Answered Instantly</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mb-10 leading-relaxed">
          WCT Assistant knows your timetable, exam schedule, fees, faculty contacts, hostel rules, and more.
          No waiting. No searching. Just ask.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/wct"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl text-base transition shadow-lg shadow-blue-200 flex items-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Chat Now — It&apos;s Free
          </Link>
          <p className="text-sm text-slate-400">No account needed · Just your name & USN</p>
        </div>

        {/* Quick topics */}
        <div className="flex flex-wrap justify-center gap-2 mt-12">
          {[
            "📅 Today's Timetable",
            "📝 Exam Schedule",
            "💰 Fee Structure",
            "👨‍🏫 Faculty Contacts",
            "🏠 Hostel Rules",
            "📢 Recent Circulars",
            "🎓 Admission Info",
            "📋 Attendance Policy",
          ].map(t => (
            <span key={t} className="bg-slate-50 border border-slate-200 text-slate-600 text-sm px-4 py-2 rounded-full font-medium">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 border-t border-slate-100 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                ),
                step: '01',
                title: 'Enter your details',
                desc: 'Just your name, USN, branch and semester. No password, no signup.',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                ),
                step: '02',
                title: 'Ask anything',
                desc: 'Type your question in plain English — timetable, fees, exams, faculty, rules.',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ),
                step: '03',
                title: 'Get an instant answer',
                desc: 'AI retrieves the exact information from college documents and responds in seconds.',
              },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <p className="text-xs font-bold text-blue-400 tracking-widest mb-2">STEP {item.step}</p>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-blue-600 px-6 py-10">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center text-white">
          <div>
            <p className="text-3xl font-extrabold">8</p>
            <p className="text-sm text-blue-200 mt-1">Knowledge sources</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">24/7</p>
            <p className="text-sm text-blue-200 mt-1">Always available</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">&lt; 3s</p>
            <p className="text-sm text-blue-200 mt-1">Response time</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to get answers?</h2>
        <p className="text-slate-500 mb-8">Stop waiting in queues. Your AI assistant is ready right now.</p>
        <Link
          href="/wct"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl text-base transition shadow-lg shadow-blue-100"
        >
          Start Chatting →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 px-8 py-5 flex items-center justify-between text-xs text-slate-400">
        <span>© 2025 Westbrook College of Technology</span>
        <span>Powered by Groq · Cohere · Supabase</span>
      </footer>
    </div>
  )
}
