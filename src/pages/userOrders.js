
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Layout from "../common/Layout";
import OrderWatch from "../components/OrderWatch";
import Order from "../models/Orders";
import db from "../utils/db";

const userOrders = ({ orderWatch }) => {
    console.log(orderWatch);
  return (
    <Layout title="User Order | ECommerce-Website.">

        <div className="section-padding">
          <OrderWatch key={orderWatch._id} orders={orderWatch} />
        </div>

    </Layout>
  );
};

export default userOrders;

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
