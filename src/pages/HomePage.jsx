import { useState, useEffect, useRef } from "react";
import CategorySection from "./CategorySection.jsx";

export default function HomePage() {
  // Giả lập nhiều hạng mục
  const categories = [
    {
      title: "MV của năm",
      ranking: [
        { id: 1, title: "Binz", votes: 1573862 },
        { id: 2, title: "Trúc Nhân", votes: 520110 },
        { id: 3, title: "Sơn Tùng M-TP", votes: 233581 },
        { id: 4, title: "Sơn Tùng M-TP1", votes: 233581 },
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
        },
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
