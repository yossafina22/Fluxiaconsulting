import type { LlmAdapter, LlmContext, LlmReply } from "./types";

import type { Locale } from "@/i18n/routing";

const UNKNOWN: Record<Locale, string> = {
  de: "Ich habe darauf aktuell keine Antwort. Bitte kontaktieren Sie uns: fluxia@fluxia-consulting.company oder +49 1575 0625673.",
  fr: "Je n'ai pas la réponse à cette question. Contactez-nous directement : fluxia@fluxia-consulting.company ou +49 1575 0625673.",
  en: "I don't have an answer for that. Please contact us directly: fluxia@fluxia-consulting.company or +49 1575 0625673.",
};

export class FaqFallbackAdapter implements LlmAdapter {
  async chat(ctx: LlmContext): Promise<LlmReply> {
    if (!ctx.knowledgeContext.trim()) {
      return { reply: UNKNOWN[ctx.locale], mode: "demo" };
    }
    const snippet = ctx.knowledgeContext
      .split(/\n{2,}/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 2)
      .join("\n\n");
    return { reply: snippet, mode: "demo" };
  }
}
