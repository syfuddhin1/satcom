import React from "react";

export default function CableTvPackagePage() {
  return (
    <div>
      <h1>Cable Tv Package </h1>
      <form className="flex flex-col gap-2 shadow-md mx-auto w-1/2 p-4 *:flex *:gap-2 *:items-center *:justify-between">
        <label>
          <strong>Package Name:</strong>
          <input
            className="h-10 px-2 ring-1 rounded w-1/2"
            type="text"
            name="packageName"
            placeholder="CableTv Package Name"
          />
        </label>
        <label>
          <strong>Package Description:</strong>
          <textarea
            className="ring-1 rounded w-1/2"
            type="text"
            name="packageDescription"
            placeholder="CableTv Package Description"
          />
        </label>
        <label>
          <strong>Price:</strong>
          <input
            className="h-10 px-2 ring-1 rounded w-1/2"
            type="text"
            name="price"
            placeholder="CableTv Package Price"
          />
        </label>
        <label>
          <strong>Number of Channels:</strong>
          <input
            className="h-10 px-2 ring-1 rounded w-1/2"
            type="text"
            name="numberOfChannels"
            placeholder="CableTv Package Number of Channels"
          />
        </label>
        <input
          type="submit"
          value="add"
          className="bg-blue-500 text-white p-2 rounded w-36 cursor-pointer"
        />
      </form>
    </div>
  );
}
