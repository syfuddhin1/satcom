import Link from "next/link";

export default async function AreaPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URI}/api/areas/zone`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();

  return (
    <div className="p-5 flex flex-col gap-5 justify-center items-center">
      <div className="flex justify-between w-full px-10  border-b p-5">
        <h1 className="text-2xl uppercase">Zone List</h1>
        <Link
          href={"/areas/zone/add"}
          className="border text-sm shadow-md rounded px-10 p-3 bg-indigo-400 text-white flex justify-center items-center"
        >
          Add New
        </Link>
      </div>
      <div className="w-full  ">
        {data.zoneList.length === 0 ? (
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
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center capitalize">
              {data.zoneList.map((zone, i) => (
                <tr key={zone.code} className="border h-10">
                  <td>{i + 1}</td>
                  <td>{zone.code}</td>
                  <td>{zone.name}</td>
                  <td>{zone.description || "-"}</td>
                  <td>
                    <Link
                      href={`/areas/zone/edit?id=${zone._id}`}
                      className="border text-sm border-slate-300 px-5"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/areas/zone/edit?id=${zone._id}`}
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
