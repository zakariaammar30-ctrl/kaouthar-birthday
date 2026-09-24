// =========================================
// KAOUTAHR - BIRTHDAY SURPRISE
// Interactive JavaScript
// =========================================

// Elements
const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");
const startBtn = document.getElementById("startBtn");

const giftBox = document.getElementById("giftBox");
const giftMessage = document.getElementById("giftMessage");
const giftInstruction = document.getElementById("giftInstruction");

const envelope = document.getElementById("envelope");
const letterContent = document.getElementById("letterContent");
const letterHint = document.getElementById("letterHint");

const wishBtn = document.getElementById("wishBtn");

// =========================================
// 1. MUSIC
// =========================================

let musicPlaying = false;

async function toggleMusic() {
  if (!musicPlaying) {
    try {
      await music.play();
      musicPlaying = true;
      musicBtn.classList.add("playing");
      musicLabel.textContent = "Pause music";
      musicBtn.setAttribute("aria-label", "Pause music");
    } catch (error) {
      musicLabel.textContent = "Tap to play";
      console.log("Music could not start:", error);
    }
  } else {
    music.pause();
    musicPlaying = false;
    musicBtn.classList.remove("playing");
    musicLabel.textContent = "Play music";
    musicBtn.setAttribute("aria-label", "Play music");
  }
}

musicBtn.addEventListener("click", toggleMusic);

// Start button: music + scroll
startBtn.addEventListener("click", async () => {
  if (!musicPlaying) {
    await toggleMusic();
  }

  document.getElementById("gift").scrollIntoView({
    behavior: "smooth"
  });

  launchConfetti(80);
});

// =========================================
// 2. GIFT ANIMATION
// =========================================

let giftOpened = false;

function openGift() {
  if (giftOpened) return;

  giftOpened = true;

  giftBox.classList.add("opened");
  giftInstruction.textContent = "Your surprise is here! 💗";

  setTimeout(() => {
    giftMessage.classList.remove("hidden");

    launchConfetti(150);

    giftMessage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 700);
}

giftBox.addEventListener("click", openGift);

giftBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openGift();
  }
});

// =========================================
// 3. SECRET LOVE LETTER
// =========================================

let letterOpened = false;

function openLetter() {
  if (letterOpened) return;

  letterOpened = true;

  envelope.classList.add("opened");
  letterHint.textContent = "A letter written just for you ♡";

  setTimeout(() => {
    letterContent.classList.remove("hidden");

    launchConfetti(60);

    letterContent.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 900);
}

envelope.addEventListener("click", openLetter);

envelope.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openLetter();
  }
});

// =========================================
// 4. FLOATING HEARTS
// =========================================

const heartsContainer = document.getElementById("floatingHearts");

const heartSymbols = ["♡", "♥", "❤", "💕"];

function createFloatingHeart() {
  const heart = document.createElement("span");

  heart.classList.add("heart-particle");

  heart.textContent =
    heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

  heart.style.left = Math.random() * 100 + "%";

  heart.style.fontSize =
    (12 + Math.random() * 22) + "px";

  const duration = 8 + Math.random() * 8;

  heart.style.animationDuration = duration + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// Create a heart every 900ms
setInterval(createFloatingHeart, 900);

// =========================================
// 5. CONFETTI ANIMATION
// =========================================

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

let confettiPieces = [];
let confettiAnimationId = null;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function launchConfetti(amount = 100) {
  const colors = [
    "#e879a5",
    "#ffb6c1",
    "#ffe4a8",
    "#ffffff",
    "#c94f85",
    "#f7c5d9"
  ];

  for (let i = 0; i < amount; i++) {
    confettiPieces.push({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * window.innerHeight * 0.3,

      size: 4 + Math.random() * 7,

      speedX: (Math.random() - 0.5) * 6,
      speedY: 2 + Math.random() * 5,

      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,

      color: colors[Math.floor(Math.random() * colors.length)],

      opacity: 1,
      shape: Math.random() > 0.5 ? "heart" : "rect"
    });
  }

  if (!confettiAnimationId) {
    animateConfetti();
  }
}

function drawHeart(ctx, x, y, size) {
  ctx.beginPath();

  ctx.moveTo(x, y + size * 0.3);

  ctx.bezierCurveTo(
    x - size,
    y - size * 0.4,
    x - size * 0.5,
    y - size,
    x,
    y - size * 0.4
  );

  ctx.bezierCurveTo(
    x + size * 0.5,
    y - size,
    x + size,
    y - size * 0.4,
    x,
    y + size * 0.3
  );

  ctx.fill();
}

function animateConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  confettiPieces.forEach((piece) => {
    piece.x += piece.speedX;
    piece.y += piece.speedY;

    piece.rotation += piece.rotationSpeed;

    piece.speedY += 0.035;

    piece.opacity -= 0.002;

    ctx.save();

    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation * Math.PI / 180);

    ctx.globalAlpha = Math.max(0, piece.opacity);
    ctx.fillStyle = piece.color;

    if (piece.shape === "heart") {
      drawHeart(ctx, 0, 0, piece.size);
    } else {
      ctx.fillRect(
        -piece.size / 2,
        -piece.size / 2,
        piece.size,
        piece.size * 0.6
      );
    }

    ctx.restore();
  });

  confettiPieces = confettiPieces.filter(piece =>
    piece.y < window.innerHeight + 50 && piece.opacity > 0
  );

  if (confettiPieces.length > 0) {
    confettiAnimationId = requestAnimationFrame(animateConfetti);
  } else {
    cancelAnimationFrame(confettiAnimationId);
    confettiAnimationId = null;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

// =========================================
// 6. MAKE A WISH
// =========================================

wishBtn.addEventListener("click", () => {
  launchConfetti(250);

  wishBtn.textContent = "Your wish is on its way! ✨";
  wishBtn.disabled = true;

  wishBtn.style.opacity = "0.85";

  // Extra floating hearts
  for (let i = 0; i < 15; i++) {
    setTimeout(createFloatingHeart, i * 100);
  }

  // Show a little final surprise
  setTimeout(() => {
    alert(
      "Happy Birthday, my beautiful Kaoutahr! 💗\n\n" +
      "May all your wishes come true.\n" +
      "I love you! — Zakariae ♡"
    );
  }, 400);
});

// =========================================
// 7. IMAGE FALLBACK
// =========================================

// If a photo is missing, show a beautiful placeholder
document.querySelectorAll(".photo-frame img").forEach(img => {
  img.addEventListener("error", () => {
    img.style.display = "none";

    const placeholder = document.createElement("div");

    placeholder.style.cssText = `
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;
      background: linear-gradient(135deg, #ffe0eb, #f9b9d1);
      color: #bd4779;
      font-family: 'Playfair Display', serif;
      font-size: 22px;
    `;

    placeholder.innerHTML = "<span>♡</span><span>Our memory</span>";

    img.parentElement.prepend(placeholder);
  });
});

// =========================================
// END
// =========================================

console.log("Birthday surprise for Kaoutahr is ready! 💗");