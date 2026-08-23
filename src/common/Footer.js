import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import ScrollToTop from "react-scroll-to-top";

// Only real destinations are listed. The old footer linked five "Customer
// Care" entries to href="#", which read as broken to anyone who clicked them;
// the genuinely useful ones now point at the FAQ sections that answer them.
const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All watches", href: "/allProducts" },
      { label: "Men's watches", href: "/search?category=men" },
      { label: "Women's watches", href: "/search?category=women" },
      { label: "Unisex watches", href: "/search?category=unisex" },
      { label: "Wishlist", href: "/wishlist" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Create account", href: "/register" },
      { label: "Account settings", href: "/profile" },
      { label: "My orders", href: "/userOrders" },
      { label: "Shopping cart", href: "/cartWatch" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/FAQ" },
      { label: "Shipping & delivery", href: "/FAQ#Orders%20%26%20Shipping" },
      { label: "Returns & warranty", href: "/FAQ#Returns%20%26%20Warranty" },
      { label: "Payments & security", href: "/FAQ#Payments%20%26%20Security" },
      { label: "Contact us", href: "/contact" },
    ],
  },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/sakawat.hossain.338211",
    icon: FaFacebookF,
  },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shjsdev/", icon: FaLinkedinIn },
  { label: "Twitter", href: "https://twitter.com", icon: FaTwitter },
  { label: "Pinterest", href: "https://www.pinterest.com", icon: FaPinterestP },
  { label: "WhatsApp", href: "https://www.whatsapp.com", icon: FaWhatsapp },
];

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-secondary-400">
      <ScrollToTop
        smooth
        top={600}
        color="#14161A"
        width="16"
        height="16"
        style={{
          backgroundColor: "#B8925A",
          borderRadius: "9999px",
          boxShadow: "0 8px 24px -8px rgba(20,22,26,0.4)",
          right: "1.5rem",
          bottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      <div className="container py-14 lg:py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <p className="mb-4 text-lg font-bold tracking-[0.15em] text-white uppercase font-heading">
              Watch<span className="text-gold-500">_</span>Shop
            </p>
            <p className="max-w-xs mb-6 text-sm leading-relaxed">
              Curated timepieces built to be worn for years — free insured
              shipping, a 2-year warranty, and 30-day returns on everything.
            </p>

            <address className="text-sm not-italic leading-relaxed">
              15/e Lake Circus, Kalabagan
              <br />
              Dhaka, Bangladesh
              <br />
              <a
                href="mailto:sakhawathossain7969@gmail.com"
                className="inline-block mt-2 break-all transition-colors hover:text-gold-400"
              >
                sakhawathossain7969@gmail.com
              </a>
            </address>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-4 font-sans text-sm font-semibold tracking-wider text-white uppercase">
                {column.title}
              </h2>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-gold-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Watch_Shop. Designed &amp; built by{" "}
            <a
              href="https://github.com/sakhawat9"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors text-secondary-300 hover:text-gold-400"
            >
              SH Shakib
            </a>
            .
          </p>

          <ul className="flex items-center gap-2">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch_Shop on ${label}`}
                  className="flex items-center justify-center transition-colors rounded-full w-9 h-9 bg-white/5 text-secondary-300 hover:bg-gold-600 hover:text-white"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
