import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsFillStarFill } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import { RiHeartPulseFill } from "react-icons/ri";
import { Store } from "../utils/Store";

const SearchWatch = ({ data }) => {
  const { price, delPrice, image, name, slug } = data;

  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/watch/${watch._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...watch, quantity: 1 },
    });
  };
  const addToWishList = async () => {
    const { data } = await axios.get(`/api/watch/${watch._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "WISHLIST_ADD_ITEM",
      payload: { ...watch, quantity: 1 },
    });
  };

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
        </a>
      </Link>
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
        <button className="product__add-button z-50" onClick={addToCartHandler}>
          <MdOutlineAdd />
        </button>
      </div>

      <div className="product__wishlist" onClick={addToWishList}>
        <button>
          <RiHeartPulseFill />
        </button>
      </div>
    </div>
  );
};

export default SearchWatch;
