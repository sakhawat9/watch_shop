import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

/**
 * Dark banner that opens every inner page: breadcrumb trail, H1, and an
 * optional supporting line. Gives the site a consistent entry point and
 * anchors the single <h1> per page.
 *
 * `crumbs` is [{ label, href }] — the last entry renders as plain text and is
 * marked aria-current, so it isn't announced as a link to the current page.
 *
 * Omit `title` to render a compact breadcrumb-only bar. The product detail
 * page does this so the product name is the page's single <h1>, rather than
 * appearing once in the banner and again above the buy box.
 */
export default function PageHeader({ eyebrow, title, description, crumbs = [] }) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];

  return (
    <header className="bg-primary-900">
      <div className={title ? "container py-12 md:py-16" : "container py-4"}>
        {trail.length > 1 && (
          <nav aria-label="Breadcrumb" className={title ? "mb-5" : ""}>
            <ol className="flex flex-wrap items-center gap-1 text-sm">
              {trail.map((crumb, index) => {
                const isLast = index === trail.length - 1;
                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-1">
                    {index > 0 && (
                      <MdChevronRight
                        className="w-4 h-4 text-primary-400"
                        aria-hidden="true"
                      />
                    )}
                    {isLast || !crumb.href ? (
                      <span className="text-secondary-400" aria-current="page">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="transition-colors text-primary-300 hover:text-gold-400"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {eyebrow && title && <p className="mb-3 eyebrow text-gold-400">{eyebrow}</p>}

        {title && <h1 className="text-white">{title}</h1>}

        {title && description && (
          <p className="max-w-xl mt-4 text-secondary-400">{description}</p>
        )}
      </div>
    </header>
  );
}
