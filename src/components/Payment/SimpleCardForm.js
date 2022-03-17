/* eslint-disable react/jsx-no-duplicate-props */
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe
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
    <div className="container mt-5 ">
      <form onSubmit={handleSubmit} className="lg:w-8/12">
        <label>
          Card number
          <CardNumberElement
            className=" border border-gray-200 px-3 my-2 rounded py-2 shadow"
            options={options}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement className=" border border-gray-200 px-3 my-2 rounded py-2 shadow" options={options} />
        </label>
        <label>
          CVC
          <CardCvcElement options={options} className=" border border-gray-200 px-3 my-2 rounded py-2 shadow" />
        </label>
        <button
          className="inline-flex items-center gap-2 px-3 py-3 text-white border-0 rounded bg-primary-500 focus:outline-none hover:bg-primary-600"
          type="submit"
          disabled={!stripe}
        >
          Confirm Payment
        </button>
      </form>
      {paymentError && <p style={{ color: "red" }}>{paymentError}</p>}
      {err && (
        <p style={{ color: "red" }}>
          {err.message ? "Your food already added" : ""}
        </p>
      )}
      <ul className="pt-8">
        <li className="space-y-0.5 w-full lg:w-4/5 block mb-4 text-xl">
          <strong>Payment  Info</strong>
        </li>
        <li className="space-y-0.5 w-full lg:w-4/5 block border-2 p-3 mb-2">
          <strong>Card number: </strong>
          4242 4242 4242 4242
        </li>
      </ul>
    </div>
  );
};

export default SimpleCardForm;
