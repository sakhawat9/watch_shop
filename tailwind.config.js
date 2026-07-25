/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        // Deep charcoal — brand primary, replaces the old navy.
        primary: {
          DEFAULT: "#1B1D22",
          50: "#EEEEF0",
          100: "#D6D7DC",
          200: "#AEB0BA",
          300: "#868898",
          400: "#5D5F70",
          500: "#3A3C46",
          600: "#1B1D22",
          700: "#16171B",
          800: "#101114",
          900: "#0A0B0D",
        },
        // Warm brass/gold — the accent used for CTAs, prices, and highlights.
        gold: {
          DEFAULT: "#B8925A",
          50: "#FBF6EF",
          100: "#F3E5D0",
          200: "#E6CBA1",
          300: "#D8B073",
          400: "#C6A15B",
          500: "#B8925A",
          600: "#9C763F",
          700: "#7A5C31",
          800: "#584223",
          900: "#362815",
        },
        // Warm off-white — section backgrounds.
        secondary: {
          DEFAULT: "#F7F4EF",
          50: "#FFFFFF",
          100: "#FDFCFA",
          200: "#F7F4EF",
          300: "#EFEAE1",
          400: "#E4DCCE",
          500: "#F7F4EF",
          600: "#D6C9B3",
          700: "#BDAB89",
          800: "#9E8A67",
          900: "#7A6C51",
        },
        black: {
          DEFAULT: "#0A0B0D",
          50: "#EEEEF0",
          100: "#D6D7DC",
          200: "#AEB0BA",
          300: "#868898",
          400: "#5D5F70",
          500: "#0A0B0D",
          600: "#08090B",
          700: "#060608",
          800: "#030304",
          900: "#000000",
        },
      },
    },
  },
  plugins: [],
};
