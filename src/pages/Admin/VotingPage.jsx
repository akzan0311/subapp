import React, { useState } from "react";
import {
  FiPlus,
  FiTrash2,
  FiEdit,
  FiBarChart2,
  FiSearch,
  FiX,
  FiSave,
} from "react-icons/fi";

const mockVotes = [
  {
    id: 1,
    category: "MV của năm",
    totalVotes: 125000,
    status: "Đang diễn ra",
  },
  {
    id: 2,
    category: "Ca sĩ của năm",
    totalVotes: 98000,
    status: "Đã kết thúc",
  },
  {
    id: 3,
    category: "Album của năm",
    totalVotes: 45500,
    status: "Sắp bắt đầu",
  },
];

export default function VotingManagementPage() {
  const [votes, setVotes] = useState(mockVotes);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editVote, setEditVote] = useState(null);

  const filteredVotes = votes.filter((v) =>
    v.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (!editVote.category || !editVote.status) return;
    if (editVote.id) {
      setVotes((prev) =>
        prev.map((v) => (v.id === editVote.id ? editVote : v))
      );
    } else {
      const newVote = {
        ...editVote,
        id: Date.now(),
        totalVotes: 0,
      };
      setVotes((prev) => [...prev, newVote]);
    }
    setIsEditing(false);
    setEditVote(null);
  };

  const handleDelete = (id) => {
    setVotes((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="p-6 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FiBarChart2 className="text-violet-600" /> Quản Lý Bình Chọn
        </h2>
        <button
          onClick={() => {
            setIsEditing(true);
            setEditVote({ category: "", status: "" });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
        >
          <FiPlus /> Tạo phiên bình chọn
        </button>
      </div>

      <div className="mb-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm hạng mục bình chọn..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVotes.map((vote) => (
          <div
            key={vote.id}
            className="rounded-lg border border-stone-300 shadow-sm p-4 bg-white hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold mb-1">{vote.category}</h3>
            <p className="text-sm text-stone-500 mb-2">
              Tổng lượt bình chọn: {" "}
              <span className="text-stone-900 font-medium">
                {vote.totalVotes.toLocaleString()}
              </span>
            </p>
            <p className="text-xs inline-block px-2 py-1 rounded bg-stone-100 text-stone-600 mb-4">
              Trạng thái: {vote.status}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditVote(vote);
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 text-sm rounded hover:bg-stone-200 transition"
              >
                <FiEdit className="text-violet-600" />
                Sửa
              </button>
              <button
                onClick={() => handleDelete(vote.id)}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-sm rounded hover:bg-red-200 text-red-700 transition"
              >
                <FiTrash2 />
                Xoá
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="bg-white shadow-lg w-full max-w-md p-6 h-full overflow-y-auto relative">
            <button
              className="absolute right-4 top-4 text-gray-500 hover:text-black"
              onClick={() => {
                setIsEditing(false);
                setEditVote(null);
              }}
            >
              <FiX size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-6">
              {editVote?.id ? "Chỉnh sửa phiên bình chọn" : "Tạo phiên bình chọn"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên hạng mục</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  value={editVote.category}
                  onChange={(e) =>
                    setEditVote({ ...editVote, category: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Trạng thái</label>
                <select
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  value={editVote.status}
                  onChange={(e) =>
                    setEditVote({ ...editVote, status: e.target.value })
                  }
                >
                  <option value="">-- Chọn trạng thái --</option>
                  <option value="Sắp bắt đầu">Sắp bắt đầu</option>
                  <option value="Đang diễn ra">Đang diễn ra</option>
                  <option value="Đã kết thúc">Đã kết thúc</option>
                </select>
              </div>

              <button
                className="w-full mt-4 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded transition"
                onClick={handleSave}
              >
                <FiSave /> {editVote?.id ? "Cập nhật" : "Tạo mới"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}