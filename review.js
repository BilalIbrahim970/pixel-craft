/* ==========================================
   REVIEW FORM — SAVE TO LOCALSTORAGE
   ========================================== */
(function() {
  'use strict';

  const form = document.getElementById('reviewForm');
  const stars = document.querySelectorAll('#ratingInput span');
  const ratingInput = document.getElementById('revRating');

  if (!form || !ratingInput) return;

  // ---------- STAR RATING ----------
  function paintStars(val) {
    stars.forEach(s => {
      s.style.color = parseInt(s.dataset.value) <= parseInt(val) ? '#f5b301' : '#ccc';
    });
  }

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const val = star.dataset.value;
      ratingInput.value = val;
      paintStars(val);
    });

    star.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        star.click();
      }
    });

    star.addEventListener('mouseenter', () => {
      stars.forEach(s => {
        s.style.color = parseInt(s.dataset.value) <= parseInt(star.dataset.value) ? '#f5b301' : '#ccc';
      });
    });
  });

  document.getElementById('ratingInput').addEventListener('mouseleave', () => {
    paintStars(ratingInput.value);
  });

  paintStars(5);

  // ---------- SUBMIT ----------
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('revName').value.trim();
    const city = document.getElementById('revCity').value.trim();
    const service = document.getElementById('revService').value;
    const rating = document.getElementById('revRating').value;
    const message = document.getElementById('revMessage').value.trim();

    if (!name || !city || !service || !message) {
      alert('Please fill all required fields.');
      return;
    }

    if (message.length < 10) {
      alert('Review should be at least 10 characters.');
      return;
    }

    const review = {
      id: Date.now(),
      name: name,
      city: city,
      service: service,
      rating: parseInt(rating),
      message: message,
      date: new Date().toISOString()
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('pixelcraft_reviews') || '[]');
      existing.push(review);
      localStorage.setItem('pixelcraft_reviews', JSON.stringify(existing));
    } catch (err) {
      console.error('Save failed', err);
      alert('Could not save your review. Please try again.');
      return;
    }

    // Send to WhatsApp (optional)
    const text =
      `NEW REVIEW — Pixel Craft%0A` +
      `─────────────────────%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `City: ${encodeURIComponent(city)}%0A` +
      `Service: ${encodeURIComponent(service)}%0A` +
      `Rating: ${rating}/5%0A` +
      `─────────────────────%0A` +
      `Review:%0A${encodeURIComponent(message)}`;

    // Show success
    alert('Thank you, ' + name + '! Your review has been submitted.');

    // Reset form
    form.reset();
    ratingInput.value = 5;
    paintStars(5);

    // Open WhatsApp in new tab (optional)
    window.open(`https://wa.me/923314440854?text=${text}`, '_blank');

    // Redirect to home
    setTimeout(() => {
      window.location.href = 'index.html#testimonials';
    }, 1000);
  });
})();