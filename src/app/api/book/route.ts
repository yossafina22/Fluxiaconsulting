import { NextResponse, type NextRequest } from "next/server";
import { bookSchema } from "@/lib/validation/bookSchema";
import { ipFromHeaders, rateLimit } from "@/lib/security/rateLimit";
import { CONTACT_FROM, CONTACT_TO, getEmailAdapter } from "@/integrations/email";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = ipFromHeaders(request.headers);
  const limiter = rateLimit({
    key: `book:${ip}`,
    limit: 5,
    windowMs: 60 * 60 * 1000,
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

  const parsed = bookSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "validation_failed",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }
  const data = parsed.data;
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true, mode: "demo" }, { status: 200 });
  }

  const subject = `[Fluxia] Demande de rendez-vous — ${data.name}`;
  const text = [
    `Nom : ${data.name}`,
    `E-mail : ${data.email}`,
    data.phone ? `Téléphone : ${data.phone}` : null,
    `Créneau souhaité : ${data.preferredDate}`,
    `Langue : ${data.locale}`,
    "",
    "Sujet :",
    data.topic,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const adapter = getEmailAdapter();
    const result = await adapter.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: data.email,
      subject,
      text,
    });
    return NextResponse.json({ ok: true, mode: result.mode }, { status: 200 });
  } catch (err) {
    console.error("[fluxia][book] send failed", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
