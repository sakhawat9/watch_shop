import { useState } from "react";
import Link from "next/link";
import Rating from "../ui/Rating";
import { categoryLabel } from "../../utils/format";

/**
 * Description / specification / reviews tabs.
 *
 * The old bottom section used react-tabs with an "Overview" panel and a
 * "Reviews" panel containing two hardcoded lorem-ipsum reviews attributed to a
 * fictional "Josaph Manrty", plus a review form that posted nowhere. Reviews
 * aren't stored per product in this data model, so the tab states that plainly
 * and links to the real review form rather than inventing testimonials.
 *
 * Implemented with the WAI-ARIA tabs pattern (roving tabindex, arrow keys)
 * instead of pulling in react-tabs and overriding its stylesheet.
 */
export default function ProductTabs({ watch }) {
  const tabs = [
    { id: "description", label: "Description" },
    { id: "specification", label: "Specification" },
    { id: "reviews", label: "Reviews" },
  ];
  const [active, setActive] = useState("description");

  const onKeyDown = (event) => {
    const index = tabs.findIndex((tab) => tab.id === active);
    if (event.key === "ArrowRight") {
      setActive(tabs[(index + 1) % tabs.length].id);
    } else if (event.key === "ArrowLeft") {
      setActive(tabs[(index - 1 + tabs.length) % tabs.length].id);
    }
  };

  return (
    <section className="section-sm section-bg">
      <div className="container">
        <div className="overflow-hidden bg-white border rounded-card border-secondary-300">
          <div
            role="tablist"
            aria-label="Product information"
            onKeyDown={onKeyDown}
            className="flex overflow-x-auto border-b border-secondary-300"
          >
            {tabs.map((tab) => {
              const selected = tab.id === active;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(tab.id)}
                  className={`px-5 py-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                    selected
                      ? "border-gold-600 text-gold-700"
                      : "border-transparent text-primary-500 hover:text-primary-900"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8">
            <div
              role="tabpanel"
              id="panel-description"
              aria-labelledby="tab-description"
              hidden={active !== "description"}
              tabIndex={0}
            >
              <p className="max-w-prose leading-relaxed text-primary-600">
                {watch.description}
              </p>
            </div>

            <div
              role="tabpanel"
              id="panel-specification"
              aria-labelledby="tab-specification"
              hidden={active !== "specification"}
              tabIndex={0}
            >
              <dl className="max-w-xl divide-y divide-secondary-200">
                <Spec label="Model" value={watch.name} />
                <Spec label="Category" value={`${categoryLabel(watch.category)} watches`} />
                <Spec label="Reference" value={watch.slug} />
                <Spec
                  label="Availability"
                  value={
                    watch.countInStock > 0
                      ? `${watch.countInStock} in stock`
                      : "Out of stock"
                  }
                />
                <Spec label="Warranty" value="2-year manufacturer warranty" />
                <Spec label="Returns" value="30 days, free" />
              </dl>
            </div>

            <div
              role="tabpanel"
              id="panel-reviews"
              aria-labelledby="tab-reviews"
              hidden={active !== "reviews"}
              tabIndex={0}
            >
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <p className="text-3xl font-semibold font-heading text-primary-900">
                  {(watch.rating ?? 0).toFixed(1)}
                </p>
                <Rating value={watch.rating ?? 0} size="lg" showValue={false} />
              </div>

              <p className="max-w-prose mb-6 text-primary-600">
                This is the average rating recorded for the {watch.name}.
                Individual written reviews aren&apos;t collected per product yet
                — if you own this watch, your feedback goes to the store review
                page.
              </p>

              <Link href="/review-form" className="btn btn-outline">
                Write a review
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({ label, value }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-3">
      <dt className="text-sm font-medium text-primary-500">{label}</dt>
      <dd className="col-span-2 text-sm text-primary-900">{value}</dd>
    </div>
  );
}
