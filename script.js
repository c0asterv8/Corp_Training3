document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("Message sent!");
            form.reset();
        });
    }

    const animated = document.querySelectorAll("[data-animate]");
    if (animated.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );
        animated.forEach((el) => observer.observe(el));
    }

    const learnButtons = document.querySelectorAll(".learn-more");
    const modal = document.getElementById("info-modal");
    if (modal && learnButtons.length) {
        const modalTitle = document.getElementById("modal-title");
        const modalDescription = document.getElementById("modal-description");
        const modalPoints = document.getElementById("modal-points");

        const openModal = (button) => {
            modalTitle.textContent = button.dataset.title ?? "Program";
            modalDescription.textContent = button.dataset.description ?? "";
            modalPoints.innerHTML = "";
            const points = button.dataset.points ? button.dataset.points.split("|") : [];
            points.forEach((point) => {
                const li = document.createElement("li");
                li.textContent = point.trim();
                modalPoints.appendChild(li);
            });
            modal.classList.add("open");
            modal.setAttribute("aria-hidden", "false");
        };

        const closeModal = () => {
            modal.classList.remove("open");
            modal.setAttribute("aria-hidden", "true");
        };

        learnButtons.forEach((button) => {
            button.addEventListener("click", () => openModal(button));
        });

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        document.querySelectorAll("[data-close-modal]").forEach((closeBtn) => {
            closeBtn.addEventListener("click", closeModal);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && modal.classList.contains("open")) {
                closeModal();
            }
        });
    }
});

