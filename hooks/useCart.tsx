import { useState } from "react";
import toast from "react-hot-toast";
import { updateCart } from "../store/slices/cart/slice";
import { CartType } from "../types/userTypes";
import { axios } from "../utils";
import useAppDispatch from "./useAppDispatch";

const useCart = () => {
  const [cartLoading, setCartLoading] = useState(false);

  const dispatch = useAppDispatch();

  const fetchCart = async () => {
    setCartLoading(true);
    try {
      const response = await axios.get("/cart");
      const cart: CartType = await response.data.cart;

      dispatch(updateCart(cart));
    } catch (error) {
      toast.error("Failed to Fetch Cart!");
    }

    setCartLoading(false);
  };

  const addToCart = async (id: string) => {
    if (cartLoading) return;

    setCartLoading(true);
    try {
      const response = await axios.put("/cart", { productId: id });
      const cart: CartType = await response.data.cart;

      dispatch(updateCart(cart));
    } catch (error) {
      toast.error("Failed to Fetch Cart!");
    }
    setCartLoading(false);
  };

  const removeFromCart = async (id: string) => {
    if (cartLoading) return;
    setCartLoading(true);
    try {
      const response = await axios.delete("/cart", {
        data: {
          productId: id,
        },
      });
      const cart: CartType = await response.data.cart;

      dispatch(updateCart(cart));
    } catch (error) {
      toast.error("Failed to remove item!");
    }
    setCartLoading(false);
  };

  const deleteItemFromCart = async (id: String) => {
    if (cartLoading) return;
    setCartLoading(true);
    try {
      const response = await axios.delete("/cart/remove", {
        data: {
          productId: id,
        },
      });
      const cart: CartType = await response.data.cart;

      dispatch(updateCart(cart));
    } catch (error) {
      toast.error("Failed to delete Item!");
    }
    setCartLoading(false);
  };

  const clearCart = async () => {
    if (cartLoading) return;
    setCartLoading(true);
    try {
      const response = await axios.delete("/cart/clear");
      const cart: CartType = await response.data.cart;

      dispatch(updateCart(cart));
    } catch (error) {
      toast.error("Failed to Fetch Cart!");
    }

    setCartLoading(false);
  };

  return { cartLoading, fetchCart, addToCart, removeFromCart, deleteItemFromCart, clearCart };
};

export default useCart;
