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

const pathSvg = document.getElementById("paths-svg");
if (pathSvg) {
  const pathObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          ["p1", "p2", "p3", "p4"].forEach((id, i) => {
            setTimeout(() => {
              document.getElementById(id)?.classList.add("drawn");
            }, i * 500);
          });
          pathObs.disconnect();
        }
      });
    },
    { threshold: 0.05 },
  );
  pathObs.observe(pathSvg);
}

const revObs = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal-up,.reveal-left2,.reveal-right2,.reveal-mob")
  .forEach((el) => revObs.observe(el));

const mobLayout = document.getElementById("mob-layout");
if (mobLayout) {
  new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          document.getElementById("mob-track")?.classList.add("drawn");
          obs.disconnect();
        }
      });
    },
    { threshold: 0.05 },
  ).observe(mobLayout);
}

document
  .querySelectorAll(".reveal-up,.reveal-left2,.reveal-right2,.reveal-mob")
  .forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.98)
      el.classList.add("visible");
  });
if (pathSvg && pathSvg.getBoundingClientRect().top < window.innerHeight)
  ["p1", "p2", "p3", "p4"].forEach((id, i) =>
    setTimeout(
      () => document.getElementById(id)?.classList.add("drawn"),
      i * 500,
    ),
  );
if (mobLayout && mobLayout.getBoundingClientRect().top < window.innerHeight)
  document.getElementById("mob-track")?.classList.add("drawn");
