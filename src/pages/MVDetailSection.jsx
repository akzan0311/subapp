// src/pages/MVDetailSection.jsx
import React from "react";

const MVDetailSection = () => {
  return (
    <div className="w-full">
      {/* Hero section */}
      <div className="flex flex-col md:flex-row w-full min-h-[500px]">
        {/* Left - Image */}
        <div className="md:w-1/2 w-full">
          <img
            src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" // ảnh demo, thay bằng ảnh MV
            alt="MV"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right - Content */}
        <div className="md:w-1/2 w-full bg-[#341b22] text-white flex flex-col justify-center px-8 py-10">
          <p className="text-sm leading-relaxed mb-6">
            MV <strong>Duyên Kiếp Cầm Ca</strong> nằm trong EP Keep Cầm Ca mang
            tính kết hợp giữa EDM và bolero của Binz, thể hiện sự tương phản
            trong hình ảnh của một người nghệ sĩ khi đứng trước công chúng và
            khi đứng trước sự đơn độc của chính mình.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-2xl font-semibold">1,573,862</span>
            <span className="uppercase text-sm">Lượt bình chọn</span>
            <button className="ml-auto px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
              ❤️ Bình chọn
            </button>
          </div>
        </div>
      </div>

      {/* Article section */}
      <div className="bg-[#f8f6f2] px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          MV Duyên Kiếp Cầm Ca: khi Binz lột tả mặt tối của đời nghệ sĩ
        </h2>
        <p className="text-lg italic text-gray-700 mb-4">
          Binz cho thấy “đời ca sĩ đáng thương và đáng được yêu” khi hóa thân
          thành ăn mày trong MV Duyên Kiếp Cầm Ca.
        </p>
        <p className="text-base text-gray-800 leading-relaxed">
          Đây là một trong những sản phẩm âm nhạc đặc biệt, với sự kết hợp độc
          đáo giữa EDM và bolero. Thông qua MV, Binz thể hiện sự mâu thuẫn trong
          cuộc sống của người nghệ sĩ – vừa hào nhoáng trên sân khấu, vừa đối
          diện với những nỗi cô đơn khi ánh đèn tắt. Hình ảnh MV mang tính biểu
          tượng và giàu tính nghệ thuật, khắc họa sâu sắc cảm xúc của nghệ sĩ.
        </p>
      </div>
      
    </div>
  );
};

export default MVDetailSection;
