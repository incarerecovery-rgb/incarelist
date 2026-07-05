import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF",       // primary background — white
        paper: "#F8FAFC",        // light background, per palette
        ink: "#1F2937",          // dark text, per palette

        // Primary — trust, professional, healthcare, technology, reliability
        navy: {
          50: "#EDF1F5",
          100: "#D7E1EA",
          200: "#B0C3D5",
          300: "#88A5C0",
          400: "#5D7FA0",
          500: "#1E3A5F",        // brand navy
          600: "#1A3251",
          700: "#152943",
          800: "#101F35",
          900: "#0B1626",
        },
        // Secondary — wellness, healing, compassion, modern
        teal: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",        // brand teal
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
        },
        // Accent — buttons, "Claim Your Profile", featured listings, CTAs ONLY
        orange: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",        // brand accent orange
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },

        mist: "#F1F5F9",         // soft card background (cool-toned now)
        line: "#E2E8F0",         // hairline borders (cool-toned now)
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
