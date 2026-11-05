import { describe, expect, it } from "vitest";
import { searchChunks } from "../../src/lib/rag/search";
import type { Chunk } from "../../src/lib/rag/knowledgeStore";

const chunks: Chunk[] = [
  {
    id: "1",
    title: "Was kostet das?",
    body: "Die Kosten hängen von Umfang und Schnittstellen ab.",
    source: "faq_de.md",
  },
  {
    id: "2",
    title: "In welchen Ländern bieten Sie Leistungen an?",
    body: "In Deutschland, Frankreich und Belgien sowie auf Anfrage in Nachbarländern.",
    source: "faq_de.md",
  },
  {
    id: "3",
    title: "Ist die Lösung DSGVO-konform?",
    body: "Die Konformität hängt vom Anwendungsfall ab.",
    source: "faq_de.md",
  },
];

describe("searchChunks", () => {
  it("finds the pricing chunk for a cost question", () => {
    const res = searchChunks(chunks, "Was kostet das?");
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]?.title).toContain("kostet");
  });

  it("finds the country chunk for a country question", () => {
    const res = searchChunks(chunks, "welchen Ländern Leistungen");
    expect(res.length).toBeGreaterThan(0);
    const titles = res.map((c) => c.title);
    expect(titles.some((t) => t.includes("Ländern"))).toBe(true);
  });

  it("returns empty list when query has no useful tokens", () => {
    const res = searchChunks(chunks, "   ");
    expect(res).toHaveLength(0);
  });
});
