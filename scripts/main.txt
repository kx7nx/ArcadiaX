// Banner Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.banner-slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Initialize the banner
showSlide(currentSlide);
setInterval(nextSlide, 10000); // Change slide every 10 seconds

// Play Game Function
function playGame(gameName) {
  alert(`Starting ${gameName}...`);
  // Add logic to launch the game here
}