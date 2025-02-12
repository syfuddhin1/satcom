import { apiSlice } from "../api/apiSlice";

export const transactionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTransaction: builder.mutation({
      query: (transaction) => ({
        url: "/transactions",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["Transactions"],
    }),
    removeTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transactions"],
    }),
    fetchTransactions: builder.query({
      query: () => "/transactions",
      providesTags: ["Transactions"],
    }),
    fetchTransactionById: builder.query({
      query: (id) => `/transactions/${id}`,
      providesTags: (result, error, id) => [{ type: "Transaction", id }],
    }),
    fetchTransactionByUserId: builder.query({
      query: (userId) => `/transactions/user/${userId}`,
      providesTags: (result, error, userId) => [
        { type: "Transaction", id: userId },
        "Transactions",
      ],
    }),
    fetchTransactionByPackageId: builder.query({
      query: (packageId) => `/transactions/package/${packageId}`,
      providesTags: (result, error, packageId) => [
        { type: "Transaction", id: packageId },
        "Transactions",
      ],
    }),
    editTransaction: builder.mutation({
      query: (transaction) => ({
        url: `/transactions/${transaction.id}`,
        method: "PUT",
        body: transaction,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Transaction", id },
        "Transactions",
      ],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});

export const {
  useAddTransactionMutation,
  useEditTransactionMutation,
  useDeleteTransactionMutation,
  useFetchTransactionsQuery,
  useFetchTransactionByIdQuery,
  useFetchTransactionByUserIdQuery,
  useFetchTransactionByPackageIdQuery,
} = transactionsApi;
