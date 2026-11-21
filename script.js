    
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
    });
});

// Event Search and Filter
const searchInput = document.getElementById("eventSearch");
const filterSelect = document.getElementById("eventFilter");
const eventCards = document.querySelectorAll(".event-card");
const noEvents = document.getElementById("noEvents");

function filterEvents() {
    const search = searchInput.value.toLowerCase();
    const category = filterSelect.value;
    let visibleCount = 0;

    eventCards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesSearch = title.includes(search);
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

// Registration Modal
const modal = document.getElementById("registerModal");
const selectedEvent = document.getElementById("selectedEvent");
const closeModal = document.getElementById("closeModal");
const registrationForm = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");

document.querySelectorAll(".register-btn").forEach(button => {
    button.addEventListener("click", () => {
        selectedEvent.textContent =
            "Selected Event: " + button.dataset.event;

        formMessage.textContent = "";
        registrationForm.reset();

        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
    });
});

function hideModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        hideModal();
    }
});

// Registration Form
registrationForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();

    if (!name || !email) {
        formMessage.textContent = "Please fill all the details.";
        return;
    }

    formMessage.textContent =
        "Thank you, " + name + "! Demo registration successful.";

    registrationForm.reset();
});

// Close modal using Escape key
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        hideModal();
    }
});
