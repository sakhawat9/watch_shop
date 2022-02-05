import Layout from "../common/Layout";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Watch from "../models/Watch";
import db from "../utils/db";

export default function Home({watchs}) {
  return (
    <Layout>
      <Hero infinite="true" autoPlay="true" deviceType="desktop" />
      <Products watchs={watchs} />
    </Layout>
  );
}


export async function getServerSideProps() {
  await db.connect();
  const watchs = await Watch.find({}).lean();
  await db.disconnect();
  return {
    props: {
      watchs: watchs.map(db.convertDocToObj),
    },
  };
}
