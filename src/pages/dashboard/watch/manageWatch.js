import Head from "next/head";
import React from "react";
import Sidebar from "../../../components/Dashboard/Sidebar";
import ManageWatchs from "../../../components/ManageWatch/ManageWatchs";
import watchRepo from "../../../repositories/watchRepo";
import { requireAdmin } from "../../../utils/auth";

const manageWatch = (props) => {
  const { allWatch } = props;
  return (
    <>
    <Head>
      <title>Manage Watch | ECommerce-Website</title>
    </Head>
      <div className="manage-watch">
        <Sidebar />
        <div className="manage-watch__wrapper section-padding">
          <ManageWatchs watch={allWatch} />
        </div>
      </div>
    </>
  );
};

export default manageWatch;

export async function getServerSideProps(context) {
  const redirect = requireAdmin(context);
  if (redirect) return redirect;

  const allWatch = await watchRepo.listAll();
  return {
    props: { allWatch },
  };
}
