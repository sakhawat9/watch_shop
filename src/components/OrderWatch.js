import Image from "next/image";
import Link from "next/link";
import { MdOutlineInventory2 } from "react-icons/md";
import EmptyState from "./ui/EmptyState";
import { cartTotals, formatDate, formatPrice } from "../utils/format";

/**
 * A customer's order history.
 *
 * The previous version rendered only `order.cartItems[0]` as a bare image and
 * name — so a three-item order looked like a one-item order, with no date, no
 * total, no address and no status. Orders are already scoped to the signed-in
 * user server-side.
 */
export default function OrderWatch({ orders = [] }) {
  if (orders.length === 0) {
    return (
      <EmptyState
        icon={MdOutlineInventory2}
        title="No orders yet"
        description="When you place an order it will appear here with its status and tracking."
        action={{ label: "Browse watches", href: "/allProducts" }}
      />
    );
  }

  // Newest first.
  const sorted = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <ul className="space-y-6">
      {sorted.map((order) => {
        const { itemCount, total } = cartTotals(order.cartItems);

        return (
          <li key={order._id} className="overflow-hidden card">
            <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b bg-secondary-100 border-secondary-300">
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                <Meta label="Order placed" value={formatDate(order.createdAt)} />
                <Meta label="Total" value={formatPrice(total)} />
                <Meta
                  label="Items"
                  value={`${itemCount} ${itemCount === 1 ? "watch" : "watches"}`}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="badge badge-success">Confirmed</span>
                <span className="font-mono text-xs text-primary-400">
                  #{String(order._id).slice(-8)}
                </span>
              </div>
            </div>

            <ul className="divide-y divide-secondary-200">
              {order.cartItems.map((item, index) => (
                <li key={`${item.slug}-${index}`} className="flex items-center gap-4 p-5">
                  <Link
                    href={`/watch/${item.slug}`}
                    className="relative w-20 h-20 overflow-hidden rounded shrink-0 bg-secondary-100"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold">
                      <Link
                        href={`/watch/${item.slug}`}
                        className="transition-colors hover:text-gold-700"
                      >
                        {item.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-primary-500">
                      Qty {item.quantity ?? 1} &middot; {formatPrice(item.price)} each
                    </p>
                  </div>

                  <p className="text-base font-semibold text-primary-900 shrink-0">
                    {formatPrice(item.price * (item.quantity ?? 1))}
                  </p>
                </li>
              ))}
            </ul>

            {order.shippingAddress?.address && (
              <div className="px-5 py-4 border-t bg-secondary-50 border-secondary-200">
                <p className="text-xs tracking-wide uppercase text-primary-400">
                  Shipped to
                </p>
                <address className="mt-1 text-sm not-italic text-primary-600">
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </address>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <p className="text-xs tracking-wide uppercase text-primary-400">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-primary-900">{value}</p>
    </div>
  );
}
