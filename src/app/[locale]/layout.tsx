import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { VoiceWidget } from "@/components/voice/VoiceWidget";
import { professionalServiceJsonLd } from "@/lib/seo/jsonLd";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ?? undefined;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-petrol focus:p-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <CookieBanner />
      <ChatWidget />
      <VoiceWidget agentId={agentId} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceJsonLd()),
        }}
      />
    </NextIntlClientProvider>
  );
}
