import React from "react";
import { getAreaName, getZoneName } from "@/utils";

export default function MemberInfo({ userData }) {
  return (
    <div class="max-w-sm p-6 bg-white rounded-lg shadow-lg border border-gray-200 mt-10">
      <h1 className="text-lg text-center border-b font-bold mb-2">
        Member Information
      </h1>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="font-medium text-gray-700">Member Code:</span>
          <span class="text-gray-600">{userData.memberCode}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium text-gray-700">Zone:</span>
          <span class="text-gray-600">{getZoneName(userData.zone)}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium text-gray-700">Area:</span>
          <span class="text-gray-600">{getAreaName(userData.area)}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium text-gray-700">Mobile:</span>
          <span class="text-gray-600">{userData.mobile}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium text-gray-700">Email:</span>
          <span class="text-gray-600">{userData.email}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium text-gray-700">NID No:</span>
          <span class="text-gray-600">{userData.nidNo}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium text-gray-700">Address:</span>
          <span class="text-gray-600">{userData.address}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium text-gray-700">Username:</span>
          <span class="text-gray-600">{userData.username}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium text-gray-700">Status:</span>
          <span class="text-gray-600">{userData.status}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium text-gray-700">Role:</span>
          <span class="text-gray-600">{userData.role}</span>
        </div>
      </div>

      <div class="text-sm text-gray-500 mt-4">
        Created: <span>{userData.createdAt}</span>
        <br />
        Updated: <span>{userData.updatedAt}</span>
      </div>
    </div>
  );
}
