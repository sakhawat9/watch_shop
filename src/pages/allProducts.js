import React from "react";
import ContactAvailable from "../common/ContactAvailable";
import Layout from "../common/Layout";
import AllProduct from "../components/AllProduct";
import watchRepo from "../repositories/watchRepo";

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
  const watchs = await watchRepo.listAll();
  return {
    props: { watchs },
  };
}
  
