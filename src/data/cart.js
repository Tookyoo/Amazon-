import { saveToStorage } from "./save-storage.js";

export let cart = JSON.parse(localStorage.getItem("mainCart")) || [];

export const appState = {
  hasIds: [],
  isUpdatingQuantity: [],
};

export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);

  saveToStorage();
}
