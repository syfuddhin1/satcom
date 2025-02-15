"use client";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

import UniversalEditButton from "@/components/ui/EditModal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CableForm from "./CableForm";
import InternetForm from "./InternetForm";

export default function ActionButtons({ pack }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this package?")) {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/packages/${pack.id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          toast.success("Package deleted successfully");
          router.refresh();
        } else {
          throw new Error("Failed to delete");
        }
      } catch (error) {
        toast.error("Failed to delete package");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <UniversalEditButton>
        {pack.provider === "cable" ? (
          <CableForm editData={pack} />
        ) : (
          <InternetForm editData={pack} />
        )}
      </UniversalEditButton>
      <button
        onClick={handleDelete}
        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition duration-200 flex items-center gap-2"
        disabled={isLoading}
      >
        <FiTrash2 className="w-5 h-5" /> <span className="">Delete</span>
      </button>
    </div>
  );
}
