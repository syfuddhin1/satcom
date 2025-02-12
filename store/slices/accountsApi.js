import { apiSlice } from "../api/apiSlice";

export const accountsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAccounts: builder.query({
      query: () => "/accounts",
      providesTags: ["Accounts"],
    }),
    addAccount: builder.mutation({
      query: (account) => ({
        url: "/accounts",
        method: "POST",
        body: account,
      }),
      invalidatesTags: ["Accounts"],
    }),
    removeAccount: builder.mutation({
      query: (id) => ({
        url: `/accounts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Accounts"],
    }),
    updateAccount: builder.mutation({
      query: (account) => ({
        url: `/accounts/${account.id}`,
        method: "PUT",
        body: account,
      }),
      invalidatesTags: ["Accounts"],
    }),

    addVoucher: builder.mutation({
      query: (voucher) => ({
        url: "/accounts/vouchers",
        method: "POST",
        body: voucher,
      }),
      invalidatesTags: ["Vouchers"],
    }),
    fetchVouchers: builder.query({
      query: () => "/accounts/vouchers",
      providesTags: ["Vouchers"],
    }),
    fetchVoucherById: builder.query({
      query: (id) => `/accounts/vouchers/${id}`,
      providesTags: (result, error, id) => [{ type: "Voucher", id }],
    }),
    fetchVoucherByCode: builder.query({
      query: (code) => `/accounts/vouchers/${code}`,
    }),
    fetchVoucherByUser: builder.query({
      query: (userId) => `/accounts/vouchers/user/${userId}`,
    }),
    updateVoucher: builder.mutation({
      query: (voucher) => ({
        url: `/accounts/vouchers/${voucher.id}`,
        method: "PUT",
        body: voucher,
      }),
      invalidatesTags: ["Vouchers"],
    }),

    removeVoucher: builder.mutation({
      query: (id) => ({
        url: `/accounts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Accounts"],
    }),
  }),
});

export const {
  useFetchAccountsQuery,
  useFetchAccountByIdQuery,
  useFetchAccountByCodeQuery,
  useAddAccountMutation,
  useUpdateAccountMutation,
  useRemoveAccountMutation,
  useFetchVouchersQuery,
  useFetchVoucherByIdQuery,
  useFetchVoucherByCodeQuery,
  useFetchVoucherByUserQuery,
  useUpdateVoucherMutation,
  useRemoveVoucherMutation,
  useAddVoucherMutation,
} = accountsApi;
