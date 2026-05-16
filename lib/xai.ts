import OpenAI from 'openai'

export const CHAT_MODEL = 'llama-3.3-70b-versatile'

let _groq: OpenAI | null = null

export function getGroq(): OpenAI {
  if (!_groq) {
    _groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY!,
      baseURL: 'https://api.groq.com/openai/v1',
    })
  }
  return _groq
}

// Keep named export for backwards compat — lazy proxy
export const groq = new Proxy({} as OpenAI, {
  get(_target, prop) {
    return (getGroq() as unknown as Record<string | symbol, unknown>)[prop]
  },
})
