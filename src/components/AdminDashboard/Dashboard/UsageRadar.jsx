import React from "react";
import { FiActivity } from "react-icons/fi";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// 📊 Dữ liệu sử dụng theo vai trò
const data = [
  {
    feature: "Sự kiện",
    admin: 140,
    moderator: 90,
  },
  {
    feature: "Đề cử",
    admin: 120,
    moderator: 130,
  },
  {
    feature: "Bình chọn",
    admin: 100,
    moderator: 140,
  },
  {
    feature: "Nội dung",
    admin: 130,
    moderator: 95,
  },
  {
    feature: "Người dùng",
    admin: 110,
    moderator: 60,
  },
];

export const UsageRadar = () => {
  return (
    <div className="col-span-12 lg:col-span-4 overflow-hidden rounded border border-stone-300 bg-white shadow-sm">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium text-stone-800">
          <FiActivity />
          Mức độ sử dụng theo vai trò
        </h3>
      </div>

      <div className="h-64 px-4 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="feature" tick={{ fontSize: 12, fontWeight: 600 }} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar
              name="Admin"
              dataKey="admin"
              stroke="#7c3aed"
              fill="#7c3aed"
              fillOpacity={0.2}
            />
            <Radar
              name="Moderator"
              dataKey="moderator"
              stroke="#1f2937"
              fill="#1f2937"
              fillOpacity={0.2}
            />
            <Tooltip
              contentStyle={{ fontSize: "0.875rem", borderRadius: "0.375rem" }}
              labelStyle={{ color: "#71717a", fontSize: "0.75rem" }}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
