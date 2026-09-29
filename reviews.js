/* ==========================================
   REVIEWS CAROUSEL — GUARANTEED WORKING
   ========================================== */

console.log("=== REVIEWS.JS LOADED ===");

// Reviews data
var REVIEWS_DATA = [
  { name: "Ahmed Khan", city: "Lahore", service: "Logo Design", rating: 5,
    message: "Got a very professional logo design. Recommend it to everyone!" },
  { name: "Fatima Ali", city: "Karachi", service: "Web Development", rating: 5,
    message: "Website was delivered on time and turned out great. The team is very cooperative." },
  { name: "Bilal Ahmed", city: "Islamabad", service: "Video Editing", rating: 5,
    message: "The video editing work is outstanding. I'm a repeat client now." },
  { name: "Sara Malik", city: "Rawalpindi", service: "SEO", rating: 5,
    message: "Our website traffic doubled in 3 months. Highly recommended!" },
  { name: "Usman Tariq", city: "Faisalabad", service: "Social Media", rating: 4,
    message: "Great content strategy. Engagement improved significantly." },
  { name: "Ayesha Noor", city: "Multan", service: "Logo Design", rating: 5,
    message: "Very creative team. Delivered exactly what I imagined." }
];

// Function to render
function renderReviews() {
  console.log("=== RENDER CALLED ===");

  var track = document.getElementById('carouselTrack');
  if (!track) {
    console.error("❌ carouselTrack NOT FOUND");
    return;
  }

  console.log("✅ Track found");

  // Get saved reviews from localStorage
  var saved = [];
  try {
    saved = JSON.parse(localStorage.getItem('pixelcraft_reviews') || '[]');
  } catch (e) { saved = []; }

  // Sort newest first
  saved.sort(function(a, b) { return (b.id || 0) - (a.id || 0); });

  // Combine
  var all = saved.concat(REVIEWS_DATA);
  console.log("📝 Total reviews:", all.length);

  // Build HTML
  var html = '';
  for (var i = 0; i < all.length; i++) {
    var r = all[i];
    var initial = (r.name || 'A').charAt(0).toUpperCase();
    var stars = '';
    for (var s = 1; s <= 5; s++) {
      stars += '<span style="color:' + (s <= (r.rating || 5) ? '#f5b301' : '#ccc') + '">★</span>';
    }

    html += '<div class="testimonial-card">';
    html += '  <div class="stars">' + stars + '</div>';
    html += '  <p>"' + (r.message || '') + '"</p>';
    html += '  <div class="testimonial-author">';
    html += '    <div class="avatar">' + initial + '</div>';
    html += '    <div>';
    html += '      <strong>' + (r.name || 'Anonymous') + '</strong>';
    html += '      <span>' + (r.city || '') + (r.service ? ' · ' + r.service : '') + '</span>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
  }

  track.innerHTML = html;
  console.log("✅ INSERTED into track. Length:", track.innerHTML.length);

  // Force layout
  track.style.display = 'flex';
  track.style.gap = '20px';
  track.style.transition = 'transform 0.5s ease';

  // Set card widths
  var cards = track.querySelectorAll('.testimonial-card');
  console.log("✅ Cards created:", cards.length);

  for (var c = 0; c < cards.length; c++) {
    cards[c].style.flex = '0 0 calc((100% - 40px) / 3)';
    cards[c].style.minWidth = 'calc((100% - 40px) / 3)';
    cards[c].style.boxSizing = 'border-box';
  }

  // Build dots
  var dotsWrap = document.getElementById('carouselDots');
  if (dotsWrap) {
    var totalPages = Math.ceil(all.length / 3);
    var dotsHTML = '';
    for (var p = 0; p < totalPages; p++) {
      dotsHTML += '<button data-page="' + p + '" class="' + (p === 0 ? 'active' : '') + '"></button>';
    }
    dotsWrap.innerHTML = dotsHTML;
  }

  // Setup carousel
  setupCarousel(all.length);
}

// Carousel navigation
var currentIndex = 0;
var maxIndex = 0;

function setupCarousel(total) {
  maxIndex = Math.max(0, total - 3);
  currentIndex = 0;

  var track = document.getElementById('carouselTrack');
  var prevBtn = document.getElementById('carouselPrev');
  var nextBtn = document.getElementById('carouselNext');
  var dotsWrap = document.getElementById('carouselDots');

  function update() {
    var card = track.querySelector('.testimonial-card');
    if (!card) return;
    var width = card.offsetWidth + 20;
    track.style.transform = 'translateX(-' + (currentIndex * width) + 'px)';

    if (dotsWrap) {
      var dots = dotsWrap.querySelectorAll('button');
      var activePage = Math.floor(currentIndex / 3);
      for (var i = 0; i < dots.length; i++) {
        if (i === activePage) dots[i].classList.add('active');
        else dots[i].classList.remove('active');
      }
    }
  }

  if (nextBtn) {
    nextBtn.onclick = function() {
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      update();
    };
  }

  if (prevBtn) {
    prevBtn.onclick = function() {
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      update();
    };
  }

  if (dotsWrap) {
    var dots = dotsWrap.querySelectorAll('button');
    for (var d = 0; d < dots.length; d++) {
      dots[d].onclick = (function(page) {
        return function() {
          currentIndex = page * 3;
          update();
        };
      })(d);
    }
  }

  // Auto slide
  setInterval(function() {
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    update();
  }, 4000);

  window.addEventListener('resize', update);
}

// Run on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderReviews);
} else {
  renderReviews();
}

// Also run on window load (backup)
window.addEventListener('load', function() {
  console.log("=== WINDOW LOADED ===");
  var track = document.getElementById('carouselTrack');
  if (track && track.innerHTML.length < 100) {
    console.log("Track empty on load, re-rendering...");
    renderReviews();
  }
});