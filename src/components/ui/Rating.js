import { AiFillStar, AiOutlineStar } from "react-icons/ai";

/**
 * Star rating rendered from the product's real `rating` value.
 *
 * The stars are decorative (`aria-hidden`) and the accessible value is exposed
 * once as text — previously every card shipped five hardcoded filled stars with
 * a literal "10 reviews", which was both inaccurate and noisy for screen readers.
 */
export default function Rating({
  value = 0,
  count,
  size = "sm",
  showValue = true,
  className = "",
}) {
  const rounded = Math.round(value);
  const starSize = size === "lg" ? "w-5 h-5" : "w-4 h-4";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="flex text-gold-500" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) =>
          i < rounded ? (
            <AiFillStar key={i} className={starSize} />
          ) : (
            <AiOutlineStar key={i} className={`${starSize} text-primary-300`} />
          ),
        )}
      </span>

      {showValue && (
        <span className="text-sm text-primary-500">
          <span className="sr-only">Rated </span>
          {value.toFixed(1)}
          <span className="sr-only"> out of 5</span>
          {typeof count === "number" && (
            <>
              {" "}
              <span className="text-primary-400">({count})</span>
            </>
          )}
        </span>
      )}
    </div>
  );
}
