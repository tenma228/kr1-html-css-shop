const filterButtons = document.querySelectorAll('.catalog-filters__button');
const productCards = document.querySelectorAll('.product-card[data-category]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('catalog-filters__button--active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });

    productCards.forEach((card) => {
      card.hidden = selectedCategory !== 'all' && card.dataset.category !== selectedCategory;
    });
  });
});
