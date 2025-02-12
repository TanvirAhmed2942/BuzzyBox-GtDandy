import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Filter from "./Filter";

const data = [
  { name: "Jan", pv: 2400, amt: 2400 },
  { name: "Feb", pv: 1398, amt: 2210 },
  { name: "Mar", pv: 9800, amt: 2290 },
  { name: "Apr", pv: 3908, amt: 2000 },
  { name: "May", pv: 4800, amt: 2181 },
  { name: "Jun", pv: 3800, amt: 2500 },
  { name: "Jul", pv: 4300, amt: 2100 },
  { name: "Aug", pv: 3200, amt: 2600 },
  { name: "Sep", pv: 4500, amt: 2700 },
  { name: "Oct", pv: 5000, amt: 2800 },
  { name: "Nov", pv: 5200, amt: 3000 },
  { name: "Dec", pv: 6000, amt: 3200 },
];

export default function UserStatistics() {
  return (
    <div className="w-1/2 h-[300px] bg-white p-4 rounded-md mt-4 relative shadow-[0px_10px_100px_3px_rgba(0,_0,_0,_0.1)]">
      <h2 className="text-lg font-medium mb-4 ml-4">Total users statistics</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          width={10}
          height={80}
        >
          <CartesianGrid
            strokeDasharray="none"
            strokeWidth={0.2}
            vertical={false}
          />
          <XAxis dataKey="name" />
          <YAxis hide={false} />
          <Tooltip />
          {/* <Legend /> */}
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
          <Bar dataKey="pv" fill="#ffc301" barSize={25} />
        </BarChart>
      </ResponsiveContainer>
      <Filter className="absolute" />
    </div>
  );
}
