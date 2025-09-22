import { useParams } from "react-router-dom";

// Giả lập dữ liệu
const fakeData = {
  1: {
    id: 1,
    title: "Duyên Kiếp Cầm Ca - Binz",
    desc: "MV nằm trong EP Keep Cầm Ca mang tính kết hợp giữa EDM và bolero...",
    img: "https://i.ytimg.com/vi/Ob2NQwoHKTI/maxresdefault.jpg",
    votes: 1573862,
  },
  2: {
    id: 2,
    title: "Không Ra Gì - Trúc Nhân",
    desc: "Trúc Nhân luôn mang đến điều khó lường...",
    img: "https://via.placeholder.com/600x600?text=Truc+Nhan",
    votes: 520110,
  },
};

const DetailPage = () => {
  const { id } = useParams();
  const data = fakeData[id];

  if (!data) return <p className="text-center text-red-600 py-10">Không tìm thấy hạng mục</p>;

  return (
    <div className="bg-[#2e1e23] text-white min-h-screen">
      {/* HERO SECTION */}
      <section className="flex flex-col lg:flex-row min-h-screen items-center justify-center px-6 py-10 gap-10 max-w-7xl mx-auto">
        {/* Ảnh bên trái */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={data.img}
            alt={data.title}
            className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
          />
        </div>

        {/* Nội dung bên phải */}
        <div className="w-full lg:w-1/2">
          <h4 className="uppercase text-sm tracking-widest text-violet-300 mb-2">
            MV CỦA NĂM
          </h4>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            {data.title}
          </h1>

          <div className="flex items-center gap-6 text-sm mb-6">
            <button className="flex items-center gap-1 hover:underline">
              📤 Chia sẻ
            </button>
            <button
              className="flex items-center gap-1 hover:underline"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
            >
              🔗 Copy link
            </button>
          </div>

          <p className="text-lg text-stone-200 mb-6 leading-relaxed">{data.desc}</p>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-3xl font-bold text-rose-400">
              {data.votes.toLocaleString()}
            </span>
            <span className="text-sm uppercase tracking-wider text-stone-300">
              Lượt bình chọn
            </span>
            <button className="ml-6 px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-rose-500 hover:text-white transition">
              ❤️ Bình chọn
            </button>
          </div>
        </div>
      </section>

      {/* ARTICLE SECTION */}
      <section className="bg-[#f8f6f2] text-black px-6 md:px-10 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
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
      </section>
    </div>
  );
};

export default DetailPage;
