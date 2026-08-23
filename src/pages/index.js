import ContactAvailable from "../common/ContactAvailable";
import Layout from "../common/Layout";
import BrandPromise from "../components/home/BrandPromise";
import CategoryShowcase from "../components/home/CategoryShowcase";
import FeaturedCollection from "../components/home/FeaturedCollection";
import Hero from "../components/home/Hero";
import LatestWatches from "../components/home/LatestWatches";
import Testimonials from "../components/home/Testimonials";
import reviewRepo from "../repositories/reviewRepo";
import watchRepo from "../repositories/watchRepo";

export default function Home({ watchs = [], review = [] }) {
  return (
    <Layout description="Curated timepieces built to last. Free insured shipping, a 2-year warranty and 30-day returns on every order.">
      <Hero watches={watchs} />
      <ContactAvailable />
      <CategoryShowcase watches={watchs} />
      <FeaturedCollection watches={watchs} />
      <LatestWatches watches={watchs} />
      <Testimonials data={review} />
      <BrandPromise />
    </Layout>
  );
}

export async function getServerSideProps() {
  const [watchs, review] = await Promise.all([
    watchRepo.listAll(),
    reviewRepo.listAll(),
  ]);
  return { props: { watchs, review } };
}
