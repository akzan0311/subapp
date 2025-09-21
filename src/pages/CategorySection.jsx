import { Link } from "react-router-dom";

const CategorySection = ({ title = "", ranking = [], topItems = [] }) => {
  const rankColors = [
    "bg-red-600 text-white",
    "bg-gray-400 text-white",
    "bg-yellow-500 text-white",
  ];

  const formatVotes = (v) => Number(v ?? 0).toLocaleString();

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-red-600">{title}</h2>

      <div className="grid grid-cols-12 gap-8">
        {/* Ranking list */}
        <div className="col-span-12 md:col-span-3">
          <h3 className="text-lg font-semibold mb-4">BẢNG XẾP HẠNG</h3>
          <ul className="space-y-2">
            {ranking.map((item, idx) => (
              <li
                key={item?.id ?? idx}
                className="flex justify-between items-center p-2 rounded hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold ${
                      rankColors[idx] || "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {idx + 1}
                  </span>

                  <Link
                    to={`/detail/${item?.id ?? ""}`}
                    className="font-medium text-sm hover:text-red-600 line-clamp-1"
                  >
                    {item?.title ?? "Không có tiêu đề"}
                  </Link>
                </div>

                <span className="text-xs text-gray-600">
                  {formatVotes(item?.votes)} VOTE
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Items */}
        <div className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topItems.map((mv, i) => (
            <div
              key={mv?.id ?? i}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={mv?.img}
                alt={mv?.title ?? "Thumbnail"}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="p-4 flex flex-col">
                <h4 className="font-semibold text-lg line-clamp-1">
                  {mv?.title ?? "Không có tiêu đề"}
                </h4>
                <p className="text-sm text-gray-600 mt-1 flex-1 line-clamp-3">
                  {mv?.desc ?? ""}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-medium">
                    {formatVotes(mv?.votes)} VOTE
                  </span>
                  <button
                    type="button"
                    className="px-3 py-1 border rounded-full text-sm flex items-center gap-1 hover:bg-red-500 hover:text-white transition"
                    aria-label="Bình chọn"
                  >
                    ❤️ BÌNH CHỌN
                  </button>
                </div>
              </div>
            </div>
          ))}

          {topItems.length === 0 && (
            <div className="col-span-3 text-sm text-gray-500">
              Chưa có mục nào.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
