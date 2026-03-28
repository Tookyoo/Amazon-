import { cart, appState } from "../../data/cart.js";
import { getProducts } from "../../data/products.js";
import { formatCurrency } from "../utils/format-currency.js";
import { calculateQuantity } from "../shared/cart-controller.js";
import { deliveryOptions } from "../../data/delivery-options.js";
import {
  getDeliveryOptions,
  calculateDeliveryDate,
} from "../shared/delivery-controller.js";

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
}

export function renderCheckout() {
  const root = document.querySelector(".render-order-summary");
  root.innerHTML = cart.map(cartItem).join("");
}

function cartItem({ productId, quantity, deliveryOptionId }) {
  const matchingProduct = getProducts(productId);
  const matchingDeliveryOption = getDeliveryOptions(deliveryOptionId);
  const dateString = calculateDeliveryDate(matchingDeliveryOption.deliveryDays);
  const isUpdated = appState.isUpdatingQuantity === productId ? "active" : "";

  return `
          <div class="cart-item-container">
            <div class="delivery-date">Delivery date: ${dateString} </div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingProduct.name}
                </div>
                <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
                <div class="product-quantity ${isUpdated}">
                  <span> Quantity:
                    <span class="quantity-label">${quantity}</span>
                  </span>
                    <input type="text" class="new-input" data-product-id="${productId}">
                    <span class="save-quantity-link link-primary" data-product-id="${productId}">
                      Save
                    </span>
                  <span class="update-quantity-link link-primary" data-product-id="${productId}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id="${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${renderDeliveryOption(productId, deliveryOptionId)}
              </div>
            </div>
          </div>
      `;
}

function renderDeliveryOption(productId, deliveryOptionId) {
  return deliveryOptions
    .map(({ id, deliveryDays, priceCents }) => {
      const dateString = calculateDeliveryDate(deliveryDays);
      const isChecked = deliveryOptionId === id ? "checked" : "";
      const shippingText =
        priceCents === 0 ? "FREE" : `$${formatCurrency(priceCents)}`;

      return `
      <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    data-delivery-option-id="${id}"
                    data-product-id="${productId}"
                    name="delivery-option-${productId}" 
                    ${isChecked}
                  />
                  <div>
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">${shippingText} - Shipping</div>
                  </div>
                </div>
  `;
    })
    .join("");
}
