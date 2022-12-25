import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  clientSecret: string;
  orderId: string;
  totalAmount: number;
}

const initialState: StateType = {
  clientSecret: "",
  orderId: "",
  totalAmount: 0,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    updateClientSecret: (state, action: PayloadAction<{ clientSecret: string }>) => {
      state.clientSecret = action.payload.clientSecret;
    },

    updatePayment: (state, action: PayloadAction<StateType>) => {
      state.clientSecret = action.payload.clientSecret;
      state.orderId = action.payload.orderId;
      state.totalAmount = action.payload.totalAmount;
    },
  },
});

export default paymentSlice.reducer;
export const { updateClientSecret, updatePayment } = paymentSlice.actions;
