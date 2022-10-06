import React from "react";
import Product from "../common/Product";
import Title from "../common/Title";

const Products = ({ watchs }) => {
  return (
    <div className="section-padding">
      <div className="container">
        <Title title="Latest watch" subtitle="Watch Collections" />
        <div className="product">
          {watchs.slice(0, 8).map((watch) => (
            <Product key={watch._id} watch={watch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
