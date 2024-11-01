import { apiSlice } from "../api/apiSlice";
import { addAllProducts } from "./productsSlice";

export const zonesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getZones: builder.query({
      query: () => "/areas/zone",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const zones = await queryFulfilled;
      },
    }),
  }),
});

export const { useGetZonesQuery } = zonesApi;
