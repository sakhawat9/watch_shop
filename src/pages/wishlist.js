import React from "react";
import Layout from "../common/Layout";
import Title from "../common/Title";
import Wishlists from "../components/Wishlists";

const Wishlist = () => {
  const data = [
    {
      name: "Man watch-01",
      slug: "man-watch-1",
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      category: "normal",
      image:
        "https://res.cloudinary.com/medsy/image/upload/v1645735092/svdtvaaehb9s4kqg5xfd.jpg",
      bannerImage:
        "https://res.cloudinary.com/medsy/image/upload/v1645886640/b579n99igdaokyiuernk.jpg",
      price: 30,
      delPrice: 35,
      rating: 4,
      countInStock: 20,
      description:
        "watch-02 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
      prichard: true,
    },
    {
      name: "Man watch-02",
      slug: "man-watch-2",
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      category: "normal",
      image:
        "https://res.cloudinary.com/medsy/image/upload/v1645735181/bcsiaymdi9vyhvnbtspf.jpg",
      bannerImage: "",
      price: 30,
      delPrice: 35,
      rating: 4,
      countInStock: 20,
      description:
        "watch-02 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
      prichard: false,
    },
    {
      name: "Man watch-03",
      slug: "man-watch-3",
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      category: "normal",
      image:
        "https://res.cloudinary.com/medsy/image/upload/v1645735337/mtonqtwkc4cjclppz55l.jpg",
      bannerImage: "",
      price: 30,
      delPrice: 35,
      rating: 4,
      countInStock: 20,
      description:
        "watch-02 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
      prichard: false,
    },
  ];
  console.log(data);
  return (
    <Layout title="Wishlist | ECommerce-Website.">
      <div className="section-padding">
        <div className="container">
          <Title title="Latest watch" subtitle="our all watch" />
          <div className="product">
            {data.map((watch) => (
              <Wishlists key={watch._id} watch={watch} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
