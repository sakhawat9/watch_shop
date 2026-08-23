import Image from "next/image";
import Link from "next/link";
import { cartTotals, formatPrice } from "../../utils/format";

/**
 * Order summary panel shared by the cart, shipping and payment steps, so the
 * totals a customer sees never change shape between screens. The original
 * flow showed "Subtotal (n items): $x" in the cart and an unlabelled
 * "Total Watch (n) $x" on the payment page, with no line for shipping.
 */
export default function OrderSummary({
  cartItems = [],
  children,
  showItems = false,
  className = "",
}) {
  const { itemCount, subtotal, shipping, total } = cartTotals(cartItems);

  return (
    <aside
      aria-label="Order summary"
      className={`p-6 card lg:sticky lg:top-28 ${className}`}
    >
      <h2 className="pb-4 mb-4 border-b text-h4 border-secondary-200">
        Order summary
      </h2>

      {showItems && cartItems.length > 0 && (
        <ul className="pb-4 mb-4 space-y-4 border-b border-secondary-200">
          {cartItems.map((item) => (
            <li key={item._id} className="flex items-center gap-3">
              <div className="relative w-14 h-14 overflow-hidden rounded shrink-0 bg-secondary-100">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/watch/${item.slug}`}
                  className="block text-sm font-medium truncate transition-colors text-primary-900 hover:text-gold-700"
                >
                  {item.name}
                </Link>
                <p className="text-xs text-primary-400">Qty {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold text-primary-900 shrink-0">
                {formatPrice(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
      )}

      <dl className="space-y-3 text-sm">
        <Row
          label={`Subtotal (${itemCount} ${itemCount === 1 ? "item" : "items"})`}
          value={formatPrice(subtotal)}
        />
        <Row
          label="Shipping"
          value={<span className="font-medium text-success">Free</span>}
        />
        <Row label="Estimated tax" value="Calculated at payment" muted />

        <div className="flex items-baseline justify-between pt-3 mt-3 border-t border-secondary-200">
          <dt className="font-semibold text-primary-900">Total</dt>
          <dd className="text-xl font-semibold text-primary-900">
            {formatPrice(total)}
          </dd>
        </div>
      </dl>

      {children && <div className="mt-6">{children}</div>}

      <p className="mt-4 text-xs text-center text-primary-400">
        Shipping is free and insured on every order.
      </p>
    </aside>
  );
}

function Row({ label, value, muted = false }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-primary-500">{label}</dt>
      <dd className={muted ? "text-primary-400" : "font-medium text-primary-900"}>
        {value}
      </dd>
    </div>
  );
}
