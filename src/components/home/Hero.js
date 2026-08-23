import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MdArrowForward, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { formatPrice } from "../../utils/format";

const ROTATE_MS = 6000;

/**
 * Featured-product hero.
 *
 * Two problems with the original are fixed here:
 *
 *  1. It stretched each watch's `bannerImage` full-bleed with absolutely
 *     positioned copy laid over it using `translateX(-50%)`. Every record
 *     shares the same near-empty background image, which is what produced the
 *     blank band at the top of the site. This uses the product photography the
 *     catalogue actually has, in a split layout that reflows.
 *
 *  2. react-multi-carousel derives slide widths by measuring its container on
 *     mount and needs an explicit `deviceType` to render anything during SSR.
 *     At narrow viewports that measurement collapsed the hero to a bare strip.
 *     Slides here are plain stacked elements toggled by opacity, so the height
 *     comes from the content and never depends on JS measurement.
 */
export default function Hero({ watches = [] }) {
  const featured = watches.filter((watch) => watch?.prichard === true);
  const slides = featured.length > 0 ? featured : watches.slice(0, 3);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = slides.length;
  const go = useCallback((next) => setIndex((next + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearInterval(timer);
  }, [count, paused]);

  if (count === 0) return null;

  return (
    <section
      aria-label="Featured watches"
      aria-roledescription="carousel"
      className="relative bg-primary-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container">
        <div className="relative">
          {slides.map((watch, i) => (
            <Slide
              key={watch._id}
              watch={watch}
              active={i === index}
              // The first slide holds the layout height; the rest are stacked
              // on top of it and faded in.
              stacked={i !== 0}
              position={`${i + 1} of ${count}`}
              priority={i === 0}
            />
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="absolute left-0 right-0 flex items-center justify-center gap-3 bottom-5">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous featured watch"
            className="flex items-center justify-center transition-colors border rounded-full w-9 h-9 border-white/25 text-white/70 hover:bg-white hover:text-primary-900"
          >
            <MdChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((watch, i) => (
              <button
                key={watch._id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show ${watch.name}`}
                aria-current={i === index}
                className={`h-2 transition-all rounded-full ${
                  i === index ? "w-6 bg-gold-500" : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next featured watch"
            className="flex items-center justify-center transition-colors border rounded-full w-9 h-9 border-white/25 text-white/70 hover:bg-white hover:text-primary-900"
          >
            <MdChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}

function Slide({ watch, active, stacked, position, priority }) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${watch.name}, ${position}`}
      aria-hidden={!active}
      // Inactive slides are inert: no pointer events and no tab stops, so the
      // hidden CTAs can't be reached by keyboard.
      inert={!active ? "" : undefined}
      className={`transition-opacity duration-500 ${
        stacked ? "absolute inset-0" : ""
      } ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div className="grid items-center gap-8 py-14 md:py-20 lg:py-24 md:grid-cols-2 lg:gap-16">
        <div className="order-2 md:order-1">
          <p className="mb-4 eyebrow text-gold-400">New arrival</p>

          <h1 className="mb-4 text-white text-display">{watch.name}</h1>

          <p className="max-w-md mb-6 leading-relaxed text-secondary-400 md:text-lg">
            {watch.shortDesc}
          </p>

          <p className="flex items-baseline gap-3 mb-8">
            <span className="text-2xl font-semibold text-white">
              {formatPrice(watch.price)}
            </span>
            {Number(watch.delPrice) > Number(watch.price) && (
              <del className="text-base text-primary-300">
                <span className="sr-only">Regular price </span>
                {formatPrice(watch.delPrice)}
              </del>
            )}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/watch/${watch.slug}`} className="btn btn-accent btn-lg">
              Shop this watch
              <MdArrowForward className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link href="/allProducts" className="btn btn-on-dark btn-lg">
              Browse collection
            </Link>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative overflow-hidden aspect-[4/3] rounded-card bg-primary-800">
            <Image
              src={watch.image}
              alt={watch.name}
              fill
              sizes="(max-width: 768px) 92vw, 46vw"
              className="object-cover"
              priority={priority}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
