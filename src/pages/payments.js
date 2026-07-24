import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Layout from "../common/Layout";
import Checkout from "../components/Checkout";
import { Store } from "../utils/Store";

const Payments = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/payments");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <Checkout />
    </Layout>
  );
};

export default Payments;
