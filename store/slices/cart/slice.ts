import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartType } from "../../../types/userTypes";

const initialState: CartType = {
  user: undefined,
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<CartType>) => {
      state.items = action.payload.items;
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export default cartSlice.reducer;
export const { updateCart } = cartSlice.actions;
