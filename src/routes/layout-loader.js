const partials = [
    { selector: "#site-navbar", url: "src/pages/components/navbar.html" },
    { selector: "#site-slider", url: "src/pages/home/slider.html" },
    { selector: "#home-cards", url: "src/pages/home/cards.html" },
    { selector: "#home-mission-vision", url: "src/pages/home/mission-vision.html" },
    { selector: "#home-banner", url: "src/pages/home/banner.html" },
    { selector: "#home-profile", url: "src/pages/home/profile.html" },
    { selector: "#home-news", url: "src/pages/home/news.html" },
    { selector: "#home-accreditation", url: "src/pages/home/accreditation.html" },
    { selector: "#home-study-plan", url: "src/pages/home/study-plan.html" },
    { selector: "#home-teachers", url: "src/pages/home/teachers.html" },
    { selector: "#site-footer", url: "src/pages/components/footer.html" },
];

async function loadPartial({ selector, url }) {
    const mount = document.querySelector(selector);

    if (!mount) {
        return;
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`No se pudo cargar ${url}`);
    }

    mount.innerHTML = await response.text();
}

document.addEventListener("DOMContentLoaded", () => {
    Promise.all(partials.map(loadPartial)).catch((error) => {
        console.error("Error cargando componentes del layout:", error);
    }).then(initSlider);
});

function initSlider() {
    const track = document.querySelector(".slider-track");
    const slides = Array.from(document.querySelectorAll(".slider-slide"));
    const prevButton = document.querySelector(".slider-arrow-prev");
    const nextButton = document.querySelector(".slider-arrow-next");

    if (!track || slides.length === 0 || !prevButton || !nextButton) {
        return;
    }

    let currentIndex = 0;

    function updateSlider() {
        track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
    }

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });

    updateSlider();
}