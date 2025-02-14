import React from "react";
import DateField from "./DateField";

export default async function CashbookReport({ searchParams }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URI}/api/reports/cashbook?date=${searchParams.date}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.text();
  return (
    <div className="px-5">
      <DateField title="Cashbook Report" />
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
}
