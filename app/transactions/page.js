import FilterForm from "./FilterForm";

export default function TransactionsPage() {
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
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Mobile No</th>
              <th className="px-4 py-2">NID No</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {/* {userData.map((user, i) => (
              <tr key={user.code}>
                <td className="px-4 py-2 border-t">{i + 1}</td>
                <td className="px-4 py-2 border-t">{user.name}</td>
                <td className="px-4 py-2 border-t">{user.memberCode}</td>
                <td className="px-4 py-2 border-t">{user.mobile}</td>
                <td className="px-4 py-2 border-t">{user.nidNo}</td>
                <td className="px-4 py-2 border-t">{user.address}</td>
                <td className="px-4 py-2 border-t">{user.status}</td>
                <td className="px-4 py-2 border-t flex justify-center">
                  <ActionButton user={user} />
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
