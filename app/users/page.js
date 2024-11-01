import ActionButton from "@/components/users/ActionButton";
import React from "react";
import FilterForm from "./components/FIlterForm";

export default function UserPage() {
  const users = [
    {
      name: "John Doe",
      code: "U123456",
      email: "johndoe@example.com",
      mobile: "01987654321",
      nid: "12345678901234",
      address: "123, ABC Street, XYZ City, ABC",
      mapLocation: "https://www.google.com/maps/@23.777176,90.399524,15z",
      packageInfo: "Package A",
      status: "Active",
    },
    {
      name: "Jane Doe",
      code: "U789012",
      email: "janedoe@example.com",
      mobile: "01987654322",
      nid: "98765432109876",
      address: "456, DEF Street, GHI City, DEF",
      mapLocation: "https://www.google.com/maps/@23.785176,90.422524,15z",
      packageInfo: "Package B",
      status: "Inactive",
    },
    {
      name: "John Doe",
      code: "U123456",
      email: "johndoe@example.com",
      mobile: "01987654321",
      nid: "12345678901234",
      address: "123, ABC Street, XYZ City, ABC",
      mapLocation: "https://www.google.com/maps/@23.777176,90.399524,15z",
      packageInfo: "Package A",
      status: "Active",
    },
    {
      name: "Jane Doe",
      code: "U789012",
      email: "janedoe@example.com",
      mobile: "01987654322",
      nid: "98765432109876",
      address: "456, DEF Street, GHI City, DEF",
      mapLocation: "https://www.google.com/maps/@23.785176,90.422524,15z",
      packageInfo: "Package B",
      status: "Inactive",
    },
    {
      name: "John Doe",
      code: "U123456",
      email: "johndoe@example.com",
      mobile: "01987654321",
      nid: "12345678901234",
      address: "123, ABC Street, XYZ City, ABC",
      mapLocation: "https://www.google.com/maps/@23.777176,90.399524,15z",
      packageInfo: "Package A",
      status: "Active",
    },
    {
      name: "Jane Doe",
      code: "U789012",
      email: "janedoe@example.com",
      mobile: "01987654322",
      nid: "98765432109876",
      address: "456, DEF Street, GHI City, DEF",
      mapLocation: "https://www.google.com/maps/@23.785176,90.422524,15z",
      packageInfo: "Package B",
      status: "Inactive",
    },
    {
      name: "John Doe",
      code: "U123456",
      email: "johndoe@example.com",
      mobile: "01987654321",
      nid: "12345678901234",
      address: "123, ABC Street, XYZ City, ABC",
      mapLocation: "https://www.google.com/maps/@23.777176,90.399524,15z",
      packageInfo: "Package A",
      status: "Active",
    },
    {
      name: "Jane Doe",
      code: "U789012",
      email: "janedoe@example.com",
      mobile: "01987654322",
      nid: "98765432109876",
      address: "456, DEF Street, GHI City, DEF",
      mapLocation: "https://www.google.com/maps/@23.785176,90.422524,15z",
      packageInfo: "Package B",
      status: "Inactive",
    },
    {
      name: "John Doe",
      code: "U123456",
      email: "johndoe@example.com",
      mobile: "01987654321",
      nid: "12345678901234",
      address: "123, ABC Street, XYZ City, ABC",
      mapLocation: "https://www.google.com/maps/@23.777176,90.399524,15z",
      packageInfo: "Package A",
      status: "Active",
    },
    {
      name: "Jane Doe",
      code: "U789012",
      email: "janedoe@example.com",
      mobile: "01987654322",
      nid: "98765432109876",
      address: "456, DEF Street, GHI City, DEF",
      mapLocation: "https://www.google.com/maps/@23.785176,90.422524,15z",
      packageInfo: "Package B",
      status: "Inactive",
    },
    {
      name: "John Doe",
      code: "U123456",
      email: "johndoe@example.com",
      mobile: "01987654321",
      nid: "12345678901234",
      address: "123, ABC Street, XYZ City, ABC",
      mapLocation: "https://www.google.com/maps/@23.777176,90.399524,15z",
      packageInfo: "Package A",
      status: "Active",
    },
    {
      name: "Jane Doe",
      code: "U789012",
      email: "janedoe@example.com",
      mobile: "01987654322",
      nid: "98765432109876",
      address: "456, DEF Street, GHI City, DEF",
      mapLocation: "https://www.google.com/maps/@23.785176,90.422524,15z",
      packageInfo: "Package B",
      status: "Inactive",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg grid gap-4 grid-rows-auto h-full">
      <FilterForm title={"Users"} />
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Mobile No</th>
              <th className="px-4 py-2">NID No</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Package Info</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user, i) => (
              <tr key={user.code}>
                <td className="px-4 py-2 border-t">{i + 1}</td>
                <td className="px-4 py-2 border-t">{user.name}</td>
                <td className="px-4 py-2 border-t">{user.code}</td>
                <td className="px-4 py-2 border-t">{user.mobile}</td>
                <td className="px-4 py-2 border-t">{user.nid}</td>
                <td className="px-4 py-2 border-t">{user.address}</td>
                <td className="px-4 py-2 border-t">{user.packageInfo}</td>
                <td className="px-4 py-2 border-t">{user.status}</td>
                <td className="px-4 py-2 border-t flex justify-center">
                  <ActionButton user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">pagination</div>
    </div>
  );
}
