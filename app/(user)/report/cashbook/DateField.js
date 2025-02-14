"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function DateField({ title="Cashbook Report" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("date", e.target.date.value);
    router.replace(`?${params.toString()}`);
  }
  return (
    <form
      className="flex gap-4 items-center p-2 border justify-between px-20"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex gap-4 items-center">
        <label htmlFor="date" className="mr-2">
          Select Date
        </label>
        <input className="w-40 bg-transparent border border-gray-400 rounded" type="date" name="date" id="date" defaultValue={date} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Show Report</button>
      </div>
    </form>
  );
}
