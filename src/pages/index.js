import Layout from "../common/Layout";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <Layout>
      <Hero infinite="true" autoPlay="true" deviceType="desktop" />
    </Layout>
  );
}
