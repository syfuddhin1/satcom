"use client";
import { useRouter } from "next/navigation";
import { AiFillDelete } from "react-icons/ai";

export default function DeleteTransaction({ id }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete this transaction?`)) {
      const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log("Transaction deleted successfully");
        router.refresh();
      } else {
        console.error("Error deleting transaction");
      }
    }
  };
  return (
    <div className="flex gap-4 items-center">
      <button
        className="p-1 rounded-lg hover:bg-slate-200 hover:text-red-400"
        onClick={handleDelete}
        title="Delete"
      >
        <AiFillDelete />
      </button>
    </div>
  );
}
