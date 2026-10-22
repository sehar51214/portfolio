// =========================================
// 1. FOOTER YEAR
// =========================================
document.getElementById("year").textContent = new Date().getFullYear();


// =========================================
// 2. DARK (default) / LIGHT THEME
// =========================================
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Dark is the default. Use saved choice only if the user picked one before.
applyTheme(localStorage.getItem("theme") || "dark");

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});


// =========================================
// 3. TYPEWRITER EFFECT (name + roles)
// =========================================
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function typeText(element, text, speed = 90) {
  return new Promise((resolve) => {
    if (reduceMotion) {
      element.textContent = text;
      return resolve();
    }
    let i = 0;
    const timer = setInterval(() => {
      element.textContent = text.slice(0, ++i);
      if (i === text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

function deleteText(element, speed = 50) {
  return new Promise((resolve) => {
    const text = element.textContent;
    let i = text.length;
    const timer = setInterval(() => {
      element.textContent = text.slice(0, --i);
      if (i === 0) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

const nameEl = document.getElementById("typed-name");
const roleEl = document.getElementById("typed-role");
const roles = [
  "Android Developer",
  "AI & LLM Enthusiast",
  "Full-Stack Developer",
  "Kotlin & Jetpack Compose",
];

async function runHeroAnimation() {
  await typeText(nameEl, "Sehar Batool", 110);

  // Keep the name cursor blinking for a moment, then hide it
  setTimeout(() => {
    const nameCursor = document.getElementById("name-cursor");
    if (nameCursor) nameCursor.style.display = "none";
  }, 1500);

  if (reduceMotion) {
    roleEl.textContent = roles[0];
    return;
  }

  // Loop through roles forever: type, pause, delete
  let index = 0;
  while (true) {
    await typeText(roleEl, roles[index], 70);
    await new Promise((r) => setTimeout(r, 1600));
    await deleteText(roleEl, 40);
    index = (index + 1) % roles.length;
  }
}

runHeroAnimation();


// =========================================
// 4. HEADER SHADOW ON SCROLL
// =========================================
const header = document.getElementById("site-header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
});


// =========================================
// 5. MOBILE HAMBURGER MENU
// =========================================
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

function closeMenu() {
  navMenu.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});


// =========================================
// 6. SCROLL REVEAL (sections fade up as you scroll)
// =========================================
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  // Old browsers: just show everything
  revealEls.forEach((el) => el.classList.add("visible"));
}


// =========================================
// 7. PROJECT MODAL
// =========================================
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalLink = document.getElementById("modal-link");
const modalClose = modal.querySelector(".modal-close");

function openModal(title, desc, link) {
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalLink.href = link;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function hideModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".project-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    openModal(btn.dataset.title, btn.dataset.desc, btn.dataset.link);
  });
});

modalClose.addEventListener("click", hideModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) hideModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideModal();
});