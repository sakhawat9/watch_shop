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
                <a>+088 01849687969</a>
              </Link>
            </li>
          </ul>
          <h1 className="header__top__logo">
            <Link className="navbar-brand" href="/">
              <a>WATCH_SHOP</a>
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
