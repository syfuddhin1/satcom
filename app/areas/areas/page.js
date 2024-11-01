import Link from "next/link";

export default async function AreaPage() {
  const response = await fetch("http://localhost:3000/api/areas/areas", {
    cache: "no-store",
  });
  const data = await response.json();

  return (
    <div className="p-5 flex flex-col gap-5 justify-center items-center">
      <div className="flex justify-between w-full px-10  border-b p-5">
        <h1 className="text-2xl uppercase">Area List</h1>
        <Link
          href={"/areas/areas/add"}
          className="border text-sm shadow-md rounded px-10 p-3 bg-indigo-400 text-white flex justify-center items-center"
        >
          Add New
        </Link>
      </div>
      <div className="w-full  ">
        {data?.zoneList?.length === 0 ? (
          <p className="text-center uppercase text-7xl text-rose-400 p-10">
            No zone found!
          </p>
        ) : (
          <table className="w-full">
            <thead className="h-10">
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Name</th>
                <th>Zone</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center capitalize">
              {data?.areaList?.map((area, i) => (
                <tr key={area.code} className="border h-10">
                  <td>{i + 1}</td>
                  <td>{area.code}</td>
                  <td>{area.name}</td>
                  <td>{area.zone.name}</td>
                  <td>{area.description || "-"}</td>
                  <td>
                    <Link
                      href={`/areas/area/edit?id=${area._id}`}
                      className="border text-sm border-slate-300 px-5"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/areas/area/edit?id=${area._id}`}
                      className="border text-sm border-slate-300 px-5"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
