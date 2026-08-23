import Link from "next/link";
import { HiViewList } from "react-icons/hi";
import AdminLayout from "../../common/AdminLayout";
import RevenueChart from "../../components/Dashboard/RevenueChart";
import StatCards from "../../components/Dashboard/StatCards";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import orderRepo from "../../repositories/orderRepo";
import reviewRepo from "../../repositories/reviewRepo";
import userRepo from "../../repositories/userRepo";
import watchRepo from "../../repositories/watchRepo";
import { requireAdmin } from "../../utils/auth";
import { cartTotals, formatDate, formatPrice } from "../../utils/format";

export default function Dashboard({ watch = [], review = [], orderWatch = [], user = [] }) {
  const recent = [...orderWatch]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const lowStock = watch
    .filter((item) => (item.countInStock ?? 0) <= 5)
    .sort((a, b) => (a.countInStock ?? 0) - (b.countInStock ?? 0))
    .slice(0, 5);

  return (
    <AdminLayout
      title="Overview"
      description="Store performance at a glance."
      actions={
        <Button href="/dashboard/watch/addWatch" variant="accent" size="sm">
          Add product
        </Button>
      }
    >
      <div className="space-y-6">
        <StatCards watch={watch} order={orderWatch} user={user} review={review} />

        <RevenueChart orders={orderWatch} />

        <div className="grid gap-6 xl:grid-cols-3">
          {/* Recent orders */}
          <section className="xl:col-span-2 card">
            <div className="flex items-center justify-between px-5 py-4 border-b border-secondary-300">
              <h2 className="text-h4">Recent orders</h2>
              <Link href="/dashboard/allOrder" className="text-sm link">
                View all
              </Link>
            </div>

            {recent.length === 0 ? (
              <div className="p-5">
                <EmptyState
                  icon={HiViewList}
                  compact
                  title="No orders yet"
                  description="Orders placed in the storefront will appear here."
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table !min-w-[32rem]">
                  <thead>
                    <tr>
                      <th scope="col">Customer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Items</th>
                      <th scope="col" className="text-right">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((order) => {
                      const { itemCount, total } = cartTotals(order.cartItems);
                      return (
                        <tr key={order._id}>
                          <td>
                            <p className="font-medium text-primary-900">
                              {order.userInfo?.name ?? "Unknown"}
                            </p>
                            <p className="text-xs text-primary-400">
                              {order.userInfo?.email}
                            </p>
                          </td>
                          <td>{formatDate(order.createdAt)}</td>
                          <td>{itemCount}</td>
                          <td className="font-medium text-right text-primary-900">
                            {formatPrice(total)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Low stock — actionable, and not previously surfaced anywhere. */}
          <section className="card">
            <div className="flex items-center justify-between px-5 py-4 border-b border-secondary-300">
              <h2 className="text-h4">Low stock</h2>
              <Link href="/dashboard/watch/manageWatch" className="text-sm link">
                Manage
              </Link>
            </div>

            {lowStock.length === 0 ? (
              <p className="p-5 text-sm text-primary-500">
                Every product has more than five units in stock.
              </p>
            ) : (
              <ul className="divide-y divide-secondary-200">
                {lowStock.map((item) => (
                  <li key={item._id} className="flex items-center justify-between gap-3 px-5 py-3">
                    <Link
                      href={`/dashboard/watch/${item._id}`}
                      className="text-sm font-medium truncate transition-colors text-primary-900 hover:text-gold-700"
                    >
                      {item.name}
                    </Link>
                    <span
                      className={`badge shrink-0 ${
                        item.countInStock === 0 ? "badge-danger" : "badge-warning"
                      }`}
                    >
                      {item.countInStock === 0 ? "Sold out" : `${item.countInStock} left`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const redirect = requireAdmin(context);
  if (redirect) return redirect;

  const [watch, review, user, orderWatch] = await Promise.all([
    watchRepo.listAll(),
    reviewRepo.listAll(),
    userRepo.listAll(),
    orderRepo.listAll(),
  ]);
  return { props: { watch, review, user, orderWatch } };
}
