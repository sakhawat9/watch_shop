import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Dashboard/Sidebar";

const manageUser = () => {
  return (
    <>
      <Head>
        <title>Manage User | ECommerce-Website</title>
      </Head>
      <div className="flex w-full bg-gray-200">
        <Sidebar />
        <div className="m-5 min-h-screen w-full bg-white p-5 transition-all">
          <h2>This is manage user</h2>
        </div>
      </div>
    </>
  );
};

export default manageUser;
