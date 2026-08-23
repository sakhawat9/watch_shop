import ContactAvailable from "../common/ContactAvailable";
import Layout from "../common/Layout";
import AboutUsContent from "../components/AboutUsContent";
import BrandPromise from "../components/home/BrandPromise";
import Testimonials from "../components/home/Testimonials";
import reviewRepo from "../repositories/reviewRepo";

export default function AboutUs({ review = [] }) {
  return (
    <Layout
      title="About Us"
      description="Watch_Shop sources quality timepieces directly from manufacturers — genuine craftsmanship without the luxury markup."
    >
      <AboutUsContent />
      <Testimonials data={review} />
      <ContactAvailable />
      <BrandPromise />
    </Layout>
  );
}

export async function getServerSideProps() {
  const review = await reviewRepo.listAll();
  return { props: { review } };
}
