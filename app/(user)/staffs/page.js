import ActionButton from "@/components/users/ActionButton";
import React from "react";
import FilterForm from "./_components/FilterForm";

async function getData(searchQuery) {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_APP_URI}/api/staffs`);

    if (searchQuery) {
      url.searchParams.append("q", searchQuery);
    }

    const res = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch staff data");
    }

    const data = await res.json();
    return data.userData || [];
  } catch (error) {
    console.error("Error fetching staff data:", error);
    return [];
  }
}

export default async function StaffPage({ searchParams }) {
  const searchQuery = searchParams?.q || ""; // Get search parameter `q`
  const userData = await getData(searchQuery);

  return (
    <div className="p-4 rounded-lg shadow-lg grid gap-4 grid-rows-auto">
      <FilterForm title="Staffs" />

      <div className="overflow-x-auto flex">
        {userData.length > 0 ? (
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-100/10 capitalize">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Mobile No</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {userData.map((user, i) => (
                <tr key={user.code}>
                  <td className="px-4 py-2 border-t">{i + 1}</td>
                  <td className="px-4 py-2 border-t">{user.name}</td>
                  <td className="px-4 py-2 border-t">{user.username}</td>
                  <td className="px-4 py-2 border-t">{user.phone}</td>
                  <td className="px-4 py-2 border-t">{user.email}</td>
                  <td className="px-4 py-2 border-t">{user.role}</td>
                  <td className="px-4 py-2 border-t flex justify-center">
                    <ActionButton user={user} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="h-96 w-full flex justify-center items-center text-xl">
            No Staff Found
          </div>
        )}
      </div>

    </div>
  );
}
