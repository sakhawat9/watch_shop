import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiUser } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { RiShoppingBagLine } from "react-icons/ri";
import logo from "../../assets/images/logo.svg";

const HeaderMiddle = () => {
  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <div className="hidden md:block">
          <Image src={logo} alt="Logo" />
        </div>
        <div className="w-1/2 py-2">
          <div className="flex items-center justify-between px-3 border border-gray-300 rounded">
            <input
              className="w-full outline-none"
              text="text"
              placeholder="Search your fevered watch"
            />
            <BsSearch className="px-3 text-5xl cursor-pointer" />
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="#">
            <a>
              <BiUser className="p-2 rounded-full shadow-lg w-11 h-11" />
            </a>
          </Link>
          <span className="relative inline-block mr-6">
            <Link href="#">
              <a>
                <span className="text-xl cart__ico">
                  <RiShoppingBagLine className="p-2 rounded-full shadow-lg w-11 h-11" />
                </span>
                <span className="absolute inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full top-2 right-2">
                  2
                </span>
              </a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
