import React from "react";
import Layout from "../common/Layout";
import OrderWatch from "../components/OrderWatch";
import Order from "../models/Orders";
import { requireAuthUser } from "../utils/auth";
import db from "../utils/db";

const userOrders = ({ orderWatch }) => {
  return (
    <Layout title="User Order | ECommerce-Website.">
      <div className="section-padding">
        <OrderWatch orders={orderWatch} />
      </div>
    </Layout>
  );
};

export default userOrders;

export async function getServerSideProps(context) {
  const user = requireAuthUser(context);
  if (user.redirect) return user;

  await db.connect();
  // Only fetch the signed-in user's own orders instead of leaking every order.
  const order = await Order.find({ "userInfo._id": user._id }).lean();
  const orderWatch = JSON.parse(JSON.stringify(order));
  await db.disconnect();
  return {
    props: {
      orderWatch,
    },
  };
}
