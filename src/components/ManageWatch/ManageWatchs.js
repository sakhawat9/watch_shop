import React from "react";
import ManageWatch from "./ManageWatch";

const ManageWatchs = ({ watch }) => {
  return (
    <div className="manageWatch">
      <div className="title">
        <h2 className="title__subtitle"></h2>
        <h2 className="mb-4">Manage Watch</h2>
        <p>
          Dear Admin, Welcome to your manage watch page. You can manage your
          existing Watch below.
        </p>
      </div>
      <div className="manageWatch__wrapper">
        {watch.map((watch) => (
          <ManageWatch key={watch._id} watch={watch}></ManageWatch>
        ))}
      </div>
    </div>
  );
};

export default ManageWatchs;
