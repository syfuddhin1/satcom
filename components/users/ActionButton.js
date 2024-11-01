"use client";
import React from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { PiPen } from "react-icons/pi";

export default function ActionButton({ user }) {
  return (
    <div className="flex gap-2 justify-between w-fit">
      <button
        className="border p-2 rounded-lg hover:bg-slate-200"
        onClick={() => console.log("edit")}
        title="Edit"
      >
        <AiFillEdit />
      </button>
      <button
        className="border p-2 rounded-lg hover:bg-slate-200 hover:text-red-400"
        onClick={() => console.log("delete")}
        title="Delete"
      >
        <AiFillDelete />
      </button>
      <button
        className="border p-2 rounded-lg hover:text-blue-300 hover:bg-slate-200"
        onClick={() => console.log("details")}
        title="Details"
      >
        <AiFillEye />
      </button>
    </div>
  );
}
