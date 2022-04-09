import Head from "next/head";
import React from "react";
import Layout from "../../../common/Layout";
import Sidebar from "../../../components/Dashboard/Sidebar";
import ManageWatchs from "../../../components/ManageWatch/ManageWatchs";
import Watch from "../../../models/Watch";
import db from "../../../utils/db";

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

export async function getServerSideProps() {
  await db.connect();
  const watch = await Watch.find({}).lean();
  await db.disconnect();
  return {
    props: {
      allWatch: watch.map(db.convertDocToObj),
    },
  };
}
