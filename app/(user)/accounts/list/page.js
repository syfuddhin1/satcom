
export default async function AccountsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URI}/api/accounts/vouchers`,
    {
      cache: "no-store",
    }
  );
  const { vouchers } = await res.json();

  return (
    <div className="relative h-full">
      <div className="flex justify-center gap-5 h-16 border bg-slate-100 dark:bg-slate-50/10 items-center p-2 ">
        <h1 className="text-2xl font-bold">AccountsPage</h1>
      </div>
      {/* <FilterForm /> */}

      <div className="overflow-x-auto flex">
        <table className="table-auto w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 ">#</th>

              <th className="px-4 py-2  cursor-pointer">Voucher Code</th>
              <th className="px-4 py-2  cursor-pointer">Voucher Type</th>
              <th className="px-4 py-2  cursor-pointer">Voucher Amount</th>
              <th className="px-4 py-2  cursor-pointer">Date</th>
              <th className="px-4 py-2 ">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {vouchers.map((voucher, i) => (
              <tr
                key={voucher._id}
                className="even:bg-gray-100 even:dark:bg-gray-100/10"
              >
                <td className="px-4 py-2 border-t">{i + 1}</td>
                <td className="px-4 py-2 border-t">{voucher.voucherId}</td>
                <td className="px-4 py-2 border-t">{voucher.accountType}</td>
                <td className="px-4 py-2 border-t">{voucher.amount}</td>
                <td className="px-4 py-2 border-t">
                  {voucher.createdAt.split("T")[0]}
                </td>

                <td className="px-4 py-2 border-t flex justify-center">
                  {/* <ActionButton voucher={voucher} /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
