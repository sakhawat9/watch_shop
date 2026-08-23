import { MdOutlineSearchOff } from "react-icons/md";
import ContactAvailable from "../../common/ContactAvailable";
import Layout from "../../common/Layout";
import ProductDetails from "../../components/product/ProductDetails";
import ProductTabs from "../../components/product/ProductTabs";
import RelatedWatches from "../../components/product/RelatedWatches";
import EmptyState from "../../components/ui/EmptyState";
import PageHeader from "../../components/ui/PageHeader";
import watchRepo from "../../repositories/watchRepo";
import { categoryLabel } from "../../utils/format";

export default function WatchDetails({ singleWatch, allWatch = [] }) {
  // An unknown slug previously rendered a permanently disabled "Processing..."
  // button with a truncated className, which read as a hung page rather than a
  // missing product.
  if (!singleWatch) {
    return (
      <Layout title="Watch not found">
        <PageHeader
          title="Watch not found"
          crumbs={[{ label: "Shop", href: "/allProducts" }, { label: "Not found" }]}
        />
        <div className="section">
          <div className="container">
            <EmptyState
              icon={MdOutlineSearchOff}
              title="We couldn't find that watch"
              description="It may have been removed or the link may be incorrect."
              action={{ label: "Browse all watches", href: "/allProducts" }}
              secondaryAction={{ label: "Back to home", href: "/" }}
            />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={singleWatch.name} description={singleWatch.shortDesc}>
      {/* Breadcrumb-only: ProductDetails carries the page's single <h1>. */}
      <PageHeader
        crumbs={[
          { label: "Shop", href: "/allProducts" },
          {
            label: `${categoryLabel(singleWatch.category)} watches`,
            href: `/search?category=${singleWatch.category}`,
          },
          { label: singleWatch.name },
        ]}
      />

      <ProductDetails watch={singleWatch} />
      <ProductTabs watch={singleWatch} />
      <RelatedWatches allWatch={allWatch} currentWatch={singleWatch} />
      <ContactAvailable />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const [allWatch, singleWatch] = await Promise.all([
    watchRepo.listAll(),
    watchRepo.getBySlug(slug),
  ]);
  return { props: { allWatch, singleWatch } };
}
