import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Slider from "react-slick";
import Title from "./Title";

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

const ContactAvailable = () => {
  return (
    <section className="section-padding section-bg ">
      <div className="container mx-auto">
        <Title
          title="Most Popular Blog & Stories"
          subtitle="OUR BLOG"
          description=""
        />
        <Slider {...carouselProperties}>
          <div className="blog3__item">
            <a
              className="blog3__item__link"
              href="blog-single-page-left.html"
            ></a>
            <div className="blog3__item--image">
              <img className="img-fluid" src="../img/blog/blog5.webp" alt="" />
              <span>Food</span>
            </div>
            <div className="blog3__item__content">
              <ul className="blog-metainfo list-style">
                <li>
                  <i className="icofont-calendar"></i>
                  <a href="#">May 22, 2022</a>
                </li>
                <li>
                  <i className="icofont-wechat"></i>No Comment
                </li>
              </ul>
              <h3>Old cool cooking tools</h3>
              <p>
                Dana Shultz is the recipe developer and blogger. She has a deep
                love for recipe experimentation and food photography.
              </p>
              <p>
                <i className="icofont-ui-user"></i> By <a href="#">Jondo</a>
              </p>
            </div>
          </div>
          <div className="blog3__item">
            <a
              className="blog3__item__link"
              href="blog-single-page-left.html"
            ></a>
            <div className="blog3__item--image">
              <img className="img-fluid" src="../img/blog/blog5.webp" alt="" />
              <span>Food</span>
            </div>
            <div className="blog3__item__content">
              <ul className="blog-metainfo list-style">
                <li>
                  <i className="icofont-calendar"></i>
                  <a href="#">May 22, 2022</a>
                </li>
                <li>
                  <i className="icofont-wechat"></i>No Comment
                </li>
              </ul>
              <h3>Old cool cooking tools</h3>
              <p>
                Dana Shultz is the recipe developer and blogger. She has a deep
                love for recipe experimentation and food photography.
              </p>
              <p>
                <i className="icofont-ui-user"></i> By <a href="#">Jondo</a>
              </p>
            </div>
          </div>
          <div className="blog3__item">
            <a
              className="blog3__item__link"
              href="blog-single-page-left.html"
            ></a>
            <div className="blog3__item--image">
              <img className="img-fluid" src="../img/blog/blog5.webp" alt="" />
              <span>Food</span>
            </div>
            <div className="blog3__item__content">
              <ul className="blog-metainfo list-style">
                <li>
                  <i className="icofont-calendar"></i>
                  <a href="#">May 22, 2022</a>
                </li>
                <li>
                  <i className="icofont-wechat"></i>No Comment
                </li>
              </ul>
              <h3>Old cool cooking tools</h3>
              <p>
                Dana Shultz is the recipe developer and blogger. She has a deep
                love for recipe experimentation and food photography.
              </p>
              <p>
                <i className="icofont-ui-user"></i> By <a href="#">Jondo</a>
              </p>
            </div>
          </div>
          <div className="blog3__item">
            <a
              className="blog3__item__link"
              href="blog-single-page-left.html"
            ></a>
            <div className="blog3__item--image">
              <img className="img-fluid" src="../img/blog/blog5.webp" alt="" />
              <span>Food</span>
            </div>
            <div className="blog3__item__content">
              <ul className="blog-metainfo list-style">
                <li>
                  <i className="icofont-calendar"></i>
                  <a href="#">May 22, 2022</a>
                </li>
                <li>
                  <i className="icofont-wechat"></i>No Comment
                </li>
              </ul>
              <h3>Old cool cooking tools</h3>
              <p>
                Dana Shultz is the recipe developer and blogger. She has a deep
                love for recipe experimentation and food photography.
              </p>
              <p>
                <i className="icofont-ui-user"></i> By <a href="#">Jondo</a>
              </p>
            </div>
          </div>
          <div className="blog3__item">
            <a
              className="blog3__item__link"
              href="blog-single-page-left.html"
            ></a>
            <div className="blog3__item--image">
              <img className="img-fluid" src="../img/blog/blog5.webp" alt="" />
              <span>Food</span>
            </div>
            <div className="blog3__item__content">
              <ul className="blog-metainfo list-style">
                <li>
                  <i className="icofont-calendar"></i>
                  <a href="#">May 22, 2022</a>
                </li>
                <li>
                  <i className="icofont-wechat"></i>No Comment
                </li>
              </ul>
              <h3>Old cool cooking tools</h3>
              <p>
                Dana Shultz is the recipe developer and blogger. She has a deep
                love for recipe experimentation and food photography.
              </p>
              <p>
                <i className="icofont-ui-user"></i> By <a href="#">Jondo</a>
              </p>
            </div>
          </div>
          <div className="blog3__item">
            <a
              className="blog3__item__link"
              href="blog-single-page-left.html"
            ></a>
            <div className="blog3__item--image">
              <img className="img-fluid" src="../img/blog/blog5.webp" alt="" />
              <span>Food</span>
            </div>
            <div className="blog3__item__content">
              <ul className="blog-metainfo list-style">
                <li>
                  <i className="icofont-calendar"></i>
                  <a href="#">May 22, 2022</a>
                </li>
                <li>
                  <i className="icofont-wechat"></i>No Comment
                </li>
              </ul>
              <h3>Old cool cooking tools</h3>
              <p>
                Dana Shultz is the recipe developer and blogger. She has a deep
                love for recipe experimentation and food photography.
              </p>
              <p>
                <i className="icofont-ui-user"></i> By <a href="#">Jondo</a>
              </p>
            </div>
          </div>
          <div className="blog3__item">
            <a
              className="blog3__item__link"
              href="blog-single-page-left.html"
            ></a>
            <div className="blog3__item--image">
              <img className="img-fluid" src="../img/blog/blog5.webp" alt="" />
              <span>Food</span>
            </div>
            <div className="blog3__item__content">
              <ul className="blog-metainfo list-style">
                <li>
                  <i className="icofont-calendar"></i>
                  <a href="#">May 22, 2022</a>
                </li>
                <li>
                  <i className="icofont-wechat"></i>No Comment
                </li>
              </ul>
              <h3>Old cool cooking tools</h3>
              <p>
                Dana Shultz is the recipe developer and blogger. She has a deep
                love for recipe experimentation and food photography.
              </p>
              <p>
                <i className="icofont-ui-user"></i> By <a href="#">Jondo</a>
              </p>
            </div>
          </div>
          <div className="blog3__item">
            <a
              className="blog3__item__link"
              href="blog-single-page-left.html"
            ></a>
            <div className="blog3__item--image">
              <img className="img-fluid" src="../img/blog/blog5.webp" alt="" />
              <span>Food</span>
            </div>
            <div className="blog3__item__content">
              <ul className="blog-metainfo list-style">
                <li>
                  <i className="icofont-calendar"></i>
                  <a href="#">May 22, 2022</a>
                </li>
                <li>
                  <i className="icofont-wechat"></i>No Comment
                </li>
              </ul>
              <h3>Old cool cooking tools</h3>
              <p>
                Dana Shultz is the recipe developer and blogger. She has a deep
                love for recipe experimentation and food photography.
              </p>
              <p>
                <i className="icofont-ui-user"></i> By <a href="#">Jondo</a>
              </p>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

// const Card = ({ item }) => {
//   return (
//     <div className="blog3__item">
//       <a className="blog3__item__link" href="blog-single-page-left.html"></a>
//       <div className="blog3__item--image">
//         <img className="img-fluid" src="../img/blog/blog5.webp" alt="" />
//         <span>Food</span>
//       </div>
//       <div className="blog3__item__content">
//         <ul className="blog-metainfo list-style">
//           <li>
//             <i className="icofont-calendar"></i>
//             <a href="#">May 22, 2022</a>
//           </li>
//           <li>
//             <i className="icofont-wechat"></i>No Comment
//           </li>
//         </ul>
//         <h3>Old cool cooking tools</h3>
//         <p>
//           Dana Shultz is the recipe developer and blogger. She has a deep love
//           for recipe experimentation and food photography.
//         </p>
//         <p>
//           <i className="icofont-ui-user"></i> By <a href="#">Jondo</a>
//         </p>
//       </div>
//     </div>
//   );
// };

export default ContactAvailable;
