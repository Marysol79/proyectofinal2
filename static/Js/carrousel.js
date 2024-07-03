var slideIndex = 1;
showSlides(slideIndex);

// Agrega esta función para cambiar las diapositivas cada 3 segundos (3000 milisegundos)
var autoSlide = setInterval(function() {
    plusSlides(1);
}, 3000);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

document.querySelector('.slideshow-container').addEventListener('mouseover', function() {
    clearInterval(autoSlide);
});


document.querySelector('.slideshow-container').addEventListener('mouseout', function() {
    autoSlide = setInterval(function() {
        plusSlides(1);
    }, 3000);
});


