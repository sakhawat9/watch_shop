import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Store } from "../../utils/Store";
import CartItemTwo from "../CartItem/CartItemTwo";
import Payment from "../Payment/Payment";

const Checkout = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  console.log("state", state);
  const {
    cart: { shippingAddress, cartItems },
    userInfo,
  } = state;
  const [error, setError] = useState();
  const [show, setShow] = useState(true);
  const handlePaymentSuccess = async (paymentInfo) => {
    try {
      const { data } = await axios.post(
        "/api/orders/orders",
        {
          paymentInfo,
          userInfo,
          cartItems,
          shippingAddress,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        text: "Order successfully",
      });
      dispatch({ type: "CART_CLEAR" });
      Cookies.remove("cartItems");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="container section-padding">

        <div className="cart-content__item">
          <div className="flex gap-3 p-3 mb-3 bg-white rounded shadow color-white">
            <h6 className="m-0 text-lg ">
              Total Watch ({cartItems.reduce((a, c) => a + c.quantity, 0)})
            </h6>
            <h6 className="m-0 text-lg">
              <sup>$</sup>
              {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
            </h6>
          </div>
          <h5>Select payment method</h5>
          <div
            onClick={() => setShow(true)}
            className="flex items-center gap-3 mb-3"
          >
            <input type="radio" id="stripe" name="method" value="CSS" />{" "}
            <label htmlFor="stripe">New Payment Card</label>
          </div>
          <div
            onClick={() => setShow(false)}
            className="flex items-center gap-3"
          >
            <input type="radio" id="paypal" name="method" value="Paypal" />{" "}
            <label htmlFor="paypal">Paypal</label>
          </div>
          {show ? (
            <Payment
              handlePaymentSuccess={handlePaymentSuccess}
              error={error}
            ></Payment>
          ) : (
            <button className="px-16 py-4 mt-8 text-white uppercase bg-yellow-500 rounded">
              Pay now
            </button>
          )}
        </div>
      <ul className="mt-10 cart-course-list lg:w-1/2">
        <h5>Order details</h5>
        {cartItems.length == 0 ? (
          <div className="py-20 text-xl ">
            Cart is empty.
            <Link href="/allProducts">
              <a className="btn-brand">Go foods Page</a>
            </Link>
          </div>
        ) : (
          cartItems.map((item) => <CartItemTwo item={item} key={item._id} />)
        )}
      </ul>
    </div>
  );
};

export default Checkout;
