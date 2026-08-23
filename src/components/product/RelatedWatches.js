import SectionHeading from "../ui/SectionHeading";
import ProductGrid from "./ProductGrid";

export default function RelatedWatches({ allWatch = [], currentWatch }) {
  // Same category first; top up with anything else so the row is never a
  // lonely single card on a category that only has one product.
  const sameCategory = allWatch.filter(
    (watch) =>
      watch.category === currentWatch.category && watch._id !== currentWatch._id,
  );
  const others = allWatch.filter(
    (watch) =>
      watch.category !== currentWatch.category && watch._id !== currentWatch._id,
  );
  const related = [...sameCategory, ...others].slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="You may also like"
          title="Related watches"
          description="Other pieces from the collection worth a look."
        />
        <ProductGrid watches={related} />
      </div>
    </section>
  );
}
