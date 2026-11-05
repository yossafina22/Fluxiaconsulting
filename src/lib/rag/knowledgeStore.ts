import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/i18n/routing";

export type Chunk = {
  id: string;
  title: string;
  body: string;
  source: string;
};

type Store = Record<Locale, Chunk[]>;

let cache: Store | null = null;
let policyCache: string | null = null;

function root(): string {
  return process.cwd();
}

function readIfExists(p: string): string | null {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return null;
  }
}

function chunkify(markdown: string, source: string): Chunk[] {
  const lines = markdown.split(/\r?\n/);
  const chunks: Chunk[] = [];
  let currentTitle = "";
  let buffer: string[] = [];

  const flush = () => {
    if (!currentTitle && buffer.length === 0) return;
    const body = buffer.join("\n").trim();
    if (!body && !currentTitle) return;
    chunks.push({
      id: `${source}#${chunks.length}`,
      title: currentTitle || source,
      body,
      source,
    });
  };

  for (const line of lines) {
    const m = line.match(/^##\s+(.+)$/);
    if (m) {
      flush();
      currentTitle = m[1]?.trim() ?? "";
      buffer = [];
    } else if (/^#\s+/.test(line)) {
      // skip top-level title
    } else {
      buffer.push(line);
    }
  }
  flush();
  return chunks.filter((c) => c.body.length > 0);
}

function loadForLocale(locale: Locale): Chunk[] {
  const base = path.join(root(), "knowledge");
  const presentation = readIfExists(path.join(base, `fluxia_${locale}.md`));
  const faq = readIfExists(path.join(base, `faq_${locale}.md`));
  const chunks: Chunk[] = [];
  if (presentation) chunks.push(...chunkify(presentation, `fluxia_${locale}.md`));
  if (faq) chunks.push(...chunkify(faq, `faq_${locale}.md`));
  return chunks;
}

export function getKnowledge(): Store {
  if (cache) return cache;
  cache = {
    de: loadForLocale("de"),
    fr: loadForLocale("fr"),
    en: loadForLocale("en"),
  };
  return cache;
}

export function getAssistantPolicy(): string {
  if (policyCache) return policyCache;
  const p = path.join(root(), "knowledge", "assistant_policy.md");
  policyCache = readIfExists(p) ?? "";
  return policyCache;
}
