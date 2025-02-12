import { apiSlice } from "../api/apiSlice";

export const packagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPackages: builder.query({
      query: (provider) => `/packages?provider=${provider}`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const packages = await queryFulfilled;
          // Optionally dispatch other actions or handle the fetched data
        } catch (error) {
          console.error("Failed to fetch packages:", error);
          // Handle error as needed, e.g., dispatching an error action
        }
      },
    }),
    fetchPackageById: builder.query({
      query: (id) => `/packages/${id}`,
    }),
    addPackage: builder.mutation({
      query: (packageData) => ({
        url: "/packages",
        method: "POST",
        body: packageData,
      }),
      invalidatesTags: ["Packages"],
    }),
    removePackage: builder.mutation({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Packages"],
    }),
    updatePackage: builder.mutation({
      query: ({ id, packageData }) => ({
        url: `/packages/${id}`,
        method: "PUT",
        body: packageData,
      }),
      invalidatesTags: ["Packages"],
    }),
    updatePackageStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/packages/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Packages"],
    }),
  }),
});

export const {
  useFetchPackagesQuery,
  useFetchPackageByIdQuery,
  useAddPackageMutation,
  useRemovePackageMutation,
  useUpdatePackageMutation,
  useUpdatePackageStatusMutation,
} = packagesApi;
