import { ChatWindow } from '@/components/ChatWindow'

export default function EmbedPage() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 leading-tight">AI Assistant</p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"/>
            <span className="text-xs text-emerald-600">Online</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatWindow />
      </div>
    </div>
  )
}
