

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Join Club
function joinClub(clubName) {
  alert("Welcome! You selected " + clubName + ".");
}

// Event Search and Filter
const searchInput = document.getElementById("eventSearch");
const filterSelect = document.getElementById("eventFilter");
const eventCards = document.querySelectorAll(".event-card");
const noEvents = document.getElementById("noEvents");

function filterEvents() {
  const searchText = searchInput.value.toLowerCase();
  const category = filterSelect.value;
  let visibleCount = 0;

  eventCards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const cardCategory = card.dataset.category;

    const matchesSearch = title.includes(searchText);
    const matchesCategory =
      category === "all" || category === cardCategory;

    if (matchesSearch && matchesCategory) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  noEvents.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterEvents);
filterSelect.addEventListener("change", filterEvents);

// Event Registration
const modal = document.getElementById("registerModal");
const selectedEvent = document.getElementById("selectedEvent");
const closeModal = document.getElementById("closeModal");
const registrationForm = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");

function registerEvent(eventName) {
  selectedEvent.textContent = "Event: " + eventName;
  formMessage.textContent = "";
  registrationForm.reset();
  modal.classList.add("show");
}

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();

  formMessage.textContent =
    "Thank you, " + name + "! Demo registration completed.";

  formMessage.style.color = "#45e6df";
});
