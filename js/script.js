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

// Work filter
const workFilterBtns = document.querySelectorAll(".work-filter-btn");
const workGrid = document.getElementById("work-grid");
const workEmpty = document.getElementById("work-empty");

// Set "All" active by default
document
  .querySelector('.work-filter-btn[data-filter="all"]')
  .classList.add("active");

workFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    workFilterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    const cards = workGrid.querySelectorAll(".work-card");
    let visibleCount = 0;

    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      if (match) {
        card.classList.remove("work-hide");
        card.style.display = "";
        requestAnimationFrame(() => card.classList.add("work-show"));
        setTimeout(() => card.classList.remove("work-show"), 500);
        // featured card col-span only on "all"
        if (
          card.dataset.category === "fullstack" &&
          card.classList.contains("sm:col-span-2")
        ) {
          card.classList.toggle("sm:col-span-2", filter === "all");
        }
        visibleCount++;
      } else {
        card.classList.add("work-hide");
        setTimeout(() => {
          card.style.display = "none";
          card.classList.remove("work-hide");
        }, 260);
      }
    });

    workEmpty?.classList.toggle("hidden", visibleCount > 0);
  });
});

// Skills bar fill on scroll
const skillObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".skill-fill").forEach((bar) => {
          bar.style.width = bar.dataset.width;
        });
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

document
  .querySelectorAll(".skills-card")
  .forEach((card) => skillObserver.observe(card));
