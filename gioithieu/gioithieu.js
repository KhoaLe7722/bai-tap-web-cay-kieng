document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.slideshow-box').forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.slide-img');
    let index = 0;

    setInterval(() => {
      slides.forEach(slide => slide.classList.remove('active'));
      index = (index + 1) % slides.length;
      slides[index].classList.add('active');
    }, 5000);
  });
});
