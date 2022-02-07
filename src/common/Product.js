/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";

const Product = ({ watch }) => {
  const { price, delPrice, image, name, slug } = watch;
  return (
    <div className="product__wrapper">
      <Link href={`/watch/${slug}`}>
        <a>
          <Image
            src={image}
            alt={name}
            className="rounded"
            width="1000"
            height="1000"
          />
          <h3 className="product__name">{name}</h3>
          <div className="product__ratting">
            <ul>
              <li>
                <BsFillStarFill />
              </li>
              <li>
                <BsFillStarFill />
              </li>
              <li>
                <BsFillStarFill />
              </li>
              <li>
                <BsFillStarFill />
              </li>
              <li>
                <BsFillStarFill />
              </li>
            </ul>
            <p>10 reviews</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="product__price">
              <p>${price}</p>
              <del className="product__price__del">${delPrice}</del>
            </div>
            <button className="product__add-button">
              <MdOutlineAdd />
            </button>
          </div>
        </a>
      </Link>
      <div className="product__wishlist">
        <button>
          <FaRegHeart />
        </button>
      </div>
    </div>
  );
};

export default Product;
