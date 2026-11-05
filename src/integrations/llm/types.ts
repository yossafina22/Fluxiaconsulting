import type { Locale } from "@/i18n/routing";

export type LlmMessage = { role: "user" | "assistant"; content: string };

export type LlmContext = {
  locale: Locale;
  systemPrompt: string;
  knowledgeContext: string;
  history: LlmMessage[];
  userMessage: string;
};

export type LlmReply = {
  reply: string;
  mode: "live" | "demo";
};

export interface LlmAdapter {
  chat(context: LlmContext): Promise<LlmReply>;
}
