import FilterableTable from "../components/DueTable";

export default async function DuePage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URI}/api/reports/due/list`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();


  return (
    <div className="min-h-screen bg-gray-100">
      <FilterableTable data={data.data} analytics={data.analytics} />
    </div>
  );
}
