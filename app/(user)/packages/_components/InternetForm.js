"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function InternetForm({ editData = null, setIsOpen }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    speed: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        speed: editData.speed,
        price: editData.price,
        description: editData.description || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = editData 
      ? `${process.env.NEXT_PUBLIC_APP_URI}/api/packages/${editData.id}`
      : `${process.env.NEXT_PUBLIC_APP_URI}/api/packages`;

    try {
      const res = await fetch(endpoint, {
        method: editData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          provider: "internet",
        }),
      });

      if (res.ok) {
        toast.success(editData ? "Plan updated successfully" : "Plan added successfully");
        router.refresh();
        if (!editData) {
          setFormData({
            name: "",
            speed: "",
            price: "",
            description: "",
          });
        }
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(editData ? "Failed to update plan" : "Failed to add plan");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center border-b-[1px] border-gray-300/30 p-2">
        {editData ? "Edit Internet Plan" : "Add Internet Plan"}
      </h2>
      
      <form
        id="internet-plan-form"
        className="gap-2 grid grid-cols-2 grid-rows-3"
        onSubmit={handleSubmit}
      >
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
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Enter plan name"
            required
          />
        </div>

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
            value={formData.speed}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Enter speed"
            required
          />
        </div>

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
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Enter price"
            required
          />
        </div>

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
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Enter description"
            rows={3}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full h-10 bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition duration-200 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {editData ? "Update Plan" : "Add Plan"}
        </button>
      </form>
    </div>
  );
}
