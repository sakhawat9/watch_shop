/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";

const useOptions = () => {
  const options = useMemo(() => ({
    style: {
      base: {
        color: "gray",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  }));

  return options;
};

const SimpleCardForm = ({ handlePayment, err }) => {
  const router = useRouter();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      setPaymentSuccess(paymentMethod.card);
      setPaymentError(null);
      handlePayment(paymentMethod.card);
      // router.push("/");
    }
  };

  return (
    <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <label>
            Card number
            <CardNumberElement
              className="checkout__payment-option__card-number"
              options={options}
            />
          </label>
          <label>
            Expiration date
            <CardExpiryElement
              className="checkout__payment-option__card-number"
              options={options}
            />
          </label>
          <label>
            CVC
            <CardCvcElement
              options={options}
              className="checkout__payment-option__card-number"
            />
          </label>
          <div className="text-center">
            <button
              className="w-full md:w-1/2 lg:w-1/3 text-center gap-2 px-3 py-3 mt-4 text-white border-0 rounded bg-primary-500 focus:outline-none hover:bg-primary-600"
              type="submit"
              disabled={!stripe}
            >
              Confirm Payment
            </button>
          </div>
        </form>
        {paymentError && <p className="text-red-600">{paymentError}</p>}
        {err && (
          <p className="text-red-600">
            {err.message ? "Your watch already added" : ""}
          </p>
        )}
    </div>
  );
};

export default SimpleCardForm;
