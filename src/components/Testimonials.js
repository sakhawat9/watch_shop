/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { IoMdQuote } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Title from "../common/Title";

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

const Testimonials = ({ data }) => {
  return (
    <div className="container section-padding-b mx-auto carousel">
      <div>
        <Title
          title="Testimonials"
          subtitle="Our all testimonials"
          description=""
        />
      </div>
      <Slider {...carouselProperties}>
        {data.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </Slider>
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <div className="single-review-item">
      <ul className="single-review-item__ratting">
        <li>
          <AiFillStar />
        </li>
        <li>
          <AiFillStar />
        </li>
        <li>
          <AiFillStar />
        </li>
        <li>
          <AiFillStar />
        </li>
        <li>
          <AiFillStar />
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
  );
};

export default Testimonials;
