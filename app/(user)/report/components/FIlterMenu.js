import { Search } from "lucide-react";
import React from "react";

export default function FIlterMenu({ setFilters, filters, uniqueZones }) {
  return (
    <div className=" rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="    Search by name, code or mobile"
            className="pl-20 w-full rounded-md border border-gray-300 p-2"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>

        {/* Provider Filter */}
        <select
          className="rounded-md border border-gray-300 p-2"
          value={filters.provider}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, provider: e.target.value }))
          }
        >
          <option value="all">All Providers</option>
          <option value="internet">Internet</option>
          <option value="cable">Cable</option>
        </select>

        {/* Zone Filter */}
        <select
          className="rounded-md border border-gray-300 p-2"
          value={filters.zone}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, zone: e.target.value }))
          }
        >
          <option value="all">All Zones</option>
          {uniqueZones.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>

        {/* Payment Status */}
        <select
          className="rounded-md border border-gray-300 p-2"
          value={filters.isPaid}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, isPaid: e.target.value }))
          }
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>
    </div>
  );
}
