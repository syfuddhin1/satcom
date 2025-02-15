"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CableForm({ editData = null, setIsOpen }) {
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

  const isEditMode = Boolean(editData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
          provider: "cable",
        }),
      });

      if (res.ok) {
        toast.success(
          editData ? "Plan updated successfully" : "Plan added successfully"
        );
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
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
        {editData ? "Edit Cable TV Plan" : "Add Cable TV Plan"}
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Plan Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition duration-200"
              placeholder="Enter plan name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Number of Channels
            </label>
            <input
              type="text"
              name="speed"
              value={formData.speed}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition duration-200"
              placeholder="e.g., 50 or 100"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Price (BDT)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition duration-200"
              placeholder="Enter price"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition duration-200"
              placeholder="Enter description"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-6 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-200 text-black rounded-lg hover:bg-emerald-300 focus:ring-4 focus:ring-emerald-200 transition-colors duration-200"
          >
            {isEditMode ? "Update Plan" : "Add Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}
