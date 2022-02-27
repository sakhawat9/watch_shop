import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import UserMenu from "../../common/UserMenu";
import { Store } from "../../utils/Store";
import HeaderMobileMenu from "./HeaderMobileMenu";

const HeaderMiddle = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { state } = useContext(Store);
  const { cart, wish,  userInfo } = state;

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

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
            <div>
              {userInfo ? (
                <UserMenu userInfo={userInfo} />
              ) : (
                <Link href="/login">
                  <a>
                    <button className="px-3 py-2 mb-0 text-gray-900 bg-blue-100 rounded hover:bg-blue-200">Login</button>
                  </a>
                </Link>
              )}
            </div>
            <div className="header__middle__icons__cart">
              <Link href="/wishlist">
                <a>
                  <span>
                    <FaRegHeart />
                  </span>
                  <span className="header__middle__icons__cart__number">{wish.wishlist?.length}</span>
                </a>
              </Link>
            </div>
            <div className="header__middle__icons__cart">
              <Link href="/cartWatch">
                <a>
                  <span>
                    <RiShoppingBagLine />
                  </span>
                  <span className="header__middle__icons__cart__number">{cart.cartItems.length}</span>
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
                <div
                  onClick={toggleDrawer}
                >
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
