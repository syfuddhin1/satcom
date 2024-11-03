import React from "react";
import BuyPackageForm from "./BuyPackageForm";
import PackageCard from "./PackageCard";

export default function PackageInfo({ userData }) {
  return (
    <div className="min-w-fit p-6  rounded-lg shadow-lg border border-gray-200 mt-10 relative">
      <h1 className="text-lg text-center border-b font-bold mb-2">
        Package Info
      </h1>
      {/* Other package info components */}

      <div className="space-y-2  ">
        <h1 className="text-md text-center border-b text-gray-700  my-2">
          Package List
        </h1>
        {userData.packages.map((item) => (
          <PackageCard key={item.package} packageData={item} />
        ))}
        <BuyPackageForm userData={userData} />
      </div>
    </div>
  );
}
