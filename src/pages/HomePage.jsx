import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


function CategorySection({ title, ranking, topItems }) {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-red-600">{title}</h2>
      <div className="grid grid-cols-12 gap-8">
        {/* Ranking list */}
        <div className="col-span-12 md:col-span-3">
          <h3 className="text-lg font-semibold mb-4">BẢNG XẾP HẠNG</h3>
          <ul className="space-y-2">
            {ranking.map((item, idx) => {
              const rankColors = [
                "bg-red-600 text-white",
                "bg-gray-400 text-white",
                "bg-yellow-500 text-white",
              ];
              return (
                <li
                  key={item.id}
                  className="flex justify-between items-center p-2 rounded hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold ${
                        rankColors[idx] || "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {idx + 1}
                      <Link to={`/detail/${item.id}`} className="font-medium hover:text-red-600">
    #{idx + 1} {item.title}
  </Link>
                    </span>
                    <span className="font-medium text-sm">{item.title}</span>
                  </div>
                  <span className="text-xs text-gray-600">
                    {item.votes.toLocaleString()} VOTE
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Top Items */}
        <div className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topItems.map((mv) => (
            <div
              key={mv.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={mv.img}
                alt={mv.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex flex-col">
                <h4 className="font-semibold text-lg">{mv.title}</h4>
                <p className="text-sm text-gray-600 mt-1 flex-1">{mv.desc}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-medium">
                    {mv.votes.toLocaleString()} VOTE
                  </span>
                  <button className="px-3 py-1 border rounded-full text-sm flex items-center gap-1 hover:bg-red-500 hover:text-white transition">
                    ❤️ BÌNH CHỌN
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  // Giả lập nhiều hạng mục
  const categories = [
    {
      title: "MV của năm",
      ranking: [
        { id: 1, title: "Binz", votes: 1573862 },
        { id: 2, title: "Trúc Nhân", votes: 520110 },
        { id: 3, title: "Sơn Tùng M-TP", votes: 233581 },
        { id: 4, title: "Sơn Tùng M-TP1", votes: 233581 }
      ],
      topItems: [
        {
          id: 1,
          title: "Binz - MV A",
          desc: "MV cực hot từ Binz.",
          img: "https://i.ytimg.com/vi/Ob2NQwoHKTI/maxresdefault.jpg",
          votes: 1573862,
        },
        {
          id: 2,
          title: "Trúc Nhân - MV B",
          desc: "Sáng tạo và độc đáo.",
          img: "https://via.placeholder.com/400x400?text=Truc+Nhan",
          votes: 520110,
        },
        {
          id: 3,
          title: "Sơn Tùng M-TP - MV C",
          desc: "Comeback ấn tượng.",
          img: "https://via.placeholder.com/400x400?text=Son+Tung",
          votes: 233581,
        },
        {
          id: 4,
          title: "Sơn Tùng M-TP - MV C",
          desc: "Comeback ấn tượng.",
          img: "https://via.placeholder.com/400x400?text=Son+Tung",
          votes: 2335821,
        }
      ],
    },
    {
      title: "Ca sĩ của năm",
      ranking: [
        { id: 1, title: "Sơn Tùng M-TP", votes: 900000 },
        { id: 2, title: "Amee", votes: 650000 },
        { id: 3, title: "Trúc Nhân", votes: 450000 },
      ],
      topItems: [
        {
          id: 1,
          title: "Sơn Tùng M-TP",
          desc: "Ngôi sao lớn của Vpop.",
          img: "https://via.placeholder.com/400x400?text=Son+Tung",
          votes: 900000,
        },
        {
          id: 2,
          title: "Amee",
          desc: "Nữ ca sĩ trẻ đầy triển vọng.",
          img: "https://via.placeholder.com/400x400?text=Amee",
          votes: 650000,
        },
        {
          id: 3,
          title: "Trúc Nhân",
          desc: "Giọng ca nội lực.",
          img: "https://via.placeholder.com/400x400?text=Truc+Nhan",
          votes: 450000,
        },
      ],
    },
    {
      title: "Album của năm",
      ranking: [
        { id: 1, title: "Album Binz", votes: 300000 },
        { id: 2, title: "Album Sơn Tùng", votes: 280000 },
        { id: 3, title: "Album Amee", votes: 200000 },
      ],
      topItems: [
        {
          id: 1,
          title: "Binz - Album X",
          desc: "Phong cách rap hiện đại.",
          img: "https://via.placeholder.com/400x400?text=Album+Binz",
          votes: 300000,
        },
        {
          id: 2,
          title: "Sơn Tùng - Album Y",
          desc: "Hit nối tiếp hit.",
          img: "https://via.placeholder.com/400x400?text=Album+Son+Tung",
          votes: 280000,
        },
        {
          id: 3,
          title: "Amee - Album Z",
          desc: "Ngọt ngào và trẻ trung.",
          img: "https://via.placeholder.com/400x400?text=Album+Amee",
          votes: 200000,
        },
      ],
    },
    {
      title: "Bài hát của năm",
      ranking: [
        { id: 1, title: "Hit A", votes: 500000 },
        { id: 2, title: "Hit B", votes: 400000 },
        { id: 3, title: "Hit C", votes: 300000 },
      ],
      topItems: [
        {
          id: 1,
          title: "Hit A",
          desc: "Gây bão trên mạng xã hội.",
          img: "https://via.placeholder.com/400x400?text=Hit+A",
          votes: 500000,
        },
        {
          id: 2,
          title: "Hit B",
          desc: "Được giới trẻ yêu thích.",
          img: "https://via.placeholder.com/400x400?text=Hit+B",
          votes: 400000,
        },
        {
          id: 3,
          title: "Hit C",
          desc: "Nhạc chill êm tai.",
          img: "https://via.placeholder.com/400x400?text=Hit+C",
          votes: 300000,
        },
      ],
    },
    {
      title: "Nhóm nhạc của năm",
      ranking: [
        { id: 1, title: "Da LAB", votes: 350000 },
        { id: 2, title: "365", votes: 250000 },
        { id: 3, title: "Uni5", votes: 180000 },
      ],
      topItems: [
        {
          id: 1,
          title: "Da LAB",
          desc: "Nhóm nhạc rap/hiphop nổi tiếng.",
          img: "https://via.placeholder.com/400x400?text=Da+LAB",
          votes: 350000,
        },
        {
          id: 2,
          title: "365",
          desc: "Huyền thoại Vpop một thời.",
          img: "https://via.placeholder.com/400x400?text=365",
          votes: 250000,
        },
        {
          id: 3,
          title: "Uni5",
          desc: "Thế hệ trẻ năng động.",
          img: "https://via.placeholder.com/400x400?text=Uni5",
          votes: 180000,
        },
      ],
    },
  ];

  // Lazy load section
  const [visibleCount, setVisibleCount] = useState(1); // ban đầu chỉ hiện 1 hạng mục
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 1, categories.length));
          }, 300); // delay nhẹ để load tự nhiên hơn
        }
      },
      { threshold: 0.3 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      {categories.slice(0, visibleCount).map((cat, idx) => (
        <CategorySection
          key={idx}
          title={cat.title}
          ranking={cat.ranking}
          topItems={cat.topItems}
        />
      ))}

      {visibleCount < categories.length && (
        <div ref={loadMoreRef} className="text-center py-6 text-gray-500">
          Đang tải thêm hạng mục...
        </div>
      )}
    </div>
  );
}
