import React from "react";
import { useRouter } from "next/router";
import Layout from "../common/Layout";
import SearchWatch from "../components/SearchWatch";
import Watch from "../models/Watch";
import db from "../utils/db";

const search = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { query = "all", name = "all", category = "all" } = router.query;
  const { watchData, countWatch } = props;
  const filterSearch = ({ name, category, searchQuery }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    if (name) query.name = name;
    if (category) query.category = category;
    router.push({
      pathname: path,
      query: query,
    });
  };

  return (
    <Layout title="Your search result">
      <div className="text-center">
        <h3 className="mt-20">Your search result ({countWatch})</h3>
      </div>
      <div className="section-padding">
        <div className="container">
          <div className="product">
            {watchData.map((data) => (
              <SearchWatch key={data._id} data={data} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default search;

export async function getServerSideProps({ query }) {
  await db.connect();
  const name = query.name || "";
  const category = query.category || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};

  const nameFilter = name && name !== "all" ? { name } : {};
  const categoryFilter =
    category && category !== "all" ? { category } : {};

  const watchDocs = await Watch.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...nameFilter,
    },
    "-reviews"
  ).lean();

  const countWatch = await Watch.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...nameFilter,
  });
  await db.disconnect();
  const watchData = JSON.parse(JSON.stringify(watchDocs));
  return {
    props: {
      watchData,
      countWatch,
      category,
    },
  };
}
