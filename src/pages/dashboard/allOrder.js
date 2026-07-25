import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import ViewAllOrder from "../../components/ViewAllOrder";
import orderRepo from "../../repositories/orderRepo";
import { requireAdmin } from "../../utils/auth";

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

export async function getServerSideProps(context) {
  const redirect = requireAdmin(context);
  if (redirect) return redirect;

  const orderWatch = await orderRepo.listAll();
  return {
    props: { orderWatch },
  };
}
