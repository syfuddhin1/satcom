import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import productsSliceReducer from "./silces/productsSlice";
import cartSliceReducer from "./silces/cartSlice";
import filterSliceReducer from "./silces/filterSlice";
import menuSliceReducer from "./silces/menuSlice";
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
