import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BiHome, BiLogOutCircle, BiPlus, BiUser, BiX } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { BsFillInboxesFill } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { HiViewList } from "react-icons/hi";
import { MdOutlineWatch } from "react-icons/md";
import { Store } from "../utils/Store";
import { useMounted } from "../utils/useMounted";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: BsFillInboxesFill, exact: true },
  { href: "/dashboard/watch/manageWatch", label: "Products", icon: MdOutlineWatch },
  { href: "/dashboard/watch/addWatch", label: "Add product", icon: BiPlus },
  { href: "/dashboard/allOrder", label: "Orders", icon: HiViewList },
  { href: "/dashboard/manageUser", label: "Customers", icon: BiUser },
];

/**
 * Admin shell: fixed sidebar on desktop, off-canvas drawer below `lg`, and a
 * page header with the title and any page-level actions.
 *
 * Replaces the react-minimal-side-navigation sidebar, which shipped its own
 * stylesheet that had to be overridden with five blocks of `!important`
 * descendant selectors, rendered off-canvas open by default on mobile, and had
 * no active-state handling for nested routes.
 */
export default function AdminLayout({ title, description, actions, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const [open, setOpen] = useState(false);

  // userInfo comes from a cookie the server can't read, so the signed-in
  // identity block only renders after hydration (see useMounted).
  const mounted = useMounted();

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeComplete", close);
    return () => router.events.off("routeChangeComplete", close);
  }, [router.events]);

  const logout = () => {
    dispatch({ type: "USER_LOGOUT" });
    router.push("/");
  };

  const isActive = (item) =>
    item.exact ? router.pathname === item.href : router.pathname.startsWith(item.href);

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-16 px-5 border-b border-white/10 shrink-0">
        <Link
          href="/dashboard"
          className="text-sm font-bold tracking-[0.15em] text-white uppercase font-heading"
        >
          Watch<span className="text-gold-500">_</span>Shop
        </Link>
        <span className="hidden px-2 py-0.5 text-[0.625rem] font-semibold tracking-wider uppercase rounded lg:inline bg-gold-600 text-white">
          Admin
        </span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="text-white lg:hidden"
        >
          <BiX className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Admin" className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-1">
          {NAV.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded ${
                    active
                      ? "bg-gold-600 text-white"
                      : "text-secondary-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-white/10 shrink-0">
        {mounted && userInfo && (
          <div className="px-3 py-2 mb-2">
            <p className="text-sm font-medium text-white truncate">{userInfo.name}</p>
            <p className="text-xs truncate text-secondary-500">{userInfo.email}</p>
          </div>
        )}

        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded text-secondary-400 hover:bg-white/5 hover:text-white"
        >
          <BiHome className="w-4 h-4" aria-hidden="true" />
          View storefront
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex items-center w-full gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded text-secondary-400 hover:bg-danger/20 hover:text-white"
        >
          <BiLogOutCircle className="w-4 h-4" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>{`${title} | Watch_Shop Admin`}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex min-h-screen bg-secondary-100">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:shrink-0 bg-primary-950">
          {sidebar}
        </aside>

        {/* Mobile drawer */}
        <div
          className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
          aria-hidden={!open}
        >
          <div
            onClick={() => setOpen(false)}
            className={`absolute inset-0 transition-opacity bg-primary-950/60 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Admin menu"
            className={`absolute inset-y-0 left-0 w-64 transition-transform duration-300 ease-out bg-primary-950 ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {sidebar}
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <header className="sticky top-0 z-30 bg-white border-b border-secondary-300">
            <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="flex items-center justify-center w-10 h-10 -ml-2 rounded text-primary-800 lg:hidden shrink-0"
              >
                <BiMenu className="w-6 h-6" aria-hidden="true" />
              </button>

              <div className="flex-1 min-w-0">
                <h1 className="text-h3">{title}</h1>
                {description && (
                  <p className="mt-1 text-sm text-primary-500">{description}</p>
                )}
              </div>

              {actions && <div className="flex gap-2 shrink-0">{actions}</div>}
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </>
  );
}

/** Small helper used by admin pages that show a "last updated" line. */
export function AdminTimestamp({ children }) {
  return (
    <p className="inline-flex items-center gap-1.5 text-xs text-primary-400">
      <FaRegClock className="w-3 h-3" aria-hidden="true" />
      {children}
    </p>
  );
}
