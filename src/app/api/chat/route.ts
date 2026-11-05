import { NextResponse, type NextRequest } from "next/server";
import { chatRequestSchema } from "@/lib/validation/chatSchema";
import { ipFromHeaders, rateLimit } from "@/lib/security/rateLimit";
import { getKnowledge, getAssistantPolicy } from "@/lib/rag/knowledgeStore";
import { searchChunks } from "@/lib/rag/search";
import { getLlm } from "@/integrations/llm";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = ipFromHeaders(request.headers);
  const limiter = rateLimit({
    key: `chat:${ip}`,
    limit: 15,
    windowMs: 5 * 60 * 1000,
  });
  if (!limiter.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const { message, locale, history = [] } = parsed.data;

  const knowledge = getKnowledge();
  const chunks = searchChunks(knowledge[locale] ?? [], message, 3);
  const context = chunks
    .map((c) => `# ${c.title}\n${c.body}`)
    .join("\n\n");
  const policy = getAssistantPolicy();

  try {
    const llm = getLlm();
    const result = await llm.chat({
      locale,
      systemPrompt: policy,
      knowledgeContext: context,
      history,
      userMessage: message,
    });
    return NextResponse.json({ reply: result.reply, mode: result.mode });
  } catch (err) {
    console.error("[fluxia][chat] llm failed", err);
    return NextResponse.json(
      {
        reply:
          "Es tut mir leid, ich bin gerade nicht erreichbar. / Désolé, je ne suis pas disponible. / Sorry, I'm unavailable right now.",
        mode: "demo" as const,
      },
      { status: 200 },
    );
  }
}
