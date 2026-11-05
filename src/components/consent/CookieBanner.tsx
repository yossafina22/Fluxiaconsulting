"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Icon } from "../ui/Icon";

const KEY = "fluxia-consent-v1";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && !localStorage.getItem(KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage non disponible
    }
  }, []);

  if (!visible) return null;

  const accept = () => {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ necessary: true, analytics: false, voice: false, at: Date.now() }),
      );
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label={t("bannerTitle")}
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl rounded-card border border-line bg-white p-4 shadow-float md:bottom-6"
    >
      <div className="flex items-start gap-3">
        <Icon name="ShieldCheck" className="mt-0.5 flex-shrink-0 text-petrol" />
        <div className="flex-1 text-sm">
          <h2 className="font-semibold text-night">{t("bannerTitle")}</h2>
          <p className="mt-1 text-muted">{t("bannerBody")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={accept} className="fx-btn-primary">
              {t("accept")}
            </button>
            <Link
              href="/cookies"
              className="fx-btn-secondary"
              onClick={() => setVisible(false)}
            >
              {t("manage")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
