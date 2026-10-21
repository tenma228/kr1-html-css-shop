const reviewDialog = document.getElementById('review-dialog');
const openReviewBtn = document.getElementById('open-review-dialog');
const closeReviewBtn = document.getElementById('close-review-dialog');
const reviewForm = document.getElementById('review-form');
const reviewsContainer = document.getElementById('reviews');

if (reviewDialog && openReviewBtn) {
  openReviewBtn.addEventListener('click', () => {
    reviewDialog.showModal();
  });

  closeReviewBtn.addEventListener('click', () => {
    reviewDialog.close();
  });

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!reviewForm.checkValidity()) {
      reviewForm.reportValidity();
      return;
    }

    const name = document.getElementById('review-name').value;
    const product = document.getElementById('review-product').value;
    const rating = document.getElementById('review-rating').value;
    const text = document.getElementById('review-text').value;

    // Создаем новый элемент отзыва и добавляем на страницу
    const newReview = document.createElement('article');
    newReview.style.cssText = "padding: 16px; border: 1px solid var(--color-border); border-radius: var(--radius-md); background-color: var(--color-bg);";
    newReview.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <h3 style="margin: 0; font-size: 1.1rem;">${name}</h3>
        <span style="color: #e49b00; letter-spacing: 0.08em;">${rating}</span>
      </div>
      <p style="margin: 0 0 8px 0; color: var(--color-muted); font-size: 0.9rem;">Товар: ${product}</p>
      <p style="margin: 0;">${text}</p>
    `;

    reviewsContainer.prepend(newReview);

    reviewForm.reset();
    reviewDialog.close();
  });
}

// Кнопка прокрутки наверх
document.addEventListener('DOMContentLoaded', () => {
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.removeAttribute('hidden');
    } else {
      scrollTopBtn.setAttribute('hidden', '');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});