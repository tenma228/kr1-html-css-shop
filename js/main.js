// Модальное окно оформления заявки («Заказать»)
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.order-btn');
const closeDialogButton = document.getElementById('close-order-dialog');
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
}

// Форма отправки заявки
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);
    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      orderForm.reportValidity();
      return;
    }

    if (successMessage) {
      successMessage.hidden = false;
    }
    orderForm.reset();
    orderDialog.close();
  });
}

// Модальное окно подробного описания («Подробнее»)
const detailDialog = document.getElementById('detail-dialog');
const detailButtons = document.querySelectorAll('.detail-btn');
const closeDetailButton = document.getElementById('close-detail-dialog');
const detailTitle = document.getElementById('detail-title');
const detailDesc = document.getElementById('detail-desc');
const detailPrice = document.getElementById('detail-price');
const detailImg = document.getElementById('detail-img');

if (detailDialog && detailButtons.length > 0) {
  detailButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      detailTitle.textContent = btn.dataset.title;
      detailDesc.textContent = btn.dataset.desc;
      detailPrice.textContent = btn.dataset.price;

      // Получаем картинку из соответствующей карточки
      const card = btn.closest('.product-card');
      if (card) {
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