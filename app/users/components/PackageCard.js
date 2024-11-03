import React from "react";

export default async function PackageCard({ packageData }) {
  const res = await fetch(
    `http://localhost:3000/api/packages/${packageData.packageType}`
  );
  const { packDetails } = await res.json();

  if (!packDetails) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-col gap-1 shadow-md border text-gray-700 border-gray-200 p-2 rounded-lg text-center hover:bg-gray-100 hover:cursor-pointer hover:scale-105 transition-all duration-200">
      <h1 className="font-bold  text-xl">{packDetails.name}</h1>
      <p>Next Billing Date: {packageData.billing_date}</p>
      <p>Starting Date: 10/10/2023</p>
      <p>Due/Advance: 0tk</p>
    </div>
  );
}
