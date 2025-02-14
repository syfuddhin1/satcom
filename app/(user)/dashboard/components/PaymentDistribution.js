"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#FF8042", "#8884d8"];

export default function PaymentDistribution({ payments }) {
  const { labels, values } = transformPayments(payments);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: COLORS,
        hoverBackgroundColor: COLORS.map(color => color + "CC"), // Slight transparency on hover
        borderWidth: 2,
      },
    ],
  };

  return (
    <Doughnut
      data={chartData}
      options={{
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
          tooltip: { callbacks: { label: (context) => `$${context.raw}` } }, // Format tooltips
        },
        cutout: "60%", // Adjust inner circle size
      }}
    />
  );
}

const transformPayments = (payments) => {
  return {
    labels: payments.map((payment) => payment.modeOfPayment),
    values: payments.map((payment) => payment._sum.amount),
  };
};
