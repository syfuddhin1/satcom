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
      // providesTags: (result, error, id) => [{ type: "User", id }],
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
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
        "Users",
      ],
    }),
    addUserPackage: builder.mutation({
      query: (packageData) => ({
        url: `/users/${packageData.userId}/packages`,
        method: "POST",
        body: packageData,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
        "Users",
      ],
    }),
    removeUserPackage: builder.mutation({
      query: ({ userId, packageId }) => ({
        url: `/users/${userId}/packages`,
        body: { packageId },
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
        "Users",
      ],
    }),
    updateUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/users/${userId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
        "Users",
      ],
    }),
    removeUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
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
  useAddUserPackageMutation,
  useRemoveUserPackageMutation,
  useUpdateUserStatusMutation,
  useRemoveUserMutation,
  useUpdateUserMutation,
} = usersApi;
