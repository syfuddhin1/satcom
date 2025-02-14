"use client";

import { getNewId } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AddZone() {
  // const newId = getNewId(data?.zoneList);
  const [formData, setFormData] = React.useState({
    code: "",
    name: "",
    description: "",
  });
  const router = useRouter();
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
      const newId = getNewId(data?.zoneList);
      setFormData((prevFormData) => ({
        ...prevFormData,
        code: newId,
      }));
    }
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URI}/api/areas/zone`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      router.refresh();
      alert("Zone added successfully");
      router.back();
    }
  };
  return (
    <div className="p-5 flex flex-col h-full gap-5 justify-center items-center mx-auto">
      <form
        className="grid grid-cols-1 text-sm gap-4 font-bold p-10 rounded-md justify-items-center  *:grid *:gap-2 *:w-full"
        onSubmit={handleSubmit}
      >
        <h1 className="text-md font-bold text-center mb-4 border-b">
          Add Zone
        </h1>
        <label>
          Code
          <input
            type="text"
            name="code"
            value={formData.code}
            disabled
            onChange={handleChange}
            placeholder="001"
            required
            className="w-full border border-slate-300 rounded-md p-2"
          />
        </label>

        <label>
          Name{" "}
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            placeholder="write a name...!"
            className="w-full border border-slate-300 rounded-md p-2 capitalize"
          />
        </label>

        <label>
          Description
          <textarea
            type="text"
            name="description"
            onChange={handleChange}
            value={formData.description}
            placeholder="write a description...!"
            rows="3"
            className="w-full border border-slate-300 rounded-md p-2"
          />
        </label>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200">
          Save
        </button>
      </form>
    </div>
  );
}
