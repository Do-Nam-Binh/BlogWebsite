import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface AuthState {
  user: User | null; // Store user details
  accessToken: string | null; // Store access token
  isAuthenticated: boolean; // Track auth status
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    refreshAccessToken: (state, action: PayloadAction<string>) => {
      console.log("Refreshing access token:", action.payload);
      state.accessToken = action.payload;
    },
  },
});

export const { loginSuccess, logout, refreshAccessToken } = authSlice.actions;
export default authSlice.reducer;
