// Very simple JavaScript for this assignment
// 1. Display the current year in the footer
const year = document.getElementById("year");
if (year) { year.textContent = new Date().getFullYear(); }

// 2. Show a comment preview (not submitted to a server)
const form = document.getElementById("commentForm");
if (form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const result = document.getElementById("formResult");
    if (name && message) {
      result.textContent = "Preview from " + name + ": " + message + " (not sent)";
      form.reset();
    }
  });
}

/* PORTFOLIO IMAGE LIGHTBOX */

const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

if (lightbox && lightboxImage && closeLightbox) {

  const portfolioImages =
    document.querySelectorAll(".project-image img");

  portfolioImages.forEach(function(img) {
    img.addEventListener("click", function() {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.classList.add("open");
    });
  });

  closeLightbox.addEventListener("click", function() {
    lightbox.classList.remove("open");
  });

  lightbox.addEventListener("click", function(event) {
    if (event.target === lightbox) {
      lightbox.classList.remove("open");
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      lightbox.classList.remove("open");
    }
  });

}

/* ==================================
   SCROLL REVEAL ANIMATION
================================== */

const revealElements = document.querySelectorAll(
  ".section, .project-card, .tile, .page-title"
);

revealElements.forEach(function(element) {
  element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    function(entries) {

      entries.forEach(function(entry) {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.08
    }
  );

  revealElements.forEach(function(element) {
    observer.observe(element);
  });

} else {

  revealElements.forEach(function(element) {
    element.classList.add("visible");
  });

}

/* =========================================
   ATHIQAH / ARCHIVE - MOTION EDITION
========================================= */

(function () {

  function startArchiveMotion() {

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* 01 - CINEMATIC HOMEPAGE INTRO */

    const hero = document.querySelector(".hero-composition");

    if (hero && !reduceMotion) {

      const items = hero.querySelectorAll(
        "h1, .hero-script, .hero-tagline, .portrait-frame"
      );

      items.forEach(function (item, index) {
        item.classList.add("archive-intro-item");

        item.style.setProperty(
          "--intro-delay",
          (index * 0.2) + "s"
        );
      });

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          items.forEach(function (item) {
            item.classList.add("intro-show");
          });
        });
      });

    }

    /* 02 - INTERACTIVE MOUSE SPOTLIGHT */

    if (hero && !reduceMotion) {

      hero.addEventListener("pointermove", function (event) {

        if (event.pointerType === "touch") return;

        const rect = hero.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        hero.style.setProperty("--mouse-x", x + "px");
        hero.style.setProperty("--mouse-y", y + "px");

      });

      hero.addEventListener("pointerleave", function () {
        hero.style.setProperty("--mouse-x", "50%");
        hero.style.setProperty("--mouse-y", "50%");
      });

    }

    /* 03 - PORTFOLIO IMAGE REVEAL */

    const images = document.querySelectorAll(
      ".project-image"
    );

    if (images.length && !reduceMotion) {

      images.forEach(function (item, index) {
        item.classList.add("archive-mask");

        item.style.setProperty(
          "--image-delay",
          (index % 2 * 0.12) + "s"
        );
      });

      if ("IntersectionObserver" in window) {

        const imageObserver = new IntersectionObserver(
          function (entries) {

            entries.forEach(function (entry) {

              if (entry.isIntersecting) {
                entry.target.classList.add("mask-show");
                imageObserver.unobserve(entry.target);
              }

            });

          },
          { threshold: 0.05 }
        );

        images.forEach(function (item) {
          imageObserver.observe(item);
        });

      } else {

        images.forEach(function (item) {
          item.classList.add("mask-show");
        });

      }

    }

    /* 04 - MOVING TYPOGRAPHY ON HOMEPAGE */

    if (hero && !document.querySelector(".archive-marquee")) {

      const marquee = document.createElement("div");
      marquee.className = "archive-marquee";
      marquee.setAttribute("aria-label",
        "Development, Design, Multimedia, Creativity"
      );

      const words =
        "<span>DEVELOPMENT</span><b>✳</b>" +
        "<span>DESIGN</span><b>✳</b>" +
        "<span>MULTIMEDIA</span><b>✳</b>" +
        "<span>CREATIVITY</span><b>✳</b>";

      marquee.innerHTML =
        '<div class="archive-marquee-track">' +
          '<div class="archive-marquee-content">' +
            words +
          '</div>' +
          '<div class="archive-marquee-content" aria-hidden="true">' +
            words +
          '</div>' +
        '</div>';

      hero.insertAdjacentElement("afterend", marquee);

    }

    /* 05 - SCROLL PROGRESS BAR */

    if (!document.querySelector(".archive-progress")) {

      const progress = document.createElement("div");
      progress.className = "archive-progress";
      progress.setAttribute("aria-hidden", "true");

      document.body.appendChild(progress);

      function updateProgress() {

        const scrollTop = window.scrollY;

        const scrollHeight =
          document.documentElement.scrollHeight -
          window.innerHeight;

        const percentage = scrollHeight > 0
          ? Math.min(1, scrollTop / scrollHeight)
          : 0;

        progress.style.transform =
          "scaleX(" + percentage + ")";

      }

      window.addEventListener("scroll", updateProgress, {
        passive: true
      });

      window.addEventListener("resize", updateProgress);

      updateProgress();

    }

  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      startArchiveMotion
    );
  } else {
    startArchiveMotion();
  }

})();

