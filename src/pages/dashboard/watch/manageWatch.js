import React from "react";
import Layout from "../../../common/Layout";
import Sidebar from "../../../components/Dashboard/Sidebar";
import ManageWatch from "../../../components/ManageWatch/ManageWatch";
import Watch from "../../../models/Watch";
import db from "../../../utils/db";

const manageWatch = (props) => {
  const { allWatch } = props;
  return (
    <Layout>
      <div className="flex items-stretch w-full bg-gray-200">
        <Sidebar />
        <div className="w-full min-h-screen p-5 m-5 transition-all bg-white manageCourses__items section-padding page-content__body">
          <ManageWatch watch={allWatch} />
        </div>
      </div>
    </Layout>
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
