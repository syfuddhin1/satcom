'use client'
import React, { useState } from "react";
import MemberInfo from "../../components/MemberInfo";
import PackageInfo from "../../components/PackageInfo";
import TransactionInfo from "../../components/TransactionInfo";

export default function DetailsNav({ userData }) {
  // State to manage which component is visible
  const [activeComponent, setActiveComponent] = useState("PackageInfo");
  return (
    <div>
      <div className="flex justify-start gap-4 my-4">
        <button
          onClick={() => setActiveComponent("MemberInfo")}
          className={`px-4 py-2 rounded ${
            activeComponent === "MemberInfo"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Member Info
        </button>
        <button
          onClick={() => setActiveComponent("PackageInfo")}
          className={`px-4 py-2 rounded ${
            activeComponent === "PackageInfo"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Package Info
        </button>
        <button
          onClick={() => setActiveComponent("TransactionInfo")}
          className={`px-4 py-2 rounded ${
            activeComponent === "TransactionInfo"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Transaction Info
        </button>
      </div>

      {/* Conditionally Render Components */}
      <div className="grid  gap-5 w-full">
        {activeComponent === "MemberInfo" && (
          <MemberInfo userData={userData} />
        )}
        {activeComponent === "PackageInfo" && (
          <PackageInfo userData={userData} />
        )}
        {activeComponent === "TransactionInfo" && (
          <TransactionInfo userData={userData} />
        )}
      </div>
    </div>
  );
}
