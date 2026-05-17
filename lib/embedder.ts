// Free embeddings via Cohere API
// Model: embed-english-light-v3.0 → 384 dimensions (matches DB schema)

import { CohereClient } from 'cohere-ai'

let _cohere: CohereClient | null = null
function getCohere() {
  if (!_cohere) _cohere = new CohereClient({ token: process.env.COHERE_API_KEY! })
  return _cohere
}

const MODEL = 'embed-english-light-v3.0'

export async function embed(text: string): Promise<number[]> {
  const res = await getCohere().embed({
    model: MODEL,
    texts: [text],
    inputType: 'search_query',
    embeddingTypes: ['float'],
  })
  return (res.embeddings as { float: number[][] }).float[0]
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  const res = await getCohere().embed({
    model: MODEL,
    texts,
    inputType: 'search_document',
    embeddingTypes: ['float'],
  })
  return (res.embeddings as { float: number[][] }).float
}
