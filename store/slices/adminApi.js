import { apiSlice } from "../api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAdmins: builder.query({
      query: () => "/staffs",
      providesTags: ["Staffs"],
    }),
    fetchAdminById: builder.query({
      query: (id) => `/staffs/${id}`,
      providesTags: (result, error, id) => [{ type: "Staff", id }],
    }),
    addAdmin: builder.mutation({
      query: (admin) => ({
        url: "/staffs",
        method: "POST",
        body: admin,
      }),
      invalidatesTags: ["Staffs"],
    }),
    removeAdmin: builder.mutation({
      query: (id) => ({
        url: `/staffs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staffs"],
    }),
    updateAdmin: builder.mutation({
      query: ({ id, admin }) => ({
        url: `/staffs/${id}`,
        method: "PUT",
        body: admin,
      }),
      invalidatesTags: ["Staffs"],
    }),
  }),
});

export const {
  useFetchAdminsQuery,
  useFetchAdminByIdQuery,
  useAddAdminMutation,
  useRemoveAdminMutation,
  useUpdateAdminMutation,
} = adminApi;
