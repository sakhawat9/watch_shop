/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React from "react";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";

const HeaderTop = () => {
  return (
    <div className="header__top">
      <div className="container">
        <div className="flex items-center justify-between">
          <ul className="py-3 header__top__information">
            <li>
              <IoIosCall className="inline" />
              <Link href="tel:+8801849687969">+088 01849687969</Link>
            </li>
          </ul>

          <div className="header__bottom">
            <div className="py-3 main-navbar">
              <div className="container">
                <nav className="header__bottom__wrapper">
                  <div className="flex items-center mean-menu">
                    <ul className="flex ml-auto navbar-nav">
                      <li className="menu-item nav-item">
                        <Link title="Home" href="/" className="nav-link text-white">
                          Home
                        </Link>
                      </li>
                      <li className="menu-item nav-item">
                        <Link
                          title="Products"
                          href="/allProducts"
                          className="nav-link"
                        >
                          Products
                        </Link>
                      </li>
                      <li className="menu-item dropdown nav-item">
                        <Link title="Category" href="/allProducts" className="nav-link">
                          Category
                        </Link>
                        <ul className="dropdown-menu" role="menu">
                          <li className="menu-item nav-item">
                            <Link
                              title="Men's Watches"
                              href="/search?category=men"
                              className="dropdown-item"
                            >
                              Men&apos;s Watches
                            </Link>
                          </li>
                          <li className="menu-item nav-item">
                            <Link
                              title="Women's Watches"
                              href="/search?category=women"
                              className="dropdown-item"
                            >
                              Women&apos;s Watches
                            </Link>
                          </li>
                          <li className="menu-item nav-item">
                            <Link
                              title="Unisex Watches"
                              href="/search?category=unisex"
                              className="dropdown-item"
                            >
                              Unisex Watches
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item nav-item">
                        <Link title="About Us" href="/aboutUs" className="nav-link">
                          About Us
                        </Link>
                      </li>
                      <li className="menu-item nav-item">
                        <Link title="FAQ" href="/FAQ" className="nav-link">
                          FAQ
                        </Link>
                      </li>
                      <li className="menu-item nav-item">
                        <Link
                          title="Contact Us"
                          href="/contact"
                          className="nav-link"
                        >
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <h1 className="header__top__logo">
            <Link className="navbar-brand" href="/">
              WATCH_SHOP
            </Link>
          </h1>
          <ul className="header__top__information">
            <li>
              <FaRegEnvelopeOpen className="inline" />
              <p>sakhawathossain7969@gmail.com</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
