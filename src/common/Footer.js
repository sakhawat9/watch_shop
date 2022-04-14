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

const Footer = () => {
  return (
    <div className="footer">
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
