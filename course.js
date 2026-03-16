const courseSections = [
  {
    id: "foundations",
    title: "Start with Style",
    lessons: [
      {
        id: "grounding-groove",
        title: "Grounding & groove basics",
        duration: "9 min",
        videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
        description:
          "Connect to the beat, find your natural bounce, and build the grounded base that makes every move look intentional.",
        takeaways: [
          "Learn a simple bounce pattern that works with almost any song.",
          "Discover where to place your weight so you feel stable and relaxed.",
          "Start releasing tension in your shoulders, neck, and face.",
        ],
      },
      {
        id: "hips-and-core",
        title: "Hips, core, and rhythm",
        duration: "11 min",
        videoSrc: "https://www.w3schools.com/html/movie.mp4",
        description:
          "Wake up your hips and core so you can add natural curves and texture without forcing it.",
        takeaways: [
          "Explore small, controlled hip motions that still read clearly.",
          "Use your core to support sexy movement without strain.",
          "Practice slow drills that make fast music feel easier later.",
        ],
      },
    ],
  },
  {
    id: "club-flow",
    title: "Club Flow Basics",
    lessons: [
      {
        id: "loop-1",
        title: "A simple loop you can repeat all night",
        duration: "10 min",
        videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
        description:
          "Build a 4-count loop that you can repeat on any dance floor without ever feeling like you’re out of moves.",
        takeaways: [
          "Combine groove, steps, and a touch of upper-body styling.",
          "Learn how to subtly switch directions so you never feel stuck.",
          "See how small variations make one combo feel like many.",
        ],
      },
      {
        id: "loop-2",
        title: "Slow, sexy loop for R&B nights",
        duration: "8 min",
        videoSrc: "https://www.w3schools.com/html/movie.mp4",
        description:
          "Dial into a smoother, slower loop that fits R&B, Afrobeats, and anything with a sultry groove.",
        takeaways: [
          "Practice timing your weight shifts to the bass.",
          "Use arms and eyes to add intimacy without overdoing it.",
          "Understand how to keep your movement interesting in place.",
        ],
      },
    ],
  },
  {
    id: "at-home-practice",
    title: "At-Home Practice Sessions",
    lessons: [
      {
        id: "follow-along-1",
        title: "Follow-along practice: living room session",
        duration: "15 min",
        videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
        description:
          "A no-pressure, follow-along session you can put on anytime to cement your new style into muscle memory.",
        takeaways: [
          "String together everything you’ve learned into one smooth session.",
          "Feel what it’s like to stop thinking and just move.",
          "Start building the confidence that carries straight into the club.",
        ],
      },
    ],
  },
];

let currentSectionIndex = 0;
let currentLessonIndex = 0;

function setCurrentLesson(sectionIndex, lessonIndex) {
  currentSectionIndex = sectionIndex;
  currentLessonIndex = lessonIndex;
  renderSidebar();
  renderLesson();
}

function renderSidebar() {
  const container = document.getElementById("course-sidebar-inner");
  if (!container) return;
  container.innerHTML = "";

  courseSections.forEach((section, sIdx) => {
    const sectionEl = document.createElement("section");
    sectionEl.className = "course-section";

    const title = document.createElement("h2");
    title.className = "course-section-title";
    title.textContent = section.title;
    sectionEl.appendChild(title);

    const ul = document.createElement("ul");
    ul.className = "lesson-list";

    section.lessons.forEach((lesson, lIdx) => {
      const li = document.createElement("li");
      li.className = "lesson-item";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "lesson-button";
      if (sIdx === currentSectionIndex && lIdx === currentLessonIndex) {
        btn.classList.add("is-active");
      }
      btn.innerHTML = `
        <div>
          <div class="lesson-label">${lesson.title}</div>
          <div class="lesson-meta-small">${lesson.duration}</div>
        </div>
        <div class="lesson-progress-dot"></div>
      `;
      btn.addEventListener("click", () => setCurrentLesson(sIdx, lIdx));
      li.appendChild(btn);
      ul.appendChild(li);
    });

    sectionEl.appendChild(ul);
    container.appendChild(sectionEl);
  });
}

function renderLesson() {
  const section = courseSections[currentSectionIndex];
  const lesson = section.lessons[currentLessonIndex];
  const titleEl = document.getElementById("lesson-title");
  const descEl = document.getElementById("lesson-description");
  const takeawaysEl = document.getElementById("lesson-takeaways");
  const videoSource = document.getElementById("lesson-video-source");
  const videoEl = document.getElementById("lesson-video");

  if (!titleEl || !descEl || !takeawaysEl || !videoSource || !videoEl) return;

  titleEl.textContent = lesson.title;
  descEl.textContent = lesson.description;
  takeawaysEl.innerHTML = "";
  (lesson.takeaways || []).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    takeawaysEl.appendChild(li);
  });

  videoSource.src = lesson.videoSrc || "";
  videoEl.load();
}

function goToPrevLesson() {
  if (currentLessonIndex > 0) {
    setCurrentLesson(currentSectionIndex, currentLessonIndex - 1);
    return;
  }
  if (currentSectionIndex > 0) {
    const prevSectionIndex = currentSectionIndex - 1;
    const prevLessons = courseSections[prevSectionIndex].lessons;
    setCurrentLesson(prevSectionIndex, prevLessons.length - 1);
  }
}

function goToNextLesson() {
  const lessons = courseSections[currentSectionIndex].lessons;
  if (currentLessonIndex < lessons.length - 1) {
    setCurrentLesson(currentSectionIndex, currentLessonIndex + 1);
    return;
  }
  if (currentSectionIndex < courseSections.length - 1) {
    setCurrentLesson(currentSectionIndex + 1, 0);
  }
}

function initCoursePage() {
  protectCoursePage();
  if (!hasActiveMembership()) {
    return;
  }
  renderSidebar();
  renderLesson();

  const prevBtn = document.getElementById("prev-lesson");
  const nextBtn = document.getElementById("next-lesson");
  if (prevBtn) {
    prevBtn.addEventListener("click", goToPrevLesson);
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", goToNextLesson);
  }
}

document.addEventListener("DOMContentLoaded", initCoursePage);

