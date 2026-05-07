// Free embeddings via Hugging Face Inference API
// Model: all-MiniLM-L6-v2 → 384 dimensions

const HF_URL = 'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2'

async function hfEmbed(inputs: string | string[]): Promise<number[][]> {
  const res = await fetch(HF_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`HuggingFace embedding error: ${err}`)
  }

  const data = await res.json()
  // HF returns number[][] for array input, number[] for single string
  if (Array.isArray(data[0])) return data as number[][]
  return [data as number[]]
}

export async function embed(text: string): Promise<number[]> {
  const result = await hfEmbed(text)
  return result[0]
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  // HF inference API handles batches natively
  return hfEmbed(texts)
}
