"use client";

import { getNewAreaId } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AddEditAreas({ editData = null, setIsOpen }) {
  console.log(editData);

  const [zoneList, setZoneList] = React.useState([]);
  const [formData, setFormData] = React.useState({
    code: editData?.code || "",
    name: editData?.name || "",
    description: editData?.description || "",
    zoneId: editData?.zoneId || "",
  });

  const router = useRouter();
  const isEditMode = Boolean(editData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URI}/api/areas/zone`
      );
      const data = await response.json();
      setZoneList(data?.zoneList);
    }
    getData();
  }, []);

  const handleZoneChange = async (e) => {
    e.preventDefault();
    const zone = zoneList.find((zone) => zone.code === e.target.value);

    if (!isEditMode) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URI}/api/areas/areas`
      );
      const data = await res.json();

      setFormData((prevFormData) => ({
        ...prevFormData,
        code: getNewAreaId(e.target.value, data.areaList),
        zoneId: zone.id,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        zoneId: zone.id,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_APP_URI}/api/areas/areas${
      isEditMode ? `/${editData.id}` : ""
    }`;

    const response = await fetch(url, {
      method: isEditMode ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.refresh();
      alert(`Area ${isEditMode ? "updated" : "added"} successfully`);
      // router.back();
      setIsOpen(false);
    }
  };

  return (
    <div className=" p-16 flex items-center justify-center bg-gray-950/10 shadow-inner shadow-blue-500/40 rounded-xl">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg">
        <div className="px-8 py-6 border-b border-gray-100">
          <h1 className="text-2xl font-semibold text-gray-800">
            {isEditMode ? "Edit Area" : "Add New Area"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isEditMode
              ? "Update the area information below"
              : "Fill in the information to create a new area"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {!isEditMode && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Zone
              </label>
              <select
                name="zone"
                onChange={handleZoneChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                defaultValue={editData?.zoneCode}
              >
                <option value="">Choose a zone</option>
                {zoneList.map((zone) => (
                  <option key={zone._id} value={zone.code}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              disabled
              className="w-full px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-300 text-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
              placeholder="Area code"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors capitalize"
              placeholder="Enter area name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter area description"
            />
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
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors duration-200"
            >
              {isEditMode ? "Update Area" : "Create Area"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
