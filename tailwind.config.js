/** @type {import('tailwindcss').Config} */

// ---------------------------------------------------------------------------
// Watch_Shop design tokens
//
// Three families carry the whole brand:
//   primary   — warm charcoal. Text, dark surfaces, the header/footer.
//   gold      — brass accent. CTAs, prices, active states. Used sparingly.
//   secondary — warm sand. Section backgrounds and hairline borders.
//
// Everything else (success/warning/danger/info) exists only for feedback
// states, so a page never invents a colour that isn't in this file.
// ---------------------------------------------------------------------------
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },

      colors: {
        primary: {
          DEFAULT: "#14161A",
          50: "#F4F5F7",
          100: "#E4E7EB",
          200: "#C9CDD4",
          300: "#A2A8B2",
          400: "#7C838D",
          500: "#5A6069",
          600: "#3D424B",
          700: "#2A2E35",
          800: "#1D2025",
          900: "#14161A",
          950: "#0B0C0E",
        },

        gold: {
          DEFAULT: "#A97C3F",
          50: "#FBF7F0",
          100: "#F5EDE0",
          200: "#EBDCC2",
          300: "#DBC29B",
          400: "#C9A877",
          500: "#B8925A",
          600: "#A97C3F",
          700: "#8A6431",
          800: "#654925",
          900: "#3E2E17",
        },

        secondary: {
          DEFAULT: "#F8F6F1",
          50: "#FDFCFA",
          100: "#F8F6F1",
          200: "#F1EEE7",
          300: "#E6E1D6",
          400: "#D5CEBF",
          500: "#F8F6F1",
          600: "#BEB4A0",
          700: "#9C9180",
          800: "#736A5D",
          900: "#4A443B",
        },

        // Feedback colours. Each has a `soft` tint for backgrounds so alerts
        // never need an off-palette gray.
        success: { DEFAULT: "#1F7A5C", soft: "#E7F4EF", strong: "#165C45" },
        warning: { DEFAULT: "#9A6700", soft: "#FBF2E0", strong: "#7A5200" },
        danger: { DEFAULT: "#B3261E", soft: "#FBEAE9", strong: "#8C1D17" },
        info: { DEFAULT: "#2C5F8A", soft: "#E8F0F7", strong: "#22496B" },
      },

      fontSize: {
        // [size, { lineHeight, letterSpacing }] — the whole type scale lives here
        // so headings stay consistent without per-component overrides.
        "display-lg": ["clamp(2.75rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        display: ["clamp(2.25rem, 4vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h1: ["clamp(2rem, 3.2vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        h2: ["clamp(1.625rem, 2.6vw, 2.125rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.25rem, 1.9vw, 1.5rem)", { lineHeight: "1.3" }],
        h4: ["1.125rem", { lineHeight: "1.4" }],
        eyebrow: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.18em" }],
      },

      spacing: {
        section: "clamp(3.5rem, 7vw, 6rem)",
        "section-sm": "clamp(2.5rem, 5vw, 4rem)",
      },

      maxWidth: {
        container: "82rem",
        prose: "68ch",
      },

      borderRadius: {
        DEFAULT: "0.25rem",
        card: "0.5rem",
      },

      boxShadow: {
        // Warm-tinted shadows: neutral black reads cold against the sand palette.
        subtle: "0 1px 2px rgba(20, 22, 26, 0.05)",
        card: "0 1px 3px rgba(20, 22, 26, 0.06), 0 6px 16px -8px rgba(20, 22, 26, 0.10)",
        lift: "0 4px 8px rgba(20, 22, 26, 0.06), 0 18px 32px -12px rgba(20, 22, 26, 0.18)",
        popover: "0 8px 32px -8px rgba(20, 22, 26, 0.22)",
      },

      transitionDuration: { DEFAULT: "200ms" },

      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 400ms ease-out both",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};
