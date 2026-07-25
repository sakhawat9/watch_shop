import React from "react";
import Layout from "../common/Layout";
import AboutUsContent from "../components/AboutUsContent";
import Testimonials from "../components/Testimonials";
import reviewRepo from "../repositories/reviewRepo";


const aboutUs = ({ review }) => {
  return (
    <Layout title="About Us | Watch_Shop">
      <AboutUsContent />
      <Testimonials data={review} />
    </Layout>
  );
};

export default aboutUs;

export async function getServerSideProps() {
  const review = await reviewRepo.listAll();
  return {
    props: { review },
  };
}
