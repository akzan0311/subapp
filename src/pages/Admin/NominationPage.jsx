import React, { useMemo, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiUserCheck,
} from "react-icons/fi";

// Dữ liệu mẫu
const seed = [
  { id: 1, name: "Ca sĩ A", category: "Ca sĩ Nam Xuất Sắc" },
  { id: 2, name: "Ca sĩ B", category: "Ca sĩ Nữ Xuất Sắc" },
  { id: 3, name: "Nhóm C", category: "Nhóm nhạc Triển Vọng" },
];

export default function NominationManagementPage() {
  const [nominations, setNominations] = useState(seed);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({ id: null, name: "", category: "" });
  const [showForm, setShowForm] = useState(false);
  const isEdit = form.id !== null;

  const filtered = useMemo(() => {
    if (!query.trim()) return nominations;
    const q = query.toLowerCase();
    return nominations.filter(
      (n) =>
        n.name.toLowerCase().includes(q) || n.category.toLowerCase().includes(q)
    );
  }, [query, nominations]);

  const resetForm = () => setForm({ id: null, name: "", category: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.category.trim()) return;

    if (isEdit) {
      setNominations((prev) =>
        prev.map((n) => (n.id === form.id ? { ...form } : n))
      );
    } else {
      setNominations((prev) => [
        {
          id: Math.max(0, ...prev.map((p) => p.id)) + 1,
          name: form.name,
          category: form.category,
        },
        ...prev,
      ]);
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm(item);
    setShowForm(true);
  };

  const handleDelete = (id) =>
    setNominations((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900 flex items-center gap-2">
          <span className="inline-grid place-items-center size-8 rounded-xl bg-violet-100 text-violet-700">
            <FiUserCheck />
          </span>
          Quản Lý Đề Cử
        </h2>

        <div className="flex items-center gap-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm đề cử..."
              className="w-64 pl-9 pr-3 py-2 rounded-xl border border-stone-300 bg-white text-sm outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 transition"
            />
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200 active:scale-[.99] transition"
          >
            <FiPlus /> Thêm đề cử
          </button>
        </div>
      </div>

      {/* Grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="group rounded-2xl border border-stone-200 bg-white p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-base font-semibold text-stone-900 line-clamp-1">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-stone-600 line-clamp-2">
              {item.category}
            </p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="inline-flex items-center gap-1 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 transition"
              >
                <FiEdit2 /> Chỉnh sửa
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100 transition"
              >
                <FiTrash2 /> Xoá
              </button>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
            Không tìm thấy đề cử nào phù hợp.
          </div>
        )}
      </div>

      {/* Drawer form */}
      {showForm && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-[1px]"
            onClick={() => {
              resetForm();
              setShowForm(false);
            }}
          />

          <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl z-50 flex flex-col">
            <header className="px-5 py-4 border-b border-stone-200 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-stone-900">
                {isEdit ? "Cập nhật đề cử" : "Thêm đề cử mới"}
              </h4>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="rounded-lg px-2 py-1 text-stone-500 hover:bg-stone-100"
              >
                ✕
              </button>
            </header>

            <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  Tên đề cử
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nhập tên nghệ sĩ / nhóm..."
                  className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 transition"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  Hạng mục
                </label>
                <input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Nhập tên hạng mục đề cử..."
                  className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 transition"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm text-white font-semibold shadow-sm hover:bg-violet-700 transition"
                >
                  {isEdit ? "Lưu thay đổi" : "Thêm đề cử"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
