import React from "react";
import InternetForm from "../_components/InternetForm";
import ActionButton from "@/components/users/ActionButton";
import UniversalAddButton from "@/components/ui/UniversalAddButton";
import ActionButtons from "../_components/ActionButtons";

export default async function InternetPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URI}/api/packages?provider=internet`,
    {
      cache: "no-store",
    }
  );
  const { packageData } = await res.json();
  return (
    <div>
      {/* <InternetForm /> */}

      <div className="mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold p-6 ">
            Internet Packages
          </h3>
          <UniversalAddButton buttonText="Add New Plan">
            <InternetForm />
          </UniversalAddButton>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  #
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Channels
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {packageData.map((pack, i) => (
                <tr
                  key={pack.code}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
                >
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {i + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {pack.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {pack.speed}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {pack.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {pack.description || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <ActionButtons pack={pack} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
