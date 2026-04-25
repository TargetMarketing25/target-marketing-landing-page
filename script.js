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

const faqItems = Array.from(document.querySelectorAll(".faq-item"));

if (faqItems.length) {
  let faqIdCounter = 0;

  const closeItem = (item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!button || !answer) return;

    button.setAttribute("aria-expanded", "false");
    item.classList.remove("open");

    const startHeight = `${answer.scrollHeight}px`;
    answer.style.maxHeight = startHeight;

    requestAnimationFrame(() => {
      answer.style.maxHeight = "0px";
    });

    const onCloseEnd = (event) => {
      if (event.propertyName !== "max-height") return;
      answer.hidden = true;
      answer.removeEventListener("transitionend", onCloseEnd);
    };

    answer.addEventListener("transitionend", onCloseEnd);
  };

  const openItem = (item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!button || !answer) return;

    answer.hidden = false;
    answer.style.maxHeight = "0px";

    requestAnimationFrame(() => {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    });

    const onOpenEnd = (event) => {
      if (event.propertyName !== "max-height") return;
      if (item.classList.contains("open")) {
        answer.style.maxHeight = "none";
      }
      answer.removeEventListener("transitionend", onOpenEnd);
    };

    answer.addEventListener("transitionend", onOpenEnd);
  };

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!button || !answer) return;

    faqIdCounter += 1;
    const answerId = `faq-answer-${faqIdCounter}`;
    answer.id = answerId;
    button.setAttribute("aria-controls", answerId);

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("open")) {
          closeItem(otherItem);
        }
      });

      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });

    if (window.PointerEvent) {
      button.addEventListener("pointerup", (event) => {
        if (event.pointerType === "touch") {
          event.preventDefault();
          button.click();
        }
      });
    }
  });
}
