// File: src/pages/Topup.jsx
import { useAuthStore } from "../store/useAuthStore";
import { Copy } from "lucide-react";
import { useState } from "react";

const Topup = () => {
  const { authUser } = useAuthStore();
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(authUser?.transfer || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SO_TAI_KHOAN = "1023266844";
  const TEN_NGUOI_NHAN = "Nguyễn Đức Anh";

  const rawAmount = parseInt(amount.replace(/[^0-9]/g, ""));
  const QR_URL = `https://qr.sepay.vn/img?acc=${SO_TAI_KHOAN}&bank=vcb&amount=${rawAmount}&des=${authUser?.transfer}&template=clean&download=false`;

  const handleAmountChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    if (!input) {
      setAmount("");
      setError("Vui lòng nhập số tiền");
      return;
    }

    const number = Number(input);
    const formatted = number.toLocaleString("vi-VN");

    setAmount(formatted);

    if (number < 10000) {
      setError("Số tiền tối thiểu là 10,000 VNĐ");
    } else {
      setError("");
    }
  };

  const handleShowQR = () => {
    const number = parseInt(amount.replace(/[^0-9]/g, ""));
    if (!number) {
      setError("Vui lòng nhập số tiền");
      return;
    }
    if (number < 10000) {
      setError("Số tiền tối thiểu để tạo QR là 10,000 VNĐ");
      return;
    }
    setError("");
    setShowQR(true);
  };

  return (
    <div className="max-w-2xl mx-auto mt-24 p-6 bg-white rounded-lg shadow relative">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Nạp tiền vào tài khoản</h1>

      <ul className="space-y-3 text-base text-gray-700 mb-6">
        <li>
          <strong>STK:</strong> <span className="font-semibold">{SO_TAI_KHOAN}</span>
        </li>
        <li>
          <strong>Người nhận:</strong> <span className="font-semibold">{TEN_NGUOI_NHAN}</span>
        </li>
        <li className="flex items-center gap-2">
          <strong>Nội dung chuyển khoản:</strong>
          <span className="text-green-600 font-bold text-lg">{authUser?.transfer}</span>
          <button
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-2 py-1 rounded flex items-center gap-1"
            onClick={handleCopy}
          >
            <Copy size={14} />
            {copied ? "Đã copy" : "Copy"}
          </button>
        </li>
      </ul>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">Số tiền:</label>
        <div className="flex gap-2">
          <input
            type="text"
            inputMode="numeric"
            className="input input-bordered w-full max-w-xs"
            placeholder="Nhập số tiền"
            value={amount}
            onChange={handleAmountChange}
          />
          <span className="self-center">VNĐ</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">• Tối thiểu: 10,000 VNĐ (Chỉ nhập số nguyên)</p>
        {error && <p className="text-red-600 text-sm mt-2 font-medium">{error}</p>}
      </div>

      <div className="mb-6 space-y-2">
        <button className="btn btn-success" onClick={handleShowQR}>Tạo QR Code</button>
      </div>

      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center relative">
            <img src={QR_URL} alt="QR Code chuyển khoản" className="w-64 mx-auto mb-4" />
            <button
              className="btn btn-outline btn-sm mt-2"
              onClick={() => setShowQR(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-700 space-y-2">
        <p className="text-red-600 font-semibold">Lưu ý:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Vui lòng điền chính xác nội dung chuyển khoản để thực hiện nạp tiền tự động.</li>
          <li>Không chấp nhận giao dịch nạp tiền từ tài khoản công ty.</li>
          <li>
            <span className="text-black">Nạp tiền bằng ví điện tử USDT hoặc Paypal</span>, vui lòng liên hệ hỗ trợ viên: <a className="text-green-600 underline" href="#">Tại đây</a>
          </li>
          <li>Tiền sẽ vào tài khoản khoảng 1–10 phút sau khi giao dịch thành công.</li>
          <li>
            <span className="text-red-500 font-semibold">Vietcombank trong khoảng 23h–3h không thể kiểm tra lịch sử giao dịch</span> — tránh nạp trong thời gian này.
          </li>
          <li>Nếu quá lâu không thấy cộng tiền, hãy liên hệ hỗ trợ viên.</li>
        </ul>
      </div>
    </div>
  );
};

export default Topup;
