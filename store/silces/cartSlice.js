import { createSlice } from "@reduxjs/toolkit";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../selector/helper";

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      saveCartToLocalStorage(state); // Save to localStorage after adding
    },
    removeFromCart: (state, action) => {
      const existingProduct = state.find(
        (item) => item?.id === action.payload?.id
      );
      if (existingProduct) {
        if (existingProduct.quantity === 1) {
          const newState = state.filter(
            (item) => item.id !== action.payload.id
          );
          saveCartToLocalStorage(newState); // Save to localStorage after removing
          return newState;
        } else {
          existingProduct.quantity -= 1;
        }
      }
      saveCartToLocalStorage(state); // Save to localStorage after updating quantity
    },
    clearCart: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload.id);
      saveCartToLocalStorage(newState); // Save to localStorage after clearing
      return newState;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCart = (state) => state.carts;
export const selectTotal = (state) => {
  return state.carts
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
    .toFixed(2);
};

export const checkCart = (state, id) => {
  return state.carts.some((item) => item.id === id);
};
