import Head from "next/head";
import React from "react";
import Title from "../../common/Title";
import DashboardChart from "../../components/Dashboard/DashboardChart";
import DashHome from "../../components/Dashboard/DashHome";
import Sidebar from "../../components/Dashboard/Sidebar";
import Order from "../../models/Orders";
import Review from "../../models/Review";
import User from "../../models/User";
import Watch from "../../models/Watch";
import db from "../../utils/db";

const dashboard = ({ watch, review, orderWatch, user }) => {
  return (
    <>
      <Head>
        <title>Dashboard | ECommerce-Website</title>
      </Head>
      <div className="flex w-full bg-gray-200">
        <Sidebar />
        <div className="m-5 min-h-screen w-full bg-white p-5 transition-all">
          <Title title="Admin Dashboard" subtitle="" description="Welcome to your dashboard page." />
          <DashboardChart />
          <DashHome
            watch={watch}
            review={review}
            order={orderWatch}
            user={user}
          />
        </div>
      </div>
    </>
  );
};

export default dashboard;

export async function getServerSideProps() {
  await db.connect();
  const watchs = await Watch.find({}).lean();
  const review = await Review.find({}).lean();
  const user = await User.find({}).lean();
  const order = await Order.find({}).lean();
  const orderWatch = JSON.parse(JSON.stringify(order));
  await db.disconnect();
  return {
    props: {
      watch: watchs.map(db.convertDocToObj),
      review: review.map(db.convertDocToObj),
      user: user.map(db.convertDocToObj),
      orderWatch,
    },
  };
}
