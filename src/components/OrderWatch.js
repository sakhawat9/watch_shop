/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Store } from "../utils/Store";
import MyOrder from "./MyOrder";

const OrderWatch = ({ orders }) => {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const currentUserOrder = orders.filter(
    (order) => order?.userInfo.email === userInfo?.email
  );
  console.log(orders);
  return (
    <div className="container">
      {currentUserOrder.length === 0 ? (
        <div className="section-padding">
          <div className="container text-center">
            <h3>You don't have any order watch</h3>
            <h3 className="flex items-center">
              Go Watch Page <FaLongArrowAltRight />
            </h3>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {currentUserOrder.map((order) => (
            <MyOrder key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderWatch;
