// Shared formatting helpers. Currency and dates were previously interpolated
// inline as `${"$"}${price}` in a dozen components, which meant no consistent
// decimal handling and no single place to change currency.

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatPrice(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "—";
  return currencyFormatter.format(amount);
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : dateFormatter.format(date);
}

/** Human label for a raw category slug stored on a watch. */
const CATEGORY_LABELS = {
  men: "Men's",
  women: "Women's",
  unisex: "Unisex",
};

export function categoryLabel(slug) {
  if (!slug) return "Uncategorised";
  return CATEGORY_LABELS[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

/** Order totals used by the cart, checkout and order summaries. */
export function cartTotals(cartItems = []) {
  const itemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
    0,
  );
  return { itemCount, subtotal, shipping: 0, total: subtotal };
}
