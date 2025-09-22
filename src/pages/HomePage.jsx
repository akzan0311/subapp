import { useState, useEffect, useRef } from "react";
import CategorySection from "./CategorySection.jsx";
import { categories } from "../data/categories"; // 👈 import từ file mới

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
    <div className="min-h-screen bg-white px-6 py-10">
      {categories.slice(0, visibleCount).map((cat) => (
        <CategorySection
          key={cat.title}
          title={cat.title}
          ranking={cat.ranking}
          topItems={cat.topItems}
        />
      ))}

      {visibleCount < categories.length && (
        <div ref={loadMoreRef} className="text-center py-6 text-gray-500">
                  <span className="loading loading-bars loading-lg text-primary"></span>

        </div>
      )}
    </div>
  );
}
