/* eslint-disable @next/next/no-img-element */
import React from "react";

const QuickShop = () => {
  return (
    <div className="quick-shop section-padding-b">
      <div className="container">
          
        <div
          className="quick-shop__wrapper"
        >
          <div className="col-span-12 md:col-span-6 text-center flex items-center justify-center">
            <h3 className="font-normal text-2xl text-primary">
              100% Secure delivery without contacting the courier
            </h3>
          </div>
          <div className="col-span-12 md:col-span-6 flex justify-center">
            <img
              className="h-40 object-cover w-1/2"
              src="https://res.cloudinary.com/medsy/image/upload/v1650311294/3696913-removebg-preview_oo8zws.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickShop;
