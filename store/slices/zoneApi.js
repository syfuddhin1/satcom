import { apiSlice } from "../api/apiSlice";
// import { addAllProducts } from "./productsSlice";

export const zonesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getZones: builder.query({
      query: () => "/areas/zone",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const zones = await queryFulfilled;
      },
    }),
    fetchZoneById: builder.query({
      query: (id) => `/areas/zone/${id}`,
    }),
    addZone: builder.mutation({
      query: (zone) => ({
        url: "/areas/zone",
        method: "POST",
        body: zone,
      }),
      invalidatesTags: ["Zones"],
    }),
    updateZone: builder.mutation({
      query: (zone) => ({
        url: `/areas/zone/${zone.code}`,
        method: "PUT",
        body: zone,
      }),
      invalidatesTags: ["Zones"],
    }),
    removeZone: builder.mutation({
      query: (code) => ({
        url: `/areas/zone/${code}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Zones"],
    }),
  }),
});

export const {
  useGetZonesQuery,
  useAddZoneMutation,
  useUpdateZoneMutation,
  useRemoveZoneMutation,
  useFetchZoneByIdQuery,
} = zonesApi;
