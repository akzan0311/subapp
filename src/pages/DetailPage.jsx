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

  if (!data) return <p>Không tìm thấy hạng mục</p>;

  return (
    <div className="min-h-screen bg-[#2e1e23] text-white">
      {/* HERO SECTION */}
      <section className="flex h-screen">
        {/* Ảnh bên trái */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <img
            src={data.img}
            alt={data.title}
            className="rounded-lg shadow-lg w-full max-w-lg"
          />
        </div>

        {/* Nội dung bên phải */}
        <div className="w-1/2 flex flex-col justify-center p-10">
          <h4 className="uppercase text-sm tracking-widest mb-2">MV CỦA NĂM</h4>
          <h1 className="text-5xl font-bold mb-4">{data.title}</h1>

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

          <p className="text-lg leading-relaxed mb-6">{data.desc}</p>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">
              {data.votes.toLocaleString()}
            </span>
            <span className="text-sm">LƯỢT BÌNH CHỌN</span>
            <button className="ml-6 px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-red-500 hover:text-white transition">
              ❤️ BÌNH CHỌN
            </button>
          </div>
        </div>
      </section>

      {/* ARTICLE SECTION */}
      <section className="bg-[#f8f6f2] text-black px-8 py-16 ">
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
      </section>
    </div>
  );
};

export default DetailPage;
