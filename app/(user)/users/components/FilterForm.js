import Link from "next/link";
import React from "react";
import SearchInput from "../../staffs/_components/SearchInput";
export default function FilterForm({ title }) {
  return (
    <div className="relative flex justify-between gap-5 h-16 border bg-slate-100 dark:bg-slate-50/10 items-center p-2 ">
      <h1 className="text-2xl font-bold ">{title}</h1>
      <div className="flex gap-5 *:flex *:gap-4 *:items-center *:capitalize">
        <SearchInput />
        <div>
          <Link
            href="/users/add"
            className="p-2 px-4 border border-black rounded bg-indigo-400 text-white"
          >
            Add New Customer
          </Link>
        </div>
      </div>
    </div>
  );
}
