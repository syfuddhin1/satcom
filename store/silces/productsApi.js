import { apiSlice } from "../api/apiSlice";
import { addAllProducts } from "./productsSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const products = await queryFulfilled;
        dispatch(addAllProducts(products?.data));
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
