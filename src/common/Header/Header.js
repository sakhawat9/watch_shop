import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { FaRegEnvelope } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdOutlineSearch, MdOutlineShoppingBag } from "react-icons/md";
import { RiHeartLine } from "react-icons/ri";
import { Store } from "../../utils/Store";
import { useMounted } from "../../utils/useMounted";
import UserMenu from "../UserMenu";
import { NAV_LINKS } from "./navLinks";

/**
 * Single site header.
 *
 * The previous version rendered the entire primary nav twice — once inside
 * HeaderTop as copy-pasted JSX and again from an unused HeaderBottom — behind
 * ~500 lines of SCSS supporting six levels of dropdowns, most pointing at "#".
 * This is one flat nav, sticky, with a real mobile drawer.
 */
export default function Header() {
  const router = useRouter();
  const { state } = useContext(Store);
  const { cart, wish, userInfo } = state;

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Cart/wishlist counts come from cookies, which the server can't read.
  // Hold them back until after hydration so the markup matches.
  const mounted = useMounted();

  // Close the drawer on navigation, otherwise it stays open behind the new page.
  useEffect(() => {
    const close = () => setMenuOpen(false);
    router.events.on("routeChangeComplete", close);
    return () => router.events.off("routeChangeComplete", close);
  }, [router.events]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  const cartCount = mounted ? cart.cartItems.length : 0;
  const wishCount = mounted ? wish.wishlist?.length ?? 0 : 0;

  return (
    <>
      <a href="#main" className="sr-only-focusable">
        Skip to main content
      </a>

      {/* Utility bar — contact details only; hidden on small screens where it
          would push the nav below the fold. */}
      <div className="hidden text-sm text-secondary-400 bg-primary-950 md:block">
        <div className="container flex items-center justify-between py-2">
          <a
            href="tel:+8801849687969"
            className="inline-flex items-center gap-2 transition-colors hover:text-gold-400"
          >
            <IoIosCall className="w-4 h-4" aria-hidden="true" />
            +088 01849687969
          </a>
          <p className="hidden lg:block">
            Free insured shipping &amp; 30-day returns on every order
          </p>
          <a
            href="mailto:sakhawathossain7969@gmail.com"
            className="inline-flex items-center gap-2 transition-colors hover:text-gold-400"
          >
            <FaRegEnvelope className="w-4 h-4" aria-hidden="true" />
            sakhawathossain7969@gmail.com
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white border-b border-secondary-300">
        <div className="container">
          <div className="flex items-center justify-between h-[var(--header-height)] gap-4">
            <Link
              href="/"
              className="text-lg font-bold tracking-[0.15em] uppercase font-heading text-primary-900 shrink-0"
            >
              Watch<span className="text-gold-600">_</span>Shop
            </Link>

            {/* Primary navigation */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const active =
                    link.href === "/"
                      ? router.pathname === "/"
                      : router.pathname.startsWith(link.href.split("?")[0]);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={`inline-block px-3 py-2 text-sm font-medium transition-colors rounded ${
                          active
                            ? "text-gold-700"
                            : "text-primary-700 hover:text-gold-700"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Search — a real labelled form with a submit button. */}
            <form
              onSubmit={handleSearch}
              role="search"
              className="relative flex-1 hidden max-w-xs md:block"
            >
              <label htmlFor="site-search" className="sr-only">
                Search watches
              </label>
              <input
                id="site-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search watches"
                className="input py-2.5 pr-11 text-sm"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute inset-y-0 right-0 flex items-center justify-center transition-colors w-11 text-primary-400 hover:text-gold-700"
              >
                <MdOutlineSearch className="w-5 h-5" aria-hidden="true" />
              </button>
            </form>

            <div className="flex items-center gap-1 shrink-0">
              <IconLink
                href="/wishlist"
                count={wishCount}
                label={`Wishlist, ${wishCount} ${wishCount === 1 ? "item" : "items"}`}
                icon={RiHeartLine}
              />
              <IconLink
                href="/cartWatch"
                count={cartCount}
                label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
                icon={MdOutlineShoppingBag}
              />

              {mounted && userInfo ? (
                <UserMenu userInfo={userInfo} />
              ) : (
                <Link href="/login" className="hidden ml-2 btn btn-primary btn-sm sm:inline-flex">
                  Sign in
                </Link>
              )}

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="flex items-center justify-center w-10 h-10 rounded text-primary-800 lg:hidden"
              >
                <BiMenu className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        userInfo={mounted ? userInfo : null}
      />
    </>
  );
}

function IconLink({ href, count, label, icon: Icon }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative flex items-center justify-center w-10 h-10 transition-colors rounded text-primary-800 hover:text-gold-700"
    >
      <Icon className="w-5 h-5" aria-hidden="true" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute inline-flex items-center justify-center min-w-[1.125rem] h-[1.125rem] px-1 text-[0.625rem] font-bold text-white rounded-full bg-gold-600 top-1 right-0.5"
        >
          {count}
        </span>
      )}
    </Link>
  );
}

function MobileMenu({ open, onClose, userInfo }) {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 transition-opacity duration-200 bg-primary-950/60 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`absolute inset-y-0 left-0 flex flex-col w-[min(20rem,85vw)] bg-white shadow-popover transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 border-b h-[var(--header-height)] border-secondary-300">
          <span className="text-base font-bold tracking-[0.15em] uppercase font-heading text-primary-900">
            Watch<span className="text-gold-600">_</span>Shop
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex items-center justify-center w-10 h-10 rounded text-primary-700"
          >
            <BiX className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-0.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-3 py-3 text-base font-medium transition-colors rounded text-primary-800 hover:bg-secondary-100 hover:text-gold-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {!userInfo && (
          <div className="grid grid-cols-2 gap-3 p-5 border-t border-secondary-300">
            <Link href="/login" className="btn btn-primary btn-sm">
              Sign in
            </Link>
            <Link href="/register" className="btn btn-outline btn-sm">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
