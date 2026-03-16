const STORAGE_KEY = "ebaby_user";

function getUser() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setUser(user) {
  if (!user) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function isLoggedIn() {
  return !!getUser();
}

function hasActiveMembership() {
  const user = getUser();
  return !!(user && user.hasActiveMembership);
}

function initNav() {
  const page = document.body.getAttribute("data-page");
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    const name = link.getAttribute("data-nav");
    if (name === page) {
      link.classList.add("is-active");
    }
  });
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function protectCoursePage() {
  const locked = document.getElementById("course-locked");
  const content = document.getElementById("course-content");
  if (!locked || !content) return;

  if (hasActiveMembership()) {
    locked.classList.add("hidden");
    content.classList.remove("hidden");
  } else {
    locked.classList.remove("hidden");
    content.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", initNav);

