import React from "react";
import Layout from "../common/Layout";
import OrderWatch from "../components/OrderWatch";
import orderRepo from "../repositories/orderRepo";
import { requireAuthUser } from "../utils/auth";

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

  // Only fetch the signed-in user's own orders instead of leaking every order.
  const orderWatch = await orderRepo.listByUserId(user._id);
  return {
    props: { orderWatch },
  };
}
