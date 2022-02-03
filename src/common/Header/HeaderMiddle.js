import Link from "next/link";
import React from "react";
import { BiMenu, BiUser } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { RiShoppingBagLine } from "react-icons/ri";

const HeaderMiddle = () => {
  return (
    <div className="header__middle">
      <div className="container">
        <div className="header__middle__wrapper">
          <div className="header__middle__logo">
          <h1 className="mb-0 text-2xl font-bold">
              <Link className="navbar-brand" href="/">
                <a>WATCH_SHOP</a>
              </Link>
            </h1>
          </div>
          <div className="header__middle__input">
            <div className="header__middle__input__wrapper">
              <input text="text" placeholder="Search your fevered watch" />
              <BsSearch />
            </div>
          </div>
          <div className="header__middle__icons">
            <Link href="#">
              <a>
                <BiUser className="header__middle__icons__user" />
              </a>
            </Link>
            <span className="header__middle__icons__cart">
              <Link href="#">
                <a>
                  <span>
                    <RiShoppingBagLine />
                  </span>
                  <span className="header__middle__icons__cart__number">2</span>
                </a>
              </Link>
            </span>
            <span className="md:hidden">
              <Link href="#">
                <a>
                  <BiMenu className="header__middle__icons__user" />
                </a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
