/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { IoIosCall } from "react-icons/io";
import BD from "../../assets/images/bd.png";
import IN from "../../assets/images/in.png";
import EUR from "../../assets/images/uk.png";
import EN from "../../assets/images/usa.png";

const HeaderTop = () => {
  return (
    <div className="header__top">
      <div className="container">
        <div className="flex items-center justify-between">
          <ul className="py-3 header__top__information">
            <li>
              <IoIosCall className="inline" />
              <Link href="tel:088123654988">
                <a>+088 123 654 988</a>
              </Link>
            </li>
            <li>
              <FaRegEnvelopeOpen className="inline" />
              <p>support@support.com</p>
            </li>
          </ul>
          <h1 className="header__top__logo">
            <Link className="navbar-brand" href="/">
              <a>WATCH_SHOP</a>
            </Link>
          </h1>
          <ul className="header__top__information">
            <li>
              <Link href="#">
                <a>Theme FAQs</a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>Need Help?</a>
              </Link>
            </li>
            <Menu as="div" className="relative z-50 inline-block text-left">
              <div>
                <Menu.Button className="flex items-center w-full gap-2 mb-0 font-normal text-white">
                  <Image
                    className="rounded"
                    white="30"
                    height="20"
                    src={EN}
                    alt=""
                  />
                  EN
                  <FiChevronDown />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-32 mt-5 origin-top-right bg-white border-t-2 shadow-lg border-t-primary-600 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      <a
                        href="#"
                        className="flex gap-4 px-4 py-2 text-sm hover:text-red-500 text-primary-600"
                      >
                        <Image white="30" height="20" src={EN} alt="" />
                        EN
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        href="#"
                        className="flex gap-4 px-4 py-2 text-sm hover:text-red-500 text-primary-600"
                      >
                        <Image white="30" height="20" src={BD} alt="" />
                        BD
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        href="#"
                        className="flex gap-4 px-4 py-2 text-sm hover:text-red-500 text-primary-600"
                      >
                        <Image white="30" height="20" src={IN} alt="" />
                        HN
                      </a>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Menu as="div" className="relative z-50 inline-block text-left">
              <div>
                <Menu.Button className="flex items-center w-full gap-2 mb-0 font-normal text-white">
                  <Image
                    className="rounded"
                    white="30"
                    height="20"
                    src={EN}
                    alt=""
                  />
                  USD
                  <FiChevronDown />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-32 mt-5 origin-top-right bg-white border-t-2 shadow-lg border-t-primary-600 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      <a
                        href="#"
                        className="flex gap-4 px-4 py-2 text-sm hover:text-red-500 text-primary-600"
                      >
                        <Image white="30" height="20" src={EN} alt="" />
                        USD
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        href="#"
                        className="flex gap-4 px-4 py-2 text-sm hover:text-red-500 text-primary-600"
                      >
                        <Image white="30" height="20" src={EUR} alt="" />
                        EUR
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        href="#"
                        className="flex gap-4 px-4 py-2 text-sm hover:text-red-500 text-primary-600"
                      >
                        <Image white="30" height="20" src={BD} alt="" />
                        BDT
                        <img src={BD} alt="" />
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        href="#"
                        className="flex gap-4 px-4 py-2 text-sm hover:text-red-500 text-primary-600"
                      >
                        <Image white="30" height="20" src={IN} alt="" />
                        INR
                        <img src={IN} alt="" />
                      </a>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
