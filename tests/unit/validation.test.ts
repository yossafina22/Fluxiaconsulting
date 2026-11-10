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

function nextWeekdayYmd(offsetDays = 7): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() + 1);
  }
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

describe("bookSchema", () => {
  it("accepts a valid payload with date and time slot", () => {
    const r = bookSchema.safeParse({
      name: "Jean",
      email: "jean@example.com",
      preferredDate: nextWeekdayYmd(),
      preferredTime: "10:00",
      topic: "Je souhaite discuter d'un projet de site.",
      consent: true,
      locale: "fr",
      website: "",
    });
    expect(r.success).toBe(true);
  });

  it("rejects a free-text date", () => {
    const r = bookSchema.safeParse({
      name: "Jean",
      email: "jean@example.com",
      preferredDate: "mardi matin",
      preferredTime: "10:00",
      topic: "Je souhaite discuter d'un projet.",
      consent: true,
      locale: "fr",
      website: "",
    });
    expect(r.success).toBe(false);
  });

  it("rejects a time outside the 09:00–15:30 slots", () => {
    const r = bookSchema.safeParse({
      name: "Jean",
      email: "jean@example.com",
      preferredDate: nextWeekdayYmd(),
      preferredTime: "17:00",
      topic: "Je souhaite discuter d'un projet.",
      consent: true,
      locale: "fr",
      website: "",
    });
    expect(r.success).toBe(false);
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
