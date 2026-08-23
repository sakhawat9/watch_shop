import { useMemo } from "react";
import { MdOutlineShowChart } from "react-icons/md";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import EmptyState from "../ui/EmptyState";
import { formatPrice } from "../../utils/format";

/**
 * Revenue over the last 14 days, derived from real orders.
 *
 * The previous chart plotted a hardcoded `uv`/`pv`/`amt` fixture across pages
 * "A" through "G" — Recharts' own documentation sample — so the dashboard
 * showed identical fake traffic no matter what the store had actually sold.
 * With no orders it now says so rather than inventing a trend line.
 */
export default function RevenueChart({ orders = [], days = 14 }) {
  const data = useMemo(() => buildSeries(orders, days), [orders, days]);
  const hasRevenue = data.some((point) => point.revenue > 0);

  return (
    <section className="p-5 card sm:p-6">
      <div className="flex items-baseline justify-between gap-4 mb-6">
        <div>
          <h2 className="text-h4">Revenue</h2>
          <p className="text-sm text-primary-500">Last {days} days</p>
        </div>
        <p className="text-xl font-semibold font-heading text-primary-900">
          {formatPrice(data.reduce((sum, point) => sum + point.revenue, 0))}
        </p>
      </div>

      {!hasRevenue ? (
        <EmptyState
          icon={MdOutlineShowChart}
          compact
          title="No revenue yet"
          description="Once orders start coming in, daily revenue will be charted here."
        />
      ) : (
        <div className="h-64" role="img" aria-label={`Daily revenue for the last ${days} days`}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B8925A" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#B8925A" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#E6E1D6" vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#7C838D", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#7C838D", fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [formatPrice(value), "Revenue"]}
                contentStyle={{
                  borderRadius: "0.5rem",
                  border: "1px solid #E6E1D6",
                  fontSize: "0.875rem",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#A97C3F"
                strokeWidth={2}
                fill="url(#revenueFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

/** One bucket per day, so days with no orders render as a genuine zero. */
function buildSeries(orders, days) {
  const buckets = new Map();
  const today = new Date();

  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    const key = date.toISOString().slice(0, 10);
    buckets.set(key, {
      label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      revenue: 0,
    });
  }

  orders.forEach((order) => {
    const key = String(order.createdAt ?? "").slice(0, 10);
    const bucket = buckets.get(key);
    if (!bucket) return;
    bucket.revenue += (order.cartItems ?? []).reduce(
      (sum, item) => sum + item.price * (item.quantity ?? 1),
      0,
    );
  });

  return [...buckets.values()];
}
