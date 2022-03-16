/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { BsFillStarFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import Link from "next/link";
import React, { useContext } from "react";
import Image from "next/image";
import Layout from "../../common/Layout";
import Title from "../../common/Title";
import Watch from "../../models/Watch";
import db from "../../utils/db";
import { Store } from "../../utils/Store";

const man = ({ manWatch }) => {
  const mans = manWatch.filter((watch) => watch.category === "man");

  return (
    <Layout
      title="Man Category | Restaurant Website."
    >
      <div className="container py-24">
        <Title
          title="Man Category Watch"
          subtitle="Our all man category watch"
        />
        <div className="product">
          {mans.map((man) => (
            <Card key={man._id} man={man} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

const Card = ({ man }) => {
  const { price, delPrice, image, name, slug } = man;
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/watch/${man._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...man, quantity: 1 },
    });
  };
  const addToWishList = async () => {
    const { data } = await axios.get(`/api/watch/${man._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "WISHLIST_ADD_ITEM",
      payload: { ...man, quantity: 1 },
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
          <FaRegHeart />
        </button>
      </div>
    </div>
  );
};


export default man;

export async function getServerSideProps() {
  await db.connect();
  const watch = await Watch.find({}).lean();
  await db.disconnect();
  return {
    props: {
      manWatch: watch.map(db.convertDocToObj),
    },
  };
}
