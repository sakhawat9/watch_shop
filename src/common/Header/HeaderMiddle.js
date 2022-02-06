import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { RiShoppingBagLine } from "react-icons/ri";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import UserMenu from "../../common/UserMenu";
import { Store } from "../../utils/Store";

const HeaderMiddle = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { state } = useContext(Store);
  const { cart, userInfo } = state;

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
              <Link href="#">
                <a>
                  <span>
                    <RiShoppingBagLine />
                  </span>
                  <span className="header__middle__icons__cart__number">2</span>
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
              <div className="h-full text-gray-900">
                <div
                  onClick={toggleDrawer}
                  className="header__wrapper__drawer__menu close "
                >
                  <AiOutlineCloseSquare className="float-right" />
                </div>
                <h2>hello world</h2>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
