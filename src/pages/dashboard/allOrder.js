import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import ViewAllOrder from "../../components/ViewAllOrder";
import Order from "../../models/Orders";
import db from "../../utils/db";

const allOrder = ({ orderWatch }) => {
  return (
    <>
      <Head>
        <title>All Orders | ECommerce-Website.</title>
      </Head>
      <div className="all-order">
        <Sidebar />
        <div className="all-order__area">
          <ViewAllOrder key={orderWatch._id} orderWatch={orderWatch} />
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
