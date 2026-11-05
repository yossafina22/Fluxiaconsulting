import { z } from "zod";

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(4000),
});

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(1000),
  locale: z.enum(["de", "fr", "en"]),
  history: z.array(chatMessageSchema).max(10).optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
