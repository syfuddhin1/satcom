import React from "react";
import Form from "./_components/Form";

export default function AreaPage() {
  return (
    <div className="p-5 flex flex-col gap-5 justify-center items-center">
      <h1>Zone</h1>

      <Form />
      <div className="w-full h-[60vh] border border-slate-300">
        <h1>Table</h1>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
