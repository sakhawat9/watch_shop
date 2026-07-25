import Head from "next/head";
import React from "react";
import Title from "../../common/Title";
import DashboardChart from "../../components/Dashboard/DashboardChart";
import DashHome from "../../components/Dashboard/DashHome";
import Sidebar from "../../components/Dashboard/Sidebar";
import orderRepo from "../../repositories/orderRepo";
import reviewRepo from "../../repositories/reviewRepo";
import userRepo from "../../repositories/userRepo";
import watchRepo from "../../repositories/watchRepo";
import { requireAdmin } from "../../utils/auth";

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

export async function getServerSideProps(context) {
  const redirect = requireAdmin(context);
  if (redirect) return redirect;

  const [watch, review, user, orderWatch] = await Promise.all([
    watchRepo.listAll(),
    reviewRepo.listAll(),
    userRepo.listAll(),
    orderRepo.listAll(),
  ]);
  return {
    props: { watch, review, user, orderWatch },
  };
}
