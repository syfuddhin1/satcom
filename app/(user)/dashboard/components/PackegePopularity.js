"use client";

import { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function PackagePopularity({ data: popularPackages }) {

  const data = transformPackages(popularPackages);

  const [opacity, setOpacity] = useState(
    data.reduce((acc, pkg) => ({
      ...acc,
      [pkg.name]: 1,
    }), {})
  );

  const handleMouseEnter = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 1 }));
  };


  return (
    <div style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          <Line type="monotone" dataKey="total" strokeOpacity={opacity.pv} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


const transformPackages = (popularPackages) => {
  return popularPackages
    .filter((pkg) => pkg._count.userPackages > 0) // Filter out packages with 0 userPackages
    .map((pkg) => ({
      name: pkg.name,
      total: pkg._count.userPackages,
    }));
};