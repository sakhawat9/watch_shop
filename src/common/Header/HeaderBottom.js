/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import React from "react";
import { BsSearch } from "react-icons/bs";

const HeaderBottom = () => {
  return (
    <div className="navbar-area">
      <div className="main-navbar">
        <div className="container">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              <Link className="navbar-brand" href="/">
                <a>WATCH_SHOP</a>
              </Link>
            </h1>
            <div className="flex items-center mean-menu">
              <ul className="flex ml-auto navbar-nav">
                <li className="menu-item dropdown active nav-item">
                  <Link title="Home" href="#" className="nav-link">
                    <a>Home</a>
                  </Link>
                  <ul className="dropdown-menu" role="menu">
                    <li className="menu-item active nav-item">
                      <Link title="Home One" href="#" className="dropdown-item">
                        <a>Home One</a>
                      </Link>
                    </li>
                    <li className="menu-item nav-item">
                      <Link title="Home Two" href="#" className="dropdown-item">
                        <a>Home Two</a>
                      </Link>
                    </li>
                    <li className="menu-item nav-item">
                      <Link
                        title="Home Three"
                        href="#"
                        className="dropdown-item"
                      >
                        <a>Home Three</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="menu-item dropdown nav-item">
                  <Link title="Dentist" href="#" className="nav-link">
                    <a>Dentist</a>
                  </Link>
                  <ul className="dropdown-menu" role="menu">
                    <li className="menu-item nav-item">
                      <Link title="Dentist" href="#" className="dropdown-item">
                        <a>Dentist</a>
                      </Link>
                    </li>
                    <li className="menu-item menu-item-object-doctor nav-item">
                      <Link
                        title="Single Dentist"
                        href="#"
                        className="dropdown-item"
                      >
                        <a>Single Dentist</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="menu-item dropdown nav-item">
                  <Link title="Services" href="#" className="nav-link">
                    <a>Services</a>
                  </Link>
                  <ul className="dropdown-menu" role="menu">
                    <li className="menu-item nav-item">
                      <Link
                        title="Our Services"
                        href="/#"
                        className="dropdown-item"
                      >
                        <a>Our Services</a>
                      </Link>
                    </li>
                    <li className="menu-item menu-item-object-service nav-item">
                      <Link
                        title="Single Service"
                        href="#"
                        className="dropdown-item"
                      >
                        <a>Single Service</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="menu-item dropdown nav-item">
                  <Link title="Pages" href="#" className="nav-link">
                    <a>Pages</a>
                  </Link>
                  <ul className="dropdown-menu" role="menu">
                    <li className="menu-item nav-item">
                      <Link title="About Us" href="#" className="dropdown-item">
                        <a>About Us</a>
                      </Link>
                    </li>
                    <li className="menu-item nav-item">
                      <Link
                        title="Appointment"
                        href="#"
                        className="dropdown-item"
                      >
                        <a>Appointment</a>
                      </Link>
                    </li>
                    <li className="menu-item nav-item">
                      <Link title="Pricing" href="#" className="dropdown-item">
                        <a>Pricing</a>
                      </Link>
                    </li>
                    <li className="menu-item nav-item">
                      <Link
                        title="Testimonials"
                        href="#"
                        className="dropdown-item"
                      >
                        <a>Testimonials</a>
                      </Link>
                    </li>
                    <li className="menu-item nav-item">
                      <Link title="FAQ’s" href="#" className="dropdown-item">
                        <a>FAQ’s</a>
                      </Link>
                    </li>
                    <li className="menu-item nav-item">
                      <Link
                        title="Privacy Policy"
                        href="#"
                        className="dropdown-item"
                      >
                        <a>Privacy Policy</a>
                      </Link>
                    </li>
                    <li className="menu-item nav-item">
                      <Link
                        title="Terms of Services"
                        href="#"
                        className="dropdown-item"
                      >
                        <a>Terms of Services</a>
                      </Link>
                    </li>
                    <li className="menu-item nav-item">
                      <Link
                        title="Coming Soon"
                        href="#"
                        className="dropdown-item"
                      >
                        <a>Coming Soon</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="menu-item dropdown nav-item">
                  <Link title="Blog" href="#" className="nav-link">
                    <a>Blog</a>
                  </Link>
                  <ul className="dropdown-menu" role="menu">
                    <li className="menu-item nav-item">
                      <Link title="Blog" href="#" className="dropdown-item">
                        <a>Blog</a>
                      </Link>
                    </li>
                    <li className="menu-item nav-item">
                      <Link
                        href="#"
                        title="Single Blog"
                        className="dropdown-item"
                      >
                        <a>Single Blog</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="menu-item nav-item">
                  <Link title="Contact Us" href="#" className="nav-link">
                    <a>Contact Us</a>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="others-option-for-responsive">
        <div className="container">
          <div className="container">
            <div className="option-inner">
              <div className="flex items-center others-options">
                <div className="option-item">
                  <Link className="search-box" href="#">
                    <i>
                      <BsSearch />
                    </i>
                  </Link>
                </div>
                <div className="option-item">
                  <Link href="#" className="default-btn">
                    <a>Book Appointment</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
