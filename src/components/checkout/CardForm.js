import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useMemo, useState } from "react";
import { BiErrorCircle, BiLock } from "react-icons/bi";
import Button from "../ui/Button";

/**
 * Stripe card fields.
 *
 * Stripe Elements render inside iframes, so they can't inherit our CSS —
 * `useOptions` mirrors the design tokens (font, colours) so the card inputs
 * match the surrounding form. The original passed `color: "gray"` with the
 * browser default font, and its `useMemo` had no dependency array so the
 * options object was rebuilt on every render.
 */
function useOptions() {
  return useMemo(
    () => ({
      style: {
        base: {
          fontFamily: "var(--font-body), system-ui, sans-serif",
          fontSize: "16px",
          color: "#14161A",
          "::placeholder": { color: "#A2A8B2" },
        },
        invalid: { color: "#B3261E", iconColor: "#B3261E" },
      },
    }),
    [],
  );
}

const ELEMENT_CLASS =
  "block w-full px-4 py-3.5 bg-white border rounded border-primary-200 transition-colors focus-within:border-gold-600 focus-within:ring-1 focus-within:ring-gold-600";

export default function CardForm({ onPaymentReady, submitting, submitError }) {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const [cardError, setCardError] = useState(null);
  const [validating, setValidating] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setValidating(true);
    setCardError(null);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    setValidating(false);

    if (error) {
      setCardError(error.message);
      return;
    }
    onPaymentReady(paymentMethod.card);
  };

  const busy = validating || submitting;

  return (
    <form onSubmit={handleSubmit} className="p-6 card sm:p-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="mb-1 text-h4">Payment</h2>
          <p className="text-sm text-primary-500">
            All transactions are encrypted and processed by Stripe.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded shrink-0 bg-success-soft text-success-strong">
          <BiLock className="w-3.5 h-3.5" aria-hidden="true" />
          Secure
        </span>
      </div>

      {/* Radio-style card option. The previous version offered a second
          "Paypal" radio whose button did nothing at all when clicked. */}
      <div className="flex items-center gap-3 p-4 mb-6 border rounded border-gold-500 bg-gold-50">
        <span
          aria-hidden="true"
          className="flex items-center justify-center w-4 h-4 border-4 rounded-full border-gold-600"
        />
        <span className="text-sm font-medium text-primary-900">
          Credit or debit card
        </span>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="card-number" className="label">
            Card number
          </label>
          <div id="card-number" className={ELEMENT_CLASS}>
            <CardNumberElement options={options} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="card-expiry" className="label">
              Expiry date
            </label>
            <div id="card-expiry" className={ELEMENT_CLASS}>
              <CardExpiryElement options={options} />
            </div>
          </div>
          <div>
            <label htmlFor="card-cvc" className="label">
              Security code
            </label>
            <div id="card-cvc" className={ELEMENT_CLASS}>
              <CardCvcElement options={options} />
            </div>
          </div>
        </div>
      </div>

      {(cardError || submitError) && (
        <p className="mt-5 alert alert-danger" role="alert">
          <BiErrorCircle className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
          <span>{cardError || submitError}</span>
        </p>
      )}

      <Button
        type="submit"
        variant="accent"
        size="lg"
        block
        className="mt-6"
        disabled={!stripe}
        loading={busy}
      >
        {busy ? "Placing your order…" : "Place order"}
      </Button>

      <p className="mt-4 text-xs text-center text-primary-400">
        By placing this order you agree to our returns and warranty terms.
      </p>
    </form>
  );
}
