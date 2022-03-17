/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};
const images = [
  "https://res.cloudinary.com/medsy/image/upload/v1643941686/banner_cbg05m.png",
  "https://res.cloudinary.com/medsy/image/upload/v1643941686/banner1_g8vrt7.png",
  "https://res.cloudinary.com/medsy/image/upload/v1643941686/banner2_xclr7e.png",
];

const Hero = ({ deviceType, infinite, autoPlay, watchs }) => {
  const featuredFood = watchs.filter((watch) => watch?.prichard === true);
  return (
    <Carousel
      ssr
      deviceType={deviceType}
      itemClass="image-item"
      responsive={responsive}
      showDots={true}
      arrows={false}
      slidesToSlide={0}
      infinite={infinite}
      containerClass="carousel-container"
      autoPlay={autoPlay}
      autoPlaySpeed={5000}
    >
      {featuredFood.map((watch) => {
        return (
          <div key={watch._id} className="hero">
            <img
              className="w-full md:h-full h-80"
              draggable={false}
              alt="text"
              src={watch.bannerImage}
            />
            <div
              className="absolute lg:left-1/4 left-1/3 md:top-1/3 top-1/4 bottom-1/2"
              style={{
                transform: " translateX(-50%)",
              }}
            >
              <h1 className="hidden text-3xl text-gray-900 md:block lg:text-5xl">
                Welcome Watch Shop
              </h1>
              <h5 className="mb-3">50% Off For Your First Shopping</h5>
              <h5 className="mb-3">{watch.name}</h5>
              <p>{watch.shortDesc.slice(0, 56)}</p>
              <p>{watch.shortDesc.slice(57, 1000)}</p>
              <button className="px-4 mt-4 text-white rounded bg-primary-500">
                <Link href={`/watch/${watch.slug}`}>
                  <a className="flex items-center gap-2 p-2">
                    Read more <FaLongArrowAltRight />
                  </a>
                </Link>
              </button>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Hero;
