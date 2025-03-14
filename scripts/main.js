// Play Game Function
function playGame(gameName) {
  alert(`Starting ${gameName}...`);
  // Add logic to launch the game here
}

// Highlight the Middle Banner
const slides = document.querySelectorAll('.banner-slide');
const bannerContainer = document.querySelector('.banner-container');

function highlightMiddleSlide() {
  // Remove the 'active' class from all slides
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });

  // Find the middle slide and add the 'active' class
  const middleIndex = Math.floor(slides.length / 2);
  slides[middleIndex].classList.add('active');
}

// Update the middle slide every 5 seconds
setInterval(highlightMiddleSlide, 5000);

// Initial highlight
highlightMiddleSlide();