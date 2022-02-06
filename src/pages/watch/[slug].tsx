// import Layout from "components/common/Layout";
// import FoodDetails from "components/FoodDetails/FoodDetails";
// import FoodDetailsBottom from "../../components/FoodDetails/FoodDetailsBottom";
import Layout from "../../common/Layout";
import Watch from "../../models/Watch";
import db from "../../utils/db";

const foodDetails = ({ singleWatch }) => {
  console.log(singleWatch);

  if (!singleWatch) {
    return (
      <Layout>
        <div className="container py-20 text-center">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout title={singleWatch.name}>
      <h2>This is {singleWatch.name}</h2>
      {/* <FoodDetails singleFood={singleFoods} />
      <FoodDetailsBottom singleFood={singleFoods} /> */}
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
