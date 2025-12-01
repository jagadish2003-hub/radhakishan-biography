// ========== THEME TOGGLE (LIGHT / DARK) ==========
const themeToggleBtn = document.getElementById("themeToggle");

function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
    themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    document.body.classList.remove("dark");
    themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

// Load theme from localStorage
const savedTheme = localStorage.getItem("rd_theme");
if (savedTheme === "dark") {
  setTheme(true);
} else {
  setTheme(false);
}

themeToggleBtn.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");
  setTheme(isDark);
  localStorage.setItem("rd_theme", isDark ? "dark" : "light");
});

// ========== REVEAL ON SCROLL ==========
const revealElements = document.querySelectorAll(".reveal");

function handleReveal() {
  const triggerBottom = window.innerHeight * 0.85;
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", handleReveal);
window.addEventListener("load", handleReveal);

// ========== RANDOM THOUGHT FEATURE ==========
const inspireBtn = document.getElementById("inspireBtn");
const randomThoughtText = document.getElementById("randomThoughtText");
const thoughtsGrid = document.getElementById("thoughtsGrid");

const thoughtCards = Array.from(
  thoughtsGrid.querySelectorAll(".thought-card")
);

function pickRandomThought() {
  if (thoughtCards.length === 0) return;

  // Remove previous highlight
  thoughtCards.forEach((card) => card.classList.remove("highlighted"));

  const visibleCards = thoughtCards.filter(
    (card) => card.style.display !== "none"
  );
  const pool = visibleCards.length > 0 ? visibleCards : thoughtCards;

  const randomIndex = Math.floor(Math.random() * pool.length);
  const chosen = pool[randomIndex];

  chosen.classList.add("highlighted");

  const text = chosen.querySelector("p")?.innerText ?? "";
  randomThoughtText.textContent = text;

  // Smooth scroll to random thought
  chosen.scrollIntoView({ behavior: "smooth", block: "center" });
}

inspireBtn.addEventListener("click", pickRandomThought);

// ========== SEARCH FILTER FOR THOUGHTS ==========
const searchInput = document.getElementById("thoughtSearch");
const filteredCount = document.getElementById("filteredCount");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;

  thoughtCards.forEach((card) => {
    const text = card.innerText.toLowerCase();
    if (text.includes(query)) {
      card.style.display = "";
      visible++;
    } else {
      card.style.display = "none";
    }
  });

  filteredCount.textContent = visible.toString();
});

// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.getElementById("backToTop");

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
