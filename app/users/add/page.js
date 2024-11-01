"use client";
import { addUser } from "@/lib";
import React from "react";

export default function AddUserPage() {
  const [formData, setFormData] = React.useState({});
  const handleSubmitRegistration = async (event) => {
    event.preventDefault();
    const response = await addUser(formData);
    console.log(response);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <form
      className="grid grid-cols-3 gap-4 *:flex *:h-10 *:gap-2 *:items-center *:w-full userform"
      onSubmit={handleSubmitRegistration}
    >
      {/* <!-- Code (Zone + Area + Member) --> */}
      <label for="zone">
        Zone :
        <select id="zone" name="zone" required>
          <option value="">Select Zone</option>
          <option value="zone1">Zone 1</option>
          <option value="zone2">Zone 2</option>
          <option value="zone3">Zone 3</option>
        </select>
      </label>

      <label for="area">
        Area :
        <select id="area" name="area" required>
          <option value="">Select Area</option>
          <option value="area1">Area 1</option>
          <option value="area2">Area 2</option>
          <option value="area3">Area 3</option>
        </select>
      </label>
      <label for="code">
        Member Code :
        <input type="text" id="code" name="code" required />
      </label>

      {/* <!-- Name --> */}
      <label for="name">
        Name:
        <input type="text" id="name" name="name" required />
      </label>

      {/* <!-- Mobile --> */}
      <label for="mobile">
        Mobile:
        <input
          type="tel"
          id="mobile"
          name="mobile"
          pattern="[0-9]{10,15}"
          required
        />
      </label>

      {/* <!-- Email --> */}
      <label for="email">
        Email: <input type="email" id="email" name="email" required />
      </label>

      {/* <!-- NID No --> */}
      <label for="nid">
        NID No: <input type="text" id="nid" name="nid" required />
      </label>

      {/* <!-- Address --> */}
      <label for="address">
        Address: <input type="text" id="address" name="address" required />
      </label>

      {/* <!-- Map Location --> */}
      <label for="map-location">
        Map Location:{" "}
        <input type="text" id="map-location" name="map-location" />
      </label>
      {/* username */}
      <label for="username">
        Username: <input type="text" id="username" name="username" required />
      </label>
      {/* password */}
      <label for="password">
        Password: <input type="password" id="password" name="password" />
      </label>
      {/* <!-- Status --> */}
      <label for="status">
        Status:{" "}
        <select id="status" name="status" required>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>

      {/* <!-- Role --> */}
      <label for="role">
        Role:{" "}
        <select id="role" name="role" required>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="manager">Manager</option>
          {/* <!-- Add other roles as necessary --> */}
        </select>
      </label>

      {/* <!-- Submit Button --> */}
      <div className="col-span-3 justify-center">
        <button
          type="submit"
          className="bg-indigo-800 text-white text-center h-10 rounded-lg w-48"
        >
          Submit
        </button>{" "}
        <button
          type="submit"
          className="bg-violet-400 text-white text-center h-10 rounded-lg w-48"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
