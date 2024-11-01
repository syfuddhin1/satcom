import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
      forceRefetch: true,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const users = await queryFulfilled;
        // Handle the fetched data if needed
      },
    }),
    fetchUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    fetchUserByArea: builder.query({
      query: (area) => `/users/area/${area}`,
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useFetchUserByIdQuery,
  useFetchUsersQuery,
  useFetchUserByAreaQuery,
  useAddUserMutation,
} = usersApi;
