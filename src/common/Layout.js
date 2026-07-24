import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header/Header";

export default function Layout({
  title = "Watch_Shop | ECommerce-Website.",
  keywords = "watch, smart-watch, brand-watch",
  description = "Find the trendy watch",
  children,
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
}
