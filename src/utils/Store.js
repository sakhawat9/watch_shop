import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : [],
  },
  wish: {
    wishlist: Cookies.get("wishlist")
      ? JSON.parse(Cookies.get("wishlist"))
      : [],
  },
  shippingAddress: Cookies.get("shippingAddress")
    ? JSON.parse(Cookies.get("shippingAddress"))
    : {},

  billingAddress: Cookies.get("billingAddress")
    ? JSON.parse(Cookies.get("billingAddress"))
    : null,

  paymentInfo: Cookies.get("paymentInfo")
    ? JSON.parse(Cookies.get("paymentInfo"))
    : null,

  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };

    case "WISHLIST_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.wish.wishlist.find(
        (item) => item._id === newItem._id
      );
      const wishlist = existItem
        ? state.wish.wishlist.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.wish.wishlist, newItem];
      Cookies.set("wishlist", JSON.stringify(wishlist));
      return { ...state, wish: { ...state.wish, wishlist } };
    }

    case "WISHLIST_REMOVE_ITEM": {
      const wishlist = state.wish.wishlist.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set("wishlist", JSON.stringify(wishlist));
      return { ...state, wish: { ...state.wish, wishlist } };
    }

    case "WISHLIST_CLEAR":
      return { ...state, wish: { ...state.wish, wishlist: [] } };
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };

    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
        },
      };
    case "BILLING_ADDRESS":
      return { ...state, billingAddress: action.payload };
    case "PAYMENT_DETAILS":
      return { ...state, paymentInfo: action.payload };
    default:
      state;
  }
}

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
