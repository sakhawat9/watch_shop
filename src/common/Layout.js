import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header/Header";

const SITE_NAME = "Watch_Shop";

/**
 * Page shell. `children` sit inside a `<main id="main">` so the skip link in
 * the header has a real landmark to jump to, and every page gets a single
 * consistent header/footer — login and register previously rendered with
 * neither.
 */
export default function Layout({
  title,
  description = "Curated timepieces built to last — free insured shipping, a 2-year warranty and 30-day returns.",
  keywords = "watches, mens watches, womens watches, chronograph, automatic watch",
  children,
}) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Curated Timepieces`;

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#14161A" />
      </Head>

      <Header />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
