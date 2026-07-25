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

const Hero = ({ deviceType, infinite, autoPlay, watchs }) => {
  const featuredWatch = watchs.filter((watch) => watch?.prichard === true);
  return (
    <Carousel
      ssr
      deviceType={deviceType}
      itemClass="image-item"
      responsive={responsive}
      showDots={true}
      arrows={false}
      infinite={infinite}
      containerClass="carousel-container"
      autoPlay={autoPlay}
      autoPlaySpeed={5000}
    >
      {featuredWatch.map((watch) => {
        return (
          <div key={watch._id} className="hero">
            <img
              className="w-full md:h-full h-80"
              draggable={false}
              alt={watch.name}
              src={watch.bannerImage}
            />
            <div
              className="absolute ml-6 md:ml-0 lg:left-1/4 left-1/3 md:top-1/3 top-1/4 bottom-1/2 -mt-10 md:mt-0 max-w-md"
              style={{
                transform: " translateX(-50%)",
              }}
            >
              <p className="mb-1 text-sm font-semibold tracking-widest uppercase text-gold-600">
                New Collection
              </p>
              <h1 className="mb-2 md:mb-3 text-2xl text-primary-600 lg:text-5xl">
                {watch.name}
              </h1>
              <p className="mb-4 text-sm md:text-base">{watch.shortDesc}</p>
              <Link
                href={`/watch/${watch.slug}`}
                className="btn btn-default inline-flex items-center gap-2"
              >
                Shop Now <FaLongArrowAltRight />
              </Link>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Hero;
