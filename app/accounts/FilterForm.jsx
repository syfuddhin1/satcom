"use client";
import React from "react";
import TransactionForm from "./TransactionForm";

export default function FilterForm({ title }) {
  const [showForm, setShowForm] = React.useState(false);

  return (
    <div className="flex justify-between gap-5 h-16 border bg-slate-100 dark:bg-slate-50/10 items-center p-2 ">
      <h1 className="text-2xl font-bold ">{title}</h1>
      <div className="flex gap-5 *:flex *:gap-4 *:items-center *:capitalize">
        <div className="">
          <label htmlFor="filter">filter</label>
          <select
            id="filter"
            name="filter"
            className="w-40 h-10 rounded-lg text-center "
          >
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort">Sort</label>
          <select
            id="sort"
            name="sort"
            className="w-40 h-10 rounded-lg text-center "
          >
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div>
          <label htmlFor="searh">Search</label>
          <input
            type="text"
            name="search"
            id="search"
            className="w-72 h-10 rounded-lg ps-2 text-center"
            placeholder="search by name,mobile,id or email..."
          />
        </div>
        <div>
          <button
            className="p-2 px-4 border border-black rounded bg-indigo-400 text-white"
            onClick={() => setShowForm(true)}
          >
            Add
          </button>
          {showForm && <TransactionForm setShowForm={setShowForm} />}
        </div>
      </div>
    </div>
  );
}
