import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import Title from "../common/Title";
import { Store } from "../utils/Store";
import CartItemTwo from "./CartItem/CartItemTwo";
import Payment from "./Payment/Payment";

const Checkout = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
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
    <div className="section-padding">
      <div className="px-4 checkout">
        <Title title="Payments" />
        <div className="cart-content__item">
          <div className="checkout__total-watch">
            <h6>
              Total Watch ({cartItems.reduce((a, c) => a + c.quantity, 0)})
            </h6>
            <h6>
              <sup>$</sup>
              {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
            </h6>
          </div>
          <h5>Select payment method</h5>
          <div className="checkout__payment-option">
            <div
              onClick={() => setShow(true)}
              className="checkout__payment-option__one"
            >
              <input type="radio" id="stripe" name="method" value="CSS" />{" "}
              <label htmlFor="stripe">New Payment Card</label>
            </div>
            <div
              onClick={() => setShow(false)}
              className="checkout__payment-option__two"
            >
              <input type="radio" id="paypal" name="method" value="Paypal" />{" "}
              <label htmlFor="paypal">Paypal</label>
            </div>
          </div>
          {show ? (
            <Payment
              handlePaymentSuccess={handlePaymentSuccess}
              error={error}
            />
          ) : (
            <button className="checkout__payment-option__pay-now">
              Pay now
            </button>
          )}
        </div>
        <ul className="mt-10 cart-course-list w-full">
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
    </div>
  );
};

export default Checkout;
