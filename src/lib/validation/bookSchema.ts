import { z } from "zod";

export const bookTimeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
] as const;

export type BookTimeSlot = (typeof bookTimeSlots)[number];

const dateYmdRegex = /^\d{4}-\d{2}-\d{2}$/;

export const bookSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  preferredDate: z
    .string()
    .trim()
    .regex(dateYmdRegex, "date_format")
    .refine((v) => {
      const d = new Date(`${v}T00:00:00`);
      if (Number.isNaN(d.getTime())) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return d >= today;
    }, "date_past")
    .refine((v) => {
      const d = new Date(`${v}T00:00:00`);
      const day = d.getDay();
      return day >= 1 && day <= 5;
    }, "date_weekend"),
  preferredTime: z.enum(bookTimeSlots, { errorMap: () => ({ message: "time_invalid" }) }),
  topic: z.string().trim().min(5).max(1000),
  consent: z.literal(true, { errorMap: () => ({ message: "consent_required" }) }),
  website: z.string().max(0).optional().or(z.literal("")),
  locale: z.enum(["de", "fr", "en"]),
});

export type BookPayload = z.infer<typeof bookSchema>;
