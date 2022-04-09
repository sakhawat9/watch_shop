import React from "react";
import ManageWatch from "./ManageWatch";

const ManageWatchs = ({ watch }) => {
  return (
    <div className="manage-watch__wrapper__content">
      <div className="title">
        <h2 className="mb-4">Manage Watch</h2>
        <p>
          Dear Admin, Welcome to your manage watch page. You can manage your
          existing Watch below.
        </p>
      </div>
      <div className="manage-watch__wrapper__content__area">
        {watch.map((watch) => (
          <ManageWatch key={watch._id} watch={watch}></ManageWatch>
        ))}
      </div>
    </div>
  );
};

export default ManageWatchs;
