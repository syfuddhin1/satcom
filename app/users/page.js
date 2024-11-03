import ActionButton from "@/components/users/ActionButton";
import React from "react";
import FilterForm from "./components/FIlterForm";

export default async function UserPage() {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  });
  const data = await res.json();
  const { userData } = data;

  return (
    <div className=" p-4 rounded-lg shadow-lg grid gap-4 grid-rows-auto ">
      <FilterForm title={"Users"} />
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
            {userData.map((user, i) => (
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
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">pagination</div>
    </div>
  );
}
