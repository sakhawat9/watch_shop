import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import MyOrder from "./MyOrder";

// Orders are already scoped to the signed-in user server-side.
const OrderWatch = ({ orders = [] }) => {
  return (
    <div className="container">
      {orders.length === 0 ? (
        <div className="section-padding">
          <div className="container text-center">
            <h3>You don&apos;t have any order watch</h3>
            <h3 className="flex items-center">
              Go Watch Page <FaLongArrowAltRight />
            </h3>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {orders.map((order) => (
            <MyOrder key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderWatch;
