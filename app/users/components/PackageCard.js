"use client";
import { useRemoveUserPackageMutation } from "@/store/slices/userApi";
import { Trash } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

export default function PackageCard({ packageData, user }) {
  const router = useRouter();
  const [removePackage, { isLoading, isSuccess, isError }] =
    useRemoveUserPackageMutation();
  const handleRemove = () => {
    removePackage({
      userId: user,
      packageId: packageData._id,
    });
  };

  return (
    <div className="flex flex-col gap-2 text-md shadow-lg border border-gray-200 p-4 rounded-lg text-center hover:bg-gray-50 hover:shadow-xl hover:cursor-pointer transition-all duration-200 transform hover:-translate-y-1">
      <h1 className="font-bold text-sm text-gray-800 capitalize">
        {packageData.package.name}-{packageData.package.speed}
      </h1>
      <span>{packageData.status}</span>
      <p className="text-gray-600">
        Next Billing Date: {packageData.billing_date.substring(0, 10)}
      </p>
      <p className="text-gray-600">
        Starting Date: {packageData.createdAt.substring(0, 10)}
      </p>
      <p className="text-gray-600">Due/Advance: 0tk</p>
      <button
        onClick={handleRemove}
        className="mt-2 px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center gap-2 w-fit m-auto"
      >
        <Trash className="h-4 w-4" /> Deactive
      </button>
    </div>
  );
}
