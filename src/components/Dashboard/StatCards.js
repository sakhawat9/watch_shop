import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRateReview, MdOutlineWatch, MdOutlinePayments } from "react-icons/md";
import { formatPrice } from "../../utils/format";

/**
 * Dashboard KPI row.
 *
 * The old cards used four shades of teal — a colour that appears nowhere else
 * in the brand — each with an oversized ghost icon behind the number. These
 * are neutral surfaces so the numbers read first, and revenue (which the old
 * dashboard never showed at all) is included.
 */
export default function StatCards({ watch = [], order = [], user = [], review = [] }) {
  const revenue = order.reduce(
    (sum, current) =>
      sum +
      (current.cartItems ?? []).reduce(
        (line, item) => line + item.price * (item.quantity ?? 1),
        0,
      ),
    0,
  );

  const stats = [
    { label: "Revenue", value: formatPrice(revenue), icon: MdOutlinePayments, accent: true },
    { label: "Orders", value: order.length, icon: AiOutlineShoppingCart },
    { label: "Products", value: watch.length, icon: MdOutlineWatch },
    { label: "Customers", value: user.length, icon: FiUsers },
    { label: "Reviews", value: review.length, icon: MdOutlineRateReview },
  ];

  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {stats.map(({ label, value, icon: Icon, accent }) => (
        <div key={label} className="p-5 card">
          <div className="flex items-center justify-between mb-3">
            <dt className="text-xs font-medium tracking-wide uppercase text-primary-400">
              {label}
            </dt>
            <span
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                accent ? "bg-gold-100 text-gold-700" : "bg-secondary-200 text-primary-500"
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
          <dd className="text-2xl font-semibold font-heading text-primary-900">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
