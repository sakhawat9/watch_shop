import React from "react";
import { useRouter } from "next/router";
import Layout from "../common/Layout";
import SearchWatch from "../components/SearchWatch";
import watchRepo from "../repositories/watchRepo";

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
  const name = query.name && query.name !== "all" ? query.name : "";
  const category = query.category && query.category !== "all" ? query.category : "";
  const searchQuery = query.query && query.query !== "all" ? query.query : "";

  const watchData = await watchRepo.search({
    name: searchQuery || name,
    category,
  });

  return {
    props: {
      watchData,
      countWatch: watchData.length,
      category,
    },
  };
}
