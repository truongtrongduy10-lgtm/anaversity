# 💖 Hướng Dẫn Thay Ảnh & Chỉnh Sửa Nội Dung (Siêu Dễ Trong 1 Phút!)

Chào bạn! Dự án Landing Page Kỷ Niệm Tình Yêu đã được thiết kế sẵn để bạn thay ảnh và đổi lời nhắn cực kỳ nhanh chóng:

---

## 📸 1. Cách Thay Ảnh Của 2 Bạn (Nhanh Nhất)
Bạn chỉ cần mở thư mục **`images/`** và chép ảnh thật của 2 bạn đè lên các file sau:
- `images/avatar-boy.jpg` — Ảnh đại diện của bạn nam
- `images/avatar-girl.jpg` — Ảnh đại diện của bạn nữ
- `images/photo1.jpg` đến `images/photo6.jpg` — 6 bức ảnh kỷ niệm trong khung Polaroid

> **Mẹo nhỏ:** Nếu ảnh của bạn có đuôi `.png`, trang web cũng **tự động nhận diện** luôn, hoặc bạn có thể sửa tên file ảnh trực tiếp trong `config.js`.

---

## 💌 2. Cách Đổi Tên, Ngày Yêu Nhau & Lời Nhắn
Mở file **`config.js`** bằng bất kỳ trình soạn thảo nào (Notepad, VS Code...):
1. **`couple.boyName` / `couple.girlName`**: Đổi tên hoặc biệt danh đáng yêu của 2 bạn.
2. **`couple.startDate`**: Đổi ngày bắt đầu yêu nhau theo định dạng `"YYYY-MM-DDTHH:mm:ss"` (Ví dụ: `"2026-09-04T00:00:00"`). Bộ đếm sẽ tự động tính số tháng, ngày, giờ, phút, giây theo thời gian thực!
3. **`gallery`**: Đổi dòng chữ tiêu đề (`caption`) và câu chuyện kỷ niệm (`story`) khi bấm vào từng bức ảnh.
4. **`loveLetter`**: Viết bức thư tình riêng của bạn ở cuối trang.

---

## 🎵 3. Cách Đổi Nhạc Nền Bài Hát Kỷ Niệm
- Mặc định trang web đã tích hợp sẵn **Giai điệu Hộp Nhạc (Music Box)** ngọt ngào phát ngay khi mở hộp quà.
- Nếu bạn muốn phát một bài hát MP3 riêng (ví dụ bài hát kỷ niệm của 2 bạn), chỉ cần đổi tên file nhạc thành **`music.mp3`** và bỏ vào cùng thư mục với `index.html`!
