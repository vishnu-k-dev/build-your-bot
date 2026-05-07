import OpenAI from 'openai'

export const xai = new OpenAI({
  apiKey: process.env.XAI_API_KEY!,
  baseURL: 'https://api.x.ai/v1',
})

export const CHAT_MODEL = 'grok-3-mini'
export const EMBED_MODEL = 'text-embedding-3-small'
