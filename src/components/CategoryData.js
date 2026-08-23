// Category tiles shown on the homepage.
//
// `img` is only a fallback: CategoryShowcase prefers real product photography
// from the matching category. The previous list paired "Unisex Watches" and
// "All Collections" with stock photos of children — left over from when the
// store had kids' categories — so the tiles advertised products the catalogue
// doesn't carry.
const CategoryData = [
  {
    id: 1,
    name: "Men's Watches",
    slug: "men",
    link: "/search?category=men",
    img: "https://res.cloudinary.com/medsy/image/upload/v1665069802/category1_jdr8pt.jpg",
  },
  {
    id: 2,
    name: "Women's Watches",
    slug: "women",
    link: "/search?category=women",
    img: "https://res.cloudinary.com/medsy/image/upload/v1665069802/category2_upzvhd.jpg",
  },
  // No lifestyle photography exists for these two, so they use product shots
  // from the catalogue rather than the stock images of children they carried
  // before.
  {
    id: 3,
    name: "Unisex Watches",
    slug: "unisex",
    link: "/search?category=unisex",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=80&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "All Collections",
    slug: "all",
    link: "/allProducts",
    img: "https://res.cloudinary.com/medsy/image/upload/v1644044465/medsy/man_watch_13_mgscqy.jpg",
  },
];

export default CategoryData;
