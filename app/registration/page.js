"use client";
import { addUser } from "@/lib";
import React from "react";

export default function RegistrationPage() {
  const [formData, setFormData] = React.useState({});
  const handleSubmitRegistration = async (event) => {
    event.preventDefault();
    const response = await addUser(formData);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmitRegistration}>
      <label>
        Email
        <input name="email" type="email" onChange={handleChange} />
      </label>

      <label>
        Name
        <input name="name" type="text" onChange={handleChange} />
      </label>
      <label>
        Code
        <input name="code" type="text" onChange={handleChange} />
      </label>
      <label>
        Password
        <input name="password" type="password" onChange={handleChange} />
      </label>
      <label>
        Confirm Password
        <input name="confirmPassword" type="password" onChange={handleChange} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
