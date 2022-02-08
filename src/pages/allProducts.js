import React from "react";
import ContactAvailable from "../common/ContactAvailable";
import Layout from "../common/Layout";
import AllProduct from "../components/AllProduct";
import Watch from "../models/Watch";
import db from "../utils/db";

const AllProducts = ({watchs}) => {
  return (
    <Layout title="All Products">
      <AllProduct watch={watchs} />
      <ContactAvailable />
    </Layout>
  );
};

export default AllProducts;

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
  
