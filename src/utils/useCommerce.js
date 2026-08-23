import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { Store } from "./Store";

/**
 * Cart and wishlist actions in one place.
 *
 * Previously each of Product, NewManWatch, RelatedWatch, SearchWatch and
 * Wishlists carried its own copy of this logic, each calling `window.alert()`
 * on an out-of-stock product and giving no feedback at all on success. This
 * centralises the stock check, surfaces a toast either way, and exposes a
 * `pending` flag so buttons can show a busy state.
 */
export function useCommerce() {
  const { state, dispatch } = useContext(Store);
  const [pending, setPending] = useState(null);

  const cartItems = state.cart.cartItems;
  const wishlist = state.wish.wishlist;

  const isInCart = useCallback(
    (id) => cartItems.some((item) => item._id === id),
    [cartItems],
  );

  const isInWishlist = useCallback(
    (id) => wishlist.some((item) => item._id === id),
    [wishlist],
  );

  /** Re-check stock against the server before committing a quantity. */
  const checkStock = async (watch, quantity) => {
    const existing = cartItems.find((item) => item._id === watch._id);
    const nextQuantity = quantity ?? (existing ? existing.quantity + 1 : 1);

    const { data } = await axios.get(`/api/watch/${watch._id}`);
    if (!data || data.countInStock < nextQuantity) {
      toast.error(
        data?.countInStock > 0
          ? `Only ${data.countInStock} left in stock.`
          : `${watch.name} is out of stock.`,
      );
      return null;
    }
    return nextQuantity;
  };

  const addToCart = useCallback(
    async (watch, quantity) => {
      setPending(`cart-${watch._id}`);
      try {
        const nextQuantity = await checkStock(watch, quantity);
        if (nextQuantity === null) return false;

        dispatch({
          type: "CART_ADD_ITEM",
          payload: { ...watch, quantity: nextQuantity },
        });
        toast.success(`${watch.name} added to your cart.`);
        return true;
      } catch {
        toast.error("Something went wrong. Please try again.");
        return false;
      } finally {
        setPending(null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, cartItems],
  );

  const updateQuantity = useCallback(
    async (watch, quantity) => {
      setPending(`cart-${watch._id}`);
      try {
        const nextQuantity = await checkStock(watch, quantity);
        if (nextQuantity === null) return false;
        dispatch({
          type: "CART_ADD_ITEM",
          payload: { ...watch, quantity: nextQuantity },
        });
        return true;
      } catch {
        toast.error("Could not update the quantity. Please try again.");
        return false;
      } finally {
        setPending(null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, cartItems],
  );

  const removeFromCart = useCallback(
    (watch) => {
      dispatch({ type: "CART_REMOVE_ITEM", payload: watch });
      toast.info(`${watch.name} removed from your cart.`);
    },
    [dispatch],
  );

  /** Wishlist is a pure client-side list, so no stock round-trip is needed. */
  const toggleWishlist = useCallback(
    (watch) => {
      if (isInWishlist(watch._id)) {
        dispatch({ type: "WISHLIST_REMOVE_ITEM", payload: watch });
        toast.info(`${watch.name} removed from your wishlist.`);
        return false;
      }
      dispatch({ type: "WISHLIST_ADD_ITEM", payload: { ...watch, quantity: 1 } });
      toast.success(`${watch.name} saved to your wishlist.`);
      return true;
    },
    [dispatch, isInWishlist],
  );

  return {
    cartItems,
    wishlist,
    pending,
    isInCart,
    isInWishlist,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
  };
}
