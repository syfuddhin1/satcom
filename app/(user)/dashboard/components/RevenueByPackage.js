"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#8E5EA2",
];

export default function RevenueByPackage({ data }) {
  const { labels, values } = transformPackageData(data);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: COLORS,
        hoverBackgroundColor: COLORS.map((color) => color + "CC"), // Slight transparency on hover
      },
    ],
  };

  return (
    <Pie
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          tooltip: { callbacks: { label: (context) => `${context.raw} USD` } }, // Format tooltips
        },
      }}
    />
  );
}

const transformPackageData = (packages) => {
  const filteredPackages = packages.filter((pkg) => pkg.transactionCount > 0);
  return {
    labels: filteredPackages.map((pkg) => pkg.name),
    values: filteredPackages.map((pkg) => pkg.totalAmount),
  };
};
