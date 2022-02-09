import React from "react";
import Title from "../../../common/Title";
import AddNewWatch from "../../../components/AddNewWatch/AddNewWatch";
import Sidebar from "../../../components/Dashboard/Sidebar";

const addWatch = () => {
  return (
    <>
      <div className="flex items-stretch w-full bg-gray-200">
        <Sidebar />
        <div className="w-full min-h-screen p-5 transition-all bg-white section-padding">
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
