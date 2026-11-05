"use client";

import { createElement, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "../ui/Icon";

const CONSENT_KEY = "fluxia-voice-consent-v1";

export function VoiceWidget({ agentId }: { agentId?: string | undefined }) {
  const t = useTranslations("voice");
  const [consentAsked, setConsentAsked] = useState(false);
  const [consented, setConsented] = useState(false);
  const [showUnavailable, setShowUnavailable] = useState(false);
  const configured = Boolean(agentId);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && localStorage.getItem(CONSENT_KEY) === "yes") {
        setConsented(true);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!consented || !agentId) return;
    const existing = document.querySelector(
      'script[data-fx-voice="true"]',
    ) as HTMLScriptElement | null;
    if (existing) return;
    const s = document.createElement("script");
    s.src = "https://elevenlabs.io/convai-widget/index.js";
    s.async = true;
    s.dataset.fxVoice = "true";
    document.body.appendChild(s);
  }, [consented, agentId]);

  const acceptConsent = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "yes");
    } catch {
      // ignore
    }
    setConsented(true);
    setConsentAsked(false);
  };

  const handleClick = () => {
    if (!configured) {
      setShowUnavailable(true);
      return;
    }
    if (consented) return;
    setConsentAsked(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="fixed bottom-6 right-[13.5rem] z-40 flex items-center gap-2 rounded-full bg-white border border-line px-4 py-3 text-sm font-semibold text-night shadow-float hover:bg-pale hover:scale-105 transition-transform"
        aria-label={t("button")}
      >
        <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-pale text-petrol">
          <Icon name="Mic" size={16} />
          {!configured && (
            <span
              aria-hidden
              className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-400 ring-2 ring-white"
            />
          )}
        </span>
        <span className="whitespace-nowrap">{t("button")}</span>
      </button>

      {showUnavailable && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="voice-unavailable-title"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-night/60 p-4"
          onClick={() => setShowUnavailable(false)}
        >
          <div
            className="w-full max-w-md rounded-card bg-white p-6 shadow-float"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="voice-unavailable-title" className="text-lg font-semibold text-night">
              {t("unavailable")}
            </h2>
            <p className="mt-2 text-sm text-muted">{t("consentBody")}</p>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowUnavailable(false)}
                className="fx-btn-primary"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {consentAsked && !consented && configured && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="voice-consent-title"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-night/60 p-4"
        >
          <div className="w-full max-w-md rounded-card bg-white p-6 shadow-float">
            <h2 id="voice-consent-title" className="text-lg font-semibold text-night">
              {t("consentTitle")}
            </h2>
            <p className="mt-2 text-sm text-muted">{t("consentBody")}</p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConsentAsked(false)}
                className="fx-btn-secondary"
              >
                {t("decline")}
              </button>
              <button type="button" onClick={acceptConsent} className="fx-btn-primary">
                {t("accept")}
              </button>
            </div>
          </div>
        </div>
      )}

      {consented &&
        configured &&
        createElement("elevenlabs-convai" as unknown as "div", {
          "agent-id": agentId,
        })}
    </>
  );
}
