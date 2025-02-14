import React from "react";

export default function TransactionInfo({ userData }) {
  return (
    <div className="min-w-fit p-6 col-span-2  rounded-lg shadow-lg border border-gray-200 mt-10">
      <h1 className="text-lg text-center border-b font-bold mb-2">
        Last Transactions
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 text-left">Transaction ID</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Package</th>
              <th className="py-2 px-4 text-left">Provider</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Payment Mode</th>
              <th className="py-2 px-4 text-left">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {userData.Transaction.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-gray-100 capitalize">
                <td className="py-2 px-4">{tx.transactionId}</td>
                <td className="py-2 px-4">৳{tx.amount}</td>
                <td className="py-2 px-4">{tx.package.name}-{tx.package.speed}</td>
                <td className="py-2 px-4">{tx.package.provider}</td>
                <td className="py-2 px-4">{new Date(tx.transactionDate).toLocaleDateString()}</td>
                <td className="py-2 px-4">{tx.modeOfPayment}</td>
                <td className="py-2 px-4">{tx.remarks || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
