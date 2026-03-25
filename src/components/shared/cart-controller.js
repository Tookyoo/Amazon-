import { cart, appState } from "../../data/cart.js";
import { saveToStorage } from "../../data/save-storage.js";
import { renderAmazon } from "../pages/amazon-ui.js";

export function setupDelegateListener() {
  const productContainer = document.querySelector(".render-grid");

  if (productContainer) {
    productContainer.addEventListener("click", (e) => {
      const target = e.target;
      const addBtn = target.closest(".add-to-cart-button");

      if (addBtn) {
        const productId = target.dataset.productId;
        addToCart(productId);
        popupMessage(productId);
      }
    });
  }
}

export function addToCart(productId) {
  const matchingProduct = cart.find(
    (cartItem) => cartItem.productId === productId,
  );
  const valueSelector = document.querySelector(`.value-selector-${productId}`);
  const quantity = valueSelector ? Number(valueSelector.value) : 1;

  if (matchingProduct) {
    matchingProduct.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      isActive: false,
    });
  }

  if (valueSelector) {
    valueSelector.value = 1;
  }

  showQuantity();
  saveToStorage();
}

function calculateQuantity() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function showQuantity() {
  const totalQuantity = calculateQuantity();

  document.querySelector(".render-cart-quantity").textContent = totalQuantity;
}

export function renderCheckoutHeader() {
  const root = document.querySelector(".render-checkout-header");
  const totalQuantity = calculateQuantity();

  root.innerHTML = `
    <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="amazon.html">
            <img class="amazon-logo" src="src/data/images/amazon-logo.png" />
            <img
              class="amazon-mobile-logo"
              src="src/data/images/amazon-mobile-logo.png"
            />
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link" href="amazon.html">${totalQuantity} items</a
          >)
        </div>

        <div class="checkout-header-right-section">
          <img src="src/data/images/icons/checkout-lock-icon.png" />
        </div>
      </div>
  `;

  saveToStorage();
}

function popupMessage(productId) {
  let todo = cart.find((cartItem) => cartItem.productId === productId);
  let isSameId = appState.hasIds[productId];

  if (!todo.isActive) {
    if (isSameId) clearTimeout(isSameId);

    appState.hasIds[productId] = setTimeout(() => {
      delete appState.hasIds[productId];
      renderAmazon();
    }, 1000);
  }

  saveToStorage();
  renderAmazon();
}
