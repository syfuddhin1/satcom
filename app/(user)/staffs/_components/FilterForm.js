import Link from "next/link";
import React from "react";
import AdminUserModal from "./AdminUserModal";
import SearchInput from "./SearchInput";

export default function FilterForm({ title }) {
  return (
    <div className="relative flex justify-between gap-5 h-16 border bg-slate-100 dark:bg-slate-50/10 items-center p-2 ">
      <h1 className="text-2xl font-bold ">{title}</h1>
      <div className="flex gap-5 *:flex *:gap-4 *:items-center *:capitalize">
        <SearchInput />
        <div>
          <AdminUserModal />
        </div>
      </div>
    </div>
  );
}
