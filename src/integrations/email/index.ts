import { ConsoleEmailAdapter } from "./consoleFallback";
import { ResendAdapter } from "./resend";
import type { EmailAdapter } from "./types";

let cached: EmailAdapter | null = null;

export function getEmailAdapter(): EmailAdapter {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY?.trim();
  cached = key ? new ResendAdapter(key) : new ConsoleEmailAdapter();
  return cached;
}

export const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? "fluxia@fluxia-consulting.company";
export const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL ?? "Fluxia Website <onboarding@resend.dev>";

export type { EmailAdapter } from "./types";
