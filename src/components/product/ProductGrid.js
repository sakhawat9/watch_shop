import ProductCard from "./ProductCard";

/** Consistent responsive product grid: 1 / 2 / 3 / 4 columns. */
export default function ProductGrid({ watches = [], onRemove, className = "" }) {
  return (
    <div
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6 ${className}`}
    >
      {watches.map((watch, index) => (
        <ProductCard
          key={watch._id}
          watch={watch}
          onRemove={onRemove}
          priority={index < 4}
        />
      ))}
    </div>
  );
}

/** Placeholder grid matching ProductCard's shape, for loading states. */
export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6"
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="overflow-hidden border rounded-card border-secondary-300">
          <div className="skeleton aspect-square rounded-none" />
          <div className="p-5 space-y-3">
            <div className="w-1/3 h-3 skeleton" />
            <div className="w-3/4 h-4 skeleton" />
            <div className="w-1/2 h-3 skeleton" />
            <div className="w-1/4 h-5 skeleton" />
          </div>
        </div>
      ))}
    </div>
  );
}
