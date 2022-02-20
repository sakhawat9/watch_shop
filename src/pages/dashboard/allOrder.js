
import React from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../components/Dashboard/Sidebar";
import ViewAllOrder from "../../components/ViewAllOrder/ViewAllOrder";
import Order from "../../models/Orders";
import db from "../../utils/db";

const allOrder = ({ orderWatch }) => {
  return (
    <Layout title="All Orders | ECommerce-Website.">
      <div className="flex items-stretch w-full h-full bg-gray-100">
        <Sidebar />
        <div className="w-full min-h-screen p-5 py-4 transition-all bg-white">
          <ViewAllOrder orderWatch={orderWatch}></ViewAllOrder>
          {/* {orderFoods.map((orderFood) => (
            <ViewAllOrder orderFood={orderFood}></ViewAllOrder>
          ))} */}
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
