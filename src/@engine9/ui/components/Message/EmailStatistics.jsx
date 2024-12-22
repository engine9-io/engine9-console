import React from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, CartesianGrid,
  YAxis, Legend,
} from 'recharts';

import data from '@engine9/data/messageTest.json';

export default function DemoBarChart() {
  return (
    <ResponsiveContainer width={700} height={500}>
      <BarChart
        data={data.types}
        margin={{
          top: 10, right: 0, left: -25, bottom: 0,
        }}
        style={{
          width: 700,
          height: 500,
        }}
      >
        <XAxis dataKey="entry_type" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="records" fill="#829901" />
        <Bar dataKey="distinct_people" fill="#4299E1" />
      </BarChart>
    </ResponsiveContainer>
  );
}
