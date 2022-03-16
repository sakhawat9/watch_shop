/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { IoMdQuote } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Title from "../common/Title";
import Link from "next/Link";
import categoryData from "../components/CategoryData";

const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FaLongArrowAltLeft className="p-2 text-4xl font-extrabold text-white rounded-full shadow-lg" />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FaLongArrowAltRight className="p-2 text-4xl text-white rounded-full shadow-lg" />
    </div>
  );
};

const carouselProperties = {
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  slidesToShow: 3,
  centerMode: true,
  centerPadding: "200px",
  responsive: [
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        centerMode: false,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        centerMode: false,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 2000,
      settings: {
        slidesToShow: 3,
        centerMode: false,
        slidesToScroll: 1,
      },
    },
  ],
};

const Category = ({ data }) => {
  return (
    <div className="container pb-24 mx-auto carousel">
      <div>
        <Title
          title="Testimonials"
          subtitle="Our all testimonials"
          description=""
        />
      </div>
      <Slider {...carouselProperties}>
        {categoryData.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </Slider>
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <Link href={`/category/${item.link}`}>
      <a>
        <div className="single-review-item">
          <ul className="single-review-item__ratting">
            <li>
              <AiOutlineStar />
            </li>
            <li>
              <AiOutlineStar />
            </li>
            <li>
              <AiOutlineStar />
            </li>
            <li>
              <AiOutlineStar />
            </li>
            <li>
              <AiOutlineStar />
            </li>
          </ul>
          <p>{item.description}</p>
          <div className="single-review-item__info">
            <img src={item.img} alt="image" />
            <h3>{item.name}</h3>
          </div>
          <div className="single-review-item__quote-icon">
            <ul>
              <li>
                <IoMdQuote />
              </li>
            </ul>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Category;
