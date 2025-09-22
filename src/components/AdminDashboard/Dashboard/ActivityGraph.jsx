import React from "react";
import { FiActivity } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
  Legend,
} from "recharts";

// 📊 Dữ liệu hoạt động theo tháng
const data = [
  { month: "Jan", Nomination: 30, Voting: 120, NewUsers: 10 },
  { month: "Feb", Nomination: 50, Voting: 200, NewUsers: 25 },
  { month: "Mar", Nomination: 45, Voting: 180, NewUsers: 22 },
  { month: "Apr", Nomination: 60, Voting: 240, NewUsers: 35 },
  { month: "May", Nomination: 90, Voting: 310, NewUsers: 40 },
  { month: "Jun", Nomination: 80, Voting: 290, NewUsers: 30 },
  { month: "Jul", Nomination: 100, Voting: 360, NewUsers: 50 },
];

export const ActivityGraph = () => {
  return (
    <div className="col-span-12 lg:col-span-8 overflow-hidden rounded border border-stone-300 bg-white shadow-sm">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium text-stone-800">
          <FiActivity /> Hoạt động hệ thống
        </h3>
      </div>

      <div className="h-64 px-4 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip
              contentStyle={{ fontSize: "0.875rem", borderRadius: "0.375rem" }}
              labelStyle={{ color: "#71717a", fontSize: "0.75rem" }}
            />
            <Legend verticalAlign="top" height={36} />

            <Line
              type="monotone"
              dataKey="Nomination"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Đề cử"
            />
            <Line
              type="monotone"
              dataKey="Voting"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Bình chọn"
            />
            <Line
              type="monotone"
              dataKey="NewUsers"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Người dùng mới"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
