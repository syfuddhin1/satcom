import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import productsSliceReducer from "./slices/productsSlice";
import cartSliceReducer from "./slices/cartSlice";
import filterSliceReducer from "./slices/filterSlice";
import menuSliceReducer from "./slices/menuSlice";
// configure store for redux

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    products: productsSliceReducer,
    carts: cartSliceReducer,
    filter: filterSliceReducer,
    menu: menuSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
