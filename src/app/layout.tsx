import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.fluxia-consulting.company",
  ),
  title: {
    default: "Fluxia Consulting",
    template: "%s · Fluxia Consulting",
  },
  icons: {
    icon: "/brand/logo-icon.svg",
    shortcut: "/brand/logo-icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
