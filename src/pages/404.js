import Link from "next/link";
import Layout from "../common/Layout";
import Button from "../components/ui/Button";

const SUGGESTIONS = [
  { label: "All watches", href: "/allProducts" },
  { label: "Men's watches", href: "/search?category=men" },
  { label: "Women's watches", href: "/search?category=women" },
  { label: "FAQ", href: "/FAQ" },
  { label: "Contact us", href: "/contact" },
];

/**
 * 404.
 *
 * The old page hotlinked four PNGs from an unrelated WordPress theme demo, put
 * four randomly coloured floating dots over them, and apologised for missing
 * "Fashion, Chair, Decoration" — none of which this store sells. A typographic
 * treatment costs nothing to load and can't break when someone else's CDN goes
 * away.
 */
export default function NotFound() {
  return (
    <Layout title="Page not found">
      <div className="flex items-center justify-center section-dark">
        <div className="container py-section">
          <div className="max-w-lg mx-auto text-center">
            <p
              aria-hidden="true"
              className="font-heading font-bold leading-none text-[6rem] sm:text-[9rem] text-gold-600/30"
            >
              404
            </p>

            <h1 className="mt-2 mb-4 text-white">
              We can&apos;t find that page
            </h1>

            <p className="mb-8 text-secondary-400">
              The link may be out of date, or the page may have moved. Here are a
              few places worth trying instead.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <Button href="/" variant="accent" size="lg">
                Back to home
              </Button>
              <Button href="/allProducts" variant="onDark" size="lg">
                Browse watches
              </Button>
            </div>
            <nav aria-label="Suggested pages">
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                {SUGGESTIONS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors text-secondary-400 hover:text-gold-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  );
}
