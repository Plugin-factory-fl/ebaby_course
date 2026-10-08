const STORAGE_KEY = "ebaby_user";

// Swap this for the live Stripe Payment Link when it's ready.
const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/REPLACE_ME";

// Swap this for the live Calendly/Stripe booking link when it's ready.
const BOOKING_URL = "https://REPLACE_ME_BOOKING_LINK";

// Set this to a form service endpoint that accepts file uploads
// (Formspree, Basin, etc.) and delivers to email.
const FEEDBACK_FORM_ENDPOINT = "";

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
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const navCta = document.querySelector(".nav-cta");
  if (navCta) {
    if (hasActiveMembership()) {
      navCta.classList.add("hidden");
    } else {
      navCta.classList.remove("hidden");
    }
  }

  initFloatingCta(page);
  initStripeCheckoutLinks();
  initBookingLinks();
  initFeedbackForm();
}

function initStripeCheckoutLinks() {
  document.querySelectorAll("[data-stripe-checkout]").forEach((el) => {
    el.setAttribute("href", STRIPE_CHECKOUT_URL);
  });
}

function initBookingLinks() {
  document.querySelectorAll("[data-booking-link]").forEach((el) => {
    el.setAttribute("href", BOOKING_URL);
  });
}

function initFeedbackForm() {
  const form = document.getElementById("feedback-form");
  if (!form) return;

  const fileInput = document.getElementById("feedback-video");
  const fileName = document.getElementById("feedback-filename");
  const status = document.getElementById("feedback-status");

  fileInput.addEventListener("change", () => {
    const file = fileInput.files && fileInput.files[0];
    fileName.textContent = file ? file.name : "No video selected";
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = String(form.elements.name.value || "").trim();
    const email = String(form.elements.email.value || "").trim();
    const video = fileInput.files && fileInput.files[0];

    if (!name || !email || !video) {
      status.textContent = "Please add your name, email, and a video.";
      status.className = "feedback-status is-error";
      return;
    }

    if (!FEEDBACK_FORM_ENDPOINT) {
      status.textContent = "Video uploads are coming soon.";
      status.className = "feedback-status is-pending";
      return;
    }

    try {
      const body = new FormData(form);
      const res = await fetch(FEEDBACK_FORM_ENDPOINT, {
        method: "POST",
        body,
      });
      if (!res.ok) throw new Error("submit failed");
      status.textContent = "Thanks — your video was sent.";
      status.className = "feedback-status is-success";
      form.reset();
      fileName.textContent = "No video selected";
    } catch {
      status.textContent = "Something went wrong. Please try again.";
      status.className = "feedback-status is-error";
    }
  });
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

function initFloatingCta(page) {
  const existing = document.getElementById("floating-membership-cta");
  if (existing) {
    existing.remove();
  }
  const shouldShow = !hasActiveMembership() && (page === "home" || page === "course");
  if (!shouldShow) return;

  const btn = document.createElement("a");
  btn.id = "floating-membership-cta";
  btn.href = "account.html?start=1";
  btn.className = "btn btn-primary floating-cta";
  btn.textContent = "Enroll now";
  document.body.appendChild(btn);
}

document.addEventListener("DOMContentLoaded", initNav);

