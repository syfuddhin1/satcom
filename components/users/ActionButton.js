"use client";
import UserFormPage from "@/app/(user)/users/add/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import UniversalEditButton from "../ui/EditModal";

export default function ActionButton({ user }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      const res = await fetch(`/api/users/${user.id}`, {
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
    <div className="flex gap-4 items-center">
      <UniversalEditButton buttonText="">
        <UserFormPage editData={user} />
      </UniversalEditButton>
      <button
        className="p-1 rounded-lg hover:bg-slate-200 hover:text-red-400"
        onClick={handleDelete}
        title="Delete"
      >
        <AiFillDelete />
      </button>
      {user.role == "user" && (
        <Link
          className="rounded-lg hover:text-blue-300 hover:bg-slate-200"
          href={`/users/${user.id}`}
          title="Details"
        >
          <AiFillEye />
        </Link>
      )}
    </div>
  );
}
