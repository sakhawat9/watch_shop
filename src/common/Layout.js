import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header/Header";

export default function Layout({ title, keywords, description, children }) {
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

Layout.defaultProps = {
  title: "Watch_Shop | ECommerce-Website.",
  description: "Find the trendy watch",
  keywords: "watch, smart-watch, brand-watch",
};
