import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();

/** Safely read and parse a JSON cookie, falling back when absent or corrupt. */
function readCookie(key, fallback) {
  const raw = Cookies.get(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    Cookies.remove(key);
    return fallback;
  }
}

const initialState = {
  cart: {
    cartItems: readCookie("cartItems", []),
    // Consumers (Checkout, shipping) read `state.cart.shippingAddress`,
    // so it must hydrate inside `cart` rather than at the top level.
    shippingAddress: readCookie("shippingAddress", {}),
  },
  wish: {
    wishlist: readCookie("wishlist", []),
  },
  billingAddress: readCookie("billingAddress", null),
  paymentInfo: readCookie("paymentInfo", null),
  userInfo: readCookie("userInfo", null),
};

/** Replace an existing entry (matched by _id) or append the new one. */
function upsertById(items, newItem) {
  const exists = items.some((item) => item._id === newItem._id);
  return exists
    ? items.map((item) => (item._id === newItem._id ? newItem : item))
    : [...items, newItem];
}

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const cartItems = upsertById(state.cart.cartItems, action.payload);
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id,
      );
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_CLEAR": {
      Cookies.remove("cartItems");
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }

    case "SAVE_SHIPPING_ADDRESS": {
      Cookies.set("shippingAddress", JSON.stringify(action.payload));
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    }

    case "WISHLIST_ADD_ITEM": {
      const wishlist = upsertById(state.wish.wishlist, action.payload);
      Cookies.set("wishlist", JSON.stringify(wishlist));
      return { ...state, wish: { ...state.wish, wishlist } };
    }

    case "WISHLIST_REMOVE_ITEM": {
      const wishlist = state.wish.wishlist.filter(
        (item) => item._id !== action.payload._id,
      );
      Cookies.set("wishlist", JSON.stringify(wishlist));
      return { ...state, wish: { ...state.wish, wishlist } };
    }

    case "WISHLIST_CLEAR": {
      Cookies.remove("wishlist");
      return { ...state, wish: { ...state.wish, wishlist: [] } };
    }

    case "USER_LOGIN": {
      Cookies.set("userInfo", JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    }

    case "USER_LOGOUT": {
      // Clear every user-scoped cookie so the next visitor starts clean.
      [
        "userInfo",
        "cartItems",
        "shippingAddress",
        "billingAddress",
        "paymentInfo",
      ].forEach((key) => Cookies.remove(key));
      return {
        ...state,
        userInfo: null,
        billingAddress: null,
        paymentInfo: null,
        cart: { cartItems: [], shippingAddress: {} },
      };
    }

    case "BILLING_ADDRESS": {
      Cookies.set("billingAddress", JSON.stringify(action.payload));
      return { ...state, billingAddress: action.payload };
    }

    case "PAYMENT_DETAILS": {
      Cookies.set("paymentInfo", JSON.stringify(action.payload));
      return { ...state, paymentInfo: action.payload };
    }

    default:
      return state;
  }
}

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
