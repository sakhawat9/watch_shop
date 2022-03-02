/* eslint-disable @next/next/no-img-element */
import React from "react";

const MyOrder = ({ order }) => {
  const { name, image } = order.cartItems[0];
  return (
    <>
      
        <div className="col-span-12 md:col-span-3 p-3 shadow rounded">
          <img src={image} alt="" className="rounded" />
          <h2 className="text-2xl mb-0 mt-4">{name}</h2>
        </div>
      </>
  );
};

export default MyOrder;
