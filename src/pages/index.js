import ContactAvailable from "../common/ContactAvailable";
import Layout from "../common/Layout";
import Category from "../components/Category";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Testimonials from "../components/Testimonials";
import QuickShop from "../components/QuickShop";
import NewManWatchs from "../components/NewManWatchs";
import reviewRepo from "../repositories/reviewRepo";
import watchRepo from "../repositories/watchRepo";

export default function Home({ watchs, review }) {
  return (
    <Layout>
      <Hero
        infinite="true"
        autoPlay="true"
        deviceType="desktop"
        watchs={watchs}
      />
      <Category />
      <NewManWatchs watchs={watchs} />
      <Products watchs={watchs} />
      <QuickShop />
      <Testimonials data={review} />
      <ContactAvailable />
    </Layout>
  );
}

export async function getServerSideProps() {
  const [watchs, review] = await Promise.all([
    watchRepo.listAll(),
    reviewRepo.listAll(),
  ]);
  return {
    props: { watchs, review },
  };
}
