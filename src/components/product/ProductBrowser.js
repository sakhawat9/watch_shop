import { useMemo, useState } from "react";
import { MdOutlineSearchOff } from "react-icons/md";
import EmptyState from "../ui/EmptyState";
import Pagination from "../ui/Pagination";
import ProductGrid from "./ProductGrid";
import { categoryLabel } from "../../utils/format";

const PER_PAGE = 8;

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "name", label: "Name: A–Z" },
];

/**
 * Shop listing with category filtering, sorting and pagination.
 *
 * The previous shop page rendered an unfiltered, unsorted slice with numbered
 * `<a href="#">` links and no result count — and the search page had a
 * `filterSearch` helper that was defined but never called, so its category
 * links were the only way to narrow anything down.
 */
export default function ProductBrowser({ watches = [], initialCategory = "all" }) {
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const unique = [...new Set(watches.map((watch) => watch.category).filter(Boolean))];
    return ["all", ...unique.sort()];
  }, [watches]);

  const filtered = useMemo(() => {
    const list =
      category === "all"
        ? [...watches]
        : watches.filter((watch) => watch.category === category);

    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      case "name":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [watches, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const changeCategory = (next) => {
    setCategory(next);
    setPage(1);
  };

  const changeSort = (next) => {
    setSort(next);
    setPage(1);
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col gap-4 pb-6 mb-8 border-b lg:flex-row lg:items-center lg:justify-between border-secondary-300">
        <div>
          <h2 className="sr-only">Filter by category</h2>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((slug) => {
              const active = slug === category;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => changeCategory(slug)}
                  aria-pressed={active}
                  className={`px-4 py-2 text-sm font-medium transition-colors border rounded ${
                    active
                      ? "text-white bg-primary-900 border-primary-900"
                      : "bg-white border-primary-200 text-primary-700 hover:border-primary-900 hover:text-primary-900"
                  }`}
                >
                  {slug === "all" ? "All watches" : categoryLabel(slug)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <p className="text-sm text-primary-500" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "watch" : "watches"}
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-primary-500 whitespace-nowrap">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => changeSort(event.target.value)}
              className="py-2 text-sm select w-44"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={MdOutlineSearchOff}
          title="No watches in this category"
          description="Nothing here yet. Try another category, or browse the full collection."
          action={{ label: "Show all watches", onClick: () => changeCategory("all") }}
        />
      ) : (
        <>
          <ProductGrid watches={visible} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(next) => {
              setPage(next);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}
    </div>
  );
}
