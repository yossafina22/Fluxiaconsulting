"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "../ui/Icon";

type Message = {
  role: "user" | "assistant";
  content: string;
  mode?: "demo" | "live";
};

export function ChatWidget() {
  const t = useTranslations("chat");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: t("greeting") }]);
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!open) {
      openerRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("fx-chat-open", open);
    window.dispatchEvent(new CustomEvent("fx-chat-toggle", { detail: { open } }));
    return () => {
      document.body.classList.remove("fx-chat-open");
    };
  }, [open]);

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || sending) return;
    setSending(true);
    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          locale,
          history: next
            .slice(-6)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok) throw new Error("http");
      const data = (await res.json()) as { reply: string; mode: "demo" | "live" };
      setMessages([
        ...next,
        { role: "assistant", content: data.reply, mode: data.mode },
      ]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: t("errorFallback") },
      ]);
    } finally {
      setSending(false);
    }
  }

  const liveMode = messages.find((m) => m.mode)?.mode;

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("openLabel")}
        className={`fixed bottom-6 left-6 z-40 flex items-center gap-2.5 rounded-full bg-petrol p-3.5 sm:px-5 sm:py-3.5 text-white shadow-float animate-pulseRing hover:bg-petrol-700 hover:scale-105 transition-transform ${
          open ? "hidden" : ""
        }`}
      >
        <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
          <Icon name="MessageSquare" size={16} />
        </span>
        <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap">
          {t("title")}
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t("title")}
          aria-modal="false"
          className="fixed bottom-6 left-6 z-50 flex max-h-[80vh] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-card border border-line bg-white shadow-float"
        >
          <header className="flex items-center justify-between gap-3 bg-night p-4 text-white">
            <div>
              <div className="font-semibold">{t("title")}</div>
              <div className="text-xs text-white/70">{t("subtitle")}</div>
            </div>
            <div className="flex items-center gap-2">
              {liveMode && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold">
                  {liveMode === "demo" ? t("demoBadge") : t("liveBadge")}
                </span>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("closeLabel")}
                className="rounded-full p-1 hover:bg-white/10"
              >
                <Icon name="X" size={18} />
              </button>
            </div>
          </header>

          <div
            ref={scrollRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto bg-pale-200 p-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-petrol text-white"
                      : "bg-white text-ink border border-line"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl border border-line bg-white px-3 py-2 text-sm text-muted">
                  …
                </div>
              </div>
            )}
          </div>

          <form
            className="flex gap-2 border-t border-line bg-white p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <label htmlFor="chat-input" className="sr-only">
              {t("placeholder")}
            </label>
            <input
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              disabled={sending}
              className="flex-1 rounded-full border border-line bg-white px-4 py-2 text-sm text-ink placeholder:text-muted"
              maxLength={1000}
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label={t("send")}
              className="rounded-full bg-petrol p-2 text-white disabled:opacity-50"
            >
              <Icon name="Send" size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
