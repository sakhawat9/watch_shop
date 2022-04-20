import ContactAvailable from "../common/ContactAvailable";
import Layout from "../common/Layout";
import Category from "../components/Category";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Testimonials from "../components/Testimonials";
import Review from "../models/Review";
import Watch from "../models/Watch";
import db from "../utils/db";
import Link from "next/link";
import QuickShop from "../components/QuickShop";
import NewManWatchs from "../components/NewManWatchs";

export default function Home({ watchs, review }) {
  return (
    <Layout>
      <Hero
        infinite="true"
        autoPlay="true"
        deviceType="desktop"
        watchs={watchs}
      />
      <Category data={watchs} />
      <QuickShop />
      <NewManWatchs watchs={watchs} />
      <Products watchs={watchs} />
      <Testimonials data={review} />
      <ContactAvailable />
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const watchs = await Watch.find({}).lean();
  const review = await Review.find({}).lean();
  await db.disconnect();
  return {
    props: {
      watchs: watchs.map(db.convertDocToObj),
      review: review.map(db.convertDocToObj),
    },
  };
}
