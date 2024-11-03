"use client";
import { useFetchAreaByIdQuery } from "@/store/slices/areaApi";
import {
  useAddUserMutation,
  useFetchUserByAreaQuery,
} from "@/store/slices/userApi";
import { useGetZonesQuery } from "@/store/slices/zoneApi";
import { getNewUserId } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function AddUserPage() {
  const [formData, setFormData] = React.useState({
    zone: "",
    area: "",
    memberCode: "",
    name: "",
    mobile: "",
    email: "",
    nidNo: "",
    address: "",
    mapLocation: "",
    username: "",
    password: "",
    status: "active",
    role: "user",
  });
  const { data: zone } = useGetZonesQuery();
  const { data: area } = useFetchAreaByIdQuery(formData?.zone);
  const { data: user } = useFetchUserByAreaQuery(formData?.area);
  const router = useRouter();
  const [addUser, { isLoading, isSuccess, isError, error }] =
    useAddUserMutation();
  console.log(formData);
  useEffect(() => {
    console.log(area?.areaList);
    if (area?.areaList !== undefined) {
      const newId = getNewUserId(formData.area, user?.userData);
      if (formData.area !== "") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          memberCode: newId,
        }));
      }
    }
  }, [formData.area, user, area?.areaList]);

  const handleSubmitRegistration = async (event) => {
    event.preventDefault();

    const response = await addUser(formData).unwrap();
    if (response.status === "success") {
      router.push("/users");
      router.refresh();
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <form
      className="grid grid-cols-3 gap-4 *:flex *:h-10 *:gap-2 *:items-center *:w-full userform "
      onSubmit={handleSubmitRegistration}
    >
      {/* <!-- Code (Zone + Area + Member) --> */}
      <label for="zone">
        Zone :
        <select
          id="zone"
          name="zone"
          required
          onChange={handleChange}
          className="capitalize"
          value={formData?.zone}
        >
          <option value="">Select Zone</option>
          {zone &&
            zone.zoneList?.map((zone, i) => (
              <option key={i} value={zone.code}>
                {zone.name}
              </option>
            ))}
        </select>
      </label>

      <label for="area">
        Area :
        <select
          id="area"
          name="area"
          required
          onChange={handleChange}
          className="capitalize"
          value={formData?.area}
        >
          <option value="">Select Area</option>
          {area &&
            area.areaList?.map((area, i) => (
              <option key={i} value={area.code}>
                {area.name}
              </option>
            ))}
        </select>
      </label>
      <label for="memberCode">
        Member Code :
        <input
          type="text"
          id="memberCode"
          name="memberCode"
          value={formData?.memberCode}
          required
          onChange={handleChange}
        />
      </label>

      {/* <!-- Name --> */}
      <label for="name">
        Name:
        <input
          type="text"
          id="name"
          name="name"
          value={formData?.name}
          required
          onChange={handleChange}
        />
      </label>

      {/* <!-- Mobile --> */}
      <label for="mobile">
        Mobile:
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={formData?.mobile}
          pattern="[0-9]{10,15}"
          required
          onChange={handleChange}
        />
      </label>

      {/* <!-- Email --> */}
      <label for="email">
        Email:{" "}
        <input
          type="email"
          id="email"
          value={formData?.email}
          name="email"
          required
          onChange={handleChange}
        />
      </label>

      {/* <!-- NID No --> */}
      <label for="nid">
        NID No:{" "}
        <input
          type="text"
          id="nidNo"
          name="nidNo"
          value={formData?.nidNo}
          required
          onChange={handleChange}
        />
      </label>

      {/* <!-- Address --> */}
      <label for="address">
        Address:{" "}
        <input
          type="text"
          id="address"
          value={formData?.address}
          name="address"
          required
          onChange={handleChange}
        />
      </label>

      {/* <!-- Map Location --> */}
      <label for="mapLocation">
        Map Location:{" "}
        <input
          type="text"
          id="mapLocation"
          name="mapLocation"
          value={formData?.mapLocation}
          onChange={handleChange}
        />
      </label>
      {/* username */}
      {/* <label for="username">
        Username:{" "}
        <input
          type="text"
          id="username"
          name="username"
          value={formData?.username}
          required
          onChange={handleChange}
        />
      </label> */}
      {/* password */}
      {/* <label for="password">
        Password:{" "}
        <input
          type="password"
          id="password"
          name="password"
          value={formData?.password}
          onChange={handleChange}
        />
      </label> */}
      {/* <!-- Status --> */}
      <label for="status">
        Status:{" "}
        <select
          id="status"
          name="status"
          required
          onChange={handleChange}
          className="capitalize"
        >
          <option value="active" default>
            Active
          </option>
          <option value="inactive">Inactive</option>
        </select>
      </label>

      {/* <!-- Role --> */}
      <label for="role">
        Role:{" "}
        <select
          id="role"
          name="role"
          required
          onChange={handleChange}
          className="capitalize"
        >
          <option value="user" default>
            User
          </option>
          <option value="admin">Admin</option>
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
          type="button"
          className="bg-violet-400 text-white text-center h-10 rounded-lg w-48"
          onClick={() =>
            setFormData({
              zone: "",
              area: "",
              memberCode: "",
              name: "",
              mobile: "",
              email: "",
              nidNo: "",
              address: "",
              mapLocation: "",
              username: "",
              password: "",
              status: "active",
              role: "user",
            })
          }
        >
          Reset
        </button>
        <button
          type="button"
          className="bg-red-400 text-white text-center h-10 rounded-lg w-48"
        >
          <Link href="/users">Cancel</Link>
        </button>
      </div>
    </form>
  );
}
