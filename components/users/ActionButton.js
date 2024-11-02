"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { PiPen } from "react-icons/pi";

export default function ActionButton({ user }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log("User deleted successfully");
        router.refresh();
      } else {
        console.error("Error deleting user");
      }
    }
  };
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
        onClick={handleDelete}
        title="Delete"
      >
        <AiFillDelete />
      </button>
      <Link
        className="border p-2 rounded-lg hover:text-blue-300 hover:bg-slate-200"
        href={`/users/${user._id}`}
        title="Details"
      >
        <AiFillEye />
      </Link>
    </div>
  );
}
