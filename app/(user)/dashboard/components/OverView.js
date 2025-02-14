"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Overview({ data }) {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Total",
        data: data.map((item) => item.total),
        backgroundColor: "#4F46E5",
        borderRadius: 8, // Adds rounded corners
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { font: { size: 12 }, color: "#888888" },
        grid: { display: false },
      },
      y: {
        ticks: {
          font: { size: 12 },
          color: "#888888",
          callback: (value) => `$${value}`, // Format as currency
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "350px" }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
