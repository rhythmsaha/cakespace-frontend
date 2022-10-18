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

      setCartLoading(false);
      dispatch(updateCart(cart));
    } catch (error) {
      setCartLoading(false);
      toast.error("Failed to Fetch Cart!");
    }
  };

  const removeFromCart = async (id: string) => {
    if (cartLoading) return;
    try {
      setCartLoading(true);
      const response = await axios.delete("/cart", {
        data: {
          productId: id,
        },
      });
      const cart: CartType = await response.data.cart;

      setCartLoading(false);
      dispatch(updateCart(cart));
    } catch (error) {
      setCartLoading(false);
      toast.error("Failed to Fetch Cart!");
    }
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

  return { cartLoading, fetchCart, addToCart, removeFromCart, clearCart };
};

export default useCart;
