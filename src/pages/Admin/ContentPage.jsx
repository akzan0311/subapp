import React, { useMemo, useState } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiFileText } from "react-icons/fi";

// Demo seed
const seed = [
  { id: 1, title: "Giới thiệu chương trình", body: "Chương trình bình chọn nghệ sĩ nổi bật năm 2025..." },
  { id: 2, title: "Thể lệ bình chọn", body: "Mỗi người được phép bình chọn 1 lần mỗi ngày..." },
  { id: 3, title: "Hướng dẫn tham gia", body: "Đăng ký tài khoản, xác minh email và bắt đầu bình chọn." },
];

export default function ContentManagementPage() {
  const [contents, setContents] = useState(seed);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({ id: null, title: "", body: "" });
  const isEdit = form.id !== null;
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    if (!query.trim()) return contents;
    const q = query.toLowerCase();
    return contents.filter(
      (c) => c.title.toLowerCase().includes(q) || c.body.toLowerCase().includes(q)
    );
  }, [contents, query]);

  const resetForm = () => setForm({ id: null, title: "", body: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;

    if (isEdit) {
      setContents((prev) => prev.map((c) => (c.id === form.id ? { ...form } : c)));
    } else {
      setContents((prev) => [
        { id: Math.max(0, ...prev.map((p) => p.id)) + 1, title: form.title, body: form.body },
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

  const handleDelete = (id) => setContents((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900 flex items-center gap-2">
          <span className="inline-grid place-items-center size-8 rounded-xl bg-violet-100 text-violet-700">
            <FiFileText />
          </span>
          Quản Lý Nội Dung
        </h2>

        <div className="flex items-center gap-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm nội dung..."
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
            <FiPlus /> Thêm nội dung
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
            <h3 className="text-base font-semibold text-stone-900 line-clamp-1">{item.title}</h3>
            <p className="mt-1 text-sm text-stone-600 leading-relaxed line-clamp-3">
              {item.body}
            </p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="inline-flex items-center gap-1 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 focus:outline-none focus:ring-4 focus:ring-stone-200 transition"
              >
                <FiEdit2 /> Chỉnh sửa
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-200 transition"
              >
                <FiTrash2 /> Xoá
              </button>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
            Không tìm thấy nội dung phù hợp.
          </div>
        )}
      </div>

      {/* Drawer / Modal form */}
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
                {isEdit ? "Cập nhật nội dung" : "Thêm nội dung mới"}
              </h4>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="rounded-lg px-2 py-1 text-stone-500 hover:bg-stone-100"
                aria-label="Đóng"
              >
                ✕
              </button>
            </header>

            <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  Tiêu đề
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Nhập tiêu đề..."
                  className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 transition"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  Nội dung
                </label>
                <textarea
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  rows={8}
                  placeholder="Nhập nội dung chi tiết..."
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
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 focus:outline-none focus:ring-4 focus:ring-stone-200 transition"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200 active:scale-[.99] transition"
                >
                  {isEdit ? "Lưu thay đổi" : "Thêm nội dung"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}