import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        petrol: {
          DEFAULT: "#176B80",
          700: "#135a6c",
          400: "#4c99ac",
        },
        night: {
          DEFAULT: "#172B40",
          700: "#0F1F2E",
          500: "#2a3f54",
        },
        pale: {
          DEFAULT: "#EAF4F5",
          200: "#f5fafb",
        },
        ink: "#0F1F2E",
        muted: "#4A5B6B",
        line: "#CDDDE0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        card: "1rem",
      },
      boxShadow: {
        card: "0 4px 24px -8px rgba(23, 43, 64, 0.12)",
        float: "0 12px 32px -12px rgba(23, 43, 64, 0.35)",
        glow: "0 0 0 6px rgba(23, 107, 128, 0.18)",
      },
      keyframes: {
        pulseRing: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(23, 107, 128, 0.45)" },
          "50%": { boxShadow: "0 0 0 10px rgba(23, 107, 128, 0)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
