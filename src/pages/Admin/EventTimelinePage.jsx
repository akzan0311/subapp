import React, { useState, useMemo } from "react";
import {
  FiCalendar,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
} from "react-icons/fi";

const seed = [
  {
    id: 1,
    title: "Mở đề cử",
    startDate: "2025-10-01",
    endDate: "2025-10-05",
    description: "Bắt đầu nhận đề cử từ cộng đồng.",
  },
  {
    id: 2,
    title: "Đóng đề cử",
    startDate: "2025-10-15",
    endDate: "2025-10-15",
    description: "Kết thúc giai đoạn đề cử.",
  },
  {
    id: 3,
    title: "Bình chọn mở",
    startDate: "2025-11-01",
    endDate: "2025-11-30",
    description: "Người dùng có thể bắt đầu bình chọn.",
  },
];

export default function EventTimelinePage() {
  const [events, setEvents] = useState(seed);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    id: null,
    title: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [showForm, setShowForm] = useState(false);
  const isEdit = form.id !== null;

  const resetForm = () =>
    setForm({ id: null, title: "", startDate: "", endDate: "", description: "" });

  const filtered = useMemo(() => {
    if (!query.trim()) return events;
    const q = query.toLowerCase();
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
    );
  }, [events, query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.startDate || !form.endDate || !form.description) return;

    if (isEdit) {
      setEvents((prev) =>
        prev.map((e) => (e.id === form.id ? { ...form } : e))
      );
    } else {
      setEvents((prev) => [
        {
          id: Math.max(0, ...prev.map((p) => p.id)) + 1,
          ...form,
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
    setEvents((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-stone-900 flex items-center gap-2">
          <span className="inline-grid place-items-center size-8 rounded-xl bg-violet-100 text-violet-700">
            <FiCalendar />
          </span>
          Quản Lý Thời Gian Sự Kiện
        </h2>

        <div className="flex items-center gap-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm sự kiện..."
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
            <FiPlus /> Thêm sự kiện
          </button>
        </div>
      </div>

      {/* Timeline grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((event) => (
          <article
            key={event.id}
            className="group rounded-2xl border border-stone-200 bg-white p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="text-sm text-stone-500">
              {event.startDate} → {event.endDate}
            </div>
            <h3 className="mt-1 text-base font-semibold text-stone-900 line-clamp-1">
              {event.title}
            </h3>
            <p className="mt-1 text-sm text-stone-600 line-clamp-3">
              {event.description}
            </p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => handleEdit(event)}
                className="inline-flex items-center gap-1 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 transition"
              >
                <FiEdit2 /> Chỉnh sửa
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100 transition"
              >
                <FiTrash2 /> Xoá
              </button>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
            Không tìm thấy sự kiện nào phù hợp.
          </div>
        )}
      </div>

      {/* Drawer */}
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
                {isEdit ? "Cập nhật sự kiện" : "Thêm sự kiện mới"}
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
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Tiêu đề
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm focus:ring-4 focus:ring-violet-100 focus:border-violet-400 outline-none transition"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Ngày bắt đầu
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm focus:ring-4 focus:ring-violet-100 focus:border-violet-400 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Ngày kết thúc
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm focus:ring-4 focus:ring-violet-100 focus:border-violet-400 outline-none transition"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Mô tả sự kiện
                </label>
                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm focus:ring-4 focus:ring-violet-100 focus:border-violet-400 outline-none transition"
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
                  {isEdit ? "Lưu thay đổi" : "Thêm sự kiện"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
