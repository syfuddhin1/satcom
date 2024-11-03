"use client";
import { useFetchPackagesQuery } from "@/store/slices/packageApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillShopping, AiOutlineShopping } from "react-icons/ai";

export default function BuyPackageForm({ userData }) {
  const [isActive, setIsActive] = useState(false);
  const [provider, setProvider] = useState("internet");
  const [packageData, setPackageData] = useState(0);
  const { data, isError, isSuccess } = useFetchPackagesQuery(provider);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsActive(false);
    // Handle form submission here
    const formData = new FormData(e.target);
    const provider = formData.get("provider");
    const packageType = formData.get("package");
    const sCharge = formData.get("SCharge");
    const billing_date = formData.get("billing_date");
    const package_bill = formData.get("package_bill");
    console.log({
      provider,
      sCharge,
      packageType,
      billing_date,
      package_bill,
      packageName: packageData.name,
    });
    // Perform API call to save the plan
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URI}/api/users/${userData._id}/packages`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider,
          sCharge,
          packageType,
          billing_date,
          package_bill,
          packageName: packageData.name,
        }),
      }
    );

    if (res.ok) {
      console.log("Plan saved successfully");
      router.refresh();
    }
  };
  return (
    <div className="">
      {!isActive && (
        <div className="flex justify-center">
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-white dark:text-white/50 font-bold py-2 px-4 rounded"
            onClick={() => setIsActive(true)}
          >
            Buy New Package
          </button>
        </div>
      )}
      {isActive && (
        <form
          className="space-y-2 PX-5 absolute z-50 backdrop-blur-xl rounded-lg shadow-lg border border-gray-200 p-4 w-full top-0 left-0 h-full"
          onSubmit={handleSubmit}
        >
          <h1 className="text-lg text-center border-b font-bold my-2">
            Buy New Package
          </h1>
          <div>
            <label
              htmlFor="provider"
              className="block text-gray-700 dark:text-gray-300 font-semibold"
            >
              Provider Type
            </label>
            <select
              name="provider"
              id="provider"
              required
              onChange={(e) => setProvider(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            >
              <option value="internet">Internet Service </option>
              <option value="cable">Cable Tv Network</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="package"
              className="block text-gray-700 dark:text-gray-300 font-semibold"
            >
              Package Name
            </label>
            <select
              name="package"
              required
              id="package"
              onChange={(e) => {
                const packageId = e.target.value;
                const packageAmount = data.packageData.find(
                  (pack) => pack._id === packageId
                );
                setPackageData(packageAmount);
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            >
              <option value="">Select Package</option>
              {data.packageData.map((pack) => {
                return (
                  <option key={pack._id} value={pack._id}>
                    {pack.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label
              htmlFor="package"
              className="block text-gray-700 dark:text-gray-300 font-semibold"
            >
              Billing Date:
            </label>
            <input
              type="date"
              required
              name="billing_date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              id="billing_date"
              className="w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-gray-700 dark:text-gray-300 font-semibold"
            >
              Service Charge:
            </label>
            <input
              type="number"
              name="SCharge"
              defaultValue={500}
              id="SCharge"
              placeholder="Enter Service Charge"
              className="w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>{" "}
          <div>
            <label
              htmlFor="amount"
              className="block text-gray-700 dark:text-gray-300 font-semibold"
            >
              Package Bill:
            </label>
            <input
              type="number"
              name="package_bill"
              id="package_bill"
              value={packageData.price}
              className="w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <div className="flex items-end justify-center gap-4">
            <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center">
              <AiOutlineShopping className="text-xl text-yellow-300" />
              Buy Package
            </button>
            <button
              className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsActive(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
