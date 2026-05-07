import { ChatWindow } from '@/components/ChatWindow'

export default function EmbedPage() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="bg-blue-600 px-4 py-3 flex items-center gap-2">
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white text-xs">🤖</div>
        <span className="text-white font-medium text-sm">AI Assistant</span>
        <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatWindow />
      </div>
    </div>
  )
}
