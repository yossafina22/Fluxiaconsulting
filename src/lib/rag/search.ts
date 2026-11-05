import type { Chunk } from "./knowledgeStore";

const STOPWORDS = new Set([
  "le","la","les","un","une","des","du","de","et","ou","que","qui","quoi","mais","est","sont",
  "a","au","aux","ce","ces","mon","mes","ma","votre","vos","nous","vous","dans","pour","par",
  "sur","avec","sans","pas","ne","en","se","si","the","a","an","is","are","was","were","of","to",
  "in","on","at","and","or","but","for","with","as","by","be","we","you","it","this","that",
  "der","die","das","den","dem","des","ein","eine","einen","einem","einer","und","oder","aber",
  "ist","sind","war","waren","wird","werden","nicht","auch","im","in","zu","mit","von","bei","auf"
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

export function searchChunks(
  chunks: Chunk[],
  query: string,
  topK = 3,
): Chunk[] {
  const q = tokenize(query);
  if (q.length === 0) return [];
  const scored = chunks.map((chunk) => {
    const titleTokens = tokenize(chunk.title);
    const bodyTokens = tokenize(chunk.body);
    let score = 0;
    for (const term of q) {
      if (titleTokens.includes(term)) score += 3;
      for (const b of bodyTokens) if (b === term) score += 1;
    }
    return { chunk, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.chunk);
}
