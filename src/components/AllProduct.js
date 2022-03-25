import React, { useState } from "react";
import Product from "../common/Product";
import Title from "../common/Title";
import Pagination from "./Pagination";

const AllProduct = ({ watch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = watch.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="section-padding">
      <div className="container">
        <Title title="All watch" subtitle="Watch collections" />
        <div className="product">
          {currentPosts.map((watch) => (
            <Product key={watch._id} watch={watch} />
          ))}
        </div>
      </div>
      <div className="container">
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={watch.length}
            paginate={paginate}
          />
        </div>
    </div>
  );
};

export default AllProduct;

