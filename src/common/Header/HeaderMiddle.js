import Link from "next/link";
import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { RiHeartPulseFill } from "react-icons/ri";
import { RiShoppingBagLine } from "react-icons/ri";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import UserMenu from "../../common/UserMenu";
import { Store } from "../../utils/Store";
import HeaderMobileMenu from "./HeaderMobileMenu";
import router from "next/router";

const HeaderMiddle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useContext(Store);
  const { cart, wish, userInfo } = state;

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <div className="header__middle">
      <div className="container">
        <div className="header__middle__wrapper">
          <div className="header__middle__logo">
            <h1 className="mb-0 text-2xl text-gray-900 font-bold">
              <Link className="navbar-brand" href="/">
                <a>WATCH_SHOP</a>
              </Link>
            </h1>
          </div>
          <div className="header__middle__input">
            <form
              className="header__middle__input__wrapper"
              onSubmit={handleSubmit}
            >
              <input
                onChange={handleChange}
                text="text"
                placeholder="Search your fevered watch"
              />
            </form>
          </div>
          <div className="header__middle__icons">
            <div>
              {userInfo ? (
                <UserMenu userInfo={userInfo} />
              ) : (
                <Link href="/login">
                  <a>
                    <button className="py-1 px-2 md:px-4 text-lg my-2 font-medium text-center text-white rounded bg-primary hover:bg-primary-600">
                      Login
                    </button>
                  </a>
                </Link>
              )}
            </div>
            <div className="header__middle__icons__cart">
              <Link href="/wishlist">
                <a>
                  <span>
                    <RiHeartPulseFill />
                  </span>
                  <span className="header__middle__icons__cart__number">
                    {wish.wishlist?.length}
                  </span>
                </a>
              </Link>
            </div>
            <div className="header__middle__icons__cart">
              <Link href="/cartWatch">
                <a>
                  <span>
                    <RiShoppingBagLine />
                  </span>
                  <span className="header__middle__icons__cart__number">
                    {cart.cartItems.length}
                  </span>
                </a>
              </Link>
            </div>
            <div className="md:hidden" onClick={toggleDrawer}>
              <Link href="#">
                <a>
                  <BiMenu className="header__middle__icons__user" />
                </a>
              </Link>
            </div>
            <Drawer open={isOpen} onClose={toggleDrawer} direction="left">
              <div className="mobile-menu">
                <div onClick={toggleDrawer}>
                  <AiOutlineClose className="mobile-menu__close" />
                </div>
                <HeaderMobileMenu />
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
