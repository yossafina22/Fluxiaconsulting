import type { EmailAdapter, EmailMessage, EmailResult } from "./types";

export class ConsoleEmailAdapter implements EmailAdapter {
  async send(message: EmailMessage): Promise<EmailResult> {
    const log = {
      kind: "fluxia_email_demo",
      to: message.to,
      from: message.from,
      subject: message.subject,
      textPreview: message.text.slice(0, 500),
    };
    console.info("[fluxia][email demo mode]", JSON.stringify(log));
    return { mode: "demo", reason: "RESEND_API_KEY not configured" };
  }
}
