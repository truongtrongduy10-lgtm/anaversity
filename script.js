// =========================================================================
// 💖 SCRIPT.JS - TRÁI TIM, PHÁO HOA, TRÒ CHƠI TINH NGHỊCH & ÂM NHẠC 💖
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const cfg = (typeof LOVE_CONFIG !== "undefined" ? LOVE_CONFIG : window.LOVE_CONFIG) || {};

  // -----------------------------------------------------------------------
  // 1. NẠP DỮ LIỆU TỪ CONFIG.JS VÀO GIAO DIỆN
  // -----------------------------------------------------------------------
  function initContentFromConfig() {
    // Welcome Screen
    if (cfg.welcomeScreen) {
      setText("welcome-badge", cfg.welcomeScreen.badge);
      setText("welcome-title", cfg.welcomeScreen.title);
      setText("welcome-message", cfg.welcomeScreen.message);
      setText("welcome-btn-text", cfg.welcomeScreen.buttonText);
    }

    // Couple & Hero
    if (cfg.couple) {
      setText("anniversary-badge", cfg.couple.anniversaryBadge);
      setText("hero-title", cfg.couple.heroTitle);
      setText("hero-subtitle", cfg.couple.heroSubtitle);
      setText("boy-name", cfg.couple.boyName);
      setText("boy-nickname", cfg.couple.boyNickname);
      setText("girl-name", cfg.couple.girlName);
      setText("girl-nickname", cfg.couple.girlNickname);

      const boyImg = document.getElementById("boy-avatar");
      const girlImg = document.getElementById("girl-avatar");
      if (boyImg) {
        if (cfg.couple.boyAvatar && cfg.couple.boyAvatar !== "images/avatar-boy.jpg") {
          boyImg.src = cfg.couple.boyAvatar;
        }
        attachImageFallback(boyImg, "👦");
      }
      if (girlImg) {
        if (cfg.couple.girlAvatar && cfg.couple.girlAvatar !== "images/avatar-girl.jpg") {
          girlImg.src = cfg.couple.girlAvatar;
        }
        attachImageFallback(girlImg, "👧");
      }
    }

    // Render Polaroid Gallery
    const galleryGrid = document.getElementById("polaroid-grid");
    if (galleryGrid && Array.isArray(cfg.gallery)) {
      galleryGrid.innerHTML = "";
      cfg.gallery.forEach((item, index) => {
        const card = document.createElement("article");
        card.className = "polaroid-card";
        card.style.setProperty("--rotate", item.rotate || (index % 2 === 0 ? "-2.5deg" : "2.5deg"));
        card.innerHTML = `
          <div class="polaroid-img-wrap">
            <span class="polaroid-sticker">${item.sticker || "💖"}</span>
            <img src="${item.image}" alt="${escapeHtml(item.caption)}" loading="lazy" />
            <span class="polaroid-date-badge">${escapeHtml(item.date || `Kỷ niệm #0${index + 1}`)}</span>
          </div>
          <h3 class="polaroid-caption">${escapeHtml(item.caption)}</h3>
          <p class="polaroid-hint">✨ Bấm vào ảnh để xem lời nhắn ✨</p>
        `;
        const imgEl = card.querySelector("img");
        attachImageFallback(imgEl, "📸");
        card.addEventListener("click", (e) => {
          spawnClickHeartBurst(e.clientX, e.clientY);
          openLightbox(index);
        });
        galleryGrid.appendChild(card);
      });
    }

    // Render Timeline
    const timelineContainer = document.getElementById("timeline-container");
    if (timelineContainer && Array.isArray(cfg.timeline)) {
      timelineContainer.innerHTML = "";
      cfg.timeline.forEach((step) => {
        const item = document.createElement("div");
        item.className = "timeline-item";
        item.innerHTML = `
          <div class="timeline-dot">${step.icon || "💖"}</div>
          <div class="timeline-card">
            <span class="timeline-time">${escapeHtml(step.time)}</span>
            <h3 class="timeline-title">${escapeHtml(step.title)}</h3>
            <p class="timeline-desc">${escapeHtml(step.description)}</p>
          </div>
        `;
        timelineContainer.appendChild(item);
      });
    }

    // Playful Quiz
    if (cfg.playfulQuiz) {
      setText("quiz-question", cfg.playfulQuiz.question);
      setText("quiz-subtext", cfg.playfulQuiz.subtext);
      setText("btn-yes-love", cfg.playfulQuiz.yesButtonText);
      if (Array.isArray(cfg.playfulQuiz.noButtonTexts) && cfg.playfulQuiz.noButtonTexts.length > 0) {
        setText("btn-no-dodge", cfg.playfulQuiz.noButtonTexts[0]);
      }
      setText("quiz-reward-title", cfg.playfulQuiz.rewardTitle);
      setText("quiz-reward-message", cfg.playfulQuiz.rewardMessage);
    }

    // Render Coupons
    const couponsGrid = document.getElementById("coupons-grid");
    if (couponsGrid && Array.isArray(cfg.coupons)) {
      couponsGrid.innerHTML = "";
      cfg.coupons.forEach((coupon) => {
        const card = document.createElement("div");
        card.className = "coupon-card";
        card.innerHTML = `
          <div>
            <div class="coupon-icon">${coupon.icon || "🎁"}</div>
            <span class="coupon-tag">${escapeHtml(coupon.tag || "Đặc quyền")}</span>
            <h3 class="coupon-title">${escapeHtml(coupon.title)}</h3>
            <p class="coupon-desc">${escapeHtml(coupon.desc)}</p>
          </div>
          <button class="coupon-btn" type="button">Nhận Voucher Này 💖</button>
        `;
        const btn = card.querySelector(".coupon-btn");
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const rect = btn.getBoundingClientRect();
          spawnClickHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
          if (!card.classList.contains("claimed")) {
            card.classList.add("claimed");
            btn.textContent = "✅ Đã lưu vào ví Công Chúa!";
            playCuteChime();
            launchFireworkSalvo(3);
          } else {
            launchHeartFirework(
              window.innerWidth * (0.3 + Math.random() * 0.4),
              window.innerHeight * (0.25 + Math.random() * 0.25)
            );
          }
        });
        couponsGrid.appendChild(card);
      });
    }

    // Love Letter
    if (cfg.loveLetter) {
      setText("letter-greeting", cfg.loveLetter.greeting);
      setText("letter-signoff", cfg.loveLetter.signOff);
      setText("letter-signature", cfg.loveLetter.signature);
    }
  }

  const DEFAULT_TEMPLATE_TEXTS = {
    "welcome-badge": "💌 Ting ting! Có bưu phẩm tình yêu",
    "welcome-title": "Gửi Công Chúa Nhỏ Của Anh 👑",
    "welcome-message": "Anh có chuẩn bị một món quà nhỏ xíu nhưng chứa đựng siêu nhiều tình yêu nhân dịp kỷ niệm của tụi mình nè. Em bé đã sẵn sàng mở quà chưa?",
    "welcome-btn-text": "Mở Quà Ngay Nè 🎁✨",
    "anniversary-badge": "✨ Happy Monthly Anniversary ✨",
    "hero-title": "Kỷ Niệm Tháng Bên Nhau Ngọt Ngào 💕",
    "hero-subtitle": "Cảm ơn em bé đã xuất hiện và biến mỗi ngày của anh thành một câu chuyện cổ tích màu hồng!",
    "boy-name": "Anh Yêu 👦",
    "boy-nickname": "Chàng trai hay chiều chuộng",
    "girl-name": "Em Bé Công Chúa 👧",
    "girl-nickname": "Cô gái đáng yêu nhất hệ mặt trời",
    "quiz-question": "Khảo sát cực kỳ nghiêm túc: Em có yêu anh nhiều nhất trên đời hong? 🥺👉👈",
    "quiz-subtext": "(Thử bấm nút 'Hong thèm' xem có chuyện gì xảy ra nha hihi 😜)",
    "btn-yes-love": "Yêu anh nhất trên đời lun! 💖",
    "btn-no-dodge": "Hong thèm 😝",
    "quiz-reward-title": "Biết ngay mà!! Hihi yêu em bé nhứt! 🥰🎆",
    "letter-greeting": "Gửi công chúa nhỏ đáng yêu của anh, 💌",
    "letter-signoff": "Yêu em rất rất nhiều,",
    "letter-signature": "Chàng trai của em 💖"
  };

  function setText(id, text) {
    const el = document.getElementById(id);
    if (!el || text === undefined) return;
    const currentHtmlText = el.textContent.trim();
    const defaultText = DEFAULT_TEMPLATE_TEXTS[id];

    // Nếu người dùng đã sửa trực tiếp trong index.html (khác với mặc định ban đầu),
    // và trong config.js vẫn đang để giá trị mặc định ban đầu -> ưu tiên giữ nội dung trong index.html
    if (currentHtmlText && defaultText && currentHtmlText !== defaultText && text === defaultText) {
      return;
    }
    el.textContent = text;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Hỗ trợ tự động thử đuôi .png / .jpeg nếu người dùng thay ảnh khác định dạng
  function attachImageFallback(imgEl, emoji) {
    let triedPng = false;
    imgEl.addEventListener("error", () => {
      if (!triedPng && imgEl.src.endsWith(".jpg")) {
        triedPng = true;
        imgEl.src = imgEl.src.replace(/\.jpg$/, ".png");
        return;
      }
      // Tạo ảnh SVG cute dự phòng nếu chưa có file
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffe4ee"/>
            <stop offset="100%" stop-color="#ffb6d0"/>
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#g)"/>
        <circle cx="200" cy="180" r="95" fill="#ffffff" opacity="0.7"/>
        <text x="200" y="205" font-size="76" text-anchor="middle">${emoji}</text>
        <text x="200" y="330" font-family="sans-serif" font-size="18" font-weight="bold" fill="#c81e58" text-anchor="middle">Thay ảnh của bạn vào thư mục images/</text>
      </svg>`;
      imgEl.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
    });
  }

  // -----------------------------------------------------------------------
  // 2. CON TRỎ CHUỘT TRÁI TIM & HIỆU ỨNG HẠT BAY THEO CHUỘT
  // -----------------------------------------------------------------------
  const customCursor = document.getElementById("custom-heart-cursor");
  const trailContainer = document.getElementById("cursor-trail-container");
  const trailIcons = ["💖", "💗", "💓", "✨", "🌸", "🍓", "💕"];
  let lastTrailTime = 0;

  window.addEventListener("mousemove", (e) => {
    if (customCursor) {
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
    }

    const now = performance.now();
    if (now - lastTrailTime > 52) {
      lastTrailTime = now;
      spawnTrailParticle(e.clientX, e.clientY);
    }
  });

  window.addEventListener("touchmove", (e) => {
    if (!e.touches || !e.touches[0]) return;
    const now = performance.now();
    if (now - lastTrailTime > 65) {
      lastTrailTime = now;
      spawnTrailParticle(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener("click", (e) => {
    spawnClickHeartBurst(e.clientX, e.clientY);
  });

  function spawnTrailParticle(x, y) {
    if (!trailContainer) return;
    const el = document.createElement("span");
    el.className = "cursor-particle";
    el.textContent = trailIcons[Math.floor(Math.random() * trailIcons.length)];
    const size = 12 + Math.random() * 10;
    const dx = (Math.random() - 0.5) * 42;
    const rot = (Math.random() - 0.5) * 50;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.fontSize = `${size}px`;
    el.style.setProperty("--dx", `${dx}px`);
    el.style.setProperty("--rot", `${rot}deg`);

    trailContainer.appendChild(el);
    setTimeout(() => el.remove(), 950);
  }

  function spawnClickHeartBurst(x, y) {
    if (!trailContainer) return;
    const count = 8;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "cursor-particle";
      el.textContent = trailIcons[i % trailIcons.length];
      const angle = (Math.PI * 2 * i) / count;
      const dist = 35 + Math.random() * 35;
      const dx = Math.cos(angle) * dist;

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.fontSize = `${14 + Math.random() * 10}px`;
      el.style.setProperty("--dx", `${dx}px`);
      el.style.setProperty("--rot", `${(Math.random() - 0.5) * 80}deg`);

      trailContainer.appendChild(el);
      setTimeout(() => el.remove(), 950);
    }
  }

  // Tạo các trái tim & hoa anh đào bay lơ lửng dưới nền
  function initFloatingBackground() {
    const bg = document.getElementById("floating-bg-elements");
    if (!bg) return;
    const symbols = ["💗", "🌸", "✨", "💖", "🌷", "🍓", "🤍"];
    for (let i = 0; i < 18; i++) {
      const span = document.createElement("span");
      span.className = "bg-floater";
      span.textContent = symbols[i % symbols.length];
      span.style.left = `${Math.random() * 96}%`;
      span.style.fontSize = `${16 + Math.random() * 18}px`;
      span.style.animationDuration = `${12 + Math.random() * 14}s`;
      span.style.animationDelay = `${-Math.random() * 20}s`;
      bg.appendChild(span);
    }
  }

  // -----------------------------------------------------------------------
  // 4. HỆ THỐNG PHÁO HOA TRÁI TIM & MƯA TIM (HTML5 CANVAS)
  // -----------------------------------------------------------------------
  const canvas = document.getElementById("fireworks-canvas");
  const ctx = canvas.getContext("2d");
  let cw = (canvas.width = window.innerWidth);
  let ch = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    cw = canvas.width = window.innerWidth;
    ch = canvas.height = window.innerHeight;
  });

  const rockets = [];
  const particles = [];
  const fallingHearts = [];
  const fireworkColors = [
    "#ff4d88",
    "#ff85ad",
    "#ff1f6b",
    "#ffb3cb",
    "#ffe066",
    "#ffffff",
    "#ff66b2"
  ];

  class Rocket {
    constructor(targetX, targetY, isHeartShape = true) {
      this.x = cw * (0.2 + Math.random() * 0.6);
      this.y = ch;
      this.targetX = targetX;
      this.targetY = targetY;
      this.isHeartShape = isHeartShape;
      const angle = Math.atan2(targetY - this.y, targetX - this.x);
      const speed = 11 + Math.random() * 3;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
      this.trail = [];
    }

    update() {
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > 8) this.trail.shift();

      this.x += this.vx;
      this.y += this.vy;

      const dist = Math.hypot(this.targetX - this.x, this.targetY - this.y);
      if (dist < 18 || this.y <= this.targetY) {
        if (this.isHeartShape) {
          explodeHeartShape(this.x, this.y);
        } else {
          explodeSparkleSphere(this.x, this.y);
        }
        return false;
      }
      return true;
    }

    draw() {
      ctx.save();
      for (let i = 0; i < this.trail.length; i++) {
        const pt = this.trail[i];
        ctx.fillStyle = this.color;
        ctx.globalAlpha = (i + 1) / this.trail.length;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  class FireworkParticle {
    constructor(x, y, vx, vy, color, size = 3) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.color = color;
      this.alpha = 1;
      this.decay = 0.014 + Math.random() * 0.012;
      this.gravity = 0.045;
      this.size = size;
    }

    update() {
      this.vx *= 0.975;
      this.vy *= 0.975;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
      return this.alpha > 0;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class FallingHeart {
    constructor() {
      this.x = Math.random() * cw;
      this.y = -30 - Math.random() * 120;
      this.size = 14 + Math.random() * 14;
      this.vy = 2.2 + Math.random() * 2.5;
      this.vx = (Math.random() - 0.5) * 1.4;
      this.sway = Math.random() * Math.PI * 2;
      this.color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
    }

    update() {
      this.sway += 0.05;
      this.x += this.vx + Math.sin(this.sway) * 0.8;
      this.y += this.vy;
      return this.y < ch + 40;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(Math.sin(this.sway) * 0.25);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      const s = this.size / 16;
      ctx.moveTo(0, 4 * s);
      ctx.bezierCurveTo(0, 0, -8 * s, 0, -8 * s, 5 * s);
      ctx.bezierCurveTo(-8 * s, 10 * s, 0, 13 * s, 0, 16 * s);
      ctx.bezierCurveTo(0, 13 * s, 8 * s, 10 * s, 8 * s, 5 * s);
      ctx.bezierCurveTo(8 * s, 0, 0, 0, 0, 4 * s);
      ctx.fill();
      ctx.restore();
    }
  }

  // Nổ pháo hoa theo đường cong phương trình Trái Tim
  function explodeHeartShape(cx, cy) {
    const mainColor = fireworkColors[Math.floor(Math.random() * 4)];
    const subColor = "#ffffff";
    const total = 70;
    const scale = 0.26 + Math.random() * 0.1;

    for (let i = 0; i < total; i++) {
      const t = (Math.PI * 2 * i) / total;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      const color = i % 5 === 0 ? subColor : mainColor;
      particles.push(new FireworkParticle(cx, cy, hx * scale, hy * scale, color, 3.2));
    }
  }

  function explodeSparkleSphere(cx, cy) {
    const count = 60;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 5.5;
      const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
      particles.push(
        new FireworkParticle(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, color, 2.8)
      );
    }
  }

  function launchHeartFirework(tx, ty, isHeart = true) {
    const x = tx || cw * (0.18 + Math.random() * 0.64);
    const y = ty || ch * (0.16 + Math.random() * 0.38);
    rockets.push(new Rocket(x, y, isHeart));
  }

  function launchFireworkSalvo(count = 5) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        launchHeartFirework(
          cw * (0.15 + Math.random() * 0.7),
          ch * (0.15 + Math.random() * 0.38),
          i % 2 === 0
        );
      }, i * 260);
    }
  }

  function triggerHeartShower(amount = 45) {
    for (let i = 0; i < amount; i++) {
      fallingHearts.push(new FallingHeart());
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, cw, ch);

    for (let i = rockets.length - 1; i >= 0; i--) {
      rockets[i].draw();
      if (!rockets[i].update()) {
        rockets.splice(i, 1);
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].draw();
      if (!particles[i].update()) {
        particles.splice(i, 1);
      }
    }

    for (let i = fallingHearts.length - 1; i >= 0; i--) {
      fallingHearts[i].draw();
      if (!fallingHearts[i].update()) {
        fallingHearts.splice(i, 1);
      }
    }

    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();

  // -----------------------------------------------------------------------
  // 5. HỘP NHẠC WEB AUDIO API NGỌT NGÀO (VÀ HỖ TRỢ MUSIC.MP3)
  // -----------------------------------------------------------------------
  let audioCtx = null;
  let isMusicPlaying = false;
  let melodyTimer = null;
  const bgAudio = document.getElementById("bg-audio");
  const musicBtn = document.getElementById("music-toggle-btn");
  const musicLabel = document.getElementById("music-label");

  // Giai điệu Music Box lãng mạn (tần số nốt nhạc)
  const melodyNotes = [
    523.25, 659.25, 783.99, 1046.5, 880.0, 1046.5, 783.99, 659.25,
    698.46, 880.0, 1046.5, 880.0, 783.99, 659.25, 587.33, 783.99,
    523.25, 659.25, 783.99, 1046.5, 1174.66, 1046.5, 880.0, 783.99,
    698.46, 659.25, 587.33, 783.99, 1046.5
  ];
  let noteIndex = 0;

  function ensureAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playMusicBoxNote(freq, duration = 0.55) {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  function playCuteChime() {
    ensureAudioContext();
    if (!audioCtx) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
      setTimeout(() => playMusicBoxNote(f, 0.35), idx * 75);
    });
  }

  function startBackgroundMusic() {
    if (isMusicPlaying) return;
    isMusicPlaying = true;
    musicBtn.classList.add("playing");
    if (musicLabel) musicLabel.textContent = "Đang phát";

    // Thử phát music.mp3 nếu có, nếu không có thì phát giai điệu Music Box
    if (bgAudio) {
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          startSynthMelody();
        });
        return;
      }
    }
    startSynthMelody();
  }

  function startSynthMelody() {
    ensureAudioContext();
    if (melodyTimer) clearInterval(melodyTimer);
    melodyTimer = setInterval(() => {
      if (!isMusicPlaying) return;
      const freq = melodyNotes[noteIndex % melodyNotes.length];
      playMusicBoxNote(freq, 0.65);
      noteIndex++;
    }, 430);
  }

  function stopBackgroundMusic() {
    isMusicPlaying = false;
    musicBtn.classList.remove("playing");
    if (musicLabel) musicLabel.textContent = "Nhạc yêu";
    if (bgAudio) bgAudio.pause();
    if (melodyTimer) {
      clearInterval(melodyTimer);
      melodyTimer = null;
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener("click", () => {
      if (isMusicPlaying) {
        stopBackgroundMusic();
      } else {
        startBackgroundMusic();
      }
    });
  }

  // -----------------------------------------------------------------------
  // 6. SỰ KIỆN MỞ HỘP QUÀ CHÀO MỪNG & NÚT BẮN PHÁO HOA
  // -----------------------------------------------------------------------
  const welcomeOverlay = document.getElementById("welcome-overlay");
  const openGiftBtn = document.getElementById("open-gift-btn");
  const giftBoxTrigger = document.getElementById("gift-box-trigger");

  function openWelcomeGift() {
    if (!welcomeOverlay || welcomeOverlay.classList.contains("opened")) return;
    welcomeOverlay.classList.add("opened");
    startBackgroundMusic();
    playCuteChime();
    launchFireworkSalvo(7);
    triggerHeartShower(40);
  }

  if (openGiftBtn) openGiftBtn.addEventListener("click", openWelcomeGift);
  if (giftBoxTrigger) giftBoxTrigger.addEventListener("click", openWelcomeGift);

  const shootFireworksBtn = document.getElementById("shoot-fireworks-btn");
  if (shootFireworksBtn) {
    shootFireworksBtn.addEventListener("click", () => {
      playCuteChime();
      launchFireworkSalvo(5);
    });
  }

  const heartShowerBtn = document.getElementById("heart-shower-btn");
  if (heartShowerBtn) {
    heartShowerBtn.addEventListener("click", () => {
      playCuteChime();
      triggerHeartShower(50);
    });
  }

  const centerHeartBtn = document.getElementById("center-heart-btn");
  if (centerHeartBtn) {
    centerHeartBtn.addEventListener("click", () => {
      playCuteChime();
      launchFireworkSalvo(4);
    });
  }

  // -----------------------------------------------------------------------
  // 7. TRÒ CHƠI TINH NGHỊCH: NÚT "HONG THÈM" CHẠY TRỐN
  // -----------------------------------------------------------------------
  const btnYes = document.getElementById("btn-yes-love");
  const btnNo = document.getElementById("btn-no-dodge");
  const quizButtonsArea = document.getElementById("quiz-buttons-area");
  const rewardBox = document.getElementById("quiz-reward-box");
  const btnMoreFireworks = document.getElementById("btn-more-fireworks");

  let dodgeCount = 0;
  let yesScale = 1;

  function dodgeNoButton(e) {
    if (e) e.preventDefault();
    if (!btnNo || !quizButtonsArea) return;

    dodgeCount++;
    const texts =
      cfg.playfulQuiz && Array.isArray(cfg.playfulQuiz.noButtonTexts)
        ? cfg.playfulQuiz.noButtonTexts
        : ["Ơ kìa bấm nhầm hả? 😳", "Đừng đuổi theo em nữa mà 😆"];

    btnNo.textContent = texts[dodgeCount % texts.length];

    // Phóng to nút "Yêu anh nhất trên đời lun!" mỗi lần cô ấy định bấm "Hong"
    yesScale = Math.min(1.45, yesScale + 0.07);
    if (btnYes) {
      btnYes.style.transform = `scale(${yesScale})`;
    }

    // Di chuyển nút "Hong" tới vị trí ngẫu nhiên trong khung
    const areaRect = quizButtonsArea.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();
    const maxOffsetX = Math.max(80, (areaRect.width - btnRect.width) / 2 - 12);
    const maxOffsetY = 65;

    const randomX = (Math.random() * 2 - 1) * maxOffsetX;
    const randomY = (Math.random() * 2 - 1) * maxOffsetY;

    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
  }

  if (btnNo) {
    btnNo.addEventListener("mouseenter", dodgeNoButton);
    btnNo.addEventListener("touchstart", dodgeNoButton, { passive: false });
    btnNo.addEventListener("click", dodgeNoButton);
  }

  if (btnYes) {
    btnYes.addEventListener("click", () => {
      playCuteChime();
      launchFireworkSalvo(9);
      triggerHeartShower(55);
      if (btnNo) btnNo.classList.add("hidden");
      if (btnYes) btnYes.style.transform = "scale(1.08)";
      if (rewardBox) rewardBox.classList.remove("hidden");
    });
  }

  if (btnMoreFireworks) {
    btnMoreFireworks.addEventListener("click", () => {
      playCuteChime();
      launchFireworkSalvo(7);
      triggerHeartShower(35);
    });
  }

  // -----------------------------------------------------------------------
  // 8. BỨC THƯ TÌNH 3D & HIỆU ỨNG GÕ CHỮ (TYPEWRITER)
  // -----------------------------------------------------------------------
  const envelope = document.getElementById("love-envelope");
  const toggleLetterBtn = document.getElementById("toggle-letter-btn");
  const letterPaper = document.getElementById("letter-paper");
  const letterBody = document.getElementById("letter-body");
  const btnGrandFinale = document.getElementById("btn-grand-finale");
  let letterTyped = false;

  function openLoveLetter() {
    if (!envelope || !letterPaper) return;
    const isOpen = envelope.classList.toggle("open");

    if (isOpen) {
      letterPaper.classList.remove("hidden");
      if (toggleLetterBtn) toggleLetterBtn.textContent = "💌 Gấp Phong Bì Lại";
      playCuteChime();
      launchFireworkSalvo(4);

      if (!letterTyped) {
        letterTyped = true;
        typewriteLetterParagraphs();
      }

      setTimeout(() => {
        letterPaper.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 280);
    } else {
      letterPaper.classList.add("hidden");
      if (toggleLetterBtn) toggleLetterBtn.textContent = "💌 Mở Phong Bì Đọc Thư";
    }
  }

  function typewriteLetterParagraphs() {
    if (!letterBody) return;
    letterBody.innerHTML = "";
    const paragraphs =
      cfg.loveLetter && Array.isArray(cfg.loveLetter.paragraphs)
        ? cfg.loveLetter.paragraphs
        : [];

    paragraphs.forEach((pText) => {
      const p = document.createElement("p");
      p.textContent = pText;
      letterBody.appendChild(p);
    });
  }

  if (envelope) envelope.addEventListener("click", openLoveLetter);
  if (toggleLetterBtn) toggleLetterBtn.addEventListener("click", openLoveLetter);

  if (btnGrandFinale) {
    btnGrandFinale.addEventListener("click", () => {
      playCuteChime();
      launchFireworkSalvo(12);
      triggerHeartShower(80);
    });
  }

  // -----------------------------------------------------------------------
  // 9. LIGHTBOX XEM ẢNH KỶ NIỆM PHÓNG TO
  // -----------------------------------------------------------------------
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxBackdrop = document.getElementById("lightbox-backdrop");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxSticker = document.getElementById("lightbox-sticker");
  const lightboxDate = document.getElementById("lightbox-date");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxStory = document.getElementById("lightbox-story");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const lightboxLoveBurst = document.getElementById("lightbox-love-burst");

  let currentPhotoIndex = 0;

  function openLightbox(index) {
    if (!cfg.gallery || !cfg.gallery.length) return;
    currentPhotoIndex = (index + cfg.gallery.length) % cfg.gallery.length;
    const item = cfg.gallery[currentPhotoIndex];

    if (lightboxImg) lightboxImg.src = item.image;
    if (lightboxSticker) lightboxSticker.textContent = item.sticker || "💖";
    if (lightboxDate) lightboxDate.textContent = item.date || `Khoảnh khắc #0${currentPhotoIndex + 1}`;
    if (lightboxCaption) lightboxCaption.textContent = item.caption || "";
    if (lightboxStory) lightboxStory.textContent = item.story || "";

    if (lightboxModal) lightboxModal.classList.remove("hidden");
    playCuteChime();
  }

  function closeLightbox() {
    if (lightboxModal) lightboxModal.classList.add("hidden");
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);
  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => openLightbox(currentPhotoIndex - 1));
  }
  if (lightboxNext) {
    lightboxNext.addEventListener("click", () => openLightbox(currentPhotoIndex + 1));
  }
  if (lightboxLoveBurst) {
    lightboxLoveBurst.addEventListener("click", () => {
      playCuteChime();
      launchFireworkSalvo(4);
      triggerHeartShower(30);
    });
  }

  window.addEventListener("keydown", (e) => {
    if (lightboxModal && !lightboxModal.classList.contains("hidden")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") openLightbox(currentPhotoIndex - 1);
      if (e.key === "ArrowRight") openLightbox(currentPhotoIndex + 1);
    }
  });

  // Khởi chạy toàn bộ
  initContentFromConfig();
  initFloatingBackground();
});
