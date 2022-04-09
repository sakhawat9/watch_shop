import Head from "next/head";
import Register from "../components/Register/Register";

const register = () => {
  return (
    <>
      <Head>
        <title>Register | ECommerce-Website.</title>
      </Head>
      <Register />
    </>
  );
};

export default register;
