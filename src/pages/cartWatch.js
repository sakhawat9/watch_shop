import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Layout from "../common/Layout";
import Title from "../common/Title";
import { Store } from "../utils/Store";

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/watch/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    router.push("/shipping");
  };

  return (
    <Layout title="Your Shopping Cart">
      <div className="section-padding">
        <Title
          title="Your Shopping Cart"
          subtitle="Start your order and enjoy the tastiest watch."
          description=""
        />
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center gap-6 text-center">
              <p className="text-xl">Your cart is currently empty.</p>
              <Link
                href="/allProducts"
                className="btn-brand inline-flex items-center gap-2"
              >
                Go Watch Page <FaLongArrowAltRight />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-9">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="p-3 font-semibold">Image</th>
                        <th className="p-3 font-semibold">Name</th>
                        <th className="p-3 font-semibold text-right">
                          Quantity
                        </th>
                        <th className="p-3 font-semibold text-right">Price</th>
                        <th className="p-3 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item._id} className="border-b border-gray-100">
                          <td className="p-3">
                            <Link href={`/watch/${item.slug}`}>
                              <Image
                                className="rounded"
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                              />
                            </Link>
                          </td>
                          <td className="p-3">
                            <Link
                              href={`/watch/${item.slug}`}
                              className="hover:text-primary"
                            >
                              {item.name}
                            </Link>
                          </td>
                          <td className="p-3 text-right">
                            <select
                              className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                              value={item.quantity}
                              onChange={(e) =>
                                updateCartHandler(item, Number(e.target.value))
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-3 text-right">${item.price}</td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              aria-label={`Remove ${item.name} from cart`}
                              onClick={() => removeItemHandler(item)}
                              className="inline-flex items-center gap-2 px-2 py-1 text-white border-0 rounded bg-primary-500 focus:outline-none hover:bg-primary-600"
                            >
                              <IoMdClose className="text-2xl" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="p-5 bg-white rounded shadow">
                  <p className="mb-4 text-lg">
                    Subtotal ({itemCount} items): ${subtotal}
                  </p>
                  <button
                    type="button"
                    onClick={checkoutHandler}
                    className="flex items-center justify-center w-full gap-2 btn btn-default"
                  >
                    Check Out <FaLongArrowAltRight />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
