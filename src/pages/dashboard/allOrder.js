import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import ViewAllOrder from "../../components/ViewAllOrder/ViewAllOrder";
import Order from "../../models/Orders";
import db from "../../utils/db";

const allOrder = ({ orderWatch }) => {
  console.log("orderWatch", orderWatch);
  return (
    <>
      <Head>
        <title>All Orders | ECommerce-Website.</title>
      </Head>
      <div className="all-order">
        <Sidebar />
        <div className="all-order__area">
          <ViewAllOrder orderWatch={orderWatch}></ViewAllOrder>
        </div>
      </div>
    </>
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
