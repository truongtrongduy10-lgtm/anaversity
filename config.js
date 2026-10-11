// =========================================================================
// 💖 CẤU HÌNH TRANG KỶ NIỆM - CHỈNH SỬA NỘI DUNG & ẢNH TẠI ĐÂY 💖
// Bạn chỉ cần thay ảnh của 2 bạn vào thư mục "images/" với tên tương ứng
// (photo1.jpg -> photo6.jpg, avatar-boy.jpg, avatar-girl.jpg)
// hoặc đổi đường dẫn ảnh ngay bên dưới!
// =========================================================================

const LOVE_CONFIG = {
  // 1. THÔNG TIN CẶP ĐÔI & NGÀY KỶ NIỆM
  couple: {
    boyName: "Anh Iuu",
    boyNickname: "Chàng trai hay chiều chuộng",
    boyAvatar: "images/avatar-boy.jpg",

    girlName: "Minh Xinh Iuu",
    girlNickname: "Cô gái hay dỗi",
    girlAvatar: "images/avatar-girl.jpg",

    // Tiêu đề hiển thị trên trang chủ
    anniversaryBadge: "✨ Happy Monthly Anniversary ✨",
    heroTitle: "Kỷ Niệm Tháng Bên Nhau Ngọt Ngào 💕",
    heroSubtitle: "Cảm ơn em bé đã xuất hiện và biến mỗi ngày của anh thành một câu chuyện cổ tích màu hồng!"
  },

  // 2. MÀN HÌNH MỞ QUÀ BẤT NGỜ ĐẦU TIÊN
  welcomeScreen: {
    badge: "💌Bưu phẩm tình yêu",
    title: "Gửi Công Chúa Nhỏ Của Anh 👑",
    message: "Anh có chuẩn bị một món quà nhỏ xíu. Em bé đã sẵn sàng mở quà chưa?",
    buttonText: "Mở Quà"
  },

  // 3. BỘ SƯU TẬP ẢNH POLAROID KỶ NIỆM (Thay ảnh trong thư mục images/)
  // Mẹo: Bạn chỉ cần chép ảnh của bạn đè lên file photo1.jpg -> photo6.jpg trong thư mục images
  gallery: [
    {
      image: "images/photo1.jpg",
      caption: "Nụ cười làm anh tan chảy",
      date: "Khoảnh khắc #01",
      story: "Lần đầu nhìn thấy nụ cười này là tim anh đã tự động bật chế độ yêu!",
      sticker: "🍓",
      rotate: "-3deg"
    },
    {
      image: "images/photo2.jpg",
      caption: "Đi đâu cũng được, miễn là cùng nhau 🧸",
      date: "Khoảnh khắc #02",
      story: "Dù là đi ăn vặt vỉa hè hay lượn lờ khắp phố, chỉ cần có em ngồi sau lưng là vui nhất trên đời.",
      sticker: "🧸",
      rotate: "2.5deg"
    },
    {
      image: "images/photo3.jpg",
      caption: "Công chúa hay dỗi nhưng siêu cấp đáng yêu 🌸",
      date: "Khoảnh khắc #03",
      story: "Lúc dỗi má phính lên trông cưng xỉu!",
      sticker: "🌸",
      rotate: "-2deg"
    },
    {
      image: "images/photo4.jpg",
      caption: "Những buổi hẹn hò ngọt ngào🍭",
      date: "Khoảnh khắc #04",
      story: "Mỗi lần gặp em là thời gian trôi nhanh như chớp mắt, lúc nào về cũng nhớ em liền.",
      sticker: "🍭",
      rotate: "3deg"
    },
    {
      image: "images/photo5.jpg",
      caption: "Nắm tay nhau đi 💖",
      date: "Khoảnh khắc #05",
      story: "Tay em nhỏ xíu vừa vặn để anh nắm thật chặt từ tháng này qua tháng khác, năm này qua năm khác.",
      sticker: "💖",
      rotate: "-2.5deg"
    },
    {
      image: "images/photo6.jpg",
      caption: "Tương lai phía trước luôn có tụi mình ✨",
      date: "Khoảnh khắc #06",
      story: "Cảm ơn em vì đã luôn dịu dàng, đáng yêu và đồng hành cùng anh!",
      sticker: "✨",
      rotate: "2deg"
    }
  ],

  // 4. TRÒ CHƠI TINH NGHỊCH (Nút "Không" chạy trốn)
  playfulQuiz: {
    question: "Khảo sát cực kỳ nghiêm túc: Em có yêu anh nhiều nhất trên đời hong? 🥺👉👈",
    yesButtonText: "Yêu anh nhất trên đời lun! 💖",
    noButtonTexts: [
      "Hong thèm 😝",
      "Ơ kìa bấm nhầm hả? 😳",
      "Nút này đang bảo trì rùi 🚧",
      "Đừng đuổi theo nữa mà 😆",
      "Bấm nút màu hồng bên kia kìa! 👉",
      "Trái tim không cho phép bấm nút này 💓",
      "Thôi đầu hàng đi công chúa ơi 👑",
      "Đố em bắt được nút này đó hihi 🏃‍♂️💨"
    ],
    rewardTitle: "Biết ngay mà!! Hihi yêu em bé nhứt! 🥰🎆",
    rewardMessage: "Hệ thống đã ghi nhận: Em yêu anh 10.000% không thể hoàn tác! Phần thưởng của em là trọn đời được anh cưng chiều cộng thêm bộ Voucher Đặc Quyền ngay bên dưới nha! 💕"
  },

  // 6. VOUCHER ĐẶC QUYỀN CHO BẠN GÁI (Bấm để nhận quà)
  coupons: [
    {
      id: "milktea",
      icon: "🧋",
      title: "1 Chầu Trà Sữa Full Topping",
      desc: "Hiệu lực 24/7. Chỉ cần em bé bảo thèm là có mặt ngay lập tức!",
      tag: "Sử dụng 1 lần :))"
    },
    {
      id: "foodtour",
      icon: "🍜",
      title: "1 Buổi Đi Ăn Sập Phố",
      desc: "Em chỉ việc lên đồ xinh đẹp, ăn gì để anh lo hết từ A đến Á!",
      tag: "Bao no bao vui"
    },
    {
      id: "hugs",
      icon: "🤗",
      title: "Combo 1000 Cái Ôm & Hôn Má",
      desc: "Nạp năng lượng tức thì mỗi khi công chúa cảm thấy mệt mỏi hay làm nũng.",
      tag: "Không giới hạn"
    }
  ],

  // 7. BỨC THƯ TÌNH LÃNG MẠN CUỐI TRANG
  loveLetter: {
    greeting: "Gửi công chúa nhỏ đáng yêu của anh, 💌",
    paragraphs: [
      "Vậy là tụi mình lại cùng nhau đi qua thêm một cột mốc kỷ niệm thật ngọt ngào nữa rồi! Nhìn lại những ngày tháng bên nhau, anh nhận ra điều may mắn nhất của mình chính là được gặp em, được nghe giọng nói của em và được nhìn thấy nụ cười rạng rỡ của em mỗi ngày.",
      "Cảm ơn em vì những lúc dịu dàng quan tâm anh, và cả những lúc nhõng nhẽo, tinh nghịch làm cuộc sống của anh thêm phần sóng gió. Dù đôi lúc tụi mình có trêu nhau hay giận dỗi vu vơ, nhưng sau tất cả, thương em vẫn luôn là thói quen ngọt ngào nhất của anh.",
      "Chúc cho tình yêu của tụi mình lúc nào cũng ấm áp và tràn ngập tiếng cười như hôm nay. Hãy cứ mãi là cô gái vui vẻ, vô tư nhé. 💕"
    ],
    signOff: "Yêu em rất rất nhiều,",
    signature: "Chàng trai của em 💖"
  }
};

window.LOVE_CONFIG = LOVE_CONFIG;
