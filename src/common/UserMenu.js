import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useContext, useState } from "react";
import {
  BiCog,
  BiLogOutCircle,
  BiPackage,
  BiSolidDashboard,
  BiUser,
} from "react-icons/bi";
import { MdOutlineRateReview } from "react-icons/md";
import { Store } from "../utils/Store";

/**
 * Account dropdown.
 *
 * The original file was 435 lines, ~250 of which were eight unused Heroicon
 * SVG components left over from a Headless UI example, plus a dead `anchorEl`
 * state. Menu entries are data-driven here, and the panel is anchored to the
 * button instead of positioning itself against an arbitrary ancestor.
 */
export default function UserMenu({ userInfo }) {
  const router = useRouter();
  const { dispatch } = useContext(Store);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const logout = () => {
    // The USER_LOGOUT reducer clears every user-scoped cookie.
    dispatch({ type: "USER_LOGOUT" });
    router.push("/");
  };

  const items = [
    { label: "My orders", href: "/userOrders", icon: BiPackage },
    { label: "Account settings", href: "/profile", icon: BiCog },
    { label: "Write a review", href: "/review-form", icon: MdOutlineRateReview },
  ];

  if (userInfo.isAdmin) {
    items.unshift({
      label: "Admin dashboard",
      href: "/dashboard",
      icon: BiSolidDashboard,
    });
  }

  return (
    <Menu as="div" className="relative ml-1">
      <MenuButton
        className="flex items-center justify-center overflow-hidden transition-colors border rounded-full w-9 h-9 border-secondary-400 bg-secondary-100 hover:border-gold-500"
        aria-label={`Account menu for ${userInfo.name}`}
      >
        {userInfo.img && !avatarFailed ? (
          <Image
            className="object-cover w-full h-full"
            width={36}
            height={36}
            src={userInfo.img}
            alt=""
            onError={() => setAvatarFailed(true)}
          />
        ) : (
          <BiUser className="w-5 h-5 text-primary-600" aria-hidden="true" />
        )}
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <MenuItems className="absolute right-0 z-50 w-60 mt-2 origin-top-right bg-white border rounded-card border-secondary-300 shadow-popover focus:outline-none">
          <div className="px-4 py-3 border-b border-secondary-200">
            <p className="text-sm font-semibold truncate text-primary-900">
              {userInfo.name}
            </p>
            <p className="text-xs truncate text-primary-400">{userInfo.email}</p>
          </div>

          <div className="p-1.5">
            {items.map(({ label, href, icon: Icon }) => (
              <MenuItem key={href}>
                {({ focus }) => (
                  <button
                    type="button"
                    onClick={() => router.push(href)}
                    className={`flex items-center w-full gap-2.5 px-2.5 py-2 text-sm rounded transition-colors ${
                      focus ? "bg-secondary-100 text-primary-900" : "text-primary-700"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-primary-400" aria-hidden="true" />
                    {label}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>

          <div className="p-1.5 border-t border-secondary-200">
            <MenuItem>
              {({ focus }) => (
                <button
                  type="button"
                  onClick={logout}
                  className={`flex items-center w-full gap-2.5 px-2.5 py-2 text-sm rounded transition-colors ${
                    focus ? "bg-danger-soft text-danger-strong" : "text-primary-700"
                  }`}
                >
                  <BiLogOutCircle className="w-4 h-4" aria-hidden="true" />
                  Sign out
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
