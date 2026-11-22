const items = [...document.querySelectorAll(".gallery-item")];
const filterButtons = document.querySelectorAll(".filters button");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let visibleItems = [...items];
let currentIndex = 0;

// Open image
items.forEach((item) => {
    item.addEventListener("click", () => {
        visibleItems = items.filter(
            img => img.style.display !== "none"
        );

        currentIndex = visibleItems.indexOf(item);
        showImage();
        lightbox.classList.add("show");
    });
});

// Display selected image
function showImage() {
    const image = visibleItems[currentIndex].querySelector("img");
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
}

// Next image
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showImage();
});

// Previous image
prevBtn.addEventListener("click", () => {
    currentIndex =
        (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showImage();
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("show");
}

closeBtn.addEventListener("click", closeLightbox);

// Close when clicking outside image
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;

    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "Escape") closeLightbox();
});

// Image category filters
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {

        const category = button.dataset.filter;

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        items.forEach((item) => {
            if (
                category === "all" ||
                item.dataset.category === category
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});
