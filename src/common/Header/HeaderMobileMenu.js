import Link from "next/link";
import React from "react";

const HeaderMobileMenu = () => {
  return (
    <div className="container">
      <h3 className="mobile-menu__logo">Watch_Shop</h3>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/allProducts">Products</Link>
        </li>
        <li>
          <Link href="/aboutUs">About Us</Link>
        </li>
        <li>
          <Link href="/FAQ">FAQ</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderMobileMenu;
