import Link from "next/link";
import React, { useContext } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { FaLongArrowAltRight } from "react-icons/fa";
import Layout from "../common/Layout";
import Title from "../common/Title";
import Wishlists from "../components/Wishlists";
import { Store } from "../utils/Store";

const Wishlist = () => {
  const { state, dispatch } = useContext(Store);
  const {
    wish: { wishlist },
  } = state;

  return (
    <Layout title="Wishlist | ECommerce-Website.">
      <div className="section-padding">
        <div className="container">
          <Title title="Wishlist watch" subtitle="our all wishlist watch" />
          {wishlist.length === 0 ? (
            <div className="py-20 text-xl">
              <p className="flex gap-4 p-4 rounded-lg shadow-lg bg-blue-50">
                <BiErrorCircle /> Your wishlist is currently empty.
              </p>
              <Link href="/allProducts">
                <a className="btn-brand">
                  Go Watch Page <FaLongArrowAltRight />
                </a>
              </Link>
            </div>
          ) : (
            <div className="product">
              {wishlist.map((watch) => (
                <Wishlists key={watch._id} watch={watch} dispatch={dispatch} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
