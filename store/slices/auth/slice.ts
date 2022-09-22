import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types/userTypes";

export interface AuthState {
    isInitialized: boolean;
    isAuthenticated: boolean;
    user?: User;
}

const initialState: AuthState = {
    isInitialized: false,
    isAuthenticated: false,
    user: undefined,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        initialize: (state, action: PayloadAction<AuthState>) => {
            state.isInitialized = true;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
        },

        login: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.user = undefined;
        },
    },
});

export default authSlice.reducer;
export const { initialize, login, logout } = authSlice.actions;
