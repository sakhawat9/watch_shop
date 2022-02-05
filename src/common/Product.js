/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";

const Product = ({ watch }) => {
  const { price, delPrice, image, name } = watch;
  return (
    <div className="col-span-3 p-3 rounded shadow-lg">
      <Image
        src={image}
        alt={name}
        className="rounded"
        width="1000"
        height="1000"
      />
      <h3>{name}</h3>
      <div className="flex items-center justify-between">
        <ul className="flex">
          <li>
            <BsFillStarFill className="text-yellow-500" />
          </li>
          <li>
            <BsFillStarFill className="text-yellow-500" />
          </li>
          <li>
            <BsFillStarFill className="text-yellow-500" />
          </li>
          <li>
            <BsFillStarFill className="text-yellow-500" />
          </li>
          <li>
            <BsFillStarFill className="text-yellow-500" />
          </li>
        </ul>
        <p>10 reviews</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-2 text-lg font-bold">
          <p>${price}</p>
          <del className="text-gray-500">${delPrice}</del>
        </div>
        <button className="border rounded border-primary-500 hover:bg-primary hover:text-white">
          <MdOutlineAdd className="text-2xl " />
        </button>
      </div>
    </div>
  );
};

export default Product;
