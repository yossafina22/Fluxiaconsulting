import { AnthropicAdapter } from "./anthropic";
import { FaqFallbackAdapter } from "./faqFallback";
import type { LlmAdapter } from "./types";

let cached: LlmAdapter | null = null;

export function getLlm(): LlmAdapter {
  if (cached) return cached;
  const key = process.env.ANTHROPIC_API_KEY?.trim();
  const model = process.env.ANTHROPIC_MODEL?.trim() || "claude-haiku-5-5";
  cached = key ? new AnthropicAdapter(key, model) : new FaqFallbackAdapter();
  return cached;
}

export type { LlmAdapter, LlmContext, LlmReply } from "./types";
