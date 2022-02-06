import ContactAvailable from "../../common/ContactAvailable";
import Layout from "../../common/Layout";
import ProductDetails from "../../components/ProductDetails";
import ProductDetailsBottom from "../../components/ProductDetailsBottom";
import Watch from "../../models/Watch";
import db from "../../utils/db";

const foodDetails = ({ singleWatch }) => {
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
      <ContactAvailable />
    </Layout>
  );
};

export default foodDetails;

export async function getServerSideProps(context: { params: any }) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const watch = await Watch.findOne({ slug }).lean();
  const singleWatch = JSON.parse(JSON.stringify(watch));
  await db.disconnect();
  return {
    props: {
      singleWatch,
    },
  };
}
