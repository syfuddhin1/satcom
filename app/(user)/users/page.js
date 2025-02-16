import ActionButton from "@/components/users/ActionButton";
import React from "react";
import FilterForm from "./components/FilterForm";

async function getUsers(searchQuery) {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_APP_URI}/api/users`);

    if (searchQuery) {
      url.searchParams.append("q", searchQuery);
    }

    const res = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await res.json();
    return data.userData || [];
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
}

export default async function UserPage({ searchParams }) {
  const searchQuery = searchParams?.q || ""; // Extract `q` from search params
  const userData = await getUsers(searchQuery);

  return (
    <div className="p-4 rounded-lg shadow-lg grid gap-4 grid-rows-auto">
      <FilterForm title="Customers" />

      <div className="overflow-x-auto flex">
        {userData.length > 0 ? (
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
                  <td className="px-4 py-2 border-t">
                    <ActionButton user={user} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="h-96 w-full flex justify-center items-center text-xl">
            No Users Found
          </div>
        )}
      </div>

      <div className="pagination">pagination</div>
    </div>
  );
}
