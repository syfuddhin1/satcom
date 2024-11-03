import { apiSlice } from "../api/apiSlice";

export const areasApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAreas: builder.query({
      query: () => "/areas/areas",
      refetchOnMountOrArgChange: true, // This will refetch on remount or argument change
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const areas = await queryFulfilled;
          // Handle the fetched data if needed
        } catch (error) {
          console.error("Failed to fetch areas:", error);
        }
      },
    }),
    fetchAreaById: builder.query({
      query: (id) => `/areas/areas/${id}`,
    }),
  }),
});

export const { useFetchAreasQuery, useFetchAreaByIdQuery } = areasApi;
