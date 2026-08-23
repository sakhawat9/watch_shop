import { formatPrice } from "../../utils/format";

/**
 * Price with optional struck-through "was" figure and a saving badge.
 * The old price is marked up with <del> and given an sr-only prefix so a
 * screen reader doesn't read two bare numbers in a row.
 */
export default function Price({
  price,
  delPrice,
  size = "md",
  showSaving = false,
  className = "",
}) {
  const hasDiscount = Number(delPrice) > Number(price);
  const sizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };
  const saving = hasDiscount
    ? Math.round(((delPrice - price) / delPrice) * 100)
    : 0;

  return (
    <p className={`flex flex-wrap items-baseline gap-2 ${className}`}>
      <span className={`font-semibold text-primary-900 ${sizes[size] ?? sizes.md}`}>
        {formatPrice(price)}
      </span>

      {hasDiscount && (
        <del className="text-sm text-primary-400">
          <span className="sr-only">Regular price </span>
          {formatPrice(delPrice)}
        </del>
      )}

      {hasDiscount && showSaving && (
        <span className="badge badge-accent">Save {saving}%</span>
      )}
    </p>
  );
}
