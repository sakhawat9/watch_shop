import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { MdCheckCircle, MdOutlineLocalShipping, MdOutlineShoppingBag } from "react-icons/md";
import Layout from "../common/Layout";
import CardForm from "../components/checkout/CardForm";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import OrderSummary from "../components/checkout/OrderSummary";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import PageHeader from "../components/ui/PageHeader";
import { Store } from "../utils/Store";
import { cartTotals, formatPrice } from "../utils/format";

// Created outside the component so the Stripe object isn't rebuilt each render.
//
// `loadStripe(undefined)` throws, which took the whole payment page down with
// an unhandled TypeError whenever NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY was
// missing — the default for anyone who clones the repo without setting up
// Stripe. Checking first lets the page explain itself instead of crashing.
const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = STRIPE_KEY ? loadStripe(STRIPE_KEY) : null;

function Payments() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems, shippingAddress },
  } = state;

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/payments");
      return;
    }
    // Can't pay without an address; send the visitor back a step rather than
    // failing validation server-side after the card has been entered.
    if (!shippingAddress?.address && cartItems.length > 0) {
      router.push("/shipping");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePayment = async (paymentInfo) => {
    setSubmitting(true);
    setError(null);
    try {
      const { data } = await axios.post(
        "/api/orders/orders",
        { paymentInfo, cartItems, shippingAddress },
        { headers: { authorization: `Bearer ${userInfo.token}` } },
      );

      // Capture the order before clearing the cart so the confirmation screen
      // still has something to show.
      setPlacedOrder({ ...data, cartItems });
      dispatch({ type: "CART_CLEAR" });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We couldn't complete your order. Your card has not been charged.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (placedOrder) {
    return <OrderConfirmation order={placedOrder} />;
  }

  if (cartItems.length === 0) {
    return (
      <Layout title="Payment">
        <PageHeader title="Payment" crumbs={[{ label: "Payment" }]} />
        <div className="section">
          <div className="container">
            <EmptyState
              icon={MdOutlineShoppingBag}
              title="Your cart is empty"
              description="Add a watch to your cart to continue to payment."
              action={{ label: "Browse watches", href: "/allProducts" }}
            />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Payment">
      <PageHeader
        eyebrow="Checkout"
        title="Payment"
        crumbs={[
          { label: "Cart", href: "/cartWatch" },
          { label: "Shipping", href: "/shipping" },
          { label: "Payment" },
        ]}
      />

      <div className="section">
        <div className="container">
          <CheckoutSteps current={2} />

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-6 lg:col-span-8">
              <ShippingRecap address={shippingAddress} />

              {stripePromise ? (
                <Elements stripe={stripePromise}>
                  <CardForm
                    onPaymentReady={handlePayment}
                    submitting={submitting}
                    submitError={error}
                  />
                </Elements>
              ) : (
                <section className="p-6 card sm:p-8">
                  <h2 className="mb-4 text-h4">Payment</h2>
                  <p className="alert alert-warning" role="status">
                    <BiErrorCircle className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
                    <span>
                      Card payments aren&apos;t configured on this deployment.
                      Set <code className="font-mono">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>{" "}
                      in your environment to enable checkout.
                    </span>
                  </p>
                </section>
              )}
            </div>

            <div className="lg:col-span-4">
              <OrderSummary cartItems={cartItems} showItems />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function ShippingRecap({ address = {} }) {
  return (
    <section className="p-6 card sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <MdOutlineLocalShipping
            className="flex-shrink-0 w-5 h-5 mt-0.5 text-gold-600"
            aria-hidden="true"
          />
          <div>
            <h2 className="mb-1 text-h4">Delivering to</h2>
            <address className="text-sm not-italic leading-relaxed text-primary-600">
              {address.fullName && (
                <>
                  {address.fullName}
                  <br />
                </>
              )}
              {address.address}
              <br />
              {address.city} {address.postalCode}
              <br />
              {address.country}
              {address.phone && (
                <>
                  <br />
                  {address.phone}
                </>
              )}
            </address>
          </div>
        </div>

        <Button href="/shipping" variant="ghost" size="sm">
          Edit
        </Button>
      </div>
    </section>
  );
}

function OrderConfirmation({ order }) {
  const { total } = cartTotals(order.cartItems);

  return (
    <Layout title="Order confirmed">
      <div className="section">
        <div className="container max-w-2xl">
          <div className="p-8 text-center card sm:p-12">
            <span className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-success-soft text-success">
              <MdCheckCircle className="w-8 h-8" aria-hidden="true" />
            </span>

            <h1 className="mb-3">Thank you — your order is confirmed</h1>
            <p className="mb-8 text-primary-500">
              We&apos;ve emailed a receipt to {order.userInfo?.email}. You&apos;ll
              get tracking details as soon as your order ships.
            </p>

            <dl className="grid gap-4 p-5 mb-8 text-left sm:grid-cols-3 rounded-card bg-secondary-100">
              <div>
                <dt className="text-xs tracking-wide uppercase text-primary-400">
                  Order number
                </dt>
                <dd className="mt-1 text-sm font-medium break-all text-primary-900">
                  {order._id}
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide uppercase text-primary-400">
                  Items
                </dt>
                <dd className="mt-1 text-sm font-medium text-primary-900">
                  {order.cartItems.length}
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide uppercase text-primary-400">
                  Total paid
                </dt>
                <dd className="mt-1 text-sm font-medium text-primary-900">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/userOrders" variant="primary">
                View my orders
              </Button>
              <Button href="/allProducts" variant="outline">
                Continue shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Payments), { ssr: false });
