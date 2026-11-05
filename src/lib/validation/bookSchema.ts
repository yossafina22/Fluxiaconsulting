import { z } from "zod";

export const bookSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  preferredDate: z.string().trim().min(2).max(120),
  topic: z.string().trim().min(5).max(1000),
  consent: z.literal(true, { errorMap: () => ({ message: "consent_required" }) }),
  website: z.string().max(0).optional().or(z.literal("")),
  locale: z.enum(["de", "fr", "en"]),
});

export type BookPayload = z.infer<typeof bookSchema>;
