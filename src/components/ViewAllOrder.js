import axios from "axios";
import { useContext, useState } from "react";
import { HiViewList } from "react-icons/hi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { toast } from "react-toastify";
import ConfirmDialog from "./ui/ConfirmDialog";
import EmptyState from "./ui/EmptyState";
import { Store } from "../utils/Store";
import { cartTotals, formatDate, formatPrice } from "../utils/format";

/**
 * All orders, for admins.
 *
 * Fixes over the original table:
 *  - the "Food name" column header (left over from a food-delivery template)
 *  - it only ever showed `cartItems[0]`, so a multi-item order looked like a
 *    single-item one, and its "Price" column showed one line item's price
 *    rather than the order total
 *  - `data.paymentInfo.brand` was read unguarded, so a single legacy order
 *    without payment info crashed the whole page
 *  - delete was a bare red `<td>` with an onClick and a window.confirm
 */
export default function ViewAllOrder({ orderWatch = [] }) {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [items, setItems] = useState(orderWatch);
  const [target, setTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/api/admin/order/${target._id}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setItems((current) => current.filter((order) => order._id !== target._id));
      toast.success("Order deleted.");
      setTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete that order.");
    } finally {
      setDeleting(false);
    }
  };

  if (items.length === 0) {
    return (
      <EmptyState
        icon={HiViewList}
        title="No orders yet"
        description="Orders placed in the storefront will appear here with their totals and delivery details."
      />
    );
  }

  const sorted = [...items].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <>
      <p className="mb-5 text-sm text-primary-500">
        {items.length} {items.length === 1 ? "order" : "orders"}
      </p>

      <div className="table-wrap">
        <table className="table !min-w-[56rem]">
          <thead>
            <tr>
              <th scope="col">Order</th>
              <th scope="col">Customer</th>
              <th scope="col">Items</th>
              <th scope="col">Ship to</th>
              <th scope="col">Payment</th>
              <th scope="col" className="text-right">
                Total
              </th>
              <th scope="col" className="text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((order) => {
              const { itemCount, total } = cartTotals(order.cartItems);
              const lineItems = order.cartItems ?? [];
              const address = order.shippingAddress ?? {};
              const payment = order.paymentInfo ?? {};

              return (
                <tr key={order._id}>
                  <td>
                    <p className="font-mono text-xs text-primary-900">
                      #{String(order._id).slice(-8)}
                    </p>
                    <p className="text-xs text-primary-400">
                      {formatDate(order.createdAt)}
                    </p>
                  </td>

                  <td>
                    <p className="font-medium text-primary-900">
                      {order.userInfo?.name ?? "Unknown"}
                    </p>
                    <p className="text-xs text-primary-400">
                      {order.userInfo?.email}
                    </p>
                  </td>

                  <td>
                    <p className="text-primary-900">
                      {lineItems[0]?.name ?? "—"}
                      {lineItems.length > 1 && (
                        <span className="text-primary-400">
                          {" "}
                          +{lineItems.length - 1} more
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-primary-400">
                      {itemCount} {itemCount === 1 ? "unit" : "units"}
                    </p>
                  </td>

                  <td>
                    <p className="text-primary-900">{address.city ?? "—"}</p>
                    <p className="text-xs text-primary-400">{address.phone ?? ""}</p>
                  </td>

                  <td>
                    {payment.last4 ? (
                      <>
                        <p className="uppercase text-primary-900">
                          {payment.brand ?? "Card"}
                        </p>
                        <p className="text-xs text-primary-400">
                          &bull;&bull;&bull;&bull; {payment.last4}
                        </p>
                      </>
                    ) : (
                      <span className="text-primary-400">—</span>
                    )}
                  </td>

                  <td className="font-semibold text-right text-primary-900">
                    {formatPrice(total)}
                  </td>

                  <td>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setTarget(order)}
                        aria-label={`Delete order ${String(order._id).slice(-8)}`}
                        className="flex items-center justify-center transition-colors rounded w-9 h-9 text-primary-500 hover:bg-danger-soft hover:text-danger"
                      >
                        <RiDeleteBin7Line className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={Boolean(target)}
        onClose={() => setTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        title="Delete this order?"
        description="This permanently removes the order from your records. It can't be undone."
        confirmLabel="Delete order"
      />
    </>
  );
}
