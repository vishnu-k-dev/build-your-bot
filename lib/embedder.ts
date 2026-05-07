import { xai, EMBED_MODEL } from './xai'

export async function embed(text: string): Promise<number[]> {
  const res = await xai.embeddings.create({ model: EMBED_MODEL, input: text })
  return res.data[0].embedding
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  const res = await xai.embeddings.create({ model: EMBED_MODEL, input: texts })
  return res.data.map(d => d.embedding)
}
