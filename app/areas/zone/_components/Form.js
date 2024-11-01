"use client";
import React from "react";

export default function Form() {
  const [formData, setFormData] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <form className="grid grid-cols-1 gap-4 p-10 rounded-md justify-items-center shadow-md w-1/4 *:grid *:gap-2 *:w-full">
      <label>
        Code:
        <input
          type="text"
          name="code"
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-md p-2"
        />
      </label>

      <label>
        Name{" "}
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-md p-2"
        />
      </label>

      <label>
        Description{" "}
        <textarea
          type="text"
          name="description"
          onChange={handleChange}
          rows="3"
          className="w-full border border-slate-300 rounded-md p-2"
        />
      </label>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200">
        Save
      </button>
    </form>
  );
}
