import React from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, CartesianGrid,
  YAxis, Legend,
} from 'recharts';

export default function DemoBarChart() {
  const sdata = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
  ];
  return (
    <ResponsiveContainer width={300} height={200}>
      <BarChart
        data={sdata}
        margin={{
          top: 10, right: 0, left: -25, bottom: 0,
        }}
        style={{
          width: 300,
          height: 300,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" stackId="a" fill="#4299E1" />
        <Bar dataKey="uv" stackId="a" fill="#F04F47" />
      </BarChart>
    </ResponsiveContainer>
  );
}
