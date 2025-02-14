import React from "react";
import DateField from "../cashbook/DateField";

export default async function IncomeReport({ searchParams }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URI}/api/reports/income?date=${searchParams.date}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.text();
  return (
    <div className="px-5">
      <DateField title="Income Report" />
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
}
