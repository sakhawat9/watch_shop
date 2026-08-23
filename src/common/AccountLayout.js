import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BiCog, BiLogOutCircle, BiPackage, BiSolidDashboard } from "react-icons/bi";
import { MdOutlineRateReview } from "react-icons/md";
import { RiHeartLine } from "react-icons/ri";
import Layout from "./Layout";
import PageHeader from "../components/ui/PageHeader";
import { Store } from "../utils/Store";
import { useMounted } from "../utils/useMounted";

const LINKS = [
  { href: "/userOrders", label: "My orders", icon: BiPackage },
  { href: "/wishlist", label: "Wishlist", icon: RiHeartLine },
  { href: "/profile", label: "Account settings", icon: BiCog },
  { href: "/review-form", label: "Write a review", icon: MdOutlineRateReview },
];

/**
 * Shell for the signed-in account area. Profile, orders and the review form
 * previously each stood alone with no navigation between them — the only way
 * to reach the orders page was to type the URL.
 */
export default function AccountLayout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const mounted = useMounted();

  const logout = () => {
    dispatch({ type: "USER_LOGOUT" });
    router.push("/");
  };

  return (
    <Layout title={title}>
      <PageHeader
        eyebrow="My account"
        title={title}
        description={description}
        crumbs={[{ label: "Account" }, { label: title }]}
      />

      <div className="section">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <aside className="lg:col-span-3">
              <nav aria-label="Account" className="lg:sticky lg:top-28">
                {mounted && userInfo && (
                  <div className="p-4 mb-4 rounded-card bg-secondary-100">
                    <p className="text-sm font-semibold truncate text-primary-900">
                      {userInfo.name}
                    </p>
                    <p className="text-xs truncate text-primary-500">
                      {userInfo.email}
                    </p>
                  </div>
                )}

                <ul className="space-y-1">
                  {mounted && userInfo?.isAdmin && (
                    <li>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded text-gold-700 hover:bg-gold-50"
                      >
                        <BiSolidDashboard className="w-4 h-4" aria-hidden="true" />
                        Admin dashboard
                      </Link>
                    </li>
                  )}

                  {LINKS.map(({ href, label, icon: Icon }) => {
                    const active = router.pathname === href;
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded ${
                            active
                              ? "bg-primary-900 text-white"
                              : "text-primary-700 hover:bg-secondary-100 hover:text-primary-900"
                          }`}
                        >
                          <Icon className="w-4 h-4" aria-hidden="true" />
                          {label}
                        </Link>
                      </li>
                    );
                  })}

                  <li className="pt-1 mt-1 border-t border-secondary-300">
                    <button
                      type="button"
                      onClick={logout}
                      className="flex items-center w-full gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded text-primary-700 hover:bg-danger-soft hover:text-danger-strong"
                    >
                      <BiLogOutCircle className="w-4 h-4" aria-hidden="true" />
                      Sign out
                    </button>
                  </li>
                </ul>
              </nav>
            </aside>

            <div className="lg:col-span-9">{children}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
