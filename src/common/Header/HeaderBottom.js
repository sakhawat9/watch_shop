/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import React from "react";

const HeaderBottom = () => {
  return (
    <div className="header__bottom">
      <div className="py-3 main-navbar">
        <div className="container">
          <nav className="header__bottom__wrapper">
            {/* <h1 className="mb-0 text-2xl font-bold">
              <Link className="navbar-brand" href="/">
                <a>WATCH_SHOP</a>
              </Link>
            </h1> */}
            <div className="flex items-center mean-menu">
              <ul className="flex ml-auto navbar-nav">
                <li className="menu-item dropdown active nav-item">
                  <Link title="Home" href="/" className="nav-link">
                    <a>Home</a>
                  </Link>
                  <ul className="dropdown-menu" role="menu">
                    <li className="menu-item active nav-item">
                      <Link title="Home One" href="/" className="dropdown-item">
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
                  <Link title="Product" href="/allProducts" className="nav-link">
                    <a>Product</a>
                  </Link>
                  <ul className="dropdown-menu" role="menu">
                    <li className="menu-item nav-item">
                      <Link title="Product" href="/" className="dropdown-item">
                        <a>Product</a>
                      </Link>
                    </li>
                    <li className="menu-item menu-item-object-doctor nav-item">
                      <Link
                        title="Single Product"
                        href="#"
                        className="dropdown-item"
                      >
                        <a>Single Product</a>
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
                      <Link title="FAQ’s" href="/404" className="dropdown-item">
                        <a>404</a>
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
                
                <li className="menu-item nav-item">
                  <Link title="Contact Us" href="/contact" className="nav-link">
                    <a>Contact Us</a>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
