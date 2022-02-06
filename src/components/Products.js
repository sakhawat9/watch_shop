import React from "react";
import Product from "../common/Product";
import Title from "../common/Title";

const Products = ({ watchs }) => {
  return (
    <div className="section-padding">
      <div className="container">
        <Title title="Latest watch" subtitle="our all watch" />
        <div className="grid grid-cols-12 gap-4">
          {watchs.slice(0, 8).map((watch) => (
            <Product key={watch._id} watch={watch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
