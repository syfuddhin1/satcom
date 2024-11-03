import React from "react";
import InternetForm from "../_components/InternetForm";
import ActionButton from "@/components/users/ActionButton";

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
      <InternetForm />

      <div className="overflow-x-auto flex mt-10">
        <table className="table-auto w-full">
          <caption className="text-center text-xl p-2 font-bold">
            Internet Packages
          </caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-100/10">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Speed</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {packageData.map((pack, i) => (
              <tr
                key={pack.code}
                className="even:bg-gray-100 even:dark:bg-gray-100/10"
              >
                <td className="px-4 py-2 border-t">{i + 1}</td>
                <td className="px-4 py-2 border-t">{pack.name}</td>
                <td className="px-4 py-2 border-t">{pack.speed}</td>
                <td className="px-4 py-2 border-t">{pack.price}</td>
                <td className="px-4 py-2 border-t">
                  {pack.description || "-"}
                </td>
                <td className="px-4 py-2 border-t flex justify-center">
                  <ActionButton user={pack} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
