import { MdOutlineSearchOff } from "react-icons/md";
import ContactAvailable from "../common/ContactAvailable";
import Layout from "../common/Layout";
import ProductBrowser from "../components/product/ProductBrowser";
import ProductGrid from "../components/product/ProductGrid";
import EmptyState from "../components/ui/EmptyState";
import PageHeader from "../components/ui/PageHeader";
import watchRepo from "../repositories/watchRepo";
import { categoryLabel } from "../utils/format";

/**
 * Search and category results.
 *
 * A category link (`?category=men`) renders the full browser so the visitor can
 * keep filtering; a text query renders a flat result grid with a real
 * no-results state — previously an empty search showed a bare "(0)" heading
 * above nothing at all.
 */
export default function SearchPage({ watchData = [], searchQuery, category }) {
  const isCategoryView = Boolean(category) && !searchQuery;

  const heading = searchQuery
    ? `Results for “${searchQuery}”`
    : category
      ? `${categoryLabel(category)} watches`
      : "All watches";

  return (
    <Layout title={searchQuery ? `Search: ${searchQuery}` : heading}>
      <PageHeader
        eyebrow={searchQuery ? "Search" : "Category"}
        title={heading}
        description={
          searchQuery
            ? `${watchData.length} ${watchData.length === 1 ? "watch" : "watches"} matched your search.`
            : undefined
        }
        crumbs={[{ label: "Shop", href: "/allProducts" }, { label: heading }]}
      />

      <div className="section">
        <div className="container">
          {watchData.length === 0 ? (
            <EmptyState
              icon={MdOutlineSearchOff}
              title="No matching watches"
              description={
                searchQuery
                  ? `We couldn't find anything for “${searchQuery}”. Try a different term, or browse the full collection.`
                  : "There are no watches in this category yet."
              }
              action={{ label: "Browse all watches", href: "/allProducts" }}
              secondaryAction={{ label: "Back to home", href: "/" }}
            />
          ) : isCategoryView ? (
            <ProductBrowser watches={watchData} />
          ) : (
            <ProductGrid watches={watchData} />
          )}
        </div>
      </div>

      <ContactAvailable />
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const category = query.category && query.category !== "all" ? query.category : "";
  const searchQuery = query.query && query.query !== "all" ? query.query : "";
  const name = query.name && query.name !== "all" ? query.name : "";

  const watchData = await watchRepo.search({
    name: searchQuery || name,
    category,
  });

  return {
    props: {
      watchData,
      searchQuery: searchQuery || name || null,
      category: category || null,
    },
  };
}
