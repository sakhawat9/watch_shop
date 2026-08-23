import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

/**
 * Closing call to action.
 *
 * Replaces the old "QuickShop" band, which paired a single sentence with a
 * transparent stock PNG of three delivery vehicles pulled from an unrelated
 * Cloudinary account — visually off-brand and carrying no information.
 */
export default function BrandPromise() {
  return (
    <section className="section-dark">
      <div className="container py-section-sm">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="mb-3 eyebrow text-gold-400">Our promise</p>
            <h2 className="mb-4 text-white">
              A watch you keep, not a watch you replace
            </h2>
            <p className="max-w-xl text-secondary-400">
              Every piece is inspected before it ships, covered by a two-year
              warranty, and backed by a team that stays available long after the
              sale. If it isn&apos;t right, you have 30 days to send it back.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Link href="/allProducts" className="btn btn-accent btn-lg">
              Start shopping
              <MdArrowForward className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link href="/aboutUs" className="btn btn-on-dark btn-lg">
              Our story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
