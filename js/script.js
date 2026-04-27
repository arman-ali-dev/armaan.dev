const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("menu-overlay");
const closeBtn = document.getElementById("close-menu");

function openMenu() {
  hamburger.classList.add("active");
  mobileMenu.classList.add("open");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeMenu() {
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("open");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", () =>
  mobileMenu.classList.contains("open") ? closeMenu() : openMenu(),
);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal-left, .reveal-up, .reveal-scale")
  .forEach((el) => revealObserver.observe(el));
