import ActionButton from "@/components/users/ActionButton";
import FilterForm from "./FilterForm";

export default async function TransactionsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URI}/api/transactions`,
    { cache: "no-store" }
  );
  const { transactionData } = await res.json();
  return (
    <div className="relative h-full">
      <div className="flex justify-center gap-5 h-16 border bg-slate-100 dark:bg-slate-50/10 items-center p-2 ">
        <h1 className="text-2xl font-bold">TransactionsPage</h1>
      </div>
      <FilterForm />
      {/* Your transaction table and pagination components go here */}
      <div className="overflow-x-auto flex">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-100/10">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Transaction Id</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">User Code</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Transaction Date</th>
              <th className="px-4 py-2">Mode of Payment</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {transactionData.map((transaction, i) => (
              <tr
                key={transaction._id}
                className="even:bg-gray-100 even:dark:bg-gray-100/10"
              >
                <td className="px-4 py-2 border-t">{i + 1}</td>
                <td className="px-4 py-2 border-t">
                  {transaction.transactionId}
                </td>
                <td className="px-4 py-2 border-t">{transaction.amount}</td>
                <td className="px-4 py-2 border-t">
                  {transaction.userId.name}
                </td>
                <td className="px-4 py-2 border-t">
                  {" "}
                  {transaction.userId.memberCode}
                </td>
                <td className="px-4 py-2 border-t">
                  {transaction.userId.mobile}
                </td>
                <td className="px-4 py-2 border-t">
                  {transaction.transactionDate}
                </td>
                <td className="px-4 py-2 border-t">
                  {transaction.modeOfPayment}
                </td>
                <td className="px-4 py-2 border-t flex justify-center">
                  <ActionButton user={transaction} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
