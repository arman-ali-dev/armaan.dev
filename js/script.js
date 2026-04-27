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
