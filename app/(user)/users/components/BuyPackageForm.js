"use client";
import { useFetchPackagesQuery } from "@/store/slices/packageApi";
import { useAddUserPackageMutation } from "@/store/slices/userApi";
import { EraserIcon } from "lucide-react";
import { Brush } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";

export default function BuyPackageForm({ userData }) {
  const [provider, setProvider] = useState("internet");
  const [packageData, setPackageData] = useState({ price: 0, name: "" });
  const { data, isSuccess } = useFetchPackagesQuery(provider);
  const [addPackage, { isLoading, isSuccess: isAdded, isError }] =
    useAddUserPackageMutation();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const billing_date = formData.get("billing_date");

    const res = await addPackage({
      userId: userData.id,
      packageId: packageData.id,
      billing_date,
    });
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_APP_URI}/api/users/${userData._id}/packages`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       provider,
    //       packageType,
    //       billing_date,
    //       package_bill,
    //       packageName: packageData.name,
    //     }),
    //   }
    // );

    // if (res.ok) {
    //   console.log("Plan saved successfully");
    //   router.refresh();
    // }
  };

  const handleClear = () => {
    setProvider("internet");
    setPackageData({ price: 0, name: "" });
  };
  useEffect(() => {
    if (isAdded) {
      setProvider("internet");
      setPackageData({ price: 0, name: "" });
      alert("Successfully added package");
      router.refresh();
    }
  }, [isAdded]);

  return (
    <div>
      <form
        className="space-y-2 px-10 z-50 backdrop-blur-xl rounded-lg text-sm shadow-lg border border-gray-200 p-4 w-2/3 mx-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-lg text-center border-b font-bold my-2">
          Buy New Package
        </h1>

        <div>
          <label htmlFor="provider" className="block font-semibold">
            Provider Type
          </label>
          <select
            name="provider"
            id="provider"
            required
            onChange={(e) => setProvider(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Provider</option>
            <option value="internet">Internet Service</option>
            <option value="cable">Cable TV Network</option>
          </select>
        </div>

        <div>
          <label htmlFor="package" className="block font-semibold">
            Package Name
          </label>
          <select
            name="package"
            required
            id="package"
            onChange={(e) => {
              const packageId = e.target.value;
              const selectedPackage = data.packageData.find(
                (pack) => pack.id === packageId
              );
              setPackageData(selectedPackage);
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Package</option>
            {isSuccess &&
              data.packageData.map((pack) => (
                <option key={pack.id} value={pack.id}>
                  {pack.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="billing_date" className="block font-semibold">
            Billing Date
          </label>
          <input
            type="date"
            required
            name="billing_date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            id="billing_date"
            className="w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="package_bill" className="block font-semibold">
            Package Bill
          </label>
          <input
            type="number"
            name="package_bill"
            id="package_bill"
            value={packageData.price}
            readOnly
            className="w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center w-full flex-col md:flex-row  justify-center gap-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center">
            <AiOutlineShopping className="w-4 h-4 text-yellow-300" />
            Buy Package
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center"
          >
            <EraserIcon className="w-4 h-4 text-yellow-300" />
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
