import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        sm: "32px",
        md: "48px",
        lg: "64px",
        xl: "80px",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F172A",
          900: "#0F172A",
        },
        gold: {
          DEFAULT: "#D4AF77",
          hover: "#C49A5F",
        },
        cream: {
          DEFAULT: "#E2D8C3",
          light: "#F8F4EC",
        },
        charcoal: {
          DEFAULT: "#111827",
          deep: "#0B0D11",
        },
        offwhite: "#F8F4EC",
        error: "#EF4444",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        bold: [
          "var(--font-montserrat)",
          "Montserrat",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        // Fluid type — scales between mobile and desktop without breakpoints
        h1: ["clamp(2rem, 5.2vw, 4.5rem)", { lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.625rem, 3.4vw, 2.75rem)", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.015em" }],
        h3: ["clamp(1.25rem, 2vw, 1.875rem)", { lineHeight: "1.25", fontWeight: "700" }],
        body: ["clamp(1rem, 1.05vw, 1.125rem)", { lineHeight: "1.6", fontWeight: "400" }],
        caption: ["14px", { lineHeight: "20px", fontWeight: "500" }],
      },
      letterSpacing: {
        cta: "0.5px",
      },
      spacing: {
        "1": "8px",
        "2": "16px",
        "3": "24px",
        "4": "32px",
        "6": "48px",
        "8": "64px",
        "10": "80px",
        "12": "96px",
        "15": "120px",
      },
      borderRadius: {
        "2xl": "24px",
        card: "24px",
      },
      boxShadow: {
        card: "0 6px 24px rgba(15, 23, 42, 0.08)",
        "gold-glow": "0 0 0 4px rgba(212, 175, 119, 0.25)",
      },
      maxWidth: {
        container: "1440px",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
