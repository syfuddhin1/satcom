"use client";

import { useFetchAreaByCodeQuery } from "@/store/slices/areaApi";
import {
  useAddUserMutation,
  useFetchUserByAreaQuery,
} from "@/store/slices/userApi";
import { useGetZonesQuery } from "@/store/slices/zoneApi";
import { getNewUserId } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

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
    status: "active",
    role: "user",
    username:"",
  });

  const { data: zone } = useGetZonesQuery();
  const { data: area } = useFetchAreaByCodeQuery(formData.zone);
  const { data: user } = useFetchUserByAreaQuery(formData.area);
  const router = useRouter();
  const [addUser, { isLoading }] = useAddUserMutation();

  useEffect(() => {
    if (area?.areaList && formData.area !== "") {
      const newId = getNewUserId(formData.area, user?.userData);
      setFormData((prevFormData) => ({
        ...prevFormData,
        memberCode: newId,
      }));
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
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Add New Customer</h2>
      </div>
      <form onSubmit={handleSubmitRegistration} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="zone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Zone
              </label>
              <select
                id="zone"
                name="zone"
                onChange={handleChange}
                value={formData.zone}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Zone</option>
                {zone &&
                  zone.zoneList?.map((zone, i) => (
                    <option key={i} value={zone.code}>
                      {zone.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="area"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Area
              </label>
              <select
                id="area"
                name="area"
                onChange={handleChange}
                value={formData.area}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Area</option>
                {area &&
                  area.areaList?.map((area, i) => (
                    <option key={i} value={area.code}>
                      {area.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="memberCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Member Code
              </label>
              <input
                type="text"
                id="memberCode"
                name="memberCode"
                value={formData.memberCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Member Code"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Mobile"
                pattern="[0-9]{10,15}"
                required
              />
            </div>
            <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={formData.username}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Username"
            />
            
          </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="nidNo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                NID No
              </label>
              <input
                type="text"
                id="nidNo"
                name="nidNo"
                value={formData.nidNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="NID No"
                required
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Address"
                required
              />
            </div>

            <div>
              <label
                htmlFor="mapLocation"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Map Location
              </label>
              <input
                type="text"
                id="mapLocation"
                name="mapLocation"
                value={formData.mapLocation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Map Location"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                onChange={handleChange}
                value={formData.status}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                // onChange={handleChange}
                value={formData.role}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            
          </div>
        
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
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
                status: "active",
                role: "user",
              })
            }
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Reset
          </button>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
