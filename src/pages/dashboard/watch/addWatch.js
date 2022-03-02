import Head from "next/head";
import React from "react";
import Title from "../../../common/Title";
import AddNewWatch from "../../../components/AddNewWatch/AddNewWatch";
import Sidebar from "../../../components/Dashboard/Sidebar";

const addWatch = () => {
  return (
    <>
      <Head>
        <title>Add Watch | ECommerce-Website</title>
      </Head>
      <div className="flex w-full bg-gray-200">
        <Sidebar />
        <div className="m-5 min-h-screen w-full bg-white p-5 transition-all">
          <Title
            title="Add new watch"
            subtitle=""
            description="Dear Admin, Welcome to your Add watch page. You may add new watch by filling below form and start your earning instantly."
          ></Title>
          <AddNewWatch />
        </div>
      </div>
    </>
  );
};

export default addWatch;
