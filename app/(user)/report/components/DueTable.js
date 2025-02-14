"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import FIlterMenu from "./FIlterMenu";

const ITEMS_PER_PAGE = 10;

export default function FilterableTable({ data = [], analytics }) {
  const [filters, setFilters] = useState({
    search: "",
    provider: "all",
    zone: "all",
    isPaid: "all",
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);

  const uniqueZones = [...new Set(data.map((item) => item.zone))];

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.userName.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.memberCode.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.mobile.includes(filters.search);

      const matchesProvider =
        filters.provider === "all" || item.provider === filters.provider;
      const matchesZone = filters.zone === "all" || item.zone === filters.zone;
      const matchesPaid =
        filters.isPaid === "all" ||
        (filters.isPaid === "paid" ? item.isPaid : !item.isPaid);

      return matchesSearch && matchesProvider && matchesZone && matchesPaid;
    });
  }, [data, filters]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredData, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          paginatedData.length < filteredData.length
        ) {
          setLoading(true);
          setTimeout(() => {
            setPage((prev) => prev + 1);
            setLoading(false);
          }, 500);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [paginatedData.length, filteredData.length, loading]);

  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  return (
    <div className="p-6 w-full mx-auto">
      <div className="flex gap-4 items-center capitalize justify-between">
        <h1 className="text-2xl font-bold mb-4">Due Report</h1>
        <div className="flex gap-4">
          {Object.entries(analytics).map(([key, value]) => (
            <div className="p-2 px-4 rounded-lg shadow-md" key={key}>
              {key} :{" "}
              <span className="font-bold text-green-500 text-xl">{value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Filter Controls */}
      <FIlterMenu
        setFilters={setFilters}
        filters={filters}
        uniqueZones={uniqueZones}
      />

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Package
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Zone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 capitalize">
            {paginatedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium">{item.userName}</span>
                    <span className="text-sm text-gray-500">
                      {item.memberCode}
                    </span>
                    <span className="text-sm text-gray-500">{item.mobile}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium">{item.package}</span>
                    <span className="text-sm text-gray-500">
                      {item.provider}
                    </span>
                    <span className="text-sm text-gray-500">{item.speed}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span>{item.zone}</span>
                    <span className="text-sm text-gray-500">{item.area}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium">৳{item.price}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">
                    {item.nextPaymentDate}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">
                    {item.lastPaymentDate}
                  </span>
                  <br />
                  <span className="text-sm text-gray-500">
                    ৳{item.lastPaymentAmount}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      item.isPaid
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.isPaid ? "Paid" : "Unpaid"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Loading indicator and observer target */}
        <div ref={observerTarget} className="p-4 text-center">
          {loading && (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce" />
              <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce delay-100" />
              <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce delay-200" />
            </div>
          )}
          {paginatedData.length >= filteredData.length && (
            <p className="text-gray-500">No more results to load</p>
          )}
        </div>
      </div>
      {/* Results counter */}
      <div className="mt-4 text-sm text-gray-500">
        Showing {paginatedData.length} of {filteredData.length} results
      </div>
    </div>
  );
}
