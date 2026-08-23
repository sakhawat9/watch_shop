import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiLock, BiPackage, BiRefresh, BiShieldQuarter } from "react-icons/bi";
import { MdCheckCircleOutline, MdOutlineShoppingBag } from "react-icons/md";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import Button from "../ui/Button";
import Price from "../ui/Price";
import Rating from "../ui/Rating";
import QuantityStepper from "./QuantityStepper";
import { categoryLabel } from "../../utils/format";
import { useCommerce } from "../../utils/useCommerce";
import { useMounted } from "../../utils/useMounted";

const ASSURANCES = [
  { icon: BiPackage, text: "Free insured shipping, 3–5 business days" },
  { icon: BiRefresh, text: "30-day free returns on unworn watches" },
  { icon: BiShieldQuarter, text: "2-year manufacturer warranty included" },
  { icon: BiLock, text: "Encrypted checkout, card details never stored" },
];

/**
 * Product detail.
 *
 * Fixes carried over from the original:
 *  - "Add to Cart" now adds to the cart and stays on the page. It previously
 *    pushed straight to /shipping, skipping the cart entirely.
 *  - Rating comes from the product record instead of five hardcoded outline
 *    stars beside a literal "10 Review".
 *  - Stock, category and quantity are surfaced; there was no way to choose a
 *    quantity or to tell whether an item was in stock.
 *  - Drops react-image-magnify (unmaintained, legacy React lifecycles) for a
 *    CSS transform zoom that also works on touch.
 */
export default function ProductDetails({ watch }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist, pending } = useCommerce();
  // The wishlist lives in a cookie the server cannot read, so the saved/unsaved
  // state must not differ between the server HTML and the first client render.
  const mounted = useMounted();

  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const { name, image, price, delPrice, shortDesc, rating = 0, countInStock = 0, category, slug } =
    watch;

  const saved = mounted && isInWishlist(watch._id);
  const outOfStock = countInStock <= 0;
  const lowStock = !outOfStock && countInStock <= 5;
  const busy = pending === `cart-${watch._id}`;

  const buyNow = async () => {
    const added = await addToCart(watch, quantity);
    if (added) router.push("/cartWatch");
  };

  return (
    <div className="section">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div>
            <div
              className="relative overflow-hidden aspect-square rounded-card bg-secondary-100"
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
            >
              {imageFailed ? (
                <div className="flex items-center justify-center w-full h-full text-primary-300">
                  Image unavailable
                </div>
              ) : (
                <Image
                  src={image}
                  alt={name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className={`object-cover transition-transform duration-500 ${
                    zoomed ? "scale-125" : "scale-100"
                  }`}
                  onError={() => setImageFailed(true)}
                />
              )}
            </div>
            <p className="mt-3 text-xs text-center text-primary-400">
              Hover the image to zoom
            </p>
          </div>

          {/* Details */}
          <div>
            {category && (
              <Link
                href={`/search?category=${category}`}
                className="inline-block mb-3 text-sm font-medium tracking-wide uppercase transition-colors text-gold-700 hover:text-gold-800"
              >
                {categoryLabel(category)} watches
              </Link>
            )}

            <h1 className="mb-4">{name}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-5">
              <Rating value={rating} size="lg" />
              <span className="text-primary-200" aria-hidden="true">
                |
              </span>
              {outOfStock ? (
                <span className="badge badge-danger">Out of stock</span>
              ) : lowStock ? (
                <span className="badge badge-warning">Only {countInStock} left</span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
                  <MdCheckCircleOutline className="w-4 h-4" aria-hidden="true" />
                  In stock
                </span>
              )}
            </div>

            <Price
              price={price}
              delPrice={delPrice}
              size="lg"
              showSaving
              className="mb-5"
            />

            <p className="pb-6 mb-6 leading-relaxed border-b text-primary-600 border-secondary-300">
              {shortDesc}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                max={Math.max(1, countInStock)}
              />
              <p className="text-sm text-primary-400">
                {countInStock} available
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-4 sm:flex-row">
              <Button
                onClick={() => addToCart(watch, quantity)}
                disabled={outOfStock}
                loading={busy}
                variant="accent"
                size="lg"
                className="flex-1"
              >
                <MdOutlineShoppingBag className="w-5 h-5" aria-hidden="true" />
                Add to cart
              </Button>

              <Button
                onClick={buyNow}
                disabled={outOfStock}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                Buy now
              </Button>
            </div>

            <button
              type="button"
              onClick={() => toggleWishlist(watch)}
              aria-pressed={saved}
              className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors text-primary-600 hover:text-gold-700"
            >
              {saved ? (
                <RiHeartFill className="w-5 h-5 text-gold-600" aria-hidden="true" />
              ) : (
                <RiHeartLine className="w-5 h-5" aria-hidden="true" />
              )}
              {saved ? "Saved to wishlist" : "Save to wishlist"}
            </button>

            <ul className="p-5 space-y-3 rounded-card bg-secondary-100">
              {ASSURANCES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-primary-600">
                  <Icon
                    className="flex-shrink-0 w-5 h-5 mt-0.5 text-gold-600"
                    aria-hidden="true"
                  />
                  {text}
                </li>
              ))}
            </ul>

            <p className="sr-only">Product reference: {slug}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
