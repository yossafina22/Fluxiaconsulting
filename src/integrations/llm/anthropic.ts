import Anthropic from "@anthropic-ai/sdk";
import type { LlmAdapter, LlmContext, LlmReply } from "./types";

export class AnthropicAdapter implements LlmAdapter {
  private client: Anthropic;
  private model: string;

  constructor(apiKey: string, model: string) {
    this.client = new Anthropic({ apiKey });
    this.model = model;
  }

  async chat(ctx: LlmContext): Promise<LlmReply> {
    const system = [
      ctx.systemPrompt,
      "",
      "=== Validated knowledge base ===",
      ctx.knowledgeContext,
      "=== End ===",
      "",
      "Rules:",
      "- Reply in the user's language.",
      "- Do not invent prices, references, timelines, availability or guarantees.",
      "- If the answer is not in the knowledge base, say so and suggest contacting Fluxia.",
      "- Introduce yourself as the Fluxia AI assistant on the first message.",
      "- Keep replies short (max 5 sentences).",
    ].join("\n");

    const res = await this.client.messages.create({
      model: this.model,
      max_tokens: 500,
      system,
      messages: [
        ...ctx.history.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: ctx.userMessage },
      ],
    });

    const text = res.content
      .filter((c): c is Anthropic.TextBlock => c.type === "text")
      .map((c) => c.text)
      .join("\n")
      .trim();

    return { reply: text || "…", mode: "live" };
  }
}
