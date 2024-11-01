import { apiSlice } from "../api/apiSlice";

export const areasApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAreas: builder.query({
      query: () => "/areas/areas",
      forceRefetch: true,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const areas = await queryFulfilled;
        // Handle the fetched data if needed
      },
    }),
    fetchAreaById: builder.query({
      query: (id) => `/areas/areas/${id}`,
    }),
  }),
});

export const { useFetchAreasQuery, useFetchAreaByIdQuery } = areasApi;
