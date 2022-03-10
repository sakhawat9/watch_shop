import React from "react";
import Layout from "../common/Layout";
import AboutUsContent from "../components/AboutUs/AboutUsContent";
import Testimonials from "../components/Testimonials/Testimonials";
import Review from "../models/Review";
import db from "../utils/db";


const aboutUs = ({ review }) => {
  return (
    <Layout title="About Us | Restaurant Website.">
      <AboutUsContent />
      <Testimonials data={review} />
    </Layout>
  );
};

export default aboutUs;

export async function getServerSideProps() {
  await db.connect();
  const review = await Review.find({}).lean();
  await db.disconnect();
  return {
    props: {
      review: review.map(db.convertDocToObj),
    },
  };
}
