"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function InternetForm() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    // Handle form submission here
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const speed = formData.get("speed");
    const price = formData.get("price");
    const description = formData.get("description");
    const provider = "internet";
    // Perform API call to save the plan
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URI}/api/packages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        speed,
        price,
        description,
        provider,
      }),
    });
    if (res.ok) {
      console.log("Plan saved successfully");

      // Redirect to the plans page or display a success message
      router.refresh();
    } else {
      console.error("Failed to save plan");
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center border-b-[1px] border-gray-300/30 p-2">
        Add Internet Plan
      </h2>
      <form
        id="internet-plan-form"
        className="gap-2 grid grid-cols-2 grid-rows-3"
        onSubmit={handleSubmit}
      >
        {/* <!-- Name Field --> */}
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold"
          >
            Plan Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Enter plan name"
            required
          />
        </div>
        {/* <!-- Speed Field --> */}
        <div>
          <label
            htmlFor="speed"
            className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold"
          >
            Speed (e.g., 10mbps)
          </label>
          <input
            type="text"
            id="speed"
            name="speed"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Enter speed"
            required
          />
        </div>

        {/* <!-- Price Field --> */}
        <div>
          <label
            htmlFor="price"
            className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold"
          >
            Price (in Taka)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Enter price"
            required
          />
        </div>
        {/* description field */}
        <div className="row-span-2">
          <label
            htmlFor="description"
            className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Enter description"
            rows={3}
          ></textarea>
        </div>
        {/* <!-- Submit Button --> */}

        <button
          type="submit"
          className="w-full h-10 bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition duration-200 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Add Plan
        </button>
      </form>
    </div>
  );
}
