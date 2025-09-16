import { useState } from "react";

const albumsMock = [
  { id: 1, title: "Album A", artist: "Artist A", image: "https://via.placeholder.com/150" },
  { id: 2, title: "Album B", artist: "Artist B", image: "https://via.placeholder.com/150" },
  { id: 3, title: "Album C", artist: "Artist C", image: "https://via.placeholder.com/150" },
];

const rankingMock = [
  { id: 1, name: "Artist A", votes: 120 },
  { id: 2, name: "Artist B", votes: 90 },
  { id: 3, name: "Artist C", votes: 75 },
  { id: 4, name: "Artist D", votes: 50 },
];

export default function EPSection() {
  const [ranking, setRanking] = useState(rankingMock);

  const handleVote = (id) => {
    setRanking((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, votes: item.votes + 1 } : item
      )
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Bảng xếp hạng bên trái */}
      <div className="col-span-1 bg-white shadow-md rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4">Bảng xếp hạng</h2>
        <ul className="space-y-3">
          {ranking
            .sort((a, b) => b.votes - a.votes)
            .map((item, index) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-600">{index + 1}.</span>
                  <span>{item.name}</span>
                </div>
                <span className="text-sm text-gray-500">{item.votes} votes</span>
              </li>
            ))}
        </ul>
      </div>

      {/* Album bên phải */}
      <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {albumsMock.map((album) => (
          <div
            key={album.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition"
          >
            <img
              src={album.image}
              alt={album.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold">{album.title}</h3>
              <p className="text-gray-500">{album.artist}</p>
              <button
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                onClick={() => handleVote(album.id)}
              >
                Bình chọn
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
