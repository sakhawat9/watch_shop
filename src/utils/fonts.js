import { Inter, Playfair_Display } from "next/font/google";

// Editorial serif for headings, clean sans for body — the classic premium
// watch-brand pairing. Loaded via next/font so there's no render-blocking
// @import and the fonts self-host with zero layout shift.
export const headingFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
