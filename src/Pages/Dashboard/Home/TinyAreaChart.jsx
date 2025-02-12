import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

function TinyAreaChart() {
  return (
    <ResponsiveContainer height={150}>
      <AreaChart
        width={20}
        height={20}
        data={data}
        // margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffbf00" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ffc301" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* <XAxis dataKey="name" />
        <YAxis /> */}
        {/* <CartesianGrid
          strokeDasharray="10 10"
          strokeWidth={0.5}
          vertical={false}
        /> */}
        {/* <Tooltip /> */}
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#ffc301"
          fillOpacity={1}
          fill="url(#colorPv)"
          strokeWidth={5}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default TinyAreaChart;
