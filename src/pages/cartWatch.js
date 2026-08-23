import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { MdArrowForward, MdDeleteOutline, MdOutlineShoppingBag } from "react-icons/md";
import Layout from "../common/Layout";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import OrderSummary from "../components/checkout/OrderSummary";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import PageHeader from "../components/ui/PageHeader";
import QuantityStepper from "../components/product/QuantityStepper";
import { categoryLabel, formatPrice } from "../utils/format";
import { useCommerce } from "../utils/useCommerce";

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCommerce();

  return (
    <Layout title="Your Cart">
      <PageHeader
        eyebrow="Checkout"
        title="Your cart"
        crumbs={[{ label: "Cart" }]}
      />

      <div className="section">
        <div className="container">
          {cartItems.length === 0 ? (
            <EmptyState
              icon={MdOutlineShoppingBag}
              title="Your cart is empty"
              description="Once you add a watch it will show up here, along with your total."
              action={{ label: "Browse watches", href: "/allProducts" }}
              secondaryAction={{ label: "View your wishlist", href: "/wishlist" }}
            />
          ) : (
            <>
              <CheckoutSteps current={0} />

              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-8">
                  <h2 className="sr-only">Items in your cart</h2>

                  {/* Card list rather than a table: a five-column table forced
                      horizontal scrolling on every phone. */}
                  <ul className="divide-y border rounded-card divide-secondary-200 border-secondary-300">
                    {cartItems.map((item) => (
                      <li
                        key={item._id}
                        className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
                      >
                        <Link
                          href={`/watch/${item.slug}`}
                          className="relative w-full overflow-hidden rounded sm:w-24 h-28 sm:h-24 shrink-0 bg-secondary-100"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 100vw, 96px"
                            className="object-cover"
                          />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <p className="mb-0.5 text-xs tracking-wide uppercase text-primary-400">
                            {categoryLabel(item.category)}
                          </p>
                          <h3 className="text-base font-semibold">
                            <Link
                              href={`/watch/${item.slug}`}
                              className="transition-colors hover:text-gold-700"
                            >
                              {item.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-primary-500">
                            {formatPrice(item.price)} each
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-3">
                          <QuantityStepper
                            value={item.quantity}
                            onChange={(quantity) => updateQuantity(item, quantity)}
                            max={Math.max(1, item.countInStock)}
                            label={`Quantity of ${item.name}`}
                          />

                          <div className="flex items-center gap-3">
                            <p className="text-base font-semibold text-primary-900">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item)}
                              aria-label={`Remove ${item.name} from your cart`}
                              className="flex items-center justify-center transition-colors rounded w-9 h-9 text-primary-400 hover:bg-danger-soft hover:text-danger"
                            >
                              <MdDeleteOutline className="w-5 h-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Link href="/allProducts" className="btn btn-ghost">
                      &larr; Continue shopping
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <OrderSummary cartItems={cartItems}>
                    <Button href="/shipping" variant="accent" size="lg" block>
                      Proceed to checkout
                      <MdArrowForward className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </OrderSummary>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

// Cart state hydrates from a cookie, so server rendering would mismatch.
export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
