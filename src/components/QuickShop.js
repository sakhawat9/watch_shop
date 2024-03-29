/* eslint-disable @next/next/no-img-element */
import React from "react";

const QuickShop = () => {
  return (
    <div className="quick-shop section-padding section-bg">
      <div className="container">
        <div
          className="quick-shop__wrapper"
        >
          <div className="flex items-center justify-center col-span-12 text-center md:col-span-6">
            <h3 className="text-2xl font-normal text-primary">
              100% Secure delivery without contacting the courier
            </h3>
          </div>
          <div className="flex justify-center col-span-12 md:col-span-6">
            <img
              className="object-cover w-1/2 h-40"
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
