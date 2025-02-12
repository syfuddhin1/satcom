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
    fetchAreaByCode: builder.query({
      query: (code) => `/areas/areas/${code}`,
    }),
    addArea: builder.mutation({
      query: (areaData) => ({
        url: "/areas/areas",
        method: "POST",
        body: areaData,
      }),
      invalidatesTags: ["Areas"],
    }),
    removeArea: builder.mutation({
      query: (id) => ({
        url: `/areas/areas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Areas"],
    }),
    updateArea: builder.mutation({
      query: ({ id, areaData }) => ({
        url: `/areas/areas/${id}`,
        method: "PUT",
        body: areaData,
      }),
      invalidatesTags: ["Areas"],
    }),
    updateAreaStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/areas/areas/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Areas"],
    }),
  }),
});

export const {
  useFetchAreasQuery,
  useFetchAreaByCodeQuery,
  useAddAreaMutation,
  useRemoveAreaMutation,
  useUpdateAreaMutation,
  useUpdateAreaStatusMutation,
} = areasApi;
