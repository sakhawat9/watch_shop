import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import ProductGrid from "../product/ProductGrid";
import SectionHeading from "../ui/SectionHeading";

export default function LatestWatches({ watches = [] }) {
  if (watches.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="The collection"
          title="Latest arrivals"
          description="Newly added to the catalogue, across every category."
        />

        <ProductGrid watches={watches.slice(0, 8)} />

        <div className="flex justify-center mt-12">
          <Link href="/allProducts" className="btn btn-outline btn-lg">
            View all watches
            <MdArrowForward className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
