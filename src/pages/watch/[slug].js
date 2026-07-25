import ContactAvailable from "../../common/ContactAvailable";
import Layout from "../../common/Layout";
import ProductDetails from "../../components/ProductDetails";
import ProductDetailsBottom from "../../components/ProductDetailsBottom";
import RelatedWatch from "../../components/RelatedWatch";
import watchRepo from "../../repositories/watchRepo";

const watchDetails = ({ singleWatch, allWatch }) => {
  if (!singleWatch) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <button type="button" className="bg-indigo-500 ..." disabled>
            <svg
              className="animate-spin h-5 w-5 mr-3 ..."
              viewBox="0 0 24 24"
            ></svg>
            Processing...
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={singleWatch.name}>
      <ProductDetails singleWatch={singleWatch} />
      <ProductDetailsBottom singleWatch={singleWatch} />
      <RelatedWatch allWatch={allWatch} singleWatch={singleWatch} />
      <ContactAvailable />
    </Layout>
  );
};

export default watchDetails;

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const [allWatch, singleWatch] = await Promise.all([
    watchRepo.listAll(),
    watchRepo.getBySlug(slug),
  ]);
  return {
    props: { allWatch, singleWatch },
  };
}
