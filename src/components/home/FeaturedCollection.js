import Image from "next/image";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import ProductCard from "../product/ProductCard";

/**
 * Editorial split: one large collection image beside three products from that
 * collection.
 *
 * This replaces the old "New Man Watch" block, which stacked three absolutely
 * positioned images inside a container with `height: 0` and per-breakpoint
 * `vh` overrides — a layout that overlapped its own text at most widths and
 * pulled its imagery from a third-party WordPress demo site.
 */
export default function FeaturedCollection({ watches = [] }) {
  const mens = watches.filter((watch) => watch.category === "men").slice(0, 3);
  if (mens.length === 0) return null;

  return (
    <section className="section section-bg">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="relative mb-6 overflow-hidden aspect-[4/5] rounded-card">
                <Image
                  src={mens[0].image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 92vw, 30vw"
                  className="object-cover"
                />
              </div>

              <p className="mb-3 eyebrow">The men&apos;s edit</p>
              <h2 className="mb-4">Built for the long run</h2>
              <p className="mb-6 text-primary-500">
                Chronographs, dress watches and dive-rated cases — chosen for
                movements and finishes that hold up to daily wear.
              </p>

              <Link href="/search?category=men" className="btn btn-outline">
                View all men&apos;s watches
                <MdArrowForward className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 sm:gap-6">
              {mens.map((watch) => (
                <ProductCard key={watch._id} watch={watch} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
