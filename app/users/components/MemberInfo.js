import React from "react";
import { getAreaName, getZoneName } from "@/utils";

export default function MemberInfo({ userData }) {
  return (
    <div className="min-w-fit p-6  rounded-lg shadow-lg border border-gray-200 mt-10">
      <h1 className="text-lg text-center border-b font-bold mb-2">
        Member Information
      </h1>
      <div className="space-y-2 capitalize">
        <div className="flex justify-evenly *:w-1/2">
          <span className="font-semibold text-gray-700">Member Code:</span>
          <span className="text-gray-600">{userData.memberCode}</span>
        </div>
        <div className="flex justify-evenly *:w-1/2">
          <span className="font-semibold text-gray-700">Zone:</span>
          <span className="text-gray-600">{getZoneName(userData.zone)}</span>
        </div>
        <div className="flex justify-evenly *:w-1/2">
          <span className="font-semibold text-gray-700">Area:</span>
          <span className="text-gray-600">{getAreaName(userData.area)}</span>
        </div>
        <div className="flex justify-evenly *:w-1/2">
          <span className="font-semibold text-gray-700">Mobile:</span>
          <span className="text-gray-600">{userData.mobile}</span>
        </div>
        <div className="flex justify-evenly *:w-1/2">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-600 lowercase">{userData.email}</span>
        </div>
        <div className="flex justify-evenly *:w-1/2">
          <span className="font-semibold text-gray-700">NID No:</span>
          <span className="text-gray-600">{userData.nidNo}</span>
        </div>
        <div className="flex justify-evenly *:w-1/2">
          <span className="font-semibold text-gray-700">Address:</span>
          <span className="text-gray-600">{userData.address}</span>
        </div>
        <div className="flex justify-evenly *:w-1/2">
          <span className="font-semibold text-gray-700">Username:</span>
          <span className="text-gray-600">{userData.username}</span>
        </div>
        <div className="flex justify-evenly *:w-1/2">
          <span className="font-semibold text-gray-700">Password:</span>
          <span className="text-gray-600">{userData.password}</span>
        </div>
        <div className="flex justify-evenly *:w-1/2">
          <span className="font-semibold text-gray-700">Status:</span>
          <span className="text-gray-600">{userData.status}</span>
        </div>
        <div className="flex justify-evenly *:w-1/2">
          <span className="font-semibold text-gray-700">Role:</span>
          <span className="text-gray-600">{userData.role}</span>
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        Created: <span>{userData.createdAt}</span>
        <br />
        Updated: <span>{userData.updatedAt}</span>
      </div>
    </div>
  );
}
