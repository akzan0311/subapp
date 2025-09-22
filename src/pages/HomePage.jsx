import { useState, useEffect, useRef } from "react";
import CategorySection from "./CategorySection.jsx";
import { categories } from "../data/categories";

export default function HomePage() {
  const [visibleCount, setVisibleCount] = useState(1);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 1, categories.length));
          }, 300);
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
    <div className="min-h-screen bg-white px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {categories.slice(0, visibleCount).map((cat) => (
          <CategorySection
            key={cat.title}
            title={cat.title}
            ranking={cat.ranking}
            topItems={cat.topItems}
          />
        ))}

        {visibleCount < categories.length && (
          <div
            ref={loadMoreRef}
            className="flex justify-center items-center py-10"
          >
            <span className="animate-spin inline-block w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full"></span>
            <span className="ml-3 text-sm text-gray-500">Đang tải thêm...</span>
          </div>
        )}
      </div>
    </div>
  );
}
