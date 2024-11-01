/* eslint-disable no-param-reassign */
/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addAllProducts: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { addAllProducts } = productsSlice.actions;
export default productsSlice.reducer;
