import React from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../components/Dashboard/Sidebar";
import ViewAllOrder from "../../components/ViewAllOrder/ViewAllOrder";
import Order from "../../models/Orders";
import db from "../../utils/db";

const allOrder = ({ orderWatch }) => {
  return (
    <Layout title="All Orders | ECommerce-Website.">
      <div className="flex w-full bg-gray-200">
        <Sidebar />
        <div className="m-5 min-h-screen w-full bg-white p-5 transition-all">
          <ViewAllOrder orderWatch={orderWatch}></ViewAllOrder>
        </div>
      </div>
    </Layout>
  );
};

export default allOrder;

export async function getServerSideProps() {
  await db.connect();
  const order = await Order.find({}).lean();
  const orderWatch = JSON.parse(JSON.stringify(order));
  await db.disconnect();
  return {
    props: {
      orderWatch,
    },
  };
}
