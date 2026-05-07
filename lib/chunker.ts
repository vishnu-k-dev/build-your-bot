const CHUNK_SIZE = 2000
const OVERLAP = 150

export function chunkText(text: string): string[] {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  const chunks: string[] = []
  let start = 0

  while (start < cleaned.length) {
    const end = Math.min(start + CHUNK_SIZE, cleaned.length)
    chunks.push(cleaned.slice(start, end))
    if (end === cleaned.length) break
    start = end - OVERLAP
  }

  return chunks.filter(c => c.trim().length > 50)
}
