import React from "react";
import {
  FiEdit3,
  FiUserPlus,
  FiCheckCircle,
  FiUpload,
  FiMoreHorizontal,
} from "react-icons/fi";

export const RecentTransactions = () => {
  return (
    <div className="col-span-12 p-4 rounded border border-stone-300 bg-white shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium text-stone-800">
          <FiCheckCircle />
          Hoạt động gần đây
        </h3>
        <button className="text-sm text-violet-500 hover:underline">
          Xem tất cả
        </button>
      </div>

      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          <TableRow
            action="Thêm đề cử"
            icon={<FiEdit3 />}
            user="Nguyễn Văn A"
            time="2 phút trước"
          />
          <TableRow
            action="Phê duyệt nội dung"
            icon={<FiCheckCircle />}
            user="Trần Thị B"
            time="10 phút trước"
          />
          <TableRow
            action="Tạo tài khoản"
            icon={<FiUserPlus />}
            user="Admin"
            time="1 giờ trước"
          />
          <TableRow
            action="Tải lên tài liệu"
            icon={<FiUpload />}
            user="Nguyễn Văn C"
            time="2 giờ trước"
          />
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Hành động</th>
        <th className="text-start p-1.5">Người thực hiện</th>
        <th className="text-start p-1.5">Thời gian</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({ action, icon, user, time }) => {
  return (
    <tr className="text-sm even:bg-stone-50">
      <td className="p-1.5 flex items-center gap-2 text-stone-800">
        <span className="text-violet-600">{icon}</span>
        {action}
      </td>
      <td className="p-1.5 text-stone-700">{user}</td>
      <td className="p-1.5 text-stone-500">{time}</td>
      <td className="w-8">
        <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
          <FiMoreHorizontal />
        </button>
      </td>
    </tr>
  );
};
