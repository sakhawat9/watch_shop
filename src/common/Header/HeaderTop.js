/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React from "react";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import HeaderBottom from "./HeaderBottom";

const HeaderTop = () => {
  return (
    <div className="header__top">
      <div className="container">
        <div className="flex items-center justify-between">
          <ul className="py-3 header__top__information">
            <li>
              <IoIosCall className="inline" />
              <Link href="tel:088123654988">+088 01849687969</Link>
            </li>
          </ul>

          <div className="header__bottom">
            <div className="py-3 main-navbar">
              <div className="container">
                <nav className="header__bottom__wrapper">
                  <div className="flex items-center mean-menu">
                    <ul className="flex ml-auto navbar-nav">
                      <li className="menu-item dropdown active nav-item">
                        <Link
                          title="Home"
                          href="/"
                          className="nav-link text-white"
                        >
                          Home
                        </Link>
                        <ul className="dropdown-menu" role="menu">
                          <li className="menu-item active nav-item">
                            <Link
                              title="Home One"
                              href="/"
                              className="dropdown-item"
                            >
                              Home One
                            </Link>
                          </li>
                          <li className="menu-item nav-item">
                            <Link
                              title="Home Two"
                              href="#"
                              className="dropdown-item"
                            >
                              Home Two
                            </Link>
                          </li>
                          <li className="menu-item nav-item">
                            <Link
                              title="Home Three"
                              href="#"
                              className="dropdown-item"
                            >
                              Home Three
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item dropdown nav-item">
                        <Link
                          title="Product"
                          href="/allProducts"
                          className="nav-link"
                        >
                          Product
                        </Link>
                        <ul className="dropdown-menu" role="menu">
                          <li className="menu-item nav-item">
                            <Link
                              title="Product"
                              href="/allProducts"
                              className="dropdown-item"
                            >
                              Product
                            </Link>
                          </li>
                          <li className="menu-item menu-item-object-doctor nav-item">
                            <Link
                              title="Single Product"
                              href="/watch/man-watch-1"
                              className="dropdown-item"
                            >
                              Single Product
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="menu-item dropdown nav-item">
                        <Link title="Pages" href="#" className="nav-link">
                          Pages
                        </Link>
                        <ul className="dropdown-menu" role="menu">
                          <li className="menu-item nav-item">
                            <Link
                              title="About Us"
                              href="/aboutUs"
                              className="dropdown-item"
                            >
                              About Us
                            </Link>
                          </li>

                          <li className="menu-item nav-item">
                            <Link
                              title="FAQ’s"
                              href="/FAQ"
                              className="dropdown-item"
                            >
                              FAQ’s
                            </Link>
                          </li>
                          <li className="menu-item nav-item">
                            <Link
                              title="404"
                              href="/404"
                              className="dropdown-item"
                            >
                              404
                            </Link>
                          </li>

                          <li className="menu-item nav-item">
                            <Link
                              title="Coming Soon"
                              href="#"
                              className="dropdown-item"
                            >
                              Coming Soon
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item dropdown nav-item">
                        <Link title="Category" href="#" className="nav-link">
                          Category
                        </Link>
                        <ul className="dropdown-menu" role="menu">
                          <li className="menu-item nav-item">
                            <Link
                              title="Man Category"
                              href="/search?query=man"
                              className="dropdown-item"
                            >
                              Man Category
                            </Link>
                          </li>

                          <li className="menu-item nav-item">
                            <Link
                              title="Woman Category"
                              href="/search?query=woman"
                              className="dropdown-item"
                            >
                              Woman Category
                            </Link>
                          </li>
                          <li className="menu-item nav-item">
                            <Link
                              title="Kid Category"
                              href="/search?query=kidbyes"
                              className="dropdown-item"
                            >
                              Kid Boys Category
                            </Link>
                          </li>
                          <li className="menu-item nav-item">
                            <Link
                              title="Kid Category"
                              href="/search?query=kidgirls"
                              className="dropdown-item"
                            >
                              Kid Girls Category
                            </Link>
                          </li>
                        </ul>
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
