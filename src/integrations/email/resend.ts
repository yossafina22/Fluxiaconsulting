import { Resend } from "resend";
import type { EmailAdapter, EmailMessage, EmailResult } from "./types";

export class ResendAdapter implements EmailAdapter {
  private client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async send(message: EmailMessage): Promise<EmailResult> {
    const payload = {
      from: message.from,
      to: [message.to],
      subject: message.subject,
      text: message.text,
      html: message.html ?? message.text,
      ...(message.replyTo ? { replyTo: message.replyTo } : {}),
    };
    const { data, error } = await this.client.emails.send(payload);
    if (error || !data) {
      throw new Error(error?.message ?? "resend_failed");
    }
    return { mode: "live", id: data.id };
  }
}
