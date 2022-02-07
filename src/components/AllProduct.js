import React from "react";
import Product from "../common/Product";
import Title from "../common/Title";

const AllProduct = ({ watch }) => {
  return (
    <div className="section-padding">
      <div className="container">
        <Title title="All watch" subtitle="our all watch" />
        <div className="product">
          {watch.map((watch) => (
            <Product key={watch._id} watch={watch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;

