const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const topbar = document.getElementById("topbar");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

window.addEventListener("scroll", () => {
  if (!topbar) return;
  topbar.classList.toggle("scrolled", window.scrollY > 15);
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length) {
  const observer = new IntersectionObserver(
    (entries, observerRef) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerRef.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

const slider = document.getElementById("testimonialSlider");
const dotsWrap = document.getElementById("sliderDots");

if (slider && dotsWrap) {
  const slides = Array.from(slider.querySelectorAll(".quote"));
  let activeIndex = 0;

  const setActive = (index) => {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    Array.from(dotsWrap.children).forEach((dot, i) => dot.classList.toggle("active", i === index));
    activeIndex = index;
  };

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `عرض رأي رقم ${i + 1}`);
    dot.addEventListener("click", () => setActive(i));
    dotsWrap.appendChild(dot);
  });

  setActive(0);

  setInterval(() => {
    setActive((activeIndex + 1) % slides.length);
  }, 4500);
}
