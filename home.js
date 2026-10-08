const INSTAGRAM_REELS = [
  {
    id: "Dd_5dkWMBvK",
    src: "assets/videos/Dd_5dkWMBvK.mp4",
    poster: "assets/videos/posters/Dd_5dkWMBvK.jpg",
    instagramUrl: "https://www.instagram.com/ebabyofficial/reel/Dd_5dkWMBvK/",
  },
  {
    id: "DZLOo7ZTado",
    src: "assets/videos/DZLOo7ZTado.mp4",
    poster: "assets/videos/posters/DZLOo7ZTado.jpg",
    instagramUrl: "https://www.instagram.com/ebabyofficial/reel/DZLOo7ZTado/",
  },
  {
    id: "DZDIRfJO8Yi",
    src: "assets/videos/DZDIRfJO8Yi.mp4",
    poster: "assets/videos/posters/DZDIRfJO8Yi.jpg",
    instagramUrl: "https://www.instagram.com/ebabyofficial/reel/DZDIRfJO8Yi/",
  },
  {
    id: "DYpQIntOJmw",
    src: "assets/videos/DYpQIntOJmw.mp4",
    poster: "assets/videos/posters/DYpQIntOJmw.jpg",
    instagramUrl: "https://www.instagram.com/ebabyofficial/reel/DYpQIntOJmw/",
  },
  {
    id: "DUI4J8ODbAD",
    src: "assets/videos/DUI4J8ODbAD.mp4",
    poster: "assets/videos/posters/DUI4J8ODbAD.jpg",
    instagramUrl: "https://www.instagram.com/ebabyofficial/reel/DUI4J8ODbAD/",
  },
];

const INSTAGRAM_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initInstagramCarousel() {
  const section = document.querySelector("[data-instagram-section]");
  const track = document.querySelector("[data-instagram-track]");
  const dotsWrap = document.querySelector("[data-instagram-dots]");
  const prevBtn = document.querySelector("[data-instagram-prev]");
  const nextBtn = document.querySelector("[data-instagram-next]");
  if (!section || !track || !dotsWrap) return;

  const videos = [];
  let currentIndex = 0;
  let isInView = false;
  let scrollingProgrammatically = false;

  INSTAGRAM_REELS.forEach((reel, index) => {
    const card = document.createElement("article");
    card.className = "instagram-card" + (index === 0 ? " is-active" : "");
    card.dataset.index = String(index);

    const video = document.createElement("video");
    video.src = reel.src;
    video.poster = reel.poster;
    video.muted = true;
    video.playsInline = true;
    video.preload = "none";
    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "");
    video.setAttribute("aria-label", `Instagram reel ${index + 1}`);

    const igLink = document.createElement("a");
    igLink.className = "instagram-card-link";
    igLink.href = reel.instagramUrl;
    igLink.target = "_blank";
    igLink.rel = "noreferrer";
    igLink.setAttribute("aria-label", "View this reel on Instagram");
    igLink.innerHTML = INSTAGRAM_ICON;

    card.appendChild(video);
    card.appendChild(igLink);
    track.appendChild(card);
    videos.push(video);

    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      if (index !== currentIndex) {
        goTo(index);
      } else if (video.paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });

    video.addEventListener("ended", () => {
      if (!isInView || prefersReducedMotion()) return;
      goTo((index + 1) % INSTAGRAM_REELS.length);
    });

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "instagram-dot" + (index === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", `Go to video ${index + 1}`);
    dot.addEventListener("click", () => goTo(index));
    dotsWrap.appendChild(dot);
  });

  function pauseAll() {
    videos.forEach((video) => {
      if (!video.paused) video.pause();
    });
  }

  function playCurrent() {
    if (prefersReducedMotion() || !isInView) return;
    const video = videos[currentIndex];
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }

  function scrollToCurrent() {
    const card = track.children[currentIndex];
    if (!card) return;
    scrollingProgrammatically = true;
    const left = card.offsetLeft - track.offsetWidth / 2 + card.offsetWidth / 2;
    track.scrollTo({
      left,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
    window.setTimeout(() => {
      scrollingProgrammatically = false;
    }, 400);
  }

  function updateActive() {
    Array.from(track.children).forEach((card, index) => {
      card.classList.toggle("is-active", index === currentIndex);
    });
    Array.from(dotsWrap.children).forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  }

  function goTo(index) {
    pauseAll();
    currentIndex = (index + INSTAGRAM_REELS.length) % INSTAGRAM_REELS.length;
    updateActive();
    scrollToCurrent();
    playCurrent();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => goTo(currentIndex + 1));
  }

  track.addEventListener("scroll", () => {
    if (scrollingProgrammatically) return;
    const center = track.scrollLeft + track.offsetWidth / 2;
    let nearest = 0;
    let nearestDist = Infinity;
    Array.from(track.children).forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = index;
      }
    });
    if (nearest !== currentIndex) {
      pauseAll();
      currentIndex = nearest;
      updateActive();
      if (isInView && !prefersReducedMotion()) {
        const video = videos[currentIndex];
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      }
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isInView = entry.isIntersecting && entry.intersectionRatio >= 0.4;
        if (isInView) {
          playCurrent();
        } else {
          pauseAll();
        }
      });
    },
    { threshold: [0, 0.4, 0.5, 1] }
  );
  observer.observe(section);
}

document.addEventListener("DOMContentLoaded", () => {
  const previewLink = document.querySelector('a[href="#course-preview"]');
  if (previewLink) {
    previewLink.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById("course-preview");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
  initInstagramCarousel();
});
