import ContactAvailable from "../common/ContactAvailable";
import Layout from "../common/Layout";
import ProductBrowser from "../components/product/ProductBrowser";
import PageHeader from "../components/ui/PageHeader";
import watchRepo from "../repositories/watchRepo";

export default function AllProducts({ watchs = [] }) {
  return (
    <Layout
      title="All Watches"
      description="Browse the full Watch_Shop collection — chronographs, dress watches, dive watches and minimalist designs."
    >
      <PageHeader
        eyebrow="The collection"
        title="All watches"
        description="Every piece in the catalogue, filterable by category and sortable by price or rating."
        crumbs={[{ label: "Shop" }]}
      />

      <div className="section">
        <div className="container">
          <ProductBrowser watches={watchs} />
        </div>
      </div>

      <ContactAvailable />
    </Layout>
  );
}

export async function getServerSideProps() {
  const watchs = await watchRepo.listAll();
  return { props: { watchs } };
}
