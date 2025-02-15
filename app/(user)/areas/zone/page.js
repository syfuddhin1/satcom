
import UniversalAddButton from "@/components/ui/UniversalAddButton";
import UniversalEditButton from "@/components/ui/EditModal";
import AddZone from "./add/page";

export default async function AreaPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URI}/api/areas/zone`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();

  return (
    <div className="p-8 mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        {/* Header Section */}
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Zone Management
          </h1>
          <UniversalAddButton buttonText="Add New Zone">
            <AddZone />
          </UniversalAddButton>
        </div>

        {/* Table Section */}
        <div className="p-6">
          {data?.zoneList?.length === 0 ? (
            <div className="text-center py-20">
              <svg
                className="w-20 h-20 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01"
                />
              </svg>
              <p className="mt-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                No zones found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                  {data?.zoneList?.map((zone, i) => (
                    <tr
                      key={zone.code}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {zone.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {zone.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {zone.description || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <UniversalEditButton>
                          <AddZone editData={zone} />
                        </UniversalEditButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
