/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AiFillStar } from "react-icons/ai";
import Title from "../common/Title";
import Link from "next/link";
import categoryData from "../components/CategoryData";

const Category = () => {
  return (
    <div className="container section-padding mx-auto">
      <div>
        <Title
          title="All Category"
          subtitle="Our three different category"
          description=""
        />
      </div>
      <div className="grid grid-cols-12 gap-4">
        {categoryData.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <div className="col-span-12 lg:col-span-4">
      <Link href={`${item.link}`}>
        <a>
          <div className="">
            <div className="single-review-item">
              <div className="flex gap-4 items-center">
                <di>
                  <img
                    src={item.img}
                    className="w-32 h-32 rounded"
                    alt="image"
                  />
                </di>
                <di>
                  <h3>{item.name}</h3>
                  <ul className="single-review-item__ratting">
                    <li>
                      <AiFillStar />
                    </li>
                    <li>
                      <AiFillStar />
                    </li>
                    <li>
                      <AiFillStar />
                    </li>
                    <li>
                      <AiFillStar />
                    </li>
                    <li>
                      <AiFillStar />
                    </li>
                  </ul>
                </di>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Category;
