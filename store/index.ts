import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/slice";
import cartReducer from "./slices/cart/slice";
import paymentReducer from "./slices/stripe";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    payment: paymentReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
