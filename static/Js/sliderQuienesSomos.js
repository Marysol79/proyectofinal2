let currentSlide = 0;

function moveSlide(direction) {
const slides = document.querySelectorAll('.parrafoCliente');
const totalSlides = slides.length;
currentSlide += direction;

if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
} else if (currentSlide >= totalSlides) {
    currentSlide = 0;
}

  const newTransformValue = -currentSlide * 100;
document.querySelector('.clientes').style.transform = `translateX(${newTransformValue}%)`;
}

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animado');
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('.animar').forEach(element => {
    observer.observe(element);
  });
});