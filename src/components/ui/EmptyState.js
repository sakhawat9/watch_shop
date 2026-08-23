import Button from "./Button";

/**
 * Shared empty / zero-result state. Every list surface in the app (cart,
 * wishlist, search, orders, admin tables) routes through this so an empty
 * screen always looks deliberate rather than like a rendering failure.
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  // `compact` is for empty states nested inside a card (admin panels), where
  // the full-page padding leaves an awkward amount of dead space.
  compact = false,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center border border-dashed rounded-card border-secondary-400 bg-secondary-50 ${
        compact ? "px-5 py-10" : "px-6 py-16"
      } ${className}`}
    >
      {Icon && (
        <span
          className={`flex items-center justify-center rounded-full bg-white text-gold-600 shadow-subtle ${
            compact ? "w-12 h-12 mb-3" : "w-16 h-16 mb-5"
          }`}
        >
          <Icon className={compact ? "w-5 h-5" : "w-7 h-7"} aria-hidden="true" />
        </span>
      )}

      <h3 className={compact ? "mb-1.5 text-base font-semibold" : "mb-2 text-h4"}>
        {title}
      </h3>

      {description && (
        <p className={`max-w-sm text-sm text-primary-500 ${compact ? "mb-4" : "mb-6"}`}>
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {action && (
            <Button href={action.href} onClick={action.onClick} variant="accent">
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              href={secondaryAction.href}
              onClick={secondaryAction.onClick}
              variant="outline"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
