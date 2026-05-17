// Free embeddings via @huggingface/inference SDK
// Model: sentence-transformers/all-MiniLM-L6-v2 → 384 dimensions

import { HfInference } from '@huggingface/inference'

let _hf: HfInference | null = null
function getHf() {
  if (!_hf) _hf = new HfInference(process.env.HUGGINGFACE_API_KEY)
  return _hf
}

const MODEL = 'sentence-transformers/all-MiniLM-L6-v2'

export async function embed(text: string): Promise<number[]> {
  const result = await getHf().featureExtraction({ model: MODEL, inputs: text })
  // Single string → number[] or number[][]
  if (Array.isArray(result) && Array.isArray(result[0])) return (result as number[][])[0]
  return result as unknown as number[]
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  const result = await getHf().featureExtraction({ model: MODEL, inputs: texts })
  return result as unknown as number[][]
}
