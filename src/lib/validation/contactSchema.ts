import { z } from "zod";

export const contactServiceOptions = [
  "intelligent-websites",
  "website-redesign",
  "ai-chat",
  "ai-voice",
  "automation",
  "consulting",
  "other",
] as const;

export const preferredContactOptions = ["email", "phone", "either"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "name_too_short").max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("email_invalid").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(60).optional().or(z.literal("")),
  sector: z.string().trim().max(80).optional().or(z.literal("")),
  service: z.enum(contactServiceOptions),
  message: z.string().trim().min(10, "message_too_short").max(4000),
  preferredContact: z.enum(preferredContactOptions).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "consent_required" }) }),
  website: z.string().max(0).optional().or(z.literal("")),
  locale: z.enum(["de", "fr", "en"]),
});

export type ContactPayload = z.infer<typeof contactSchema>;