/* =========================================
   BIODATA INTERACTIVE EFFECTS
========================================= */

(function () {

  function initBiodataEffects() {

    // Only run on biodata.html
    if (!window.location.pathname.includes("biodata.html")) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* 1. Cinematic headings */

    document.querySelectorAll(
      ".page-title, .section h2"
    ).forEach(function (heading) {
      heading.classList.add("bio-animated-heading");
    });

    /* 2. 3D tilt skill cards */

    if (!reduceMotion) {

      const skillCards = document.querySelectorAll(
        ".skill-card, .skills-card"
      );

      skillCards.forEach(function (card) {

        card.classList.add("bio-tilt-card");

        card.addEventListener("mousemove", function (event) {

          const rect = card.getBoundingClientRect();

          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;

          const rotateY = (x - 0.5) * 8;
          const rotateX = (0.5 - y) * 8;

          card.style.transform =
            "perspective(900px) rotateX(" +
            rotateX + "deg) rotateY(" +
            rotateY + "deg)";

        });

        card.addEventListener("mouseleave", function () {
          card.style.transform = "";
        });

      });

    }

    /* 3. Experience glow */

    document.querySelectorAll(
      ".experience-item, .experience-card"
    ).forEach(function (item) {
      item.classList.add("bio-experience-glow");
    });

    /* 4. Timetable hover effect */

    document.querySelectorAll(".schedule-day")
    .forEach(function (row) {
      row.classList.add("bio-timetable-row");
    });

  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initBiodataEffects
    );
  } else {
    initBiodataEffects();
  }

})();

/* ========================================
   INTERACTIVE BIODATA TIMETABLE
======================================== */

(function () {

  function initTimetable() {

    // Run only on biodata page
    if (!location.pathname.includes("biodata.html")) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Find existing timetable day rows
    
const rows = Array.from(
  document.querySelectorAll(".schedule-day")
);


    if (!rows.length) return;

    const days = [
      "monday", "tuesday", "wednesday",
      "thursday", "friday"
    ];

    const today = new Date().toLocaleDateString(
      "en-US",
      { weekday: "long" }
    ).toLowerCase();

    let selectedRow = null;

    rows.forEach(function (row, index) {

      const day = days.find(function (name) {
        return row.textContent.toLowerCase().includes(name);
      });

      row.classList.add("tt-motion");

      row.style.setProperty(
        "--tt-delay",
        (index * 110) + "ms"
      );

      // Highlight today, only if it's a class day
      if (day === today) {
        const label = document.createElement("span");
        label.className = "tt-today-label";
        label.textContent = "TODAY";

        const dayHeading = Array.from(
          row.querySelectorAll("h3, h4, strong, .day-name")
        ).find(function (el) {
          return el.textContent.toLowerCase().includes(day);
        });

        if (dayHeading) {
          dayHeading.appendChild(label);
        }
      }

      // Spotlight follows pointer
      row.addEventListener("pointermove", function (event) {

        if (event.pointerType === "touch") return;

        const rect = row.getBoundingClientRect();

        row.style.setProperty(
          "--tt-x",
          (event.clientX - rect.left) + "px"
        );

        row.style.setProperty(
          "--tt-y",
          (event.clientY - rect.top) + "px"
        );
      });

      // Click once to focus; click again to reset
      row.addEventListener("click", function () {

        if (selectedRow === row) {
          selectedRow = null;
        } else {
          selectedRow = row;
        }

        rows.forEach(function (other) {
          other.classList.toggle(
            "tt-selected",
            other === selectedRow
          );

          other.classList.toggle(
            "tt-dimmed",
            selectedRow !== null && other !== selectedRow
          );
        });

      });

    });

    // Reveal only as timetable enters viewport
    if ("IntersectionObserver" in window && !reduceMotion) {

      const observer = new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("tt-visible");
              observer.unobserve(entry.target);
            }
          });

        },
        { threshold: 0.08 }
      );

      rows.forEach(function (row) {
        observer.observe(row);
      });

    } else {
      rows.forEach(function (row) {
        row.classList.add("tt-visible");
      });
    }

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTimetable);
  } else {
    initTimetable();
  }

})();
