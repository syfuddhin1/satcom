import ActionButton from "@/components/users/ActionButton";
import FilterForm from "./FilterForm";

export default async function accountsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URI}/api/accounts`,
    { cache: "no-store" }
  );
  const { accountsData } = await res.json();

  return (
    <div className="relative h-full">
      <div className="flex justify-center gap-5 h-16 border bg-slate-100 dark:bg-slate-50/10 items-center p-2 ">
        <h1 className="text-2xl font-bold">Accounts Page</h1>
      </div>
      <FilterForm title={'Accounts'}/>
      {/* Your account table and pagination components go here */}
      <div className="overflow-x-auto flex">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-100/10 capitalize">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">accounts Id</th>
              <th className="px-4 py-2">accounts Name</th>
              <th className="px-4 py-2">accounts Type</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {accountsData.map((account, i) => (
              <tr
                key={account.id}
                className=" capitalize even:bg-gray-100 even:dark:bg-gray-100/10"
              >
                <td className="px-4 py-2 border-t">{i + 1}</td>
                <td className="px-4 py-2 border-t">{account.accountId}</td>
                <td className="px-4 py-2 border-t">{account.title}</td>
                <td className="px-4 py-2 border-t">{account.accountType}</td>

                <td className="px-4 py-2 border-t flex justify-center">
                  {/* <ActionButton user={account} /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
