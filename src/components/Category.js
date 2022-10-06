/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AiFillStar } from "react-icons/ai";
import Title from "../common/Title";
import Link from "next/link";
import categoryData from "../components/CategoryData";

const Category = () => {
  return (
    <div className="section-padding category">
      <div className="container mx-auto">
        <Title
          title="All Category"
          subtitle="Our three different category"
          description=""
        />
        <div className="grid grid-cols-12 gap-6 category__wrapper">
          {categoryData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <div className="col-span-12 md:col-span-6 xl:col-span-3 category__wrapper__item">
      <Link href={`${item.link}`}>
        <a>
          <div className="category__wrapper__item--content">
            <div className="image">
              <img src={item.img} className="rounded" alt="image" />
            </div>
            <div className="text">
              <h3>{item.name}</h3>
              <p>Avg price: {item.price}</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Category;
