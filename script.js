const message = `Happy 1st Mensive, sayang Nani!!!

I hope we could be together more longer!!!

Thank you for being part of my days,
for every little moment, every laugh,
and every memory we've made together.

I hope we can keep creating beautiful
memories and growing together.

Nani loves you so much!!!

Here's to our first month,
and hopefully many more months to come.

I love you. ♡`;

const openBtn = document.getElementById("openBtn");
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const typingText = document.getElementById("typingText");
let typingStarted = false;
let typingIndex = 0;

function typeMessage() {
  if (typingIndex < message.length) {
    typingText.textContent += message.charAt(typingIndex);
    const char = message.charAt(typingIndex++);
    setTimeout(typeMessage, char === "\n" ? 300 : 38);
  } else {
    typingText.classList.remove("typing");
  }
}

openBtn.addEventListener("click", () => {
  envelope.classList.add("hidden");
  letter.classList.remove("hidden");
  if (!typingStarted) {
    typingStarted = true;
    typingText.classList.add("typing");
    typeMessage();
  }
});

// Music: use an audio file you are allowed to use.
// The player seeks to 03:39 and stops at 05:05.
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicHint = document.getElementById("musicHint");
const START_TIME = 3 * 60 + 39;
const END_TIME = 5 * 60 + 5;
let isPlaying = false;

musicBtn.addEventListener("click", async () => {
  if (!isPlaying) {
    try {
      if (music.currentTime < START_TIME || music.currentTime >= END_TIME) {
        music.currentTime = START_TIME;
      }
      await music.play();
      isPlaying = true;
      musicBtn.textContent = "Ⅱ";
      musicHint.textContent = "Now playing ♡";
    } catch (error) {
      musicHint.textContent = "Add your audio file to assets/love-wave-to-earth.mp3 first.";
    }
  } else {
    music.pause();
    isPlaying = false;
    musicBtn.textContent = "▶";
    musicHint.textContent = "Music paused.";
  }
});

music.addEventListener("timeupdate", () => {
  if (music.currentTime >= END_TIME) {
    music.pause();
    music.currentTime = END_TIME;
    isPlaying = false;
    musicBtn.textContent = "▶";
    musicHint.textContent = "A little song for you ♡";
  }
});
music.addEventListener("ended", () => {
  isPlaying = false;
  musicBtn.textContent = "▶";
});

// QR uses the current page URL. A public QR is useful only after deployment.
const qrContainer = document.getElementById("qrcode");
const qrDescription = document.getElementById("qrDescription");
const qrWarning = document.getElementById("qrWarning");
const currentURL = window.location.href;
const isLocal = location.protocol === "file:" || location.hostname === "localhost" || location.hostname === "127.0.0.1";

if (typeof QRCode !== "undefined" && !isLocal) {
  new QRCode(qrContainer, {
    text: currentURL,
    width: 150,
    height: 150,
    colorDark: "#454545",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
  qrDescription.textContent = "Scan this code to open our little memory.";
} else {
  qrContainer.textContent = "QR appears after publishing";
  qrDescription.textContent = "Publish this website online first. The QR code will then use your public website address.";
  qrWarning.textContent = "A QR code made from a local preview cannot be opened by someone on another phone.";
}

document.getElementById("copyLink").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(currentURL);
    qrWarning.textContent = "Link copied!";
  } catch {
    qrWarning.textContent = "Copy unavailable here. Copy the address from your browser.";
  }
});

// Subtle floating decorative symbols
function createFloatingSymbol() {
  const symbol = document.createElement("span");
  symbol.textContent = Math.random() > 0.5 ? "♡" : "✦";
  Object.assign(symbol.style, {
    position: "fixed",
    left: `${Math.random() * 100}vw`,
    bottom: "-20px",
    color: "#aaa",
    opacity: ".45",
    fontSize: `${10 + Math.random() * 12}px`,
    pointerEvents: "none",
    zIndex: "0",
    transition: "transform 7s linear, opacity 7s linear"
  });
  document.body.appendChild(symbol);
  requestAnimationFrame(() => {
    symbol.style.transform = `translateY(-${innerHeight + 50}px)`;
    symbol.style.opacity = "0";
  });
  setTimeout(() => symbol.remove(), 7200);
}
setInterval(createFloatingSymbol, 1100);
