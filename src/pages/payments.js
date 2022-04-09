/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Layout from "../common/Layout";
import Checkout from "../components/Checkout/Checkout";
import { Store } from "../utils/Store";

const Payments = () => {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      return router.push("/login?redirect=/checkout");
    }
  }, []);
  return (
    <Layout>
      <Checkout />
    </Layout>
  );
};

export default Payments;
