import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const menuSlice = createSlice({
  name: "menuBar",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      return !state; // Explicitly return the toggled value
    },
  },
});

export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;
