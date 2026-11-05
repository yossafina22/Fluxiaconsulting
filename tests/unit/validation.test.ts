import { describe, expect, it } from "vitest";
import { contactSchema } from "../../src/lib/validation/contactSchema";
import { bookSchema } from "../../src/lib/validation/bookSchema";
import { chatRequestSchema } from "../../src/lib/validation/chatSchema";

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    const parsed = contactSchema.safeParse({
      name: "Max Mustermann",
      company: "Beispiel GmbH",
      email: "max@example.com",
      phone: "+4915750625673",
      country: "DE",
      sector: "Gastronomie",
      service: "intelligent-websites",
      message: "Wir möchten unsere Online-Reservierung automatisieren.",
      preferredContact: "email",
      consent: true,
      website: "",
      locale: "de",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects missing consent", () => {
    const parsed = contactSchema.safeParse({
      name: "Max",
      email: "max@example.com",
      service: "ai-chat",
      message: "Hallo zusammen, ich möchte mehr Infos.",
      consent: false,
      locale: "de",
    });
    expect(parsed.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const parsed = contactSchema.safeParse({
      name: "Max",
      email: "nope",
      service: "ai-chat",
      message: "Ein Test, der lang genug ist.",
      consent: true,
      locale: "fr",
    });
    expect(parsed.success).toBe(false);
  });
});

describe("bookSchema", () => {
  it("accepts a valid payload", () => {
    const r = bookSchema.safeParse({
      name: "Jean",
      email: "jean@example.com",
      preferredDate: "mardi matin",
      topic: "Je souhaite discuter d'un projet de site.",
      consent: true,
      locale: "fr",
      website: "",
    });
    expect(r.success).toBe(true);
  });
});

describe("chatRequestSchema", () => {
  it("accepts a valid chat request", () => {
    const r = chatRequestSchema.safeParse({
      message: "What do you offer?",
      locale: "en",
      history: [],
    });
    expect(r.success).toBe(true);
  });

  it("rejects empty messages", () => {
    const r = chatRequestSchema.safeParse({
      message: "",
      locale: "en",
    });
    expect(r.success).toBe(false);
  });
});
