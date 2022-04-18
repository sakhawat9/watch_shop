/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import React from "react";
import {
    FaFacebookF,
    FaLinkedinIn,
    FaPinterestP,
    FaTwitter,
    FaWhatsapp
} from "react-icons/fa";
import ScrollToTop from "react-scroll-to-top";

const Footer = () => {
  return (
    <div className="footer">
      <ScrollToTop
        smooth
        top="500"
        color="#ffffff"
        viewBox="0 0 330 330"
        svgPath="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M255.606,205.606
        C252.678,208.535,248.839,210,245,210s-7.678-1.464-10.606-4.394l-69.396-69.393l-69.392,69.393c-5.857,5.858-15.355,5.858-21.213,0
        c-5.858-5.857-5.858-15.355,0-21.213l79.998-80c2.813-2.813,6.628-4.394,10.606-4.394c3.979,0,7.793,1.58,10.607,4.394l80.002,80
        C261.465,190.251,261.465,199.749,255.606,205.606z"
        style={{
          borderRadius: '20px',
          paddingLeft: '6px',
          backgroundColor: '#0F3460',
        }}
      />
      <div className="footer__top">
        <div className="container">
          <div className=" footer-top__wrapper">
            <div>
              <div className="footer-top__title">
                <h4>Information</h4>
              </div>
              <div className="footer-top__content">
                <ul>
                  <li>
                    <a href="https://academist.vercel.app/">About us</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Check out</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                  <li>
                    <a href="/review-form">Review</a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="footer-top__title">
                <h4>My Account</h4>
              </div>
              <div className="footer-top__content">
                <ul>
                  <li>
                    <a href="/login">Login</a>
                  </li>
                  <li>
                    <a href="/register">Register</a>
                  </li>
                  <li>
                    <a href="/profile">Account settings</a>
                  </li>
                  <li>
                    <a href="/cartWatch">Shopping cart</a>
                  </li>
                  <li>
                    <a href="/allProducts">Product</a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="footer-top__title">
                <h4>Customer Care</h4>
              </div>
              <div className="footer-top__content">
                <ul>
                  <li>
                    <a href="#">Help Center</a>
                  </li>
                  <li>
                    <a href="#">How to Buy</a>
                  </li>
                  <li>
                    <a href="#">Track Your Order</a>
                  </li>
                  <li>
                    <a href="#">Corporate & Bulk Purchasing</a>
                  </li>
                  <li>
                    <a href="#">Returns & Refunds</a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="footer-top__title ">
                <h4>Contact us</h4>
              </div>
              <div className="footer-top__content">
                <p className="mb-3">
                  15/e Lake circus
                  <br /> Kalabagan, Dhaka.
                </p>
                <p className="text-base hidden md:block">sakhawathossain7969@gmail.com</p>
                <ul className="footer-top__icons">
                  <li>
                    <Link href="https://www.facebook.com/sakawat.hossain.338211">
                      <a target="_blank">
                        <FaFacebookF />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.linkedin.com/in/shjsdev/">
                      <a target="_blank">
                        <FaLinkedinIn />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a target="_blank">
                        <FaTwitter />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a target="_blank">
                        <FaPinterestP />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a target="_blank">
                        <FaWhatsapp />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__bottom__wrapper">
          <p>
            &copy; 2021
            <a href="https://github.com/sakhawat9">Watch_Shop</a> Designed
            by SH Shakib
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
