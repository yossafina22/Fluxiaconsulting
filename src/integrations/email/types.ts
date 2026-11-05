export type EmailMessage = {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
};

export type EmailResult =
  | { mode: "live"; id: string }
  | { mode: "demo"; reason: string };

export interface EmailAdapter {
  send(message: EmailMessage): Promise<EmailResult>;
}
