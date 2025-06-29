const slides = document.querySelectorAll(".slides img");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".slider-arrow.next");
const prevBtn = document.querySelector(".slider-arrow.prev");

let currentIndex = 0;

function showSlide(index) {
  slides.forEach((img, i) => {
    img.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
}

setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 15000);

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentIndex = i;
    showSlide(currentIndex);
  });
});
// Bắt sự kiện khi click nút mũi tên
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});
showSlide(currentIndex);