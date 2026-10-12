const loveStages = [
  { value: "100%", progress: 24, status: "두근두근... 측정 시작!" },
  { value: "500%", progress: 48, status: "아직 더 큰 것 같은데?" },
  { value: "9,999%", progress: 76, status: "계산기가 따라가지 못하고 있어!" },
  { value: "∞%", progress: 100, status: "측정 불가! 사랑이 무한대야!" }
];

const mainCard = document.getElementById("mainCard");
const finalCard = document.getElementById("finalCard");
const appContainer = document.querySelector(".app-container");
const headerTag = document.getElementById("headerTag");
const mainTitle = document.getElementById("mainTitle");
const mainSubtitle = document.getElementById("mainSubtitle");
const guessForm = document.getElementById("guessForm");
const loveGuess = document.getElementById("loveGuess");
const meterBox = document.getElementById("meterBox");
const meterValue = document.getElementById("meterValue");
const guessResult = document.getElementById("guessResult");
const meterTrack = document.getElementById("meterTrack");
const meterProgress = document.getElementById("meterProgress");
const meterStatus = document.getElementById("meterStatus");
const actionBtn = document.getElementById("actionBtn");
const hugBtn = document.getElementById("hugBtn");
const resetBtn = document.getElementById("resetBtn");
const floatingHeartsContainer = document.getElementById("floatingHearts");
const heartRain = document.getElementById("heartRain");
const heartBurst = document.getElementById("heartBurst");

function startHeartRain() {
  const hearts = ["💙", "🩵", "🤍"];

  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");
    heart.className = "rain-heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 14}px`;
    heart.style.animationDuration = `${6 + Math.random() * 6}s`;
    heart.style.animationDelay = `${-Math.random() * 12}s`;
    heart.style.setProperty("--drift", `${Math.random() * 100 - 50}px`);
    heartRain.appendChild(heart);
  }
}

startHeartRain();

loveGuess.addEventListener("input", () => {
  loveGuess.setCustomValidity("");
});

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

function createHeartBurst() {
  const hearts = ["💙", "🩵", "🤍", "💙", "✨"];
  const spreadX = window.innerWidth * 0.58;
  const spreadY = window.innerHeight * 0.58;

  for (let i = 0; i < 64; i++) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.setProperty("--x", `${(Math.random() * 2 - 1) * spreadX}px`);
    heart.style.setProperty("--y", `${(Math.random() * 2 - 1) * spreadY}px`);
    heart.style.setProperty("--size", `${16 + Math.random() * 24}px`);
    heart.style.setProperty("--delay", `${Math.random() * 0.22}s`);
    heart.style.setProperty("--rotation", `${Math.random() * 100 - 50}deg`);
    heartBurst.appendChild(heart);
  }
}

guessForm.addEventListener("submit", async event => {
  event.preventDefault();
  const guess = loveGuess.value.trim();

  if (!guess) {
    loveGuess.setCustomValidity("얼마나 사랑하는지 먼저 적어줘!");
    loveGuess.reportValidity();
    return;
  }

  loveGuess.setCustomValidity("");
  loveGuess.disabled = true;
  actionBtn.disabled = true;
  actionBtn.textContent = "사랑 측정 중... 💙";
  headerTag.textContent = "MEASURING LOVE";
  mainTitle.textContent = "입력한 예상보다 더 클지도 몰라!";
  mainSubtitle.textContent = "진지하게 사랑의 크기를 측정하고 있어...";
  guessResult.textContent = `너의 예상: ${guess}`;
  meterBox.hidden = false;
  mainCard.classList.add("is-measuring");

  for (const stage of loveStages) {
    meterValue.textContent = stage.value;
    meterStatus.textContent = stage.status;
    meterProgress.style.width = `${stage.progress}%`;
    meterTrack.setAttribute("aria-valuenow", String(stage.progress));
    await wait(680);
  }

  mainCard.classList.remove("is-measuring");
  mainCard.classList.add("meter-exploding");
  createHeartBurst();
  await wait(950);

  mainCard.style.display = "none";
  appContainer.classList.add("final-layout");
  mainCard.classList.remove("meter-exploding");
  finalCard.style.display = "flex";
  createHeartParticles(24);
  await wait(500);
  heartBurst.replaceChildren();
});

// HUG ME? 버튼 클릭 인터랙션
hugBtn.addEventListener("click", () => {
  hugBtn.textContent = "약속이다! 💙";
  createHeartParticles(10);
});

resetBtn.addEventListener("click", () => {
  finalCard.style.display = "none";
  appContainer.classList.remove("final-layout");
  mainCard.style.display = "flex";

  headerTag.textContent = "LOVE METER";
  mainTitle.textContent = "나연이는 소진언니를 얼마나 사랑할까?";
  mainSubtitle.textContent = "먼저 얼마나 사랑할지 예상해 봐!";
  loveGuess.value = "";
  loveGuess.disabled = false;
  actionBtn.disabled = false;
  actionBtn.textContent = "예상하고 측정하기 💙";
  meterBox.hidden = true;
  meterValue.textContent = "100%";
  guessResult.textContent = "";
  meterStatus.textContent = "사랑을 측정하고 있어...";
  meterProgress.style.width = "0";
  meterTrack.setAttribute("aria-valuenow", "0");
  hugBtn.textContent = "나랑 평생 만날래? 그럼 이 버튼을 눌러요!";
  heartBurst.replaceChildren();
});

// 배경에 떠오르는 하트 애니메이션 함수
function createHeartParticles(count = 5) {
  const symbols = ["💙", "🩵", "🤍"];
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = Math.random() * 90 + 5 + "%";
    particle.style.animationDuration = (Math.random() * 1.5 + 2) + "s";
    
    floatingHeartsContainer.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 3000);
  }
}
