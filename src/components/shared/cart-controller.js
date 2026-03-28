import { cart, appState, removeFromCart } from "../../data/cart.js";
import { saveToStorage } from "../../data/save-storage.js";
import { renderAmazon } from "../pages/amazon-ui.js";
import { renderCheckout, renderCheckoutHeader } from "../pages/checkout-ui.js";
/* import { selectDeliveryDate } from "./delivery-controller.js"; */

export function setupDelegateListener() {
  const productContainer = document.querySelector(".render-grid");
  const checkOutContainer = document.querySelector(".render-order-summary");

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

  if (checkOutContainer) {
    checkOutContainer.addEventListener("click", (e) => {
      const target = e.target;
      const delBtn = target.closest(".delete-quantity-link");

      if (delBtn) {
        const productId = target.dataset.productId;
        removeFromCart(productId);
        renderCheckout();
        renderCheckoutHeader();
      }
    });
  }

  if (checkOutContainer) {
    checkOutContainer.addEventListener("click", (e) => {
      const target = e.target;
      const upBtn = target.closest(".update-quantity-link");

      if (upBtn) {
        const productId = target.dataset.productId;
        setValue(true, productId);
      }
    });
  }

  if (checkOutContainer) {
    checkOutContainer.addEventListener("click", (e) => {
      const target = e.target;
      const saveBtn = target.closest(".save-quantity-link");

      if (saveBtn) {
        const productId = target.dataset.productId;

        setNewQuantity(productId);
        renderCheckoutHeader();
        setValue(false, productId);
      }
    });
  }

  if (checkOutContainer) {
    checkOutContainer.addEventListener("change", (e) => {
      const target = e.target;
      const radio = target.closest(".delivery-option-input");

      if (radio) {
        const productId = target.dataset.productId;
        const deliveryOptionId = target.dataset.deliveryOptionId;
        selectDeliveryDate(productId, deliveryOptionId);
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
      deliveryOptionId: "1",
      isActive: false,
      isUpdated: false,
    });
  }

  if (valueSelector) {
    valueSelector.value = 1;
  }

  showQuantity();
  saveToStorage();
}

export function calculateQuantity() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function showQuantity() {
  const totalQuantity = calculateQuantity();

  document.querySelector(".render-cart-quantity").textContent = totalQuantity;
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

function setValue(isEditing, productId) {
  /*  if (isEditing) {
    appState.isUpdatingQuantity = productId;
  } else {
    appState.isUpdatingQuantity = null;
  } */

  /* appState.isUpdatingQuantity = isEditing && productId; // short circuit evaluation */
  appState.isUpdatingQuantity = isEditing ? productId : null;

  renderCheckout();
}

function setNewQuantity() {
  const matchingProduct = cart.find((item) => item.productId === productId);
  const inputValue = document.querySelector(
    `.new-input[data-product-id="${productId}"]`,
  );
  const newQuantity = Number(inputValue.value);

  if (Number(inputValue.value) <= 0 || Number(inputValue.value) >= 100)
    return alert("Items must be greater than 0 and less than 100!");

  if (matchingProduct) {
    matchingProduct.quantity = newQuantity;
    saveToStorage();
  }
}

function selectDeliveryDate(productId, deliveryOptionId) {
  const matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    renderCheckout();
  }

  saveToStorage();
}
