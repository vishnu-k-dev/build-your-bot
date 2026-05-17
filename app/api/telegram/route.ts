export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { BOT_ID } from '@/data/college-knowledge-base'

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`

async function sendMessage(chatId: number, text: string) {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
    }),
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const message = body?.message
    if (!message?.text || !message?.chat?.id) return NextResponse.json({ ok: true })

    const chatId: number = message.chat.id
    const userText: string = message.text.trim()
    const firstName: string = message.from?.first_name || 'Student'

    // Greeting
    if (['/start', '/hello', '/hi'].includes(userText.toLowerCase())) {
      await sendMessage(
        chatId,
        `👋 Hello *${firstName}*! I'm the *WCT Assistant* for Westbrook College of Technology.\n\nYou can ask me about:\n• 📅 Today's timetable\n• 📝 Exam schedule & dates\n• 💰 Fee structure & payment\n• 🎓 Admissions 2025-26\n• 🏫 Faculty contacts\n• 🏠 Hostel rules\n\nJust type your question!`
      )
      return NextResponse.json({ ok: true })
    }

    // /help command
    if (userText.toLowerCase() === '/help') {
      await sendMessage(
        chatId,
        `*WCT Assistant — Help*\n\nTry asking:\n• "What is the timetable for Monday?"\n• "When is the Machine Learning exam?"\n• "What is the MCA fee?"\n• "When do admissions open?"\n• "Who is the HOD of MCA?"\n• "What are the hostel timings?"\n• "How much attendance do I need?"`
      )
      return NextResponse.json({ ok: true })
    }

    // Sending typing indicator
    await fetch(`${TELEGRAM_API}/sendChatAction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, action: 'typing' }),
    })

    // Call the chat API
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://build-your-bot.vercel.app'
    const chatRes = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: userText, botId: BOT_ID }),
    })

    const chatData = await chatRes.json()
    let reply = chatData.answer || chatData.error || "Sorry, I couldn't process your request. Please try again."

    // Append source references if available
    if (chatData.sources && chatData.sources.length > 0) {
      const sourceNames = [...new Set((chatData.sources as { name: string }[]).map(s => s.name))]
      reply += `\n\n📚 _Source: ${sourceNames.join(', ')}_`
    }

    await sendMessage(chatId, reply)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Telegram webhook error:', e)
    return NextResponse.json({ ok: true }) // Always return 200 to Telegram
  }
}

// Verify webhook (GET for health check)
export async function GET() {
  return NextResponse.json({ ok: true, bot: 'WCT Assistant Telegram Webhook active' })
}
