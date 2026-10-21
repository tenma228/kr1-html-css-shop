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

// Модальное окно заказа («Заказать»)
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.order-btn');
const closeDialogButton = document.getElementById('close-order-dialog');
const closeOrderTopButton = document.getElementById('close-order-dialog-top');
const selectedProductInput = document.getElementById('selected-product');

if (orderDialog && orderButtons.length > 0) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.dataset.product;
      if (selectedProductInput) {
        selectedProductInput.value = productName;
      }
      orderDialog.showModal();
    });
  });
  
  if (closeDialogButton) {
    closeDialogButton.addEventListener('click', () => {
      orderDialog.close();
    });
  }

  if (closeOrderTopButton) {
    closeOrderTopButton.addEventListener('click', () => {
      orderDialog.close();
    });
  }
}

// Модальное окно подробного описания («Подробнее»)
const detailDialog = document.getElementById('detail-dialog');
const detailButtons = document.querySelectorAll('.detail-btn');
const closeDetailButton = document.getElementById('close-detail-dialog');
const closeDetailTopButton = document.getElementById('close-detail-dialog-top');
const detailTitle = document.getElementById('detail-title');
const detailDesc = document.getElementById('detail-desc');
const detailPrice = document.getElementById('detail-price');
const detailImg = document.getElementById('detail-img');
const orderDetailButton = document.getElementById('order-detail-button');
let selectedDetailProduct = '';

if (detailDialog && detailButtons.length > 0) {
  detailButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      detailTitle.textContent = btn.dataset.title;
      detailDesc.textContent = btn.dataset.desc;
      detailPrice.textContent = btn.dataset.price;

      // Получаем картинку из соответствующей карточки
      const card = btn.closest('.product-card');
      if (card) {
        const cardOrderButton = card.querySelector('.order-btn');
        selectedDetailProduct = cardOrderButton ? cardOrderButton.dataset.product : '';

        const productImg = card.querySelector('.product-card__image');
        if (productImg && detailImg) {
          detailImg.src = productImg.src;
          detailImg.alt = productImg.alt;
        }
      }

      detailDialog.showModal();
    });
  });

  if (closeDetailButton) {
    closeDetailButton.addEventListener('click', () => {
      detailDialog.close();
    });
  }

  if (closeDetailTopButton) {
    closeDetailTopButton.addEventListener('click', () => {
      detailDialog.close();
    });
  }

  if (orderDetailButton && orderDialog) {
    orderDetailButton.addEventListener('click', () => {
      if (selectedProductInput) {
        selectedProductInput.value = selectedDetailProduct;
      }
      detailDialog.close();
      orderDialog.showModal();
    });
  }
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

// Закрытие модального окна при клике на фоновую область (бэкдроп)
const modals = document.querySelectorAll('dialog');

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    // Если клик пришелся строго по самому тегу <dialog> (по его темному фону/паддингам), а не по контенту внутри
    if (event.target === modal) {
      modal.close();
    }
  });
});