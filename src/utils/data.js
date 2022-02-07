import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "admin",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
      user: false,
    },
    {
      name: "user",
      email: "user@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
      user: true,
    },
  ],
  food: [
    {
      name: "watch-01",
      slug: "watch-01",
      category: "normal",
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://res.cloudinary.com/medsy/image/upload/v1644044466/medsy/woman_watch_5_asgot5.jpg",
      price: 70,
      delPrice: 120,
      rating: 4,
      countInStock: 20,
      description:
        "watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
    {
      name: "watch-02",
      slug: "watch-02",
      category: "medium",
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://res.cloudinary.com/medsy/image/upload/v1644044465/medsy/man_watch_17_n652na.jpg",
      price: 80,
      delPrice: 120,
      rating: 4.2,
      countInStock: 20,
      description:
      "watch-02 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
    {
      name: "watch-03",
      slug: "watch-03",
      category: "large",
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://res.cloudinary.com/medsy/image/upload/v1644044466/medsy/woman_watch_4_b8vbtm.jpg",
      price: 90,
      delPrice: 120,
      rating: 4.5,
      countInStock: 20,
      description:
        "watch-03 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
    {
      name: "watch-04",
      slug: "watch-04",
      category: "normal",
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://res.cloudinary.com/medsy/image/upload/v1644044466/medsy/woman_watch_3_ndg9in.jpg",
      price: 90,
      delPrice: 120,
      rating: 4.5,
      countInStock: 20,
      description:
        "watch-04 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
    {
      name: "watch-05",
      slug: "watch-05",
      category: "medium",
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://res.cloudinary.com/medsy/image/upload/v1644044466/medsy/woman_watch_6_ce3zco.jpg",
      price: 95,
      delPrice: 120,
      rating: 4.5,
      countInStock: 20,
      description:
        "watch-05 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
    {
      name: "watch-06",
      slug: "watch-06",
      category: "medium",
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://res.cloudinary.com/medsy/image/upload/v1644044465/medsy/woman_watch_1_ab6d28.jpg",
      price: 75,
      delPrice: 120,
      rating: 4.5,
      countInStock: 20,
      description:
        "watch-06 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
    {
      name: "watch-07",
      slug: "watch-07",
      category: "large",
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://res.cloudinary.com/medsy/image/upload/v1644044465/medsy/man_watch_13_mgscqy.jpg",
      price: 75,
      delPrice: 120,
      rating: 4.5,
      countInStock: 20,
      description:
        "watch-07 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
    {
      name: "watch-08",
      slug: "watch-08",
      category: "large",
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://res.cloudinary.com/medsy/image/upload/v1644044465/medsy/woman_watch_2_doqvvj.jpg",
      price: 75,
      delPrice: 120,
      rating: 4.5,
      countInStock: 20,
      description:
        "watch-08 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
    {
      name: "watch-09",
      slug: "watch-09",
      category: "large",
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://res.cloudinary.com/medsy/image/upload/v1644044465/medsy/man_watch_15_x9r4z9.jpg",
      price: 75,
      delPrice: 120,
      rating: 4.5,
      countInStock: 20,
      description:
        "watch-09 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum! watch-01 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
  ],
};

export default data;
