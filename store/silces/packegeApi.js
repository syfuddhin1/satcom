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
  }),
});

export const { useFetchPackagesQuery } = packagesApi;
