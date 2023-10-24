import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: Boolean(Cookies.get("PORTFOLIO_TOKEN")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    controlAuthenticated(state, { payload }) {
      state.isAuthenticated = payload;
    },
  },
});

export const { controlAuthenticated } = authSlice.actions;

export default authSlice.reducer;
