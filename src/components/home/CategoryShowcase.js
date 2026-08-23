import Image from "next/image";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import SectionHeading from "../ui/SectionHeading";
import CATEGORIES from "../CategoryData";

/**
 * Category entry points.
 *
 * The old version claimed "Our three different category" above a four-item
 * grid, and printed a hardcoded "Avg price" per tile that wasn't derived from
 * anything. Counts here are computed from the catalogue that's actually
 * rendered, so the copy can't drift out of sync with the data.
 */
export default function CategoryShowcase({ watches = [] }) {
  const inCategory = (slug) =>
    slug === "all" ? watches : watches.filter((watch) => watch.category === slug);

  // Use the curated tile image, falling back to real product photography from
  // the category so a tile can never render empty.
  const imageFor = (category) => {
    const [first] = inCategory(category.slug);
    return category.img ?? first?.image;
  };

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Browse"
          title="Shop by category"
          description="Four ways in — whether you know exactly what you want or you're just looking."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {CATEGORIES.map((category, index) => {
            const count = inCategory(category.slug).length;
            return (
              <Link
                key={category.id}
                href={category.link}
                className="relative flex flex-col justify-end overflow-hidden transition-shadow duration-200 group aspect-[4/5] rounded-card bg-primary-800 hover:shadow-lift"
              >
                <Image
                  src={imageFor(category)}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 24vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index < 2}
                />

                {/* Gradient rather than a flat 50% black overlay: keeps the
                    product photography visible while the label stays legible. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/25 to-transparent"
                />

                <div className="relative p-5">
                  <h3 className="mb-1 text-white text-h4">{category.name}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-secondary-400">
                    {count} {count === 1 ? "watch" : "watches"}
                    <MdArrowForward
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
