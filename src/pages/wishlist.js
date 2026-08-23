import dynamic from "next/dynamic";
import { RiHeartLine } from "react-icons/ri";
import ContactAvailable from "../common/ContactAvailable";
import Layout from "../common/Layout";
import ProductGrid from "../components/product/ProductGrid";
import EmptyState from "../components/ui/EmptyState";
import PageHeader from "../components/ui/PageHeader";
import { useCommerce } from "../utils/useCommerce";

function Wishlist() {
  const { wishlist, toggleWishlist } = useCommerce();

  return (
    <Layout title="Wishlist">
      <PageHeader
        eyebrow="Saved"
        title="Your wishlist"
        description={
          wishlist.length > 0
            ? `${wishlist.length} ${wishlist.length === 1 ? "watch" : "watches"} saved for later.`
            : undefined
        }
        crumbs={[{ label: "Wishlist" }]}
      />

      <div className="section">
        <div className="container">
          {wishlist.length === 0 ? (
            <EmptyState
              icon={RiHeartLine}
              title="Nothing saved yet"
              description="Tap the heart on any watch to keep it here while you decide."
              action={{ label: "Browse watches", href: "/allProducts" }}
              secondaryAction={{ label: "Back to home", href: "/" }}
            />
          ) : (
            <ProductGrid watches={wishlist} onRemove={toggleWishlist} />
          )}
        </div>
      </div>

      <ContactAvailable />
    </Layout>
  );
}

// Wishlist state hydrates from a cookie on the client, so rendering it on the
// server would produce a hydration mismatch on every visit.
export default dynamic(() => Promise.resolve(Wishlist), { ssr: false });
