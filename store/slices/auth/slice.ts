import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types/userTypes";

export interface AuthState {
  isInitialized?: boolean;
  isAuthenticated?: boolean;
  authToken?: string;
  user?: User;
}

const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initialize: (state) => {
      state.isInitialized = true;
      state.isAuthenticated = false;
      state.authToken = undefined;
      state.user = undefined;
    },

    login: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = true;
      state.authToken = action.payload.authToken;
      state.user = action.payload.user;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = undefined;
    },

    updateProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { initialize, login, logout, updateProfile } = authSlice.actions;
