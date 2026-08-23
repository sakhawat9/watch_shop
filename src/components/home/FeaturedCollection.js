import Image from "next/image";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import ProductCard from "../product/ProductCard";
import Rating from "../ui/Rating";
import { formatPrice } from "../../utils/format";

/**
 * The men's edit: an editorial panel beside the products in that edit.
 *
 * Layout notes — the previous version put a tall image-plus-copy column next to
 * a single row of three cards, so the right half of the band was empty below
 * the cards, and the panel image repeated a product photo shown a few hundred
 * pixels away in the same row. Two changes fix both:
 *
 *  - the panel is a grid item that stretches to the height of the product grid
 *    (copy is overlaid on the image rather than stacked under it), so the two
 *    columns always end level whatever the product count
 *  - the panel features one watch as the editor's pick and the grid shows the
 *    *rest* of the edit, so no photo appears twice
 *
 * The grid is topped up with a "view all" tile, which keeps the 2×2 shape even
 * when the edit has an odd number of remaining products.
 */
export default function FeaturedCollection({ watches = [] }) {
  const mens = watches.filter((watch) => watch.category === "men");
  if (mens.length === 0) return null;

  // Highest-rated piece leads the edit; the rest fill the grid.
  const [pick, ...rest] = [...mens].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  const grid = rest.slice(0, 3);
  const lowest = Math.min(...mens.map((watch) => watch.price));

  return (
    <section className="section section-bg" aria-labelledby="mens-edit-heading">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Editorial panel — stretches to match the product grid's height. */}
          <article className="relative overflow-hidden lg:col-span-5 rounded-card bg-primary-900 min-h-[30rem]">
            <Image
              src={pick.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 92vw, 40vw"
              className="object-cover"
            />

            {/* Two layers, because a bottom-anchored gradient alone only works
                while the panel is tall. On narrow screens the panel is short
                and the copy reaches the top of the image, where a single
                gradient has almost no opacity — the heading was landing on a
                bright watch face. The flat scrim guarantees contrast at any
                height; the gradient still gives the photo depth below it. */}
            <div aria-hidden="true" className="absolute inset-0 bg-primary-950/55" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/60 to-transparent"
            />

            <div className="relative flex flex-col justify-end h-full p-7 sm:p-9">
              <p className="mb-3 eyebrow text-gold-400">The men&apos;s edit</p>

              <h2 id="mens-edit-heading" className="mb-4 text-white">
                Built for the long run
              </h2>

              <p className="max-w-sm mb-6 text-secondary-400">
                Chronographs, dress watches and dive-rated cases — chosen for
                movements and finishes that hold up to daily wear.
              </p>

              {/* Facts pulled from the catalogue, so the copy can't go stale. */}
              <dl className="flex flex-wrap gap-x-8 gap-y-3 pt-5 mb-6 border-t border-white/15">
                <div>
                  <dt className="text-xs tracking-wide uppercase text-primary-300">
                    In this edit
                  </dt>
                  <dd className="mt-0.5 font-semibold text-white">
                    {mens.length} watches
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-wide uppercase text-primary-300">
                    Starting at
                  </dt>
                  <dd className="mt-0.5 font-semibold text-white">
                    {formatPrice(lowest)}
                  </dd>
                </div>
              </dl>

              {/* Editor's pick — a concrete entry point rather than a bare
                  "view all", and it names the watch shown in the photo. */}
              <Link
                href={`/watch/${pick.slug}`}
                className="flex items-center gap-4 p-3 mb-4 transition-colors border rounded group border-white/15 bg-white/5 hover:bg-white/10"
              >
                <div className="relative w-14 h-14 overflow-hidden rounded shrink-0">
                  <Image
                    src={pick.image}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs tracking-wide uppercase text-gold-400">
                    Editor&apos;s pick
                  </p>
                  <p className="font-semibold text-white truncate">{pick.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Rating value={pick.rating ?? 0} showValue={false} />
                    <span className="text-sm text-secondary-400">
                      {formatPrice(pick.price)}
                    </span>
                  </div>
                </div>

                <MdArrowForward
                  className="w-5 h-5 transition-transform text-white/60 shrink-0 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>

          {/* Products in the edit */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              {grid.map((watch) => (
                <ProductCard key={watch._id} watch={watch} />
              ))}

              {/* Deliberately a solid tile, not a dashed one — dashed borders
                  mean "empty state" everywhere else in this design system, so
                  a dashed CTA here read as unfinished rather than clickable. */}
              <Link
                href="/search?category=men"
                className="flex flex-col items-center justify-center gap-3 p-6 text-center transition-colors border group rounded-card border-secondary-300 bg-secondary-200/60 hover:bg-gold-50 hover:border-gold-400 min-h-[14rem]"
              >
                <span className="flex items-center justify-center w-12 h-12 text-white transition-colors rounded-full bg-primary-900 group-hover:bg-gold-600">
                  <MdArrowForward
                    className="w-5 h-5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="font-semibold text-primary-900">
                  View all men&apos;s watches
                </span>
                <span className="text-sm text-primary-500">
                  {mens.length} pieces, from {formatPrice(lowest)}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
