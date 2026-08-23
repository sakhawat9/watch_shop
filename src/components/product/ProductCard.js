import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import Price from "../ui/Price";
import Rating from "../ui/Rating";
import { categoryLabel } from "../../utils/format";
import { useCommerce } from "../../utils/useCommerce";
import { useMounted } from "../../utils/useMounted";

/**
 * The product card, used by the homepage, shop, search, related products and
 * wishlist. It replaces five near-identical components that each hardcoded a
 * five-star rating and a literal "10 reviews".
 *
 * Key fixes over the originals:
 *  - fixed 1:1 image ratio, so cards in a grid always line up
 *  - the whole card is one link target via a stretched overlay, while the
 *    cart/wishlist buttons stay separately focusable (no nested interactives)
 *  - product names wrap and clamp rather than being cut mid-word at 22 chars
 */
export default function ProductCard({ watch, onRemove, priority = false }) {
  const { name, slug, image, price, delPrice, rating = 0, countInStock = 0, category } =
    watch;

  const { addToCart, toggleWishlist, isInWishlist, pending } = useCommerce();
  const [imageFailed, setImageFailed] = useState(false);
  // Wishlist state comes from a cookie; hold it back until after hydration.
  const mounted = useMounted();

  const saved = mounted && isInWishlist(watch._id);
  const outOfStock = countInStock <= 0;
  const discounted = Number(delPrice) > Number(price);
  const busy = pending === `cart-${watch._id}`;

  return (
    <article className="relative flex flex-col h-full overflow-hidden transition-shadow duration-200 bg-white border group rounded-card border-secondary-300 hover:shadow-lift">
      <div className="relative overflow-hidden aspect-square bg-secondary-100">
        {imageFailed ? (
          // Products whose remote image 404s previously showed the browser's
          // broken-image glyph and collapsed the card's height.
          <div className="flex items-center justify-center w-full h-full text-sm text-primary-300">
            Image unavailable
          </div>
        ) : (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 24vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
            priority={priority}
          />
        )}

        <div className="absolute flex flex-col gap-1.5 top-3 left-3">
          {discounted && <span className="badge badge-accent">Sale</span>}
          {outOfStock && <span className="badge badge-neutral">Sold out</span>}
        </div>

        <button
          type="button"
          onClick={() => (onRemove ? onRemove(watch) : toggleWishlist(watch))}
          aria-pressed={onRemove ? undefined : saved}
          aria-label={
            onRemove
              ? `Remove ${name} from your wishlist`
              : saved
                ? `Remove ${name} from your wishlist`
                : `Save ${name} to your wishlist`
          }
          className="absolute z-10 flex items-center justify-center transition-colors bg-white rounded-full top-3 right-3 w-9 h-9 text-primary-600 shadow-subtle hover:bg-primary-900 hover:text-white"
        >
          {saved || onRemove ? (
            <RiHeartFill className="w-4 h-4 text-gold-600 hover:text-white" aria-hidden="true" />
          ) : (
            <RiHeartLine className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {category && (
          <p className="mb-1.5 text-xs font-medium tracking-wide uppercase text-primary-400">
            {categoryLabel(category)}
          </p>
        )}

        <h3 className="mb-2 text-base font-semibold leading-snug line-clamp-2">
          {/* Stretched link: makes the whole card clickable without wrapping
              the cart button in an anchor. */}
          <Link
            href={`/watch/${slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-gold-700 transition-colors"
          >
            {name}
          </Link>
        </h3>

        <Rating value={rating} size="sm" className="mb-3" />

        <div className="flex items-end justify-between gap-3 mt-auto">
          <Price price={price} delPrice={delPrice} />

          <button
            type="button"
            onClick={() => addToCart(watch)}
            disabled={outOfStock || busy}
            aria-label={`Add ${name} to cart`}
            className="relative z-10 btn-icon btn-icon-sm"
          >
            <MdOutlineShoppingBag className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
