import Link from "next/link";
import React from "react";
import SearchInput from "../../staffs/_components/SearchInput";
import UniversalAddButton from "@/components/ui/UniversalAddButton";
import AddUserPage from "../add/page";
export default function FilterForm({ title }) {
  return (
    <div className="relative flex justify-between gap-5 h-16 border bg-slate-100 dark:bg-slate-50/10 items-center p-2 ">
      <h1 className="text-2xl font-bold ">{title}</h1>
      <div className="flex gap-5 *:flex *:gap-4 *:items-center *:capitalize">
        <SearchInput />
        <div>
         <UniversalAddButton buttonText="Add New Customer">
         <AddUserPage />
         </UniversalAddButton>
        </div>
      </div>
    </div>
  );
}
