import React from "react";
import { FiCalendar, FiFileText, FiUserPlus, FiCheckCircle, FiThumbsUp } from "react-icons/fi";

export const StatCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 col-span-12">
      <Card
        icon={<FiCalendar />}
        title="Sự kiện đang diễn ra"
        value="3"
        description="Trong tháng này"
        trend="up"
      />
      <Card
        icon={<FiFileText />}
        title="Tổng đề cử"
        value="52"
        description="Tháng hiện tại"
        trend="up"
      />
      <Card
        icon={<FiThumbsUp />}
        title="Lượt bình chọn"
        value="12,388"
        description="Hôm nay"
        trend="down"
      />
      <Card
        icon={<FiCheckCircle />}
        title="Nội dung chờ duyệt"
        value="4"
        description="Tính đến hiện tại"
        trend="neutral"
      />
      <Card
        icon={<FiUserPlus />}
        title="Người dùng mới"
        value="28"
        description="Tuần này"
        trend="up"
      />
    </div>
  );
};

const Card = ({ icon, title, value, description, trend }) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-stone-500";
    }
  };

  return (
    <div className="p-4 rounded border border-stone-300 bg-white flex items-start justify-between gap-4 shadow-sm">
      <div>
        <div className="text-stone-500 text-sm mb-1 flex items-center gap-1">
          {icon} {title}
        </div>
        <div className="text-2xl font-bold text-stone-900">{value}</div>
        <div className={`text-xs mt-1 ${getTrendColor()}`}>{description}</div>
      </div>
    </div>
  );
};
