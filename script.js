const events = [
  {
    id: 1,
    title: "CodeSprint Challenge",
    category: "Technology",
    date: "28 Nov 2026",
    venue: "Computer Lab 2",
    description: "A friendly coding challenge to solve problems, share ideas and learn together."
  },
  {
    id: 2,
    title: "Campus Photography Walk",
    category: "Cultural",
    date: "30 Nov 2026",
    venue: "Main Campus",
    description: "Explore campus through your camera and share your creative perspective."
  },
  {
    id: 3,
    title: "Inter-Department Football",
    category: "Sports",
    date: "02 Dec 2026",
    venue: "College Ground",
    description: "Bring your team spirit to an exciting inter-department tournament."
  },
  {
    id: 4,
    title: "Creative Web Workshop",
    category: "Workshop",
    date: "04 Dec 2026",
    venue: "Innovation Hub",
    description: "Learn the basics of creating attractive and accessible web pages."
  },
  {
    id: 5,
    title: "Rhythm & Culture Night",
    category: "Cultural",
    date: "06 Dec 2026",
    venue: "Open Auditorium",
    description: "Enjoy an evening of music, dance and student performances."
  },
  {
    id: 6,
    title: "AI Idea Showcase",
    category: "Technology",
    date: "09 Dec 2026",
    venue: "Seminar Hall",
    description: "Present creative AI ideas and get inspired by fellow innovators."
  }
];

const eventGrid = document.getElementById("eventGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const registrationList = document.getElementById("registrationList");
const savedCount = document.getElementById("savedCount");
const eventCount = document.getElementById("eventCount");
const toast = document.getElementById("toast");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function getRegistrations() {
  try {
    return JSON.parse(
      localStorage.getItem("campusConnectRegistrations")
    ) || [];
  } catch (error) {
    return [];
  }
}

function saveRegistrations(items) {
  localStorage.setItem(
    "campusConnectRegistrations",
    JSON.stringify(items)
  );
}

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function renderEvents() {

  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredEvents = events.filter((event) => {

    const matchesCategory =
      selectedCategory === "all" ||
      event.category === selectedCategory;

    const searchableText =
      `${event.title} ${event.category} ${event.description} ${event.venue}`.toLowerCase();

    return matchesCategory &&
      searchableText.includes(searchTerm);
  });

  const registeredIds = getRegistrations().map(
    item => item.id
  );

  eventCount.textContent =
    `${String(filteredEvents.length).padStart(2, "0")} EVENTS`;

  if (filteredEvents.length === 0) {
    eventGrid.innerHTML =
      '<div class="empty-state">No events found. Try another search or category.</div>';
    return;
  }

  eventGrid.innerHTML = filteredEvents.map((event, index) => {

    const isRegistered = registeredIds.includes(event.id);

    return `
      <article class="event-card">

        <div class="event-top">
          <span class="event-tag">${event.category}</span>
          <span class="event-number">0${index + 1}</span>
        </div>

        <h3>${event.title}</h3>

        <p>${event.description}</p>

        <div class="event-meta">
          <span>▦ ${event.date}</span>
          <span>⌖ ${event.venue}</span>
        </div>

        <button
          class="${isRegistered ? "registered" : ""}"
          data-event-id="${event.id}">

          ${isRegistered
            ? "✓ Registered — Cancel"
            : "Register for event →"}

        </button>

      </article>
    `;

  }).join("");
}

function renderRegistrations() {

  const registrations = getRegistrations();

  savedCount.textContent = registrations.length;

  if (registrations.length === 0) {

    registrationList.innerHTML =
      '<div class="registration-empty">You have not joined any events yet. Explore the events above to get started!</div>';

    return;
  }

  registrationList.innerHTML = registrations.map((event) => {

    return `
      <div class="registration-item">

        <div>
          <strong>${event.title}</strong>
          <small>${event.date} · ${event.venue}</small>
        </div>

        <button data-cancel-id="${event.id}">
          Cancel
        </button>

      </div>
    `;

  }).join("");
}

function toggleRegistration(id) {

  const event = events.find(
    item => item.id === Number(id)
  );

  if (!event) return;

  let registrations = getRegistrations();

  const alreadyRegistered = registrations.some(
    item => item.id === event.id
  );

  registrations = alreadyRegistered
    ? registrations.filter(item => item.id !== event.id)
    : [...registrations, event];

  saveRegistrations(registrations);

  renderEvents();
  renderRegistrations();

  showToast(
    alreadyRegistered
      ? "Registration cancelled."
      : "You're registered for this event!"
  );
}

eventGrid.addEventListener("click", (event) => {

  const button = event.target.closest("[data-event-id]");

  if (button) {
    toggleRegistration(button.dataset.eventId);
  }

});

registrationList.addEventListener("click", (event) => {

  const button = event.target.closest("[data-cancel-id]");

  if (button) {
    toggleRegistration(button.dataset.cancelId);
  }

});

searchInput.addEventListener("input", renderEvents);

categoryFilter.addEventListener("change", renderEvents);

menuToggle.addEventListener("click", () => {

  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  menuToggle.textContent = isOpen ? "×" : "☰";

});

navLinks.addEventListener("click", (event) => {

  if (event.target.closest("a")) {

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.textContent = "☰";
  }

});

renderEvents();
renderRegistrations();
